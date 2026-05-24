#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { fileURLToPath } from 'node:url';

const TEMPLATE_VERSION = '1.2.0';
const SKIP_NAMES = new Set(['.DS_Store', 'Thumbs.db']);
const EXCLUDE_DIRS = new Set(['.git', '.obsidian', '.trash', 'node_modules', '__pycache__']);
const MIGRATE_EXCLUDE_DIRS = new Set([...EXCLUDE_DIRS, '.agents', '.claude', '.gemini', '.codex', '.olwp']);
const DEFAULT_EXTS = new Set(['.md', '.markdown', '.txt', '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.csv', '.json', '.yaml', '.yml', '.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.mp3', '.wav', '.m4a', '.mp4', '.mov', '.zip']);
const SKILLS = ['ask', 'capture', 'research', 'integrate', 'kickoff', 'daily-work', 'decision-record', 'content-create', 'archive', 'obsidian-markdown'];
const TOOL_DIRS = ['.claude', '.gemini', '.codex'];
const SAFE_ADD_PREFIXES = ['.agents/skills/', '.claude/commands/', '.gemini/commands/', '.codex/commands/'];
const SAFE_ADD_FILES = new Set(['OLWP_COMMANDS.md']);
const REVIEW_FILE_NAMES = new Set(['AGENTS.md', 'CLAUDE.md', 'GEMINI.md', 'START_HERE.md']);
const REVIEW_PREFIXES = ['.agents/index.md'];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

