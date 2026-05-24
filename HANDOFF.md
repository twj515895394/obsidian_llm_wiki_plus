# obsidian_llm_wiki_plus 项目交接文档

> 当前交接范围：v1.0 → v1.2 迭代完成情况  
> 当前状态：本地验证已通过  
> 仓库地址：https://github.com/twj515895394/obsidian_llm_wiki_plus

---

## 1. 项目定位

`obsidian_llm_wiki_plus` 是一个面向 Obsidian + LLM + Agent Skills 的双语知识操作系统模板。

它不是普通 Obsidian 目录模板，而是希望让用户的 Obsidian Vault 支持：

- 原始资料可追溯
- AI 对话可沉淀
- 深度研究可归档
- 知识页可复用
- 项目推进可记录
- 内容创作可输出
- 决策过程可审计
- Agent 能够按 Skill 执行长期维护任务
- 已有 Vault 能够安全升级，而不是每次重新复制模板

当前项目支持：

```text
CN/ 中文 Vault 模板
EN/ 英文 Vault 模板
.agents/skills/ 通用 Skill 能力层
.claude/commands/ Claude Code 命令适配层
.gemini/commands/ Gemini 命令适配层
.codex/commands/ Codex 命令适配层
bin/olwp.mjs Node CLI 安装 / 迁移 / 升级工具
```

---

## 2. 当前整体状态

截至本次交接，项目已经完成从 v1.0 到 v1.2 的主要能力升级。

用户已确认：

```bash
npm run validate
```

验证通过。

用户也已确认 v1.2 新增 CLI 测试命令全部通过，包括：

```bash
node bin/olwp.mjs init --lang CN --target /tmp/olwp-test-cn
node bin/olwp.mjs doctor --lang CN --target /tmp/olwp-test-cn
node bin/olwp.mjs diff --lang CN --target /tmp/olwp-test-cn
node bin/olwp.mjs upgrade --lang CN --target /tmp/olwp-test-cn
node bin/olwp.mjs upgrade --lang CN --target /tmp/olwp-test-cn --apply --yes
```

---

## 3. v1.0 已完成能力

v1.0 的核心是让项目从“可复制模板”升级为“可命令安装模板”。

### 3.1 Node CLI 安装入口

新增：

```text
package.json
bin/olwp.mjs
```

支持通过 GitHub 直接执行：

```bash
npx github:twj515895394/obsidian_llm_wiki_plus install --lang CN --target ./my-vault
npx github:twj515895394/obsidian_llm_wiki_plus install --lang EN --target ./my-vault
```

### 3.2 安装模式

v1.0 支持：

```text
install
init
merge
migrate
```

| 命令 | 作用 |
|---|---|
| `install` | 智能安装入口，目标目录为空则初始化，非空则询问合并 / 覆盖 / 迁移 |
| `init` | 初始化 CN / EN Vault 模板 |
| `merge` | 将模板合并到已有 Vault，默认跳过已有文件 |
| `migrate` | 将旧文档迁移到新 Vault 的暂存区 |

### 3.3 安全安装策略

v1.0 已明确：

- 默认不删除旧文件
- 默认不覆盖已有文件
- 非空目录需要用户选择操作
- 迁移默认只生成计划
- `--apply` 后才复制迁移文件

---

## 4. v1.1 已完成能力

v1.1 的核心是增强 Agent Skill 系统和入口规则。

### 4.1 新增仓库根目录 AGENTS.md

新增：

```text
AGENTS.md
```

定位：仓库维护规则，不是用户 Vault 使用规则。

主要约束：

- CN / EN 模板要保持语义等价
- `.agents/skills/` 是主规则源
- `.claude/`、`.gemini/`、`.codex/` 只做命令适配
- 修改 Skill 时要同步更新索引、命令适配层和校验脚本
- 修改目录语义时要同步更新 docs 和相关 Skill

### 4.2 新增 ask Skill

新增：

```text
CN/.agents/skills/ask/SKILL.md
EN/.agents/skills/ask/SKILL.md
```

用途：轻量问答。

解决的问题：避免所有简单问题都进入 `capture / research / integrate` 的重型流程。

典型场景：

- 简单解释
- 快速判断
- 命令含义
- 报错说明
- 目录放置建议
- 无需沉淀的临时问答

策略：

- 先回答问题
- 不默认创建文件
- 只有具备复用价值时，才建议保存到 `35_问答沉淀/` / `35_QA_Library/`
- 可长期复用的概念再交给 `integrate`

### 4.3 新增 archive Skill

新增：

```text
CN/.agents/skills/archive/SKILL.md
EN/.agents/skills/archive/SKILL.md
```

