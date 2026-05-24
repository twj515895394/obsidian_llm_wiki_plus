# obsidian_llm_wiki_plus HANDOFF v1.0

## 当前版本

v1.0：一条命令安装 / 合并 / 迁移版。

## 已完成

- 完整 CN / EN 双语 Vault 模板。
- CN / EN 7 个核心 Skill：capture、research、integrate、kickoff、daily-work、decision-record、content-create。
- CN / EN 系统规则、模板、示例、docs 文档。
- Python 自动化：init、migrate、validate。
- Node CLI：`bin/olwp.mjs`。
- `package.json`：支持未来 npm 发布或 GitHub npx 执行。
- 新增 agent 安装说明：`docs/CN/agent-install.md`、`docs/EN/agent-install.md`。
- README 增加一条命令安装、合并、迁移说明。

## 新增命令

### 初始化

```bash
node bin/olwp.mjs init --lang CN --target ./my-vault
node bin/olwp.mjs init --lang EN --target ./my-vault
```

### 合并到已有 Vault

```bash
node bin/olwp.mjs merge --lang CN --target ./existing-vault
node bin/olwp.mjs merge --lang CN --target ./existing-vault --overwrite
```

### 迁移旧 Vault

```bash
node bin/olwp.mjs migrate --lang CN --source ./old-vault --target ./new-vault
node bin/olwp.mjs migrate --lang CN --source ./old-vault --target ./new-vault --apply
```

### 交互式安装

```bash
node bin/olwp.mjs install --lang CN --target ./my-vault
```

目标目录为空时自动初始化。目标目录非空时询问：合并、覆盖、迁移或取消。

## 面向 GitHub / npm 的推荐用法

如果只想直接拉 CN 模板：

```bash
npx degit twj515895394/obsidian_llm_wiki_plus/CN my-vault
```

如果想使用完整安装器：

```bash
npx github:twj515895394/obsidian_llm_wiki_plus install --lang CN --target ./my-vault
```

如果未来发布 npm 包：

```bash
npx obsidian_llm_wiki_plus install --lang CN --target ./my-vault
```

## 安全原则

- 默认不删除用户旧文件。
- init 遇到非空目录默认拒绝。
- merge 默认跳过已有文件。
- migrate 默认只生成迁移计划；只有 `--apply` 才复制文件。
- 迁移文件进入 `00_收件箱/迁移导入/` 或 `00_Inbox/migration-imports/`。
- 不自动将旧笔记分类进知识库，避免污染结构。

## 已验证

```text
python tools/validate-structure.py --strict-placeholders
errors: 0
warnings: 0
```

Node CLI 已测试：

- init CN 成功。
- merge CN 成功。
- migrate CN apply 成功。

## 下一步建议

1. 发布前把仓库推到 GitHub，确认真实仓库名和默认分支。
2. 测试 `npx github:<owner>/<repo> install --lang CN --target ./vault`。
3. 如果希望体验更好，可以发布 npm 包，让用户使用 `npx obsidian_llm_wiki_plus`。
4. 后续增强可以加入更强的交互式选择、版本更新、模板升级 diff、dry-run 报告。
