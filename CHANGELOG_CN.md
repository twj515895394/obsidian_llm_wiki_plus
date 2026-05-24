# CHANGELOG_CN

## v0.9

### 新增

- 新增 `tools/migrate.py`，支持将已有 Obsidian Vault 或文档目录安全迁入新 Vault。
- 新增 `tools/migrate-cn.sh`、`tools/migrate-en.sh`。
- 新增 `tools/migrate-cn.ps1`、`tools/migrate-en.ps1`。
- `docs/CN/automation.md` 增加文档迁移说明。
- `README_CN.md` 增加已有文档迁移用法。

### 迁移策略

- 默认只生成迁移计划，不复制文件。
- 默认复制，不移动、不删除原始文件。
- 保留旧目录结构。
- 导入到 `00_收件箱/迁移导入/` 暂存区。
- 生成 `90_计划/待审核/migration-plan-*.md`。
- 生成 `99_系统/日志/migration-manifest-*.csv`。
- 支持 `--init-template` 在迁移时初始化目标 Vault。

### 修复 / 优化

- `tools/validate-structure.py` 增加对迁移脚本和 `automation.md` 的检查。

## v0.8

- 新增 `tools/init.py` 跨平台初始化脚本。
- 新增 CN/EN 快捷初始化脚本。
- 新增 `tools/validate-structure.py`。
- README 改为优先推荐自动化初始化。

## v0.7

- 发布前润色。
- 新增 Roadmap 和 Release Checklist。
- 示例文件改为围绕真实链路展开。

## v0.6

- 修复 docs/EN placeholder 问题。
- 新增质量检查文档。

## v0.5

- 新增 START_HERE。
- 补强目录 README。
- 新增示例文件、版本记录和更新日志。

## v0.4

- 补齐 EN 版 Vault 内部规则、Skill 和模板。

## v0.3

- 补齐 docs/CN 与 docs/EN。

## v0.2

- 补齐 CN 版 7 个 Skill、系统规则和模板。

## v0.1

- 初始化 CN / EN 双语 Vault 骨架。


## v1.0

- 新增 `package.json` 与 `bin/olwp.mjs`，支持 Node CLI 安装入口。
- 新增 `install / init / merge / migrate` 命令模式。
- 新增 `docs/CN/agent-install.md` 与 `docs/EN/agent-install.md`。
- README 增加一条命令安装、合并和迁移说明。
- 安装流程默认安全：不删除旧文件，非空目录需要合并/迁移选择。
