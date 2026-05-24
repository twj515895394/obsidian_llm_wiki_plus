# Obsidian Markdown Skill

## 目标

用于创建和编辑适合 Obsidian 的 Markdown 文件，保证笔记在 frontmatter、wikilink、callout、embed、tag、内部链接和附件引用方面保持一致。

本 Skill 不负责业务流程，只负责 Markdown / Obsidian 语法规范。

## 触发条件

用户出现以下需求时使用本 Skill：

- 创建或修改 Obsidian 笔记
- 需要 wikilink、反向链接、嵌入、callout
- 需要 frontmatter / properties
- 需要整理 Markdown 格式
- 需要插入图片、PDF、音频、视频等附件引用
- 需要创建适合 Obsidian 的模板
- 用户明确提到 Obsidian Markdown、wikilink、callout、properties、embed

## 基础规范

### Frontmatter

推荐使用 YAML frontmatter：

```markdown
---
type: note
status: active
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: []
sources: []
related: []
---
```

不同笔记类型应使用对应模板：

```text
99_系统/模板/source-card.md
99_系统/模板/research-note.md
99_系统/模板/wiki-page.md
99_系统/模板/decision-record.md
99_系统/模板/project-note.md
99_系统/模板/daily-note.md
99_系统/模板/content-brief.md
```

### Wikilinks

优先使用 Obsidian wikilink：

```markdown
[[页面名]]
[[页面名|显示文本]]
[[页面名#标题]]
[[页面名#^block-id]]
```

当链接到外部网页时，使用标准 Markdown 链接：

```markdown
[标题](https://example.com)
```

### Embeds

```markdown
![[图片.png]]
![[文档.pdf]]
![[页面名]]
![[页面名#标题]]
```

图片可指定宽度：

```markdown
![[图片.png|600]]
```

### Callouts

```markdown
> [!note]
> 普通说明

> [!tip]
> 实用建议

> [!warning]
> 风险或注意事项

> [!question]
> 待确认问题

> [!summary]
> 摘要
```

可折叠 callout：

```markdown
> [!faq]- 点击展开
> 这里是折叠内容
```

## 项目内链接规则

- 研究笔记引用来源时，链接到 `60_原始资料/来源/` 下的 source card。
- 知识页引用研究时，链接到 `30_研究/`。
- 决策记录引用证据时，链接到 `60_原始资料/` 和 `30_研究/`。
- 内容创作引用素材时，链接到 `40_知识库/`、`35_问答沉淀/` 或 `80_决策中心/`。

## 标签规则

标签用于轻量筛选，不要替代目录和 frontmatter。

推荐格式：

```markdown
tags:
  - ai
  - agent
  - status/active
```

避免过度创建标签。

## 附件规则

- 正式原始附件应进入 `60_原始资料/附件/`。
- 内容创作素材可进入 `70_内容创作/素材库/`。
- 临时图片或草稿素材不要混入知识页目录。

## 边界规则

- 不要用普通 URL 替代可用的 wikilink。
- 不要在没有必要时使用复杂 HTML。
- 不要把大量无结构文本直接塞进知识页。
- 不要让 frontmatter 字段在同类文件中风格不一致。
- 不要把外部资料摘要当作原始来源。

## 质量检查

完成后检查：

- frontmatter 是否完整？
- 内部链接是否使用 wikilink？
- 来源是否可追溯？
- callout 是否语义清楚？
- 附件路径是否合理？
- 是否适合在 Obsidian 中阅读和维护？