---
name: ui-motion
version: 1.0.0
display_name: UI 组件动效与微交互指南
display_name_en: UI Motion & Micro-Interaction Guide
description: 为现有 Web 组件或页面添加过渡动效、物理弹簧、微交互与状态切换动画（或修复现有组件切换生硬、闪烁、无退场过渡问题）。覆盖按钮、手势、导航、表单输入、选择器、浮层弹窗、通知、卡片、表格、画廊、图表等全部 UI 组件。
description_zh: 为现有 Web 组件或页面添加过渡动效、物理弹簧、微交互与状态切换动画（或修复现有组件切换生硬、闪烁、无退场过渡问题）。覆盖按钮、手势、导航、表单输入、选择器、浮层弹窗、通知、卡片、表格、画廊、图表等 34 大分类共 155 个 UI 组件规范。
description_en: Add physics-based spring transitions, smooth state animations, and tactile micro-interactions to existing Web components while preserving existing styles and business logic. Covers 155 component specs across 34 UI categories.
---

# UI Motion

按“**端型二分类判别（Web vs 移动端）** → 确定目标与视觉/代码客观解码 → 快慢通道路由 → 宿敌清理与实现 → 静态自检与按需验收”执行。每步只读必要文件，禁止预读整个目录。

## 工作流

1. **首个节点：端型二分类判别（`Web 桌面端` vs `Mobile 移动端`）**
   - **客观识别当前端型**（直接从目标代码 DOM/样式/视口或截图判定，不盲目反问用户）：
     - **`Web`（桌面 Web 端，默认主分支）**：宽视口/多栏响应式布局（Sidebar + Main、顶栏 Header、表格看板）、交互含鼠标悬停（`:hover` / `onMouseEnter`）、右键菜单、键盘快捷键、分栏拖拽。无明确移动端特征时**默认归入 `Web`**。
     - **`Mobile`（移动端 / 触控 H5）**：用户明确声明移动端/H5/小程序/App 内嵌页，或页面容器锁死窄视口（如 `max-width: 375px~480px`、手机壳 Frame）、含底部固定 TabBar / `env(safe-area-inset-*)` / `@media (hover: none) and (pointer: coarse)`，或截图呈竖屏手机比例。
   - **二分类对偶分流与跨端拦截表（严禁跨端错配）**：
     | 交互意图 | 🖥️ `Web`（桌面端）路由 | 📱 `Mobile`（移动端 / H5）路由 | 🚫 跨端严禁错配法则 |
     | --- | --- | --- | --- |
     | **弹窗与详情浮层** | `overlays/dialog`、`overlays/drawer`、`overlays/popover` | `overlays/bottom-sheet`、`surfaces/sheet-stack`（响应式双态可用 `docks-and-tabs/share-sheet`） | `Web` 端禁止默认把常规弹窗做成底部抽屉 `bottom-sheet` |
     | **高风险/删除二次确认** | `buttons/confirm-morph`（原地伸长确认/Undo）、`overlays/dialog` | `gestures/hold-to-confirm`（长按蓄力+震动）、`gestures/swipe-actions`（左滑露底） | `Web` 端常规表格/列表行禁止默认加左滑删除 `swipe-actions` |
     | **列表行级/卡片快捷操作** | `menus/dropdown-menu`、`menus/context-menu`、`buttons/floating-button-group` | `gestures/swipe-actions`、`docks-and-tabs/orbit-menu`（单手拇指圆弧放射） | `Mobile` 端禁止依赖右键菜单或纯 Hover 浮现操作栏 |
     | **主导航与底部工具坞** | `docks-and-tabs/morph-nav`（顶栏 Mega Menu）、`navigation/tabs`、`docks-and-tabs/dock` | `glass/glass-tabbar`（毛玻璃底栏）、`docks-and-tabs/liquid-tab-bar`（流体底栏） | `Web` 端禁止用手机底部 TabBar；`Mobile` 端禁止用宽屏 `morph-nav` |
     | **日期与时间选择** | `pickers/date-picker`、`pickers/date-range-picker`（双月并排）、`pickers/time-picker` | `special-data/date-reel`（3D 滚筒磁吸轮盘）、`special-data/booking-pill` | `Web` 端表单选日期禁止默认用滚筒 `date-reel`；`Mobile` 端禁用双月并排 `date-range-picker` |
     | **列表刷新与加载** | `loaders/skeleton-morph`、`progress/skeleton`、`loaders/morph-loader` | `loaders/stretch-refresh`（下拉橡皮筋阻尼刷新）、`loaders/skeleton-morph` | `Web` 端桌面网页禁止加下拉刷新 `stretch-refresh` |
     | **悬浮预览与提示** | `overlays/hover-card`（500ms 悬停卡）、`overlays/tooltip` | `surfaces/link-unfurl`（点击原地展开）、`overlays/popover` / `bottom-sheet` | `Mobile` 端无持久鼠标悬停，严禁推荐纯 Hover 触发的 `hover-card` / `tooltip` |
     | **光标力场与物理键盘** | `cursor/dot-grid`、`cursor/gravity-well`、`special-inputs/shortcut-recorder`、`special-type/keycap-keyboard`、`expand/resizable-panels` | `surfaces/control-center`、`cards/card-stack`、`surfaces/wallet-stack` | `Mobile` 端严禁使用 `cursor/*`、`shortcut-recorder`、`keycap-keyboard`、`resizable-panels` |
