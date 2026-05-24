#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const SKIP_NAMES = new Set(['.DS_Store', 'Thumbs.db']);
const EXCLUDE_DIRS = new Set(['.git', '.obsidian', '.trash', 'node_modules', '__pycache__', '.agents', '.claude', '.gemini', '.codex']);
const DEFAULT_EXTS = new Set(['.md', '.markdown', '.txt', '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.csv', '.json', '.yaml', '.yml', '.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.mp3', '.wav', '.m4a', '.mp4', '.mov', '.zip']);

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');

function usage() {
  console.log(`obsidian_llm_wiki_plus CLI

Usage:
  olwp install --lang CN --target ./MyVault [--source ./OldVault] [--yes]
  olwp init    --lang CN --target ./MyVault [--force]
  olwp merge   --lang CN --target ./ExistingVault [--overwrite] [--yes]
  olwp migrate --lang CN --source ./OldVault --target ./MyVault [--init-template] [--apply] [--yes]

Options:
  --lang CN|EN          Template language.
  --target <dir>        Target Obsidian vault directory.
  --source <dir>        Existing vault or document directory to migrate.
  --force              Init into a non-empty target and overwrite template files.
  --overwrite          Merge mode overwrites existing files with template files.
  --init-template      Migrate mode initializes target template before importing.
  --apply              Migrate mode copies files. Without it, only writes a migration plan.
  --yes                Skip interactive confirmations.
`);
}

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) { args._.push(a); continue; }
    const key = a.slice(2);
    if (['force', 'overwrite', 'init-template', 'apply', 'yes', 'help'].includes(key)) args[key] = true;
    else args[key] = argv[++i];
  }
  return args;
}

function fail(msg) {
  console.error(`ERROR: ${msg}`);
  process.exit(1);
}

function langConfig(lang) {
  if (!['CN', 'EN'].includes(lang)) fail('--lang must be CN or EN');
  return lang === 'CN' ? {
    template: 'CN',
    inboxImport: path.join('00_收件箱', '迁移导入'),
    reviewQueue: path.join('90_计划', '待审核'),
    logs: path.join('99_系统', '日志'),
    planTitle: '迁移计划',
    reviewText: '请人工审核这些迁移文件，再使用 research / integrate / decision-record 等 Skill 进行二次整理。'
  } : {
    template: 'EN',
    inboxImport: path.join('00_Inbox', 'migration-imports'),
    reviewQueue: path.join('90_Planning', 'review-queue'),
    logs: path.join('99_System', 'logs'),
    planTitle: 'Migration Plan',
    reviewText: 'Review these migrated files manually, then use research / integrate / decision-record skills to process them.'
  };
}

function ensureDir(dir) { fs.mkdirSync(dir, { recursive: true }); }
function exists(p) { return fs.existsSync(p); }
function isDir(p) { return exists(p) && fs.statSync(p).isDirectory(); }
function nonEmptyDir(p) { return isDir(p) && fs.readdirSync(p).filter(n => !SKIP_NAMES.has(n)).length > 0; }

function copyRecursive(src, dst, { overwrite = true, skipExisting = false } = {}) {
  if (!exists(src)) fail(`source not found: ${src}`);
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    ensureDir(dst);
    for (const name of fs.readdirSync(src)) {
      if (SKIP_NAMES.has(name)) continue;
      copyRecursive(path.join(src, name), path.join(dst, name), { overwrite, skipExisting });
    }
  } else {
    if (exists(dst)) {
      if (skipExisting) return;
      if (!overwrite) fail(`target file exists: ${dst}`);
    }
    ensureDir(path.dirname(dst));
    fs.copyFileSync(src, dst);
  }
}

async function confirm(message, yes = false) {
  if (yes) return true;
  const rl = readline.createInterface({ input, output });
  const ans = (await rl.question(`${message} [y/N] `)).trim().toLowerCase();
  rl.close();
  return ans === 'y' || ans === 'yes';
}

async function choose(message, choices, yes = false, defaultChoice = null) {
  if (yes && defaultChoice) return defaultChoice;
  const rl = readline.createInterface({ input, output });
  console.log(message);
  choices.forEach((c, i) => console.log(`  ${i + 1}. ${c.label}`));
  const ans = await rl.question('Choose: ');
  rl.close();
  const idx = Number(ans.trim()) - 1;
  if (idx < 0 || idx >= choices.length) return null;
  return choices[idx].value;
}

function initVault(lang, target, { force = false } = {}) {
  const cfg = langConfig(lang);
  const src = path.join(root, cfg.template);
  const dst = path.resolve(target);
  if (exists(dst) && !isDir(dst)) fail(`target exists and is not a directory: ${dst}`);
  if (nonEmptyDir(dst) && !force) fail('target directory is not empty. Use merge mode, migration mode, or --force.');
  ensureDir(dst);
  copyRecursive(src, dst, { overwrite: true });
  console.log(`Initialized ${lang} vault at ${dst}`);
}

function mergeTemplate(lang, target, { overwrite = false } = {}) {
  const cfg = langConfig(lang);
  const src = path.join(root, cfg.template);
  const dst = path.resolve(target);
  ensureDir(dst);
  copyRecursive(src, dst, { overwrite, skipExisting: !overwrite });
  console.log(`${overwrite ? 'Merged and overwritten' : 'Merged missing template files into'} ${dst}`);
}