用途：归档已完成或已处理内容。

| 对象 | 活跃位置 | 归档位置 |
|---|---|---|
| 已完成项目 | `20_项目/` / `20_Projects/` | `99_系统/归档/项目/YYYY/` / `99_System/archive/projects/YYYY/` |
| 已处理收件箱 | `00_收件箱/` / `00_Inbox/` | `99_系统/归档/收件箱/YYYY/MM/` / `99_System/archive/inbox/YYYY/MM/` |
| 已完成计划 | `90_计划/待执行/` / `90_Planning/todo/` | `90_计划/归档/YYYY/` / `90_Planning/archive/YYYY/` |
| 过期审核项 | `90_计划/待审核/` / `90_Planning/review-queue/` | `90_计划/归档/YYYY/` / `90_Planning/archive/YYYY/` |

核心原则：

- 只归档，不删除
- 归档前先列计划并等待确认
- 保留元数据和 wikilink
- 大项目归档前提醒是否需要复盘

### 4.4 新增 obsidian-markdown Skill

新增：

```text
CN/.agents/skills/obsidian-markdown/SKILL.md
EN/.agents/skills/obsidian-markdown/SKILL.md
```

用途：规范 Obsidian Markdown 写法。

覆盖：

- frontmatter
- wikilink
- callout
- embed
- tag
- 附件引用
- 内部链接
- Obsidian 模板格式

作用：让不同 Agent 创建或修改 Markdown 文件时风格一致，避免笔记格式漂移。

### 4.5 吸收 parse-knowledge 思路到 integrate

没有单独引入 `parse-knowledge` Skill，而是吸收到：

```text
CN/.agents/skills/integrate/SKILL.md
EN/.agents/skills/integrate/SKILL.md
```

新增能力：非结构化文本解析模式。

适用：

- 大段未整理文本
- 聊天记录
- 会议纪要
- 调研摘录
- 散乱笔记

处理链路：

```text
判断是否先 capture
→ 识别主主题
→ 提取实体 / 概念 / 方法论 / 观点 / 对比
→ 生成或更新主笔记
→ 更新原子知识页
→ 建立双向链接
```

### 4.6 吸收 start-my-day 思路到 daily-work

没有单独引入 `start-my-day` Skill，而是吸收到：

```text
CN/.agents/skills/daily-work/SKILL.md
EN/.agents/skills/daily-work/SKILL.md
```

新增模式：开始一天 / 早间计划。

处理流程：

```text
获取今天日期
→ 读取昨日笔记
→ 提取未完成任务
→ 检查活跃项目
→ 检查收件箱
→ 检查计划区
→ 询问今日主要目标
→ 创建或更新今日笔记
```

### 4.7 未引入的 OrbitOS Skill

本次明确未引入：

```text
brainstorm
ai-newsletters
ai-products
```

原因：

- `brainstorm` 与现有 `kickoff / content-create / decision-record` 有一定重叠
- `ai-newsletters` 和 `ai-products` 更偏 AI 内容情报流，不适合作为通用核心模板默认能力
- 后续可作为 optional extension 设计

### 4.8 v1.1 Skill 清单

当前核心 Skill：

```text
ask
capture
research
integrate
kickoff
daily-work
decision-record
content-create
archive
obsidian-markdown
```

### 4.9 v1.1 同步更新文件

已同步更新：

```text
CN/.agents/index.md
EN/.agents/index.md
CN/AGENTS.md
CN/CLAUDE.md
CN/GEMINI.md
EN/AGENTS.md
EN/CLAUDE.md
EN/GEMINI.md
```

并为新增 Skill 补齐命令适配层：

```text
CN/.claude/commands/
CN/.gemini/commands/
CN/.codex/commands/
EN/.claude/commands/
EN/.gemini/commands/
EN/.codex/commands/
```

---

## 5. v1.2 已完成能力

v1.2 的核心是解决已有用户 Vault 如何长期升级的问题。

### 5.1 新增升级相关命令

`bin/olwp.mjs` 新增：

```text
doctor
diff
upgrade
```

完整 CLI 命令目前包括：

```text
install
init
merge
migrate
doctor
diff
upgrade
```

### 5.2 doctor 命令

用法：

```bash
npx github:twj515895394/obsidian_llm_wiki_plus doctor --lang CN --target ./my-vault
```

作用：只检查，不修改。

检查内容：

- Vault 是否存在
- 顶层目录是否缺失
- Skill 是否缺失
- Claude / Gemini / Codex 命令适配层是否缺失
- `AGENTS.md / CLAUDE.md / GEMINI.md / OLWP_COMMANDS.md` 是否缺失
- `.olwp/state.json` 是否存在
- 当前 Vault 与模板之间的 missing / different 数量

