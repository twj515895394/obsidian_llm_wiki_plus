# Roadmap / 未来路线图

`obsidian_llm_wiki_plus` 是一个持续演进的 Obsidian + LLM Wiki + Agent Skills 知识操作系统。

本 Roadmap 只记录未来方向。已经完成的内容请看 `CHANGELOG.md` / `CHANGELOG_CN.md`，当前项目上下文请看 `HANDOFF.md`。

---

## 当前状态：v1.2

当前项目已经具备可实际使用的 CN / EN 双语 Vault 模板，并支持安全安装、迁移和升级。

### 已完成基础能力

- CN / EN 双语 Obsidian Vault 模板。
- 10 个核心 Skill：
  - `ask`
  - `capture`
  - `research`
  - `integrate`
  - `kickoff`
  - `daily-work`
  - `decision-record`
  - `content-create`
  - `archive`
  - `obsidian-markdown`
- Agent 入口文件：
  - `AGENTS.md`
  - `CLAUDE.md`
  - `GEMINI.md`
- 命令适配层：
  - Claude Code
  - Gemini CLI / Gemini Agent
  - Codex
- Node CLI：
  - `install`
  - `init`
  - `merge`
  - `migrate`
  - `doctor`
  - `diff`
  - `upgrade`
- 已有 Vault 的安全迁移机制。
- 已有 `obsidian_llm_wiki_plus` Vault 的安全升级机制。
- `.olwp/state.json` 版本状态记录。
- CN / EN 命令清单：
  - `CN/OLWP_COMMANDS.md`
  - `EN/OLWP_COMMANDS.md`

### 当前核心边界

```text
40_知识库 = llm_wiki 核心结构化知识层
50_资源 = 工具 / 链接 / 案例 / Prompt / 轻量参考资源层
60_原始资料 = 可追溯证据和来源归档层
```

---

## v1.3 候选方向：升级体验与文档打磨

v1.2 的升级机制已经可用，但用户体验还可以继续优化。

### 候选目标

- 在 `README.md` 和 `README_CN.md` 中增加更精简的升级入口说明。
- 增加一个从 v1.0 Vault 升级到最新模板的真实示例。
- 优化 `olwp diff` 输出，让用户更容易理解：
  - 可安全新增文件；
  - 需要人工审核的文件；
  - 入口文件变化；
  - 模板文件变化；
  - Skill 文件变化。
- 优化升级计划的可读性。
- 增加 `.olwp/upgrade-staging/` 人工合并示例。
- 增加测试场景：
  - 空 Vault 安装；
  - 非空 Vault 合并；
  - 旧 Vault 迁移；
  - v1.0 → v1.2 升级；
  - CN / EN 一致性检查。

### 可能增强命令

当前命令：

```text
olwp doctor
olwp diff
olwp upgrade
```

后续可能增强：

```text
olwp upgrade --dry-run
olwp upgrade --list-actions
olwp diff --json
```

---

## v1.4 候选方向：恢复、回滚与更安全的操作

当前升级机制是保守的。后续可以进一步增强恢复和回滚能力。

### 候选目标

- 增加 `olwp restore` 或 `olwp rollback`，用于从升级错误中恢复。
- 完善 `.olwp/backups/` 的使用方式。
- 每次执行升级后生成恢复说明。
- 生成机器可读的 upgrade manifest，方便 Agent 辅助审核。
- 增加面向自动化和 CI 的 JSON 输出。
- 增加更明确的冲突分类：
  - 入口文件冲突；
  - 模板冲突；
  - Skill 冲突；
  - 目录 README 冲突；
  - 用户内容冲突。

### 可能新增命令

```text
olwp rollback
olwp restore
olwp list-upgrades
olwp doctor --json
```

---

## v1.5 候选方向：可选 Skill 与 Obsidian 增强能力

核心模板应该保持通用。某些增强能力很有用，但不适合过早进入默认核心 Skill。

### 候选可选 Skill

- `json-canvas`
  - 创建和编辑 Obsidian `.canvas` 文件。
  - 适合知识地图、项目地图、Agent 工作流图。
- `obsidian-bases`
  - 创建和编辑 Obsidian Bases 视图。
  - 适合 source card、决策记录、待审核队列、内容生产管线。
- `content-intelligence`
  - 可选内容情报工作流。
  - 可以包含 AI Newsletter、AI 产品、GitHub Trending、X 选题跟踪等能力。

### 可能结构

```text
.optional-skills/
├── json-canvas/
├── obsidian-bases/
└── content-intelligence/
```

或者：

```text
.agents/optional-skills/
```

这一块需要谨慎设计，避免可选 Skill 污染核心模板。

---

## 长期方向

### 1. 让 Vault 更容易长期维护

- 更好的版本状态记录。
- 更好的升级报告。
- 更好的冲突处理。
- 更好的 restore / rollback 流程。

### 2. 让知识沉淀更可靠

- 更好的 source → claim 可追溯链路。
- 更好的待审核队列工作流。
- 更好的过期知识识别。
- 更好的实体 / 概念 / 观点 / 对比分析链接。

### 3. 让 Agent 行为更稳定

- 坚持 `.agents/skills/` 是唯一主规则源。
- 坚持 `.claude/`、`.gemini/`、`.codex/` 只做适配层。
- 坚持 CN / EN 语义等价。
- 新增 Skill 或命令时同步增加校验。

### 4. 支持团队使用，但不让个人模板变重

未来可考虑团队方向：

- 共享决策记录；
- 团队资料库；
- 审核负责人；
- 内容审批流程；
- 轻量治理文档。

这些能力应保持可选，不应让基础模板变得过重。

---

## 当前暂不进入核心模板的能力

以下想法有价值，但暂不作为默认核心能力：

- 独立 `brainstorm` 核心 Skill。
- AI Newsletter 默认采集能力。
- AI Product 情报默认采集能力。
- 强依赖大量 Obsidian 插件的重型数据库工作流。
- 自动删除或自动覆盖用户内容的能力。

原因：

核心模板应该保持稳定的知识操作系统定位。垂直情报流和特殊工作流更适合作为可选扩展。

---

## 发布原则

后续版本应遵循这些原则：

1. 不破坏已有 Vault。
2. 不自动覆盖用户内容。
3. CN / EN 保持语义一致。
4. Skill 要短到可执行，不要变成论文。
5. 复杂解释放在 `docs/`，不要堆进入口文件。
6. 重大能力变化时，同步更新 `CHANGELOG.md`、`CHANGELOG_CN.md` 和 `HANDOFF.md`。
7. 新增必需文件、目录或 Skill 时，同步更新 `tools/validate-structure.py`。
