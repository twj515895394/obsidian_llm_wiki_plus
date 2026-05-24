# OLWP 命令清单

本文档列出 `obsidian_llm_wiki_plus` 的 `olwp` CLI 常用命令。

推荐通过 GitHub 直接运行：

```bash
npx github:twj515895394/obsidian_llm_wiki_plus <command> [options]
```

也可以在仓库本地运行：

```bash
node bin/olwp.mjs <command> [options]
```

---

## 1. 安装到新 Vault

目标目录为空时，初始化 CN 版：

```bash
npx github:twj515895394/obsidian_llm_wiki_plus install --lang CN --target ./my-vault
```

初始化 EN 版：

```bash
npx github:twj515895394/obsidian_llm_wiki_plus install --lang EN --target ./my-vault
```

如果目标目录不为空，`install` 会让你选择：

- 合并模板，跳过已有文件
- 覆盖模板文件
- 迁移旧文档到暂存区
- 取消

---

## 2. 直接初始化

```bash
npx github:twj515895394/obsidian_llm_wiki_plus init --lang CN --target ./my-vault
```

如果目录非空会拒绝执行，避免误覆盖。

确实需要强制初始化时：

```bash
npx github:twj515895394/obsidian_llm_wiki_plus init --lang CN --target ./my-vault --force
```

---

## 3. 合并模板到已有 Vault

只补缺失文件，不覆盖已有文件：

```bash
npx github:twj515895394/obsidian_llm_wiki_plus merge --lang CN --target ./my-vault
```

覆盖已有模板文件：

```bash
npx github:twj515895394/obsidian_llm_wiki_plus merge --lang CN --target ./my-vault --overwrite
```

谨慎使用 `--overwrite`。

---

## 4. 迁移旧文档

默认只生成迁移计划，不复制文件：

```bash
npx github:twj515895394/obsidian_llm_wiki_plus migrate --lang CN --source ./old-vault --target ./my-vault
```

确认后执行复制：

```bash
npx github:twj515895394/obsidian_llm_wiki_plus migrate --lang CN --source ./old-vault --target ./my-vault --apply
```

迁移策略：

- 不删除旧文件
- 不移动旧文件
- 保留旧目录结构
- 导入到 `00_收件箱/迁移导入/`
- 生成 `90_计划/待审核/migration-plan-*.md`
- 生成 `99_系统/日志/migration-manifest-*.csv`

---

## 5. 健康检查：doctor

检查一个已有 Vault 是否缺目录、缺 Skill、缺命令适配层、缺入口文件或状态文件：

```bash
npx github:twj515895394/obsidian_llm_wiki_plus doctor --lang CN --target ./my-vault
```

`doctor` 只检查，不修改文件。

适合在升级前执行。

---

## 6. 查看差异：diff

查看当前 Vault 与最新模板之间的差异：

```bash
npx github:twj515895394/obsidian_llm_wiki_plus diff --lang CN --target ./my-vault
```

输出内容包括：

- 缺失文件
- 内容不同文件
- 可安全新增文件
- 需要人工审核的文件

`diff` 只检查，不修改文件。

---

## 7. 安全升级：upgrade

默认只生成升级计划，不修改文件：

```bash
npx github:twj515895394/obsidian_llm_wiki_plus upgrade --lang CN --target ./my-vault
```

生成内容：

```text
90_计划/待审核/upgrade-plan-*.md
99_系统/日志/upgrade-manifest-*.csv
.olwp/upgrade-plans/
.olwp/manifests/
.olwp/upgrade-staging/
```

确认后执行安全新增：

```bash
npx github:twj515895394/obsidian_llm_wiki_plus upgrade --lang CN --target ./my-vault --apply
```

升级策略：

- 不覆盖已有文件
- 不删除用户文件
- 只自动复制安全缺失文件，例如新 Skill 和命令适配层
- 内容不同的入口文件、模板文件、README 会放入 `.olwp/upgrade-staging/` 供人工合并
- 写入或更新 `.olwp/state.json`

跳过交互确认：

```bash
npx github:twj515895394/obsidian_llm_wiki_plus upgrade --lang CN --target ./my-vault --apply --yes
```

---

## 推荐升级流程

```bash
npx github:twj515895394/obsidian_llm_wiki_plus doctor --lang CN --target ./my-vault
npx github:twj515895394/obsidian_llm_wiki_plus diff --lang CN --target ./my-vault
npx github:twj515895394/obsidian_llm_wiki_plus upgrade --lang CN --target ./my-vault
npx github:twj515895394/obsidian_llm_wiki_plus upgrade --lang CN --target ./my-vault --apply
```

---

## 安全原则

`olwp` 的默认行为是保守的：

- 默认不覆盖已有文件
- 默认不删除文件
- 默认不移动用户内容
- 默认先生成计划和日志
- 冲突文件进入待审核或 staging
- 用户内容目录永不自动覆盖

用户内容目录包括但不限于：

```text
20_项目/
30_研究/
35_问答沉淀/
40_知识库/
70_内容创作/
80_决策中心/
```