### 5.3 diff 命令

用法：

```bash
npx github:twj515895394/obsidian_llm_wiki_plus diff --lang CN --target ./my-vault
```

作用：只对比，不修改。

输出：

- 缺失文件
- 内容不同文件
- 可安全新增文件 `[safe-add]`
- 需要人工审核文件 `[review]`

### 5.4 upgrade 命令

默认只生成升级计划：

```bash
npx github:twj515895394/obsidian_llm_wiki_plus upgrade --lang CN --target ./my-vault
```

执行安全新增：

```bash
npx github:twj515895394/obsidian_llm_wiki_plus upgrade --lang CN --target ./my-vault --apply
```

跳过确认：

```bash
npx github:twj515895394/obsidian_llm_wiki_plus upgrade --lang CN --target ./my-vault --apply --yes
```

### 5.5 upgrade 安全策略

默认策略：

- 不覆盖已有文件
- 不删除用户文件
- 不移动用户内容
- 默认只生成计划
- `--apply` 只复制安全缺失文件
- 内容不同的文件进入 staging，供人工合并

安全新增范围：

```text
.agents/skills/
.claude/commands/
.gemini/commands/
.codex/commands/
OLWP_COMMANDS.md
```

需要人工审核的内容：

```text
AGENTS.md
CLAUDE.md
GEMINI.md
.agents/index.md
README.md
模板文件
目录 README
```

### 5.6 .olwp 状态与升级目录

新增 `.olwp/` 机制：

```text
.olwp/
├── state.json
├── backups/
├── upgrade-staging/
├── upgrade-plans/
└── manifests/
```

其中 `state.json` 记录：

```json
{
  "project": "obsidian_llm_wiki_plus",
  "vault_version": "1.2.0",
  "lang": "CN",
  "installed_at": "...",
  "last_upgrade_at": "..."
}
```

### 5.7 升级计划和日志输出

CN 输出：

```text
90_计划/待审核/upgrade-plan-*.md
99_系统/日志/upgrade-manifest-*.csv
```

EN 输出：

```text
90_Planning/review-queue/upgrade-plan-*.md
99_System/logs/upgrade-manifest-*.csv
```

机器辅助目录：

```text
.olwp/upgrade-plans/
.olwp/manifests/
.olwp/upgrade-staging/
```

---

## 6. OLWP 命令清单文档

根据用户要求，已在 CN / EN 根目录新增命令清单：

```text
CN/OLWP_COMMANDS.md
EN/OLWP_COMMANDS.md
```

内容包含：

- install
- init
- merge
- migrate
- doctor
- diff
- upgrade
- 推荐升级流程
- 安全原则

推荐升级流程：

```bash
npx github:twj515895394/obsidian_llm_wiki_plus doctor --lang CN --target ./my-vault
npx github:twj515895394/obsidian_llm_wiki_plus diff --lang CN --target ./my-vault
npx github:twj515895394/obsidian_llm_wiki_plus upgrade --lang CN --target ./my-vault
npx github:twj515895394/obsidian_llm_wiki_plus upgrade --lang CN --target ./my-vault --apply
```

---

## 7. 目录语义调整与 40 / 50 / 60 边界

已明确三层边界：

```text
40_知识库 / 40_Knowledge_Base = llm_wiki 核心结构化知识层
50_资源 / 50_Resources = 工具、链接、案例、Prompt、轻量参考资源层
60_原始资料 / 60_Raw_Sources = 可追溯证据和来源归档层
```

对应规则：

- 不要把正式证据放入 `50_资源 / 50_Resources`
- 不要把结构化知识页放入 `50_资源 / 50_Resources`
- 如果资料会支撑研究、知识页或决策记录，必须进入 `60_原始资料 / 60_Raw_Sources`
- llm_wiki 的实体、概念、观点、方法论、对比分析等能力主要承载在 `40_知识库 / 40_Knowledge_Base`

已补充 `50_资源 / 50_Resources` 子目录说明：

CN：

```text
50_资源/
├── 工具/
├── 链接/
├── 案例/
├── 提示词模板/
└── 原始资源/
    ├── 文章/
    └── 论文/
```

EN：

```text
50_Resources/
├── tools/
├── links/
├── cases/
├── prompt-templates/
└── raw-resources/
    ├── articles/
    └── papers/
```

---

## 8. README 与架构图状态

用户已经提交架构图图片，并已确认 README 顶部引用成功。

当前引用：

```text
README.md      → EN/Screenshot_en.png
README_CN.md   → CN/Screenshot_cn.png
```

