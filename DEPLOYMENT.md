# 思达 AI Lab 官网部署与内容后台化说明

> 文档版本：1.1
> 更新日期：2026-08-04
> 适用项目：`思达AI Lab页面/`

## 1. 文档目的

本文档用于指导思达 AI Lab 官网的部署、内容后台化改造和后续运维交接。

正式上线需要满足以下核心要求：

1. 论文（Paper Bank / Publications）、News、Blog 和 Seminar 必须能够由内容人员通过数据库或管理后台新增、修改、发布和下线，不需要直接修改前端代码、JSON 文件或重新手动打包网站。
2. 前端继续保持现有中英双语界面；论文标题、作者和摘要保持英文原文，News、Blog、Seminar 等自有内容按后台字段提供中英文版本。
3. 公司官网总入口页与 Lab 官网是两个独立项目。当前公司官网总入口页尚未适配手机端，该问题应单独立项处理，不能混入 Lab 官网部署范围。

## 2. 当前状态与重要结论

| 项目 | 当前状态 |
| --- | --- |
| 前端形态 | Vite 构建的 React 单页应用（SPA） |
| 构建产物 | `dist/` |
| 当前内容来源 | `src/content/*.json`，在构建时静态写入网站 |
| 论文 | 已有列表、搜索和详情页 |
| News | 已有列表和详情页，但当前数据为空 |
| Blog / Seminar | 已有独立列表页、详情页、空状态及 Resources 入口；演示草稿已移除，当前栏目为空，尚未接入后台 |
| 当前 Draft 部署 | GitHub Pages，由 `main` 分支自动构建 |
| 当前预览地址 | `https://noncollapse.github.io/stats-powered-ai-lab-draft/` |

**重要：仅上传当前 `dist/` 可以部署现有静态网站，但不能满足后台更新内容的要求。** 当前论文等内容仍然属于构建时数据。要实现“后台更新、无需改网站”，必须先完成第 3—7 节所述的内容后台化改造。



## 3. 后台可能内容模型

所有内容表建议包含以下公共字段：

- `id`：数据库主键。
- `slug`：URL 中使用的唯一英文标识，发布后原则上不随意修改。
- `status`：`draft`、`review`、`published`、`archived`。
- `created_at`、`updated_at`、`published_at`。
- `created_by`、`updated_by`：用于审计。
- `sort_order`：需要人工排序时使用。
- `seo_title`、`seo_description`：可选；为空时由标题和摘要生成。

### 4.1 Publications / Paper Bank

| 字段 | 要求 |
| --- | --- |
| `slug` | 必填、唯一 |
| `title` | 必填，英文原文 |
| `authors` | 必填，至少一位作者；建议使用有序数组或作者关联表 |
| `year` | 必填，四位整数 |
| `abstract` | 必填，英文原文 |
| `topics` | 至少一个主题，可使用标签关联表 |
| `arxiv_id` | 必填，格式需校验 |
| `pdf_url` | 必填，HTTPS 链接 |
| `featured` | 布尔值，用于首页推荐 |
| `research_directions` | 可关联一个或多个研究方向 |

论文标题和摘要不需要中文翻译。界面中的“年份”“作者”“全文”等标签继续由前端语言系统处理。

### 4.2 News

| 字段 | 要求 |
| --- | --- |
| `slug` | 必填、唯一 |
| `title_en` / `title_zh` | 发布时必填 |
| `summary_en` / `summary_zh` | 发布时必填 |
| `body_en` / `body_zh` | 富文本或结构化正文，发布时必填 |
| `published_at` | 必填，用于排序和页面显示 |
| `related_project` | 可选，关联研究方向 |
| `external_links` | 可选，相关论文、活动或媒体链接 |

### 4.3 Blog

| 字段 | 要求 |
| --- | --- |
| `slug` | 必填、唯一 |
| `title_en` / `title_zh` | 发布时必填 |
| `summary_en` / `summary_zh` | 发布时必填 |
| `body_en` / `body_zh` | 富文本或结构化正文 |
| `authors` | 必填，可关联成员表 |
| `tags` | 可选，用于筛选和搜索 |
| `related_publications` | 可选，关联 Paper Bank |
| `cover_image` / `cover_alt` | 可选；图片放入对象存储，不建议直接存数据库二进制 |
| `published_at` | 必填 |