2. **确定修改对象与视觉/代码客观解码**
   - 用户给出了组件文件、组件名、选择器或明确的页面区域 → 直接解码，已有明确授权不再重复确认。
   - 用户只说“给页面加动效”或只给了页面/项目路径 → 先按**第 1 步判定出的端型（`Web` 或 `Mobile`）**过滤掉不匹配的跨端组件，只读扫描当前界面，简短列出符合当前端型的可添加动效组件及建议，等待用户选择。未得到选择前不修改任何文件。
   - **视觉与 DOM 客观解码**：当用户只提供截图或口语化功能描述而未说出专业组件名时，**不依赖用户口语名词**，直接结合**第 1 步端型分类 + 截图 UI 形态 + 目标代码 DOM/状态**提取客观特征：
     - **元素结构与技术栈**：标签层级、状态变量、事件绑定；
     - **触发与运动拓扑**：触发方式（点击/长按/悬停/拖拽/输入）、空间运动形态（原地变身 / 兄弟节点间滑块游走 / 独立浮层投射 / 连续跟手拖拽 / 列表增删重排）、原状态与目标状态、外框尺寸是否允许变化。
     - 能从代码或截图判断的不问用户；只询问影响组件选择的缺失信息。
3. **选类别与路由通道**：根据第 2 步解码出的客观功能查下方类别表，并按以下 **8 条跨类别分界规则** 区分邻近目录：
   - **点按 vs 手势**：普通点击/异步状态/原地二次确认 → `buttons`；必须按住蓄力或横向滑动露底 → `gestures`。
   - **三类输入与选值**：单行/多行/密码/搜索 → `text-fields`；特定结构格式（步进数字、金额、号码、标签胶囊、@提及、快捷键录制）→ `special-inputs`；从下拉列表或日历选值 → `selects` / `pickers`。
   - **四类弹出与展开**：模态窗/抽屉/气泡/Tooltip → `overlays`；下拉/右键动作菜单 → `menus`；在原文档流内撑开高度/分栏 → `expand`；触发器自身直接形变成面板/导航 → `docks-and-tabs` / `surfaces`。
   - **浮层弹窗 vs 消息通知**：锚定触发器的模态窗/气泡/Tooltip → `overlays`；全局角落或顶部自动滑入的警告条/Toast/通知堆叠 → `messages`。
   - **三类平级切换**：页面/内容区导航切换 → `navigation`；表单内二值或紧凑选项切换 → `toggles`；浮动停靠栏/底部栏切换 → `docks-and-tabs` / `glass`。
   - **卡片 vs 高阶表面 vs 画廊**：常规/堆叠信息卡片 → `cards`；3D 镭射倾斜卡/折叠卡包/控制中心磁贴 → `surfaces` / `glass`；多图流转/灯箱/瀑布流 → `galleries` / `media`。
   - **排版动效 vs 机械字符**：标题揭示/流光/字形渐变 → `text-effects`；老虎机滚轮/重力沙漏/实体键帽/打字机 → `special-type`。
   - **数据与进度**：常规图表 → `charts`；拓扑/流向/树图/可刷选大图 → `advanced-charts`；状态进度/步骤/加载形变 → `progress` / `loaders`。
   - **路由分流**：
     - **命中唯一 `slug`（快通道，1 跳直达）** → 跳过 `<类别>/INDEX.md`，直接读取 `<类别>/<slug>.md`，进入第 4.5 步。
     - **同类存在多变体或横跨邻近类别（慢通道，2 跳判别）** → 进入第 4 步，读取 **1~2 个候选类别的 `<类别>/INDEX.md`**。
