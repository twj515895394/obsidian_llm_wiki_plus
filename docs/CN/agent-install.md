# Agent 安装与一键初始化设计

本文档说明如何让用户或 AI Agent 通过一条命令安装 `obsidian_llm_wiki_plus`，并在目标目录非空时选择初始化、合并或迁移。

## 目标

用户不应该总是手动复制 `CN/` 或 `EN/` 目录。更好的方式是：

```text
用户告诉 Agent：帮我安装 obsidian_llm_wiki_plus 到这个 Obsidian 目录
Agent 拉取项目 → 执行安装入口 → 判断目标目录状态 → 询问初始化 / 合并 / 迁移
```

## 推荐安装方式

### 方式一：degit 直接拉取模板目录

适合全新 Vault：

```bash
npx degit twj515895394/obsidian_llm_wiki_plus/CN my-vault
npx degit twj515895394/obsidian_llm_wiki_plus/EN my-vault
```

这种方式最简单，但只适合空目录初始化，不适合已有 Vault 的迁移合并。

### 方式二：degit 拉取完整项目，再使用工具脚本

适合需要初始化、合并或迁移的场景：

```bash
npx degit twj515895394/obsidian_llm_wiki_plus .olwp
python .olwp/tools/init.py --lang CN --target ./my-vault
python .olwp/tools/migrate.py --lang CN --source ./old-vault --target ./my-vault --init-template --apply
```

### 方式三：使用 Node CLI

如果项目发布为 npm 包，或者通过 GitHub package 方式执行，可以使用：

```bash
npx obsidian_llm_wiki_plus install --lang CN --target ./my-vault
```

或者：

```bash
npx github:twj515895394/obsidian_llm_wiki_plus install --lang CN --target ./my-vault
```

本项目提供 `package.json` 和 `bin/olwp.mjs`，用于支持这种方式。

## CLI 命令设计

### 初始化空目录

```bash
npx obsidian_llm_wiki_plus init --lang CN --target ./my-vault
```

如果目标目录非空，默认拒绝，避免误覆盖。

### 合并模板到已有 Vault

```bash
npx obsidian_llm_wiki_plus merge --lang CN --target ./existing-vault
```

默认只补充缺失文件，不覆盖已有文件。

如果明确要覆盖模板文件：

```bash
npx obsidian_llm_wiki_plus merge --lang CN --target ./existing-vault --overwrite
```

### 迁移旧 Vault 或文档目录

先生成迁移计划：

```bash
npx obsidian_llm_wiki_plus migrate --lang CN --source ./old-vault --target ./new-vault
```

确认后执行迁移：

```bash
npx obsidian_llm_wiki_plus migrate --lang CN --source ./old-vault --target ./new-vault --apply
```

如果目标目录还没初始化：

```bash
npx obsidian_llm_wiki_plus migrate --lang CN --source ./old-vault --target ./new-vault --init-template --apply
```

### 交互式安装

```bash
npx obsidian_llm_wiki_plus install --lang CN --target ./my-vault
```

当目标目录为空时，直接初始化。

当目标目录非空时，询问：

1. 合并模板，跳过已有文件
2. 覆盖模板文件
3. 迁移另一个来源目录到暂存区
4. 取消

## 给 AI Agent 的执行提示词

用户可以这样对 Agent 说：

```text
帮我安装 obsidian_llm_wiki_plus 到当前 Obsidian Vault。
如果目录为空，就初始化 CN 版。
如果目录不为空，先询问我是要合并模板，还是迁移已有文档。
不要直接覆盖已有文件。
```

Agent 应执行：

```bash
npx github:twj515895394/obsidian_llm_wiki_plus install --lang CN --target .
```

如果用户提供旧 Vault 路径：

```bash
npx github:twj515895394/obsidian_llm_wiki_plus install --lang CN --target ./new-vault --source ./old-vault --apply
```

## 安全原则

- 默认不覆盖已有文件。
- 默认不删除用户旧文件。
- 迁移默认只生成计划，不复制文件。
- 只有用户确认后才执行 `--apply`。
- 旧文件默认进入 `00_收件箱/迁移导入/`，不直接进入 `40_知识库/`。
- 后续由用户和 Agent 使用 `research` / `integrate` / `decision-record` 做二次整理。

## 推荐 Agent 行为

当用户说“帮我安装这个项目”时，Agent 应先判断：

1. 当前目录是否为空。
2. 是否已经是 Obsidian Vault。
3. 是否存在旧文档需要迁移。
4. 用户偏好 CN 还是 EN。
5. 是否允许覆盖已有文件。

如果信息不足，应一次只问一个关键问题。