function collectFiles(source) {
  const out = [];
  function walk(dir) {
    for (const name of fs.readdirSync(dir)) {
      if (SKIP_NAMES.has(name)) continue;
      const p = path.join(dir, name);
      const st = fs.statSync(p);
      if (st.isDirectory()) {
        if (EXCLUDE_DIRS.has(name)) continue;
        walk(p);
      } else if (DEFAULT_EXTS.has(path.extname(name).toLowerCase())) {
        out.push(p);
      }
    }
  }
  walk(source);
  return out;
}

function timestamp() {
  const d = new Date();
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

function csvEscape(v) {
  const s = String(v ?? '');
  return /[",\n]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
}

function migrate(lang, source, target, { initTemplate = false, apply = false, yes = false } = {}) {
  const cfg = langConfig(lang);
  const src = path.resolve(source);
  const dst = path.resolve(target);
  if (!isDir(src)) fail(`source directory not found: ${src}`);
  if (initTemplate && !exists(dst)) initVault(lang, dst, { force: false });
  else ensureDir(dst);

  const ts = timestamp();
  const importRoot = path.join(dst, cfg.inboxImport, `import-${ts}`);
  const reviewDir = path.join(dst, cfg.reviewQueue);
  const logDir = path.join(dst, cfg.logs);
  ensureDir(reviewDir);
  ensureDir(logDir);

  const files = collectFiles(src);
  const planPath = path.join(reviewDir, `migration-plan-${ts}.md`);
  const manifestPath = path.join(logDir, `migration-manifest-${ts}.csv`);

  const plan = [];
  plan.push(`# ${cfg.planTitle} ${ts}`);
  plan.push('');
  plan.push(`- source: ${src}`);
  plan.push(`- target: ${dst}`);
  plan.push(`- mode: ${apply ? 'apply' : 'plan-only'}`);
  plan.push(`- files: ${files.length}`);
  plan.push('');
  plan.push(cfg.reviewText);
  plan.push('');
  plan.push('## Files');
  for (const f of files) {
    const rel = path.relative(src, f);
    plan.push(`- ${rel}`);
  }
  fs.writeFileSync(planPath, plan.join('\n'), 'utf8');

  const rows = [['source_path', 'relative_path', 'target_path', 'size_bytes', 'applied']];
  for (const f of files) {
    const rel = path.relative(src, f);
    const to = path.join(importRoot, rel);
    rows.push([f, rel, to, fs.statSync(f).size, apply ? 'yes' : 'no']);
    if (apply) copyRecursive(f, to, { overwrite: true });
  }
  fs.writeFileSync(manifestPath, rows.map(r => r.map(csvEscape).join(',')).join('\n'), 'utf8');
  console.log(`${apply ? 'Migrated' : 'Planned migration for'} ${files.length} files.`);
  console.log(`Plan: ${planPath}`);
  console.log(`Manifest: ${manifestPath}`);
}

async function install(args) {
  const lang = args.lang || 'CN';
  const target = args.target || '.';
  const dst = path.resolve(target);
  const hasSource = Boolean(args.source);
  if (!exists(dst) || !nonEmptyDir(dst)) {
    initVault(lang, dst, { force: false });
    if (hasSource) migrate(lang, args.source, dst, { apply: Boolean(args.apply), yes: args.yes });
    return;
  }

  const action = await choose(
    `Target is not empty: ${dst}\nHow do you want to install obsidian_llm_wiki_plus?`,
    [
      { label: 'Merge template into this existing vault, skip existing files', value: 'merge' },
      { label: 'Overwrite template files in this existing vault', value: 'overwrite' },
      { label: 'Migrate another source directory into this vault staging area', value: 'migrate' },
      { label: 'Cancel', value: 'cancel' },
    ],
    Boolean(args.yes),
    hasSource ? 'migrate' : 'merge'
  );
  if (action === 'cancel' || !action) return;
  if (action === 'merge') mergeTemplate(lang, dst, { overwrite: false });
  if (action === 'overwrite') {
    if (await confirm('Overwrite existing template files?', Boolean(args.yes))) mergeTemplate(lang, dst, { overwrite: true });
  }
  if (action === 'migrate') {
    if (!hasSource) fail('--source is required for migration');
    migrate(lang, args.source, dst, { initTemplate: false, apply: Boolean(args.apply), yes: args.yes });
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const cmd = args._[0] || 'help';
  if (args.help || cmd === 'help') return usage();
  if (cmd === 'init') return initVault(args.lang || 'CN', args.target || '.', { force: Boolean(args.force) });
  if (cmd === 'merge') return mergeTemplate(args.lang || 'CN', args.target || '.', { overwrite: Boolean(args.overwrite) });
  if (cmd === 'migrate') return migrate(args.lang || 'CN', args.source, args.target || '.', { initTemplate: Boolean(args['init-template']), apply: Boolean(args.apply), yes: Boolean(args.yes) });
  if (cmd === 'install') return install(args);
  fail(`unknown command: ${cmd}`);
}

main().catch(err => fail(err?.message || String(err)));