function usage() {
  console.log(`obsidian_llm_wiki_plus CLI

Usage:
  olwp install --lang CN --target ./MyVault [--source ./OldVault] [--yes]
  olwp init    --lang CN --target ./MyVault [--force]
  olwp merge   --lang CN --target ./ExistingVault [--overwrite] [--yes]
  olwp migrate --lang CN --source ./OldVault --target ./MyVault [--init-template] [--apply] [--yes]
  olwp doctor  --lang CN --target ./ExistingVault
  olwp diff    --lang CN --target ./ExistingVault
  olwp upgrade --lang CN --target ./ExistingVault [--apply] [--yes]

Options:
  --lang CN|EN          Template language.
  --target <dir>        Target Obsidian vault directory.
  --source <dir>        Existing vault or document directory to migrate.
  --force               Init into a non-empty target and overwrite template files.
  --overwrite           Merge mode overwrites existing files with template files.
  --init-template       Migrate mode initializes the target vault before importing.
  --apply               Migrate copies files; upgrade applies safe additions.
  --yes                 Skip interactive confirmations.
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

function normalizeRel(p) { return p.split(path.sep).join('/'); }
function ensureDir(dir) { fs.mkdirSync(dir, { recursive: true }); }
function exists(p) { return fs.existsSync(p); }
function isDir(p) { return exists(p) && fs.statSync(p).isDirectory(); }
function nonEmptyDir(p) { return isDir(p) && fs.readdirSync(p).filter(n => !SKIP_NAMES.has(n)).length > 0; }
function readText(p) { return fs.readFileSync(p, 'utf8'); }
function writeText(p, text) { ensureDir(path.dirname(p)); fs.writeFileSync(p, text, 'utf8'); }
function sameFile(a, b) { return exists(a) && exists(b) && fs.readFileSync(a).equals(fs.readFileSync(b)); }

function timestamp() {
  const d = new Date();
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

function csvEscape(v) {
  const s = String(v ?? '');
  return /[",\n]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
}

function langConfig(lang) {
  if (!['CN', 'EN'].includes(lang)) fail('--lang must be CN or EN');
  return lang === 'CN' ? {
    lang,
    template: 'CN',
    rootDirs: ['00_收件箱','10_日记','20_项目','30_研究','35_问答沉淀','40_知识库','50_资源','60_原始资料','70_内容创作','80_决策中心','90_计划','99_系统'],
    inboxImport: path.join('00_收件箱', '迁移导入'),
    reviewQueue: path.join('90_计划', '待审核'),
    todo: path.join('90_计划', '待执行'),
    logs: path.join('99_系统', '日志'),
    archive: path.join('99_系统', '归档'),
    planTitle: '迁移计划',
    upgradeTitle: '升级计划',
    doctorTitle: 'Vault 健康检查',
    reviewText: '请人工审核这些迁移文件，再使用 research / integrate / decision-record 等 Skill 进行二次整理。'
  } : {
    lang,
    template: 'EN',
    rootDirs: ['00_Inbox','10_Daily','20_Projects','30_Research','35_QA_Library','40_Knowledge_Base','50_Resources','60_Raw_Sources','70_Content_Creation','80_Decision_Center','90_Planning','99_System'],
    inboxImport: path.join('00_Inbox', 'migration-imports'),
    reviewQueue: path.join('90_Planning', 'review-queue'),
    todo: path.join('90_Planning', 'todo'),
    logs: path.join('99_System', 'logs'),
    archive: path.join('99_System', 'archive'),
    planTitle: 'Migration Plan',
    upgradeTitle: 'Upgrade Plan',
    doctorTitle: 'Vault Health Check',
    reviewText: 'Review these migrated files manually, then use research / integrate / decision-record skills to process them.'
  };
}

function templateRoot(lang) { return path.join(root, langConfig(lang).template); }
function targetRoot(target) { if (!target) fail('--target is required'); return path.resolve(target); }
function statePath(target) { return path.join(target, '.olwp', 'state.json'); }

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

function writeState(target, lang, extra = {}) {
  const sp = statePath(target);
  const now = new Date().toISOString();
  let prev = {};
  if (exists(sp)) {
    try { prev = JSON.parse(readText(sp)); } catch { prev = {}; }
  }
  const state = {
    project: 'obsidian_llm_wiki_plus',
    vault_version: TEMPLATE_VERSION,
    lang,
    installed_at: prev.installed_at || now,
    last_upgrade_at: extra.last_upgrade_at || prev.last_upgrade_at || null,
    updated_at: now,
    ...extra,
  };
  writeText(sp, JSON.stringify(state, null, 2) + '\n');
}

function readState(target) {
  const sp = statePath(target);
  if (!exists(sp)) return null;
  try { return JSON.parse(readText(sp)); } catch { return null; }
}

function initVault(lang, target, { force = false } = {}) {
  if (!target) fail('--target is required for init');
  const cfg = langConfig(lang);
  const src = templateRoot(lang);
  const dst = path.resolve(target);
  if (exists(dst) && !isDir(dst)) fail(`target exists and is not a directory: ${dst}`);
  if (nonEmptyDir(dst) && !force) fail('target directory is not empty. Use merge mode, migration mode, or --force.');
  ensureDir(dst);
  copyRecursive(src, dst, { overwrite: true });
  writeState(dst, cfg.lang);
  console.log(`Initialized ${lang} vault at ${dst}`);
}

function mergeTemplate(lang, target, { overwrite = false } = {}) {
  if (!target) fail('--target is required for merge');
  const src = templateRoot(lang);
  const dst = path.resolve(target);
  ensureDir(dst);
  copyRecursive(src, dst, { overwrite, skipExisting: !overwrite });
  if (!readState(dst)) writeState(dst, lang);
  console.log(`${overwrite ? 'Merged and overwritten' : 'Merged missing template files into'} ${dst}`);
}

function collectFiles(source, { exDirs = EXCLUDE_DIRS, all = false } = {}) {
  const out = [];
  function walk(dir) {
    for (const name of fs.readdirSync(dir)) {
      if (SKIP_NAMES.has(name)) continue;
      const p = path.join(dir, name);
      const st = fs.statSync(p);
      if (st.isDirectory()) {
        if (exDirs.has(name)) continue;
        walk(p);
      } else if (all || DEFAULT_EXTS.has(path.extname(name).toLowerCase())) {
        out.push(p);
      }
    }
  }
  walk(source);
  return out;
}

function migrate(lang, source, target, { initTemplate = false, apply = false } = {}) {
  if (!source) fail('--source is required for migrate');
  if (!target) fail('--target is required for migrate');
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

  const files = collectFiles(src, { exDirs: MIGRATE_EXCLUDE_DIRS });
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
  for (const f of files) plan.push(`- ${path.relative(src, f)}`);
  writeText(planPath, plan.join('\n') + '\n');

  const rows = [['source_path', 'relative_path', 'target_path', 'size_bytes', 'applied']];
  for (const f of files) {
    const rel = path.relative(src, f);
    const to = path.join(importRoot, rel);
    rows.push([f, rel, to, fs.statSync(f).size, apply ? 'yes' : 'no']);
    if (apply) copyRecursive(f, to, { overwrite: true });
  }
  writeText(manifestPath, rows.map(r => r.map(csvEscape).join(',')).join('\n') + '\n');
  console.log(`${apply ? 'Migrated' : 'Planned migration for'} ${files.length} files.`);
  console.log(`Plan: ${planPath}`);
  console.log(`Manifest: ${manifestPath}`);
}

function templateFiles(lang) {
  const base = templateRoot(lang);
  return collectFiles(base, { all: true }).map(abs => ({ abs, rel: normalizeRel(path.relative(base, abs)) }));
}

function isSafeAdd(rel) {
  return SAFE_ADD_FILES.has(rel) || SAFE_ADD_PREFIXES.some(prefix => rel.startsWith(prefix));
}

function isReviewFile(rel) {
  return REVIEW_FILE_NAMES.has(rel) || REVIEW_PREFIXES.includes(rel) || rel.includes('/README.md') || rel.includes('/模板/') || rel.includes('/templates/');
}

function compareTemplate(lang, target) {
  const dst = targetRoot(target);
  const files = templateFiles(lang);
  const missing = [];
  const same = [];
  const different = [];
  for (const f of files) {
    const targetFile = path.join(dst, f.rel);
    if (!exists(targetFile)) missing.push(f.rel);
    else if (sameFile(f.abs, targetFile)) same.push(f.rel);
    else different.push(f.rel);
  }
  return { missing, same, different, files };
}

function doctor(lang, target) {
  const cfg = langConfig(lang);
  const dst = targetRoot(target);
  if (!isDir(dst)) fail(`target directory not found: ${dst}`);
  const state = readState(dst);
  const issues = [];
  const warnings = [];
  for (const d of cfg.rootDirs) if (!isDir(path.join(dst, d))) issues.push(`missing directory: ${d}`);
  for (const skill of SKILLS) {
    const p = path.join(dst, '.agents', 'skills', skill, 'SKILL.md');
    if (!exists(p)) issues.push(`missing skill: ${skill}`);
  }
  for (const tool of TOOL_DIRS) {
    for (const skill of SKILLS) {
      const p = path.join(dst, tool, 'commands', `${skill}.md`);
      if (!exists(p)) issues.push(`missing command adapter: ${tool}/commands/${skill}.md`);
    }
  }
  for (const f of ['AGENTS.md', 'CLAUDE.md', 'GEMINI.md', 'OLWP_COMMANDS.md']) {
    if (!exists(path.join(dst, f))) issues.push(`missing entry file: ${f}`);
  }
  if (!state) warnings.push('missing .olwp/state.json; run upgrade --apply to create it safely');
  else if (state.lang && state.lang !== lang) warnings.push(`state lang is ${state.lang}, but --lang is ${lang}`);
  const diff = compareTemplate(lang, dst);
  console.log(`# ${cfg.doctorTitle}`);
  console.log(`target: ${dst}`);
  console.log(`template_version: ${TEMPLATE_VERSION}`);
  console.log(`vault_version: ${state?.vault_version || 'unknown'}`);
  console.log(`missing: ${diff.missing.length}`);
  console.log(`different: ${diff.different.length}`);
  console.log(`issues: ${issues.length}`);
  console.log(`warnings: ${warnings.length}`);
  if (issues.length) { console.log('\nIssues:'); issues.forEach(x => console.log(`- ${x}`)); }
  if (warnings.length) { console.log('\nWarnings:'); warnings.forEach(x => console.log(`- ${x}`)); }
  if (!issues.length && !warnings.length) console.log('\nVault looks healthy.');
}

function diffVault(lang, target) {
  const dst = targetRoot(target);
  if (!isDir(dst)) fail(`target directory not found: ${dst}`);
  const diff = compareTemplate(lang, dst);
  console.log(`Template version: ${TEMPLATE_VERSION}`);
  console.log(`Target: ${dst}`);
  console.log(`Missing files: ${diff.missing.length}`);
  console.log(`Different files: ${diff.different.length}`);
  console.log(`Same files: ${diff.same.length}`);
  if (diff.missing.length) {
    console.log('\nMissing files:');
    diff.missing.forEach(x => console.log(`- ${x}${isSafeAdd(x) ? ' [safe-add]' : ''}`));
  }
  if (diff.different.length) {
    console.log('\nDifferent files:');
    diff.different.forEach(x => console.log(`- ${x}${isReviewFile(x) ? ' [review]' : ''}`));
  }
}

function writeUpgradePlan(lang, target, diff, ts, { apply = false } = {}) {
  const cfg = langConfig(lang);
  const dst = targetRoot(target);
  const reviewDir = path.join(dst, cfg.reviewQueue);
  const logDir = path.join(dst, cfg.logs);
  const olwpPlanDir = path.join(dst, '.olwp', 'upgrade-plans');
  const manifestDir = path.join(dst, '.olwp', 'manifests');
  ensureDir(reviewDir); ensureDir(logDir); ensureDir(olwpPlanDir); ensureDir(manifestDir);
  const planPath = path.join(reviewDir, `upgrade-plan-${ts}.md`);
  const manifestPath = path.join(logDir, `upgrade-manifest-${ts}.csv`);
  const machinePlanPath = path.join(olwpPlanDir, `upgrade-plan-${ts}.md`);
  const machineManifestPath = path.join(manifestDir, `upgrade-manifest-${ts}.csv`);
  const safeMissing = diff.missing.filter(isSafeAdd);
  const reviewMissing = diff.missing.filter(x => !isSafeAdd(x));
  const plan = [];
  plan.push(`# ${cfg.upgradeTitle} ${ts}`);
  plan.push('');
  plan.push(`- target: ${dst}`);
  plan.push(`- lang: ${lang}`);
  plan.push(`- template_version: ${TEMPLATE_VERSION}`);
  plan.push(`- mode: ${apply ? 'apply-safe-additions' : 'plan-only'}`);
  plan.push('');
  plan.push('## Summary');
  plan.push(`- safe additions: ${safeMissing.length}`);
  plan.push(`- missing but review-needed: ${reviewMissing.length}`);
  plan.push(`- different files: ${diff.different.length}`);
  plan.push('');
  plan.push('## Safe additions');
  safeMissing.forEach(x => plan.push(`- ${x}`));
  plan.push('');
  plan.push('## Missing files needing review');
  reviewMissing.forEach(x => plan.push(`- ${x}`));
  plan.push('');
  plan.push('## Different files staged for review');
  diff.different.forEach(x => plan.push(`- ${x}`));
  plan.push('');
  plan.push('## Rules');
  plan.push('- User content directories are never overwritten.');
  plan.push('- Existing files are not overwritten automatically.');
  plan.push('- Different files are copied to `.olwp/upgrade-staging/` for manual review.');
  plan.push('- Apply mode only copies safe missing files and writes state/logs.');
  writeText(planPath, plan.join('\n') + '\n');
  writeText(machinePlanPath, plan.join('\n') + '\n');
  const rows = [['path', 'status', 'safe_add', 'action']];
  safeMissing.forEach(x => rows.push([x, 'missing', 'yes', apply ? 'copied' : 'planned']));
  reviewMissing.forEach(x => rows.push([x, 'missing', 'no', 'review']));
  diff.different.forEach(x => rows.push([x, 'different', isSafeAdd(x) ? 'yes' : 'no', 'staged_for_review']));
  const csv = rows.map(r => r.map(csvEscape).join(',')).join('\n') + '\n';
  writeText(manifestPath, csv);
  writeText(machineManifestPath, csv);
  return { planPath, manifestPath, safeMissing, reviewMissing };
}

async function upgrade(lang, target, { apply = false, yes = false } = {}) {
  const dst = targetRoot(target);
  if (!isDir(dst)) fail(`target directory not found: ${dst}`);
  const src = templateRoot(lang);
  const diff = compareTemplate(lang, dst);
  const ts = timestamp();
  const { planPath, manifestPath, safeMissing } = writeUpgradePlan(lang, dst, diff, ts, { apply });
  const stagingRoot = path.join(dst, '.olwp', 'upgrade-staging', ts);
  const backupRoot = path.join(dst, '.olwp', 'backups', ts);
  ensureDir(stagingRoot); ensureDir(backupRoot);

  for (const rel of diff.different) {
    const from = path.join(src, rel);
    const to = path.join(stagingRoot, rel);
    copyRecursive(from, to, { overwrite: true });
  }

  if (!apply) {
    console.log(`Upgrade plan generated.`);
    console.log(`Plan: ${planPath}`);
    console.log(`Manifest: ${manifestPath}`);
    console.log('Run again with --apply to copy safe missing files. Existing files will not be overwritten.');
    return;
  }

  if (safeMissing.length && !(await confirm(`Apply ${safeMissing.length} safe additions?`, Boolean(yes)))) {
    console.log('Upgrade apply cancelled. Plan was still generated.');
    return;
  }
  for (const rel of safeMissing) {
    const from = path.join(src, rel);
    const to = path.join(dst, rel);
    if (!exists(to)) copyRecursive(from, to, { overwrite: false });
  }
  writeState(dst, lang, { vault_version: TEMPLATE_VERSION, last_upgrade_at: new Date().toISOString() });
  console.log(`Upgrade safe additions applied.`);
  console.log(`Plan: ${planPath}`);
  console.log(`Manifest: ${manifestPath}`);
  console.log(`Staging: ${stagingRoot}`);
  console.log(`Backup: ${backupRoot}`);
}

async function install(args) {
  const lang = args.lang || 'CN';
  const target = args.target || '.';
  const dst = path.resolve(target);
  const hasSource = Boolean(args.source);
  if (!exists(dst) || !nonEmptyDir(dst)) {
    initVault(lang, dst, { force: false });
    if (hasSource) migrate(lang, args.source, dst, { apply: Boolean(args.apply) });
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
    migrate(lang, args.source, dst, { initTemplate: false, apply: Boolean(args.apply) });
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const cmd = args._[0] || 'help';
  if (args.help || cmd === 'help') return usage();
  if (cmd === 'init') return initVault(args.lang || 'CN', args.target || '.', { force: Boolean(args.force) });
  if (cmd === 'merge') return mergeTemplate(args.lang || 'CN', args.target || '.', { overwrite: Boolean(args.overwrite) });
  if (cmd === 'migrate') return migrate(args.lang || 'CN', args.source, args.target || '.', { initTemplate: Boolean(args['init-template']), apply: Boolean(args.apply) });
  if (cmd === 'install') return install(args);
  if (cmd === 'doctor') return doctor(args.lang || 'CN', args.target || '.');
  if (cmd === 'diff') return diffVault(args.lang || 'CN', args.target || '.');
  if (cmd === 'upgrade') return upgrade(args.lang || 'CN', args.target || '.', { apply: Boolean(args.apply), yes: Boolean(args.yes) });
  fail(`unknown command: ${cmd}`);
}

main().catch(err => fail(err?.message || String(err)));
