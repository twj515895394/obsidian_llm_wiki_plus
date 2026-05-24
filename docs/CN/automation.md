# 自动化初始化与结构校验

`obsidian_llm_wiki_plus` 从 v0.8 开始提供轻量自动化脚本，解决用户每次都要手动复制 `CN/` 或 `EN/` 目录的问题。

## 初始化中文版 Vault

```bash
python tools/init.py --lang CN --target ./my-knowledge-vault
```

或者使用 shell 快捷脚本：

```bash
tools/init-cn.sh ./my-knowledge-vault
```

Windows PowerShell：

```powershell
./tools/init-cn.ps1 -Target ./my-knowledge-vault
```

## 初始化英文版 Vault

```bash
python tools/init.py --lang EN --target ./my-knowledge-vault
```

或者使用 shell 快捷脚本：

```bash
tools/init-en.sh ./my-knowledge-vault
```

Windows PowerShell：

```powershell
./tools/init-en.ps1 -Target ./my-knowledge-vault
```

## 覆盖 / 合并到已有目录

默认情况下，如果目标目录非空，初始化脚本会拒绝继续执行，避免误覆盖用户已有资料。

如果你确认要合并并覆盖模板文件，可以添加 `--force`：

```bash
python tools/init.py --lang CN --target ./my-knowledge-vault --force
```

## 结构校验

在发布前或修改模板后，可以运行：

```bash
python tools/validate-structure.py
```

严格检查 placeholder：

```bash
python tools/validate-structure.py --strict-placeholders
```

## 脚本边界

当前自动化脚本只做三件事：

1. 复制 CN 或 EN 模板到目标目录。
2. 避免默认覆盖已有文件。
3. 校验项目结构是否完整。

它不会：

- 安装 Obsidian 插件
- 修改用户系统配置
- 调用 AI API
- 自动提交 Git
- 自动删除用户文件

---

## 文档迁移：把已有 Obsidian / 文档目录迁入新 Vault

很多用户已经有自己的 Obsidian Vault 或 Markdown 文档目录。`obsidian_llm_wiki_plus` 不建议直接把旧目录硬塞进 `40_知识库/`，因为旧笔记通常缺少来源、类型、生命周期和目录分层，直接导入会污染新体系。

推荐迁移流程是：

```text
旧文档目录 → 迁移计划 → 收件箱暂存区 → 人工审核 → Skill 二次整理 → 进入项目/研究/知识库/决策中心
```

### 设计原则

1. **默认只生成迁移计划，不复制文件**  
   先让用户看到会迁移哪些文件、迁移到哪里。

2. **默认复制，不移动，不删除原文件**  
   迁移工具不会破坏用户原有 Vault。

3. **默认进入收件箱暂存区**  
   旧笔记先进入 `00_收件箱/迁移导入/`，而不是直接进入知识库。

4. **保留原目录结构**  
   方便用户从旧体系过渡到新体系。

5. **生成待审核迁移计划和 manifest**  
   迁移计划放在 `90_计划/待审核/`，manifest 放在 `99_系统/日志/`。

### 只生成迁移计划

```bash
python tools/migrate.py --lang CN --source ~/OldVault --target ~/NewVault
```

或者：

```bash
tools/migrate-cn.sh ~/OldVault ~/NewVault
```

这一步不会复制文件，只会生成：

```text
90_计划/待审核/migration-plan-*.md
99_系统/日志/migration-manifest-*.csv
```

### 执行迁移

确认计划没问题后：

```bash
python tools/migrate.py --lang CN --source ~/OldVault --target ~/NewVault --apply
```

文件会被复制到：

```text
00_收件箱/迁移导入/import-YYYYMMDD-HHMMSS/
```

### 如果目标 Vault 还没有初始化

可以在迁移时同时初始化模板：

```bash
python tools/migrate.py --lang CN --source ~/OldVault --target ~/NewVault --init-template --apply
```

### 迁移后如何处理

迁移完成后，不建议立即手动把所有文件拖进知识库。

推荐按以下方式消化：

| 旧内容类型 | 后续处理 |
|---|---|
| 原始资料、网页剪藏、PDF、链接 | 使用 `capture` 建立 source card |
| 调研笔记、技术分析 | 使用 `research` 或 `integrate` 进入 `30_研究/` / `40_知识库/` |
| 项目资料 | 移入 `20_项目/` 并补充项目模板字段 |
| 重要判断、选型记录 | 使用 `decision-record` 进入 `80_决策中心/` |
| 可发布素材 | 使用 `content-create` 进入 `70_内容创作/` |
| 无价值、重复、过期内容 | 删除或归档 |

### 为什么不自动分类？

旧文档是否属于“项目”“知识”“决策”“原始资料”，往往需要理解语义和上下文。脚本只能根据路径和文件名猜测，容易误判。

因此第一版迁移工具采用保守策略：

```text
脚本负责安全导入和生成清单；
Agent 负责辅助理解和整理；
用户负责确认最终归属。
```
