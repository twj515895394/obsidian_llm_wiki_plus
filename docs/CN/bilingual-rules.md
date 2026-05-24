# 双语维护规则

本项目采用 CN / EN 双版本模板。为了避免双语结构长期失控，需要遵守以下维护规则。

## 1. 内容目录本地化

CN 版本面向中文用户，内容型目录使用中文名。

示例：

```text
CN/40_知识库/
CN/60_原始资料/
CN/99_系统/
```

EN 版本面向英文用户，内容型目录使用英文名。

示例：

```text
EN/40_Knowledge_Base/
EN/60_Raw_Sources/
EN/99_System/
```

## 2. 工具目录保持英文稳定

以下目录用于 Agent、命令转发和脚本处理，CN / EN 中必须保持一致：

```text
.agents/
.claude/
.gemini/
.codex/
```

不要把它们翻译成中文。

## 3. Skill 名称保持一致

第一版 7 个 Skill 名称在 CN / EN 中保持一致：

```text
capture
research
integrate
kickoff
daily-work
decision-record
content-create
```

CN 版本的 `SKILL.md` 内容使用中文。

EN 版本的 `SKILL.md` 内容使用英文。

## 4. 模板文件名保持英文

模板文件名在 CN / EN 中保持一致：

```text
source-card.md
research-note.md
wiki-page.md
decision-record.md
project-note.md
daily-note.md
content-brief.md
```

原因：模板会被 Skill 高频引用，英文文件名可以降低路径映射复杂度。

模板内容需要本地化：CN 中文，EN 英文。

## 5. 系统规则文件名保持英文

系统规则文件名在 CN / EN 中保持一致：

```text
purpose.md
schema.md
ingest.md
review.md
lifecycle.md
```

文件内容本地化：CN 中文，EN 英文。

## 6. 命令转发文件保持英文

`.claude/commands/`、`.gemini/commands/`、`.codex/commands/` 下的文件名保持英文：

```text
capture.md
research.md
integrate.md
kickoff.md
daily-work.md
decision-record.md
content-create.md
```

这些文件只做转发，不维护重复规则。

## 7. 文档内容分别维护

`docs/CN/` 使用中文。

`docs/EN/` 使用英文。

不要在同一个文档中中英混写，除非是在术语对照表中。

## 8. 同步要求

当修改以下内容时，需要同时检查 CN / EN：

- 顶层目录结构。
- `40_知识库` / `40_Knowledge_Base` 子结构。
- `60_原始资料` / `60_Raw_Sources` 子结构。
- 7 个 Skill 的职责边界。
- 模板字段。
- 系统规则文件。
- docs 说明。

## 9. 推荐同步流程

建议先改 CN，再同步 EN：

```text
修改 CN → 检查路径和术语 → 翻译同步 EN → 更新 directory-map → 更新 changelog → 做结构检查
```

如果某个改动只适用于单一语言版本，需要在 changelog 或 handoff 中说明原因。

## 10. 术语建议

| CN | EN |
|---|---|
| 原始资料 | raw sources |
| 资料捕获 | source capture |
| 深度研究 | deep research |
| 知识沉淀 | wiki integration |
| 决策记录 | decision record |
| 待审核 | review queue |
| 生命周期 | lifecycle |
| 置信度 | confidence |
| 来源卡片 | source card |
| 知识页 | wiki page |