说明：

- 当前图片可正常显示
- 图片没有强制移动到 `assets/`
- README 中当前使用 `width="800"`，此前建议可改为 `width="100%"`，但不是必须

---

## 9. 校验与测试状态

当前校验脚本：

```text
tools/validate-structure.py
```

已经校验：

- 根目录核心文件
- CN / EN 顶层目录
- CN / EN `AGENTS.md / CLAUDE.md / GEMINI.md / OLWP_COMMANDS.md`
- 10 个 Skill
- Claude / Gemini / Codex 命令适配层
- docs/CN 与 docs/EN 关键文档
- tools 脚本
- placeholder 检查

用户已确认：

```bash
npm run validate
```

通过。

v1.2 CLI 测试也已确认通过。

---

## 10. 当前已完成文件变更摘要

重点新增或更新：

```text
AGENTS.md
HANDOFF.md
CHANGELOG.md
CHANGELOG_CN.md
bin/olwp.mjs
tools/validate-structure.py
CN/OLWP_COMMANDS.md
EN/OLWP_COMMANDS.md
CN/.agents/index.md
EN/.agents/index.md
CN/AGENTS.md
CN/CLAUDE.md
CN/GEMINI.md
EN/AGENTS.md
EN/CLAUDE.md
EN/GEMINI.md
CN/.agents/skills/ask/SKILL.md
EN/.agents/skills/ask/SKILL.md
CN/.agents/skills/archive/SKILL.md
EN/.agents/skills/archive/SKILL.md
CN/.agents/skills/obsidian-markdown/SKILL.md
EN/.agents/skills/obsidian-markdown/SKILL.md
CN/.agents/skills/integrate/SKILL.md
EN/.agents/skills/integrate/SKILL.md
CN/.agents/skills/daily-work/SKILL.md
EN/.agents/skills/daily-work/SKILL.md
```

并补齐新增 Skill 在以下目录的命令适配层：

```text
CN/.claude/commands/
CN/.gemini/commands/
CN/.codex/commands/
EN/.claude/commands/
EN/.gemini/commands/
EN/.codex/commands/
```

---

## 11. 当前不建议立即做的事项

以下内容已讨论过，但暂不建议进入核心：

```text
brainstorm Skill
ai-newsletters Skill
ai-products Skill
```

原因：

- `brainstorm` 与现有 Skill 有重叠
- AI 内容情报类能力更适合做 optional extension
- 当前核心模板应保持通用知识库定位

---

## 12. 后续建议

### 12.1 README 可补充 v1.2 升级命令入口

目前 `OLWP_COMMANDS.md` 已补齐，但 README 后续可以增加一个简短入口。

建议文案：

```markdown
## Upgrade an existing vault

```bash
npx github:twj515895394/obsidian_llm_wiki_plus doctor --lang CN --target ./my-vault
npx github:twj515895394/obsidian_llm_wiki_plus upgrade --lang CN --target ./my-vault
```

See `CN/OLWP_COMMANDS.md` / `EN/OLWP_COMMANDS.md` for the full command guide.
```

### 12.2 可继续完善 upgrade 的冲突合并体验

当前 `upgrade` 已经实现：

- 计划生成
- 安全新增
- staging
- manifest
- state

后续可进一步增强：

- 生成更细的 diff 说明
- 对入口文件做半自动合并建议
- 增加 `olwp restore` 或 `olwp rollback`
- 增加 `olwp list-upgrades`

### 12.3 可增加 optional-skills 机制

未来可考虑：

```text
.optional-skills/
├── content-intelligence/
├── ai-newsletters/
├── ai-products/
└── json-canvas/
```

但暂不建议放入核心模板。

### 12.4 可考虑引入 json-canvas / obsidian-bases

这两个来自 OrbitOS 的 Skill 很适合 Obsidian，但属于进阶能力。

建议未来作为 v1.3 或 optional extension 评估：

```text
json-canvas
obsidian-bases
```

---

## 13. 交接结论

当前项目已经从：

```text
v1.0：可安装模板
```

升级到：

```text
v1.1：具备更完整 Agent Skill 体系
v1.2：具备已有 Vault 的安全升级机制
```

当前阶段已经比较接近一个可长期维护的 Obsidian + LLM Wiki + Agent Skills 知识操作系统模板。

下一步最优先建议：

1. 在 README / README_CN 中补充 v1.2 的升级入口。
2. 做一次从 v1.0 模拟 Vault 升级到 v1.2 的真实流程截图或示例。
3. 继续完善 optional extension 机制，但不要急于扩大核心 Skill。
