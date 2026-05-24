# 发布检查清单

本清单用于在发布 `obsidian_llm_wiki_plus` 新版本前进行人工检查。

## 1. 根目录检查

- [ ] `README_CN.md` 已更新。
- [ ] `README.md` 已更新。
- [ ] `VERSION.md` 版本号已更新。
- [ ] `CHANGELOG_CN.md` 已记录本次变更。
- [ ] `CHANGELOG.md` 已记录本次变更。
- [ ] `HANDOFF.md` 已更新到当前版本。
- [ ] `LICENSE` 存在且协议明确。

## 2. CN / EN Vault 检查

- [ ] `CN/` 和 `EN/` 都可以作为独立 Obsidian Vault 使用。
- [ ] `CN/START_HERE.md` 和 `EN/START_HERE.md` 存在。
- [ ] `CN/CLAUDE.md`、`CN/AGENTS.md`、`CN/GEMINI.md` 存在。
- [ ] `EN/CLAUDE.md`、`EN/AGENTS.md`、`EN/GEMINI.md` 存在。
- [ ] CN 内容目录使用中文命名。
- [ ] EN 内容目录使用英文命名。
- [ ] `.agents/.claude/.gemini/.codex` 在 CN / EN 中保持英文路径。

## 3. Skill 检查

- [ ] CN 和 EN 都包含 7 个核心 Skill。
- [ ] Skill 名称一致：`capture`、`research`、`integrate`、`kickoff`、`daily-work`、`decision-record`、`content-create`。
- [ ] 每个 Skill 都包含目标、触发条件、执行步骤、输出位置、边界规则。
- [ ] 命令转发文件指向正确的 `.agents/skills/<skill>/SKILL.md`。

## 4. 系统规则与模板检查

- [ ] `purpose.md`、`schema.md`、`ingest.md`、`review.md`、`lifecycle.md` 在 CN / EN 中都存在。
- [ ] 7 个模板文件在 CN / EN 中都存在。
- [ ] 模板文件名保持英文稳定。
- [ ] CN 模板内容为中文，EN 模板内容为英文。

## 5. 示例与文档检查

- [ ] CN / EN 都包含 7 类示例产物。
- [ ] 示例不是空泛占位，而能体现真实使用方式。
- [ ] `docs/CN` 和 `docs/EN` 文档完整。
- [ ] 不存在明显 placeholder、TODO 或未完成说明。

## 6. 发布前体验检查

- [ ] 用户复制 `CN/` 后，可以从 `START_HERE.md` 开始使用。
- [ ] 用户复制 `EN/` 后，可以从 `START_HERE.md` 开始使用。
- [ ] README 中的快速开始命令与实际目录一致。
- [ ] 根目录说明与 Vault 内部规则没有冲突。
- [ ] 当前版本没有引入未确认的新架构。
## v0.8 自动化检查

- [ ] 运行 `python tools/validate-structure.py`
- [ ] 运行 `python tools/validate-structure.py --strict-placeholders`
- [ ] 使用 `python tools/init.py --lang CN --target ./tmp-cn-vault` 测试初始化
- [ ] 使用 `python tools/init.py --lang EN --target ./tmp-en-vault` 测试初始化