### 4.4 Seminar

| 字段 | 要求 |
| --- | --- |
| `slug` | 必填、唯一 |
| `title_en` / `title_zh` | 发布时必填 |
| `speaker_name` | 必填 |
| `speaker_affiliation_en` / `speaker_affiliation_zh` | 发布时必填 |
| `abstract_en` / `abstract_zh` | 发布时必填 |
| `start_at` / `end_at` | 使用 ISO 8601，并明确时区 |
| `format` | `online`、`offline` 或 `hybrid` |
| `location_en` / `location_zh` | 线下或混合活动时使用 |
| `registration_url` | 可选；公开页面优先放报名链接，不直接暴露内部会议凭据 |
| `slides_url` / `recording_url` | 活动结束后可补充 |
| `event_status` | `scheduled`、`completed`、`cancelled` |

## 5. 后台权限与发布流程

建议至少设置以下角色：

- **Administrator**：管理用户、权限、内容模型和系统配置。
- **Editor**：创建和修改草稿，但不能直接发布。
- **Reviewer / Publisher**：核验内容并发布或退回修改。

标准状态流为：

`Draft → Review → Published → Archived`

发布校验至少包括：

- `slug` 唯一且只包含小写英文、数字和连字符。
- 发布内容不存在空的必填字段。
- News、Blog、Seminar 的中英文内容完整。
- 论文作者、年份、摘要、arXiv ID 和 PDF 链接完整。
- 日期和时区有效；外链使用 HTTPS。
- 关联的研究方向、论文或成员真实存在。
- 不编造未知作者、单位、奖项、指标或链接。

后台应保留修订历史和操作日志，使管理员可以查看谁在何时修改或发布了内容。


## 6. 前端需要完成的后台化改造

当前代码不能仅靠部署配置自动连接数据库。正式上线前需要完成以下开发工作：

1. **替换静态内容入口**
   将 `src/content/index.ts` 中对 JSON 的直接导入，替换为构建时导出的内容快照，或统一的数据访问层。

2. **保留类型校验**
   继续使用 `src/types/content.ts`，并为 Blog、Seminar 增加独立类型。后台返回数据必须经过运行时 Schema 校验，避免错误数据进入构建。

3. **接入现有 Blog 页面**
   `/blog` 和 `/blog/:slug` 已支持列表、详情、作者、标签、相关论文及空状态。当前 `src/content/blog.json` 是空集合；后台化时由数据访问层读取后台导出的已发布记录。

4. **接入现有 Seminar 页面**
   `/seminars` 和 `/seminars/:slug` 已区分 Upcoming 与 Archive，并支持日期、时区、主讲人、地点、报名链接、讲义和录像字段。当前 `src/content/seminars.json` 是空集合；后台化时由数据访问层读取后台导出的已发布记录。

5. **接入 News 与 Publications**
   保留现有列表、搜索、详情页和 Topic 搜索逻辑，但数据来源改为后台导出的已发布记录。

6. **修改内容校验脚本**
   `scripts/validate-content.mjs` 应校验后台导出的数据快照，包括重复 slug、必填字段、双语字段、外链和关联关系。

7. **修改 sitemap 生成脚本**
   `scripts/generate-sitemap.mjs` 应从已发布的后台内容生成 Publications、News、Blog 和 Seminar 的详情 URL。

8. **保留错误与空状态**
   API 失败或栏目暂无内容时，页面不能白屏；详情不存在时返回现有 404 页面。

迁移完成后，`src/content/*.json` 不再作为生产内容的唯一数据源。Blog 与 Seminar 当前不保留虚构样例；如需测试详情页，应使用隔离的测试数据库或后台预览记录，且不得进入公开内容快照或 sitemap。


## 7. 内容更新操作说明

后台化完成后，内容人员统一按以下方式更新：

1. 登录内容管理后台。
2. 选择 Publications、News、Blog 或 Seminar。
3. 新建记录或编辑现有记录。
4. 保存为 Draft，并使用预览功能检查页面。
5. 提交 Review，由 Reviewer 核对字段、双语内容、来源和外链。
6. Reviewer 点击 Publish。
7. Webhook 自动触发校验、构建和部署。
8. 部署成功后检查列表页、详情页、语言切换、搜索和分享 URL。

内容人员不应直接编辑以下文件：