4. **选组件（仅慢通道 / 复合组件）**：用候选 `INDEX.md` 中的完整意图表对照目标 DOM 结构裁决唯一组件 md 并读取。复合组件以业务目的选主组件，再读取必要的辅助组件 md。INDEX 指向其他类别时直接跳转，不必回到本文件。
4.5. **改造规模分流（单组件 vs 多组件协同）**：
   - **单组件改造（目标组件数 $N = 1$）** → **不读取** `PRIMITIVES.md`，直接进入第 5 步按 `<类别>/<slug>.md` 内联实现（零额外读取开销）。
   - **多组件协同改造（目标组件数 $N \ge 2$ 或项目存在公共动画模块）** → 额外读取一次 [PRIMITIVES.md](PRIMITIVES.md)，将 4 个核心缓动变量（`--ease-spring`、`--ease-snappy`、`--ease-standard`、`--ease-exit`）及共享微原语（`createSpring`、`swapText`、`flipChildren`）注入页面/项目公共层，供各组件在第 5 步中统一调用。
5. **实现**：按组件 md 移植到目标代码。只移植动效机制，改写为目标项目自身的技术栈与状态管理；不改配色、布局、文案和业务逻辑。**严禁在未读取对应 `<类别>/<slug>.md` 的情况下凭经验手写简易过渡或用通用函数（如 `swapText`）替代专属组件机制（如 `copy-button` 的逐字形变与图标描边）；用户未要求改造的组件保持原样不动。**
   - **改造前宿敌样式清理（Pre-flight Cleanup，必做 4 项）**：
     1. **清除 `transition: all`**：将目标元素及子项上的 `transition: all` 替换为精确属性列表（如 `transform, opacity, background-color`），防止与 JS `requestAnimationFrame` 弹簧或 WAAPI FLIP 产生双重插值抖动。
     2. **剥离子项静态激活/悬停底色（共享滑块结构升级）**：若静态组件把选中/悬停底色或阴影直接写在子项自身（如 `.tab-btn[data-state="active"]`、`.dropdown-menu-item[data-highlighted]`），必须先清除子项自身的静态背景与阴影（改为 `transparent` / `none`），再在父容器注入规范要求的独立运动层（如 `.gliding-pill`、`.dropdown-menu-highlight`、`.tag-input-ring`），避免静态底色遮挡或抵消位移滑动。
     3. **排查父容器 `overflow: hidden` 误裁切**：移除按钮、卡片、滑块外层非必要的 `overflow: hidden`（或改用局部裁剪层），防止按压回弹过冲（`scale > 1`）、悬停抬升阴影或浮动气泡（`.slider-bubble`）被切平。
     4. **清理锁死尺寸的静态 `height` / `!important`**：移除手风琴、展开卡片、多标签输入框等容器上锁死尺寸的行内高度或 `!important`，释放动态高度过渡。
   - **严防 `display: none` 吞噬入场与退场过渡**：浮层/弹窗/提示框从隐藏到显示时，严禁在同一渲染帧内同时去掉 `display: none` 并仅靠 CSS `transition` 驱动入场（浏览器会因缺少起始帧直接瞬切）。必须配合 `@starting-style`、`@keyframes` 或双 `requestAnimationFrame` 触发入场；关闭时必须先切换至退场状态（如 `data-state="closed"` / `closing`），等待退场动画完成后再设回 `display: none` 或从 DOM 移除。
   - **声明式框架（React / Vue）退场保活与零重渲染测量契约**：
     1. **严禁直接条件卸载含退场动画的浮层**：将 `{open && <Modal />}` 或 `v-if="open"` 改造为以下二选一：
        - **范式 A（原生顶层 / CSS 离散过渡）**：保持节点挂载或使用 `<dialog>` / `[popover]`，配合 `transition-behavior: allow-discrete` + `@starting-style`。
        - **范式 B（挂载态 `mounted` 与动画态 `data-state` 分离）**：维护派生状态 `mounted`。`open` 变 `true` 时立即 `setMounted(true)` 并渲染 `data-state="open"`；`open` 变 `false` 时保持 `mounted=true` 并切为 `data-state="closed"`（或 `"closing"`），在根节点 `onAnimationEnd` / `onTransitionEnd`（校验 `e.target === e.currentTarget`）回调中再执行 `setMounted(false)` 卸载 DOM。
     2. **共享滑块零重渲染测量**：在 `useLayoutEffect` / `onMounted` + `ResizeObserver` 中直接读取激活子项的 `offsetLeft` / `offsetWidth` 并写入 `pillRef.current.style.transform`，禁止用 `useState` 存坐标触发多余重渲染。
