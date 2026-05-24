# CN / EN Directory Map

This project uses two separate vault templates: CN for Chinese users and EN for English users.

Content directories are localized. Tool directories remain stable in English so that agents, commands, and scripts can reuse the same paths.

## Top-Level Directory Map

| CN | EN | Description |
|---|---|---|
| `00_收件箱/` | `00_Inbox/` | Temporary inputs, ideas, and unprocessed notes |
| `10_日记/` | `10_Daily/` | Daily plans, logs, and reviews |
| `20_项目/` | `20_Projects/` | Project notes, execution plans, and deliverables |
| `30_研究/` | `30_Research/` | Deep research, topic studies, and analysis reports |
| `35_问答沉淀/` | `35_QA_Library/` | High-value AI Q&A and reusable conversation results |
| `40_知识库/` | `40_Knowledge_Base/` | Structured wiki pages, entities, concepts, claims, workflows, and more |
| `50_资源/` | `50_Resources/` | Tools, links, cases, prompt templates, and lightweight reference resources |
| `60_原始资料/` | `60_Raw_Sources/` | Raw sources, assets, snapshots, and imports |
| `70_内容创作/` | `70_Content_Creation/` | X posts, newsletters, Rednote posts, video scripts, topics, and assets |
| `80_决策中心/` | `80_Decision_Center/` | Technical selections, architecture decisions, product judgments, content strategies, and more |
| `90_计划/` | `90_Planning/` | To-do items, review queue, roadmap, and archive |
| `99_系统/` | `99_System/` | System rules, templates, logs, and lifecycle management |

## `40_Knowledge_Base` Map

`40_Knowledge_Base` is the main layer where the llm_wiki idea is applied. It stores structured, reusable, maintainable wiki pages.

| CN | EN | Description |
|---|---|---|
| `实体/` | `entities/` | People, companies, products, projects, tools |
| `概念/` | `concepts/` | Concepts, theories, terms, definitions |
| `方法论/` | `workflows/` | SOPs, processes, and practical methods |
| `观点/` | `claims/` | Verifiable claims, conclusions, hypotheses, assertions |
| `决策/` | `decisions/` | Knowledge-level choices and judgments |
| `综合分析/` | `synthesis/` | Synthesis across multiple sources |
| `对比分析/` | `comparisons/` | Comparisons between objects or approaches |

## `50_Resources` Map

`50_Resources` is a resource-list layer. It does not carry the core llm_wiki knowledge types such as entities, concepts, claims, and comparisons. Those belong in `40_Knowledge_Base/`.

| CN | EN | Description |
|---|---|---|
| `工具/` | `tools/` | Tool lists, tool entry points, installation notes, common commands, and lightweight evaluations |
| `链接/` | `links/` | Useful links, navigation entries, and lightweight references |
| `案例/` | `cases/` | Reference cases, good projects, content examples, and practical samples |
| `提示词模板/` | `prompt-templates/` | Reusable prompts, agent instruction snippets, writing templates, and task input formats |
| `原始资源/` | `raw-resources/` | Lightweight article, paper, or resource leads that are not formally archived yet |
| `原始资源/文章/` | `raw-resources/articles/` | Lightweight article entries or article lists |
| `原始资源/论文/` | `raw-resources/papers/` | Lightweight paper entries or paper lists |

## `60_Raw_Sources` Map

`60_Raw_Sources` is the evidence and source archive layer. Any material that will support research, wiki pages, or decision records should be captured here with the `capture` skill instead of being stored only in `50_Resources/`.

| CN | EN | Description |
|---|---|---|
| `来源/` | `sources/` | Source cards and source records |
| `附件/` | `assets/` | Images, PDFs, audio, video, and other assets |
| `快照/` | `snapshots/` | Webpage snapshots and repository snapshots |
| `导入/` | `imports/` | Batch imports or temporary imported materials |
| `来源/网页/` | `sources/web/` | Web pages, articles, blogs |
| `来源/GitHub/` | `sources/github/` | GitHub repository sources |
| `来源/文档/` | `sources/docs/` | Product docs, API docs, manuals |
| `来源/论文/` | `sources/papers/` | Papers and research materials |
| `来源/视频/` | `sources/videos/` | Video links, transcripts, notes |
| `来源/本地文件/` | `sources/local-files/` | Local file path sources |
| `来源/粘贴文本/` | `sources/pasted/` | Long-form pasted text |

## `70_Content_Creation` Map

| CN | EN | Description |
|---|---|---|
| `X/` | `X/` | X posts, threads, and articles |
| `公众号/` | `newsletter/` | Newsletter-style articles and long-form posts |
| `小红书/` | `rednote/` | Rednote posts and visual notes |
| `视频脚本/` | `video-scripts/` | Video scripts, storyboards, subtitles, voiceover drafts |
| `选题库/` | `topic-library/` | Topic ideas, trend pools, content columns |
| `素材库/` | `asset-library/` | Reusable content assets |

## `80_Decision_Center` Map

| CN | EN | Description |
|---|---|---|
| `技术选型/` | `technical-selection/` | Technical selection records |
| `架构决策/` | `architecture-decisions/` | Architecture decisions and trade-offs |
| `产品判断/` | `product-judgment/` | Product direction and feature judgments |
| `内容策略/` | `content-strategy/` | Content positioning, columns, publishing strategy |
| `项目路线/` | `project-roadmap/` | Project roadmap and phase choices |

## Three-Layer Boundary

```text
40_知识库 / 40_Knowledge_Base = core structured llm_wiki knowledge layer
50_资源 / 50_Resources = tools, links, cases, prompts, and lightweight reference resources
60_原始资料 / 60_Raw_Sources = traceable evidence and source archive layer
```

## Tool Directories

These directories stay the same in CN and EN:

```text
.agents/
.claude/
.gemini/
.codex/
```

Skill names also stay the same:

```text
capture
research
integrate
kickoff
daily-work
decision-record
content-create
```

## Path Design Principles

1. Content directories are localized for user experience.
2. Tool directories stay in English for agent and script stability.
3. System rule filenames stay in English, while their content is localized.
4. Template filenames stay in English, while their content is localized.
5. CN and EN structures should remain semantically equivalent.