- `src/content/publications.json`
- `src/content/news.json`
- `src/content/blog.json`
- `src/content/seminars.json`
- `src/content/resources.json`
- 前端页面 TSX 文件
- 已部署的 `dist/` 文件

## 8. 安全、备份与回滚

- 后台账号启用强密码和多因素认证。
- 按最小权限原则分配 Administrator、Editor 和 Publisher。
- 数据库至少每日备份，并保留可用的恢复周期。
- 图片和附件使用独立对象存储，并配置访问权限和备份策略。
- 所有后台修改保留审计日志和内容版本。
- Webhook 必须校验签名或密钥，并限制触发频率。
- 正式发布失败时继续提供上一版静态网站。
- 前端回滚使用上一份成功构建产物或上一 Git 提交。
- 内容回滚优先恢复后台中的上一版本，再触发一次构建。
- 数据库 Schema 变更必须先备份，并准备向后兼容或回滚方案。

## 9. 公司官网总入口页的独立问题

当前已知问题是：

> 公司官网总入口页 尚未适配手机端。

该问题不阻止 Lab 官网以独立链接进行内部或合作者预览，但在公司官网统一对外发布、从总入口正式导流到 Lab 之前，应完成入口页移动端适配。

入口页移动端验收至少包括：

- 正确设置 viewport。
- 390 px、430 px 和 768 px 宽度下无横向滚动。
- 导航可在触屏设备打开、关闭并访问全部入口。
- 标题、说明和按钮不重叠、不裁切。
- 不依赖固定像素宽高完成主要布局。
- CTA 触控区域足够大，首屏核心入口无需缩放即可点击。
- 动画不会阻塞滚动，低性能设备可降级。
- 图片、Canvas 和背景特效不会造成明显首屏延迟。
- iOS Safari 与 Android Chrome 完成真机或设备模拟测试。

**范围边界：** Lab 官网的移动端验收和公司总入口页的移动端改造应分别记录、分别测试、分别部署，不能以 Lab 官网已适配手机端替代入口页整改。

## 10. 上线验收清单

### 内容后台

- [ ] 非开发人员可以通过后台新建并发布论文。
- [ ] 非开发人员可以发布 News、Blog 和 Seminar。
- [ ] Draft、Review 内容不会出现在公开网站。
- [ ] 已发布内容可以下线、归档和恢复历史版本。
- [ ] 重复 slug、缺失字段和错误关联会阻止发布。
- [ ] 后台有账号权限、审计日志和备份。

### Lab 前端

- [ ] Publications、News、Blog、Seminar 均有列表和详情页。
- [ ] 新发布内容无需修改前端代码即可出现。
- [ ] Paper Bank 搜索可按标题、作者和 Topic 工作。
- [ ] 中英文切换正确；论文标题、作者和摘要保持英文。
- [ ] 深层 URL 刷新不返回服务器 404。
- [ ] sitemap 只包含已发布内容，并使用正式域名。
- [ ] 404、空栏目、接口失败和图片缺失状态正常。
- [ ] 1440 px、1024 px、390 px 布局通过验收。
- [ ] 键盘操作、焦点状态、颜色对比和 reduced-motion 正常。

### 部署与运维

- [ ] 正式域名、HTTPS、DNS 和基础路径已确认。
- [ ] CI/CD Secret 未写入仓库或浏览器包。
- [ ] 发布 Webhook、失败通知和回滚流程完成测试。
- [ ] 数据库和媒体文件备份已实际执行过恢复演练。
- [ ] 上一成功版本可以快速重新部署。

### 公司官网总入口页

- [ ] 已单独建立移动端适配任务和负责人。
- [ ] 手机端无横向滚动、遮挡或无法点击的入口。
- [ ] 入口页适配完成后再加入正式 Lab 导流链接。

## 11. 交接时需要补全的信息

| 项目 | 最终值 / 负责人 |
| --- | --- |
| Lab 正式域名 | 待确认 |
| 部署平台 / 服务器 | 待确认 |
| CMS / 管理后台地址 | 待确认 |
| 数据库与备份负责人 | 待确认 |
| 内容 Administrator | 待确认 |
| 内容 Reviewer / Publisher | 待确认 |
| CI/CD 失败通知渠道 | 待确认 |
| 公司总入口页移动端负责人 | 待确认 |