6. **验收**：默认对照组件 md 的验收清单进行代码与样式静态自检（逐项核查是否已彻底清除 `transition: all`、`display: none` 瞬切吞过渡、子项静态激活底色覆盖及父容器 `overflow: hidden` 误裁切），自检通过后直接交付给用户亲自体验；**除非用户明确要求执行自动化浏览器验证，否则不要主动启动无头浏览器或编写验证脚本**。
7. **交付说明**：使用的组件 md、改动文件、已自检项。

## 类别表

> **端型标注说明**：未带标注的 `slug` 为 **Web / 移动端双端通用**；标注 `[Web]` 为 **Web 桌面端专属/优先**（依赖鼠标悬停、光标坐标、宽视口或物理键盘）；标注 `[Mobile]` 为 **移动端 / 触控 H5 专属/优先**（基于手指滑动、长按蓄力、底部抽屉或滚筒惯性）。

| 类别 | 包含组件 (`slug` 与端型标注) | 适用 | 慢通道入口 |
| --- | --- | --- | --- |
| buttons | `action-button`, `button`, `button-group`, `confirm-morph` `[Web]`, `copy-button`, `expanding-button-group`, `floating-button-group` `[Web]`, `icon-morph`, `split-button`, `theme-switch` | 按钮及其直接关联的交互：基础物理按压、异步反馈、复制、分割菜单、按钮组、浮动工具栏、展开组、图标切换、原地确认、主题切换 | [buttons/INDEX.md](buttons/INDEX.md) |
| gestures | `hold-to-confirm` `[Mobile]`, `swipe-actions` `[Mobile]` | 以触控手势为主的交互：长按蓄力确认、列表左右滑动操作与双轴手势锁（Web 桌面端优先分流至 `buttons/confirm-morph` 或 `menus/dropdown-menu`） | [gestures/INDEX.md](gestures/INDEX.md) |
| menus | `context-menu` `[Web]`, `dropdown-menu`, `user-menu` | 菜单及其扩展交互：右键上下文菜单、下拉动作菜单、用户账户卡片面板 | [menus/INDEX.md](menus/INDEX.md) |
| text-fields | `expanding-search`, `inline-edit`, `input`, `password-field`, `password-strength`, `search-field`, `textarea` | 文本输入与编辑交互：单行/多行输入框、密码明暗切换、密码强度检验、带清除搜索框、可伸展搜索条、原地行内编辑 | [text-fields/INDEX.md](text-fields/INDEX.md) |
| special-inputs | `mention-input`, `money-input`, `number-field`, `phone-input`, `shortcut-recorder` `[Web]`, `tag-input` | 专项格式与结构化输入：数字步进滚轮、货币金额、国际区号号码、多标签胶囊、@提及浮层、快捷键录制 | [special-inputs/INDEX.md](special-inputs/INDEX.md) |
| selects | `chip-group`, `combobox`, `morph-select`, `multi-select`, `select` | 选择与过滤交互：紧凑单选下拉、可搜索组合框、容器形变选择器、多选标签收集器、流式过滤标签组 | [selects/INDEX.md](selects/INDEX.md) |
| toggles | `billing-toggle`, `checkbox`, `radio-cards`, `radio-group`, `segmented-control`, `switch` | 开关与选项切换：二值机械拉伸开关、真实笔触复选框、分段控制胶囊、单选列表、对比单选卡片、计费周期切换 | [toggles/INDEX.md](toggles/INDEX.md) |
| sliders | `elastic-slider`, `slider` | 连续数值与范围调节：平滑拖拽滑块、触觉橡皮筋弹性拉伸滑块 | [sliders/INDEX.md](sliders/INDEX.md) |
| pickers | `calendar`, `color-picker`, `date-picker` `[Web]`, `date-range-picker` `[Web]`, `time-picker` `[Web]` | 数据采集与选择器：拾色器、日历面板、日期选择器、双月日期范围选择器、时间选择器（移动端滚筒选时间分流至 `special-data/date-reel`） | [pickers/INDEX.md](pickers/INDEX.md) |
| editors | `code-block`, `file-dropzone` `[Web]`, `rich-text-editor`, `signature-pad` | 富文本与内容编辑：语法高亮代码块、文件拖拽投递区、富文本格式化编辑器、矢量签名手写板 | [editors/INDEX.md](editors/INDEX.md) |
| navigation | `breadcrumb` `[Web]`, `pagination`, `tabs` | 页面与层级导航：面包屑折叠路径、弹性分页控制器、滑动高光标签页 | [navigation/INDEX.md](navigation/INDEX.md) |
| expand | `accordion`, `expandable-card`, `resizable-panels` `[Web]`, `scroll-area` | 内容折叠与伸展：手风琴风琴折、卡片原位展开、可拖拽分割面板、自适应滚动容器 | [expand/INDEX.md](expand/INDEX.md) |
| overlays | `bottom-sheet` `[Mobile]`, `dialog` `[Web]`, `drawer`, `hover-card` `[Web]`, `popover`, `share-access`, `tooltip` `[Web]` | 浮层与模态视窗：移动端底部抽屉、桌面居中弹窗、侧边抽屉、悬停预览卡片、气泡弹层、分享权限卡片、光标智能提示 | [overlays/INDEX.md](overlays/INDEX.md) |
| messages | `alert`, `announcement-bar`, `toast`, `toast-stack` | 通知与反馈流转：状态警示条、公告栏滚动、轻量 Toast 提示、多通知堆叠管理 | [messages/INDEX.md](messages/INDEX.md) |
| progress | `countdown`, `progress`, `skeleton`, `stepper`, `usage-meter` | 进度与加载度量：环形倒计时、线性/环形进度条、骨架屏微光、分步步骤条、用量仪表盘 | [progress/INDEX.md](progress/INDEX.md) |
| avatars | `avatar`, `avatar-group`, `badge` | 头像与标识呈现：交互头像、层叠头像组、状态指示徽标 | [avatars/INDEX.md](avatars/INDEX.md) |
| cards | `card`, `card-stack` `[Mobile]`, `metric-card` | 卡片容器与展示：手势滑卡堆叠、多态信息卡片、动态指标度量卡片 | [cards/INDEX.md](cards/INDEX.md) |
| charts | `animated-counter`, `bar-chart`, `donut-chart`, `funnel-chart`, `gauge`, `line-chart`, `radar-chart`, `realtime-stream`, `ridgeline`, `slope-chart`, `sparkline`, `split-bar`, `timeline`, `waffle-chart` | 基础图表与数据可视化：滚动计数器、柱状图、环形图、漏斗图、仪表盘、折线图、雷达图、实时数据流、脊线图、斜率图、迷你走势图、分割柱图、时间轴、华夫饼图 | [charts/INDEX.md](charts/INDEX.md) |
| advanced-charts | `brush-chart` `[Web]`, `data-grid` `[Web]`, `race-bar-chart`, `sankey-flow`, `streamgraph`, `sunburst`, `treemap` | 高级可视化与流式拓扑：刷选缩放图、交互数据网格、竞速条形图、桑基能量流、河流图、旭日图、矩形树图 | [advanced-charts/INDEX.md](advanced-charts/INDEX.md) |
| tables | `chat-thread`, `comment-thread`, `json-viewer`, `sortable-data-table` `[Web]`, `tree-view` | 表格与树状数据结构：即时聊天对话流、嵌套评论回复树、JSON 探针查看器、列排序列宽数据表、层级文件目录树 | [tables/INDEX.md](tables/INDEX.md) |
| activity | `activity-heatmap`, `empty-state`, `filter-toolbar` | 活跃度与筛选操作：年度活跃热力图、空状态引导插画、多维筛选过滤工具栏 | [activity/INDEX.md](activity/INDEX.md) |
| media | `carousel`, `file-dropzone` `[Web]`, `image-compare` | 多媒体播放与展示：手势轮播画廊、媒体文件拖拽上传区、双图卷帘对比 | [media/INDEX.md](media/INDEX.md) |
| text-effects | `in-view-title`, `text-morph`, `text-reveal`, `text-shimmer` | 文本微动效与排版艺术：视口滚动触发标题、字符平滑形变、逐字翻转揭示、流光文字扫光 | [text-effects/INDEX.md](text-effects/INDEX.md) |
| docks-and-tabs | `action-morph`, `dock` `[Web]`, `liquid-tab-bar` `[Mobile]`, `morph-nav` `[Web]`, `orbit-menu` `[Mobile]`, `share-sheet` | 停靠栏与高级导航：动作原位形变、Mac 风格浮动 Dock 栏、移动端流体水滴 Tab 栏、桌面顶栏 Mega Menu 变形导航、单手圆弧环绕菜单、响应式双态分享面板 | [docks-and-tabs/INDEX.md](docks-and-tabs/INDEX.md) |
| glass | `glass-card`, `glass-menu`, `glass-tabbar` `[Mobile]` | 毛玻璃拟态质感组件：光泽磨砂卡片、浮动毛玻璃上下文菜单、移动端毛玻璃底部标签栏 | [glass/INDEX.md](glass/INDEX.md) |
| surfaces | `control-center` `[Mobile]`, `holo-card`, `link-unfurl`, `sheet-stack` `[Mobile]`, `wallet-stack` `[Mobile]` | 高阶复合交互表面：控制中心磁贴面板、3D 全息翻转卡片、链接预览展开胶囊、多层抽屉堆叠、纵向折叠卡包 | [surfaces/INDEX.md](surfaces/INDEX.md) |
| galleries | `cover-flow`, `lightbox-gallery`, `photo-grid`, `product-gallery` | 相册与展示画廊：3D 封面流转、灯箱全屏画廊、瀑布流照片网格、电商商品多图联动画廊 | [galleries/INDEX.md](galleries/INDEX.md) |
| audio-and-video | `now-playing`, `voice-orb`, `voice-recorder` | 音视频与语音交互：正在播放动态胶囊、AI 语音脉冲光球、语音录制声波条 | [audio-and-video/INDEX.md](audio-and-video/INDEX.md) |
| special-data | `activity-rings`, `booking-pill`, `date-reel` `[Mobile]`, `time-dial` | 特殊领域数据交互：三环活动健身圆环、预订状态时段胶囊、移动端 3D 滚筒日期轮盘、时钟刻度表盘 | [special-data/INDEX.md](special-data/INDEX.md) |
| special-type | `keycap-keyboard` `[Web]`, `sand-text` `[Web]`, `slot-text`, `typewriter-terminal` | 特殊字符与机械交互：机械键帽键盘按压、沙漏光标气流文字、老虎机滚轮字符、打字机终端控制台 | [special-type/INDEX.md](special-type/INDEX.md) |
| loaders | `morph-loader`, `skeleton-morph`, `stretch-refresh` `[Mobile]` | 加载器与刷新过渡：几何形态循环形变、骨架屏就地内容展开、移动端橡皮筋手势下拉刷新 | [loaders/INDEX.md](loaders/INDEX.md) |
| playful | `orbit-logos`, `page-curl` | 趣味与沉浸式互动：同心圆轨道漫游展台、仿真折纸书页 | [playful/INDEX.md](playful/INDEX.md) |
| cursor | `dot-grid` `[Web]`, `gravity-well` `[Web]` | 指针跟随与光标微交互（仅限 Web 桌面端）：磁性点阵矩阵追踪、引力井中心吸附 | [cursor/INDEX.md](cursor/INDEX.md) |
| illustrations | `data-flow`, `multi-region-failover`, `payment-flow`, `vector-search` | 技术拓扑与动效插画：流式管道数据流、多区域故障转移重路由、支付流向状态机、高维向量空间检索 | [illustrations/INDEX.md](illustrations/INDEX.md) |

## 未收录交互处理

全部 34 个类别（共 155 个组件规范）已 100% 收录完毕。若目标交互属于未收录的特殊自定义组件，不要将其强行归入不相关的已有类别，可结合 [PRIMITIVES.md](PRIMITIVES.md) 中的共享物理原语与邻近类别机制推导实现。

