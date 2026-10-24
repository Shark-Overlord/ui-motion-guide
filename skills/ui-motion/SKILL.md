---
name: ui-motion
description: 为现有 Web 组件或页面添加过渡动效、物理弹簧、微交互与状态切换动画（或修复现有组件切换生硬、闪烁、无退场过渡问题）。覆盖按钮、手势、导航、表单输入、选择器、浮层弹窗、通知、卡片、表格、画廊、图表等全部 UI 组件。
---

# UI Motion

按“确定目标 → 视觉/代码客观解码 → 快慢通道路由 → 宿敌清理与实现 → 静态自检与按需验收”执行。每步只读必要文件，禁止预读整个目录。

## 工作流

1. **确定修改对象**
   - 用户给出了组件文件、组件名、选择器或明确的页面区域 → 直接进入第 2 步，已有明确授权不再重复确认。
   - 用户只说“给页面加动效”或只给了页面/项目路径 → 只读扫描当前界面，简短列出可添加动效的组件及建议，等待用户选择。未得到选择前不修改任何文件。
2. **读取目标代码与视觉客观解码**：当用户只提供截图或口语化功能描述而未说出专业组件名时，**不依赖用户口语名词**，直接从**截图 UI 形态 + 目标代码 DOM/状态**提取客观特征：
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

| 类别 | 包含组件 (`slug`) | 适用 | 慢通道入口 |
| --- | --- | --- | --- |
| buttons | `action-button`, `button`, `button-group`, `confirm-morph`, `copy-button`, `expanding-button-group`, `floating-button-group`, `icon-morph`, `split-button`, `theme-switch` | 按钮及其直接关联的交互：基础物理按压、异步反馈、复制、分割菜单、按钮组、浮动工具栏、展开组、图标切换、原地确认、主题切换 | [buttons/INDEX.md](buttons/INDEX.md) |
| gestures | `hold-to-confirm`, `swipe-actions` | 以手势为主的交互：长按蓄力确认、滑动操作与双轴手势锁 | [gestures/INDEX.md](gestures/INDEX.md) |
| menus | `context-menu`, `dropdown-menu`, `user-menu` | 菜单及其扩展交互：右键上下文菜单、下拉动作菜单、用户账户卡片面板 | [menus/INDEX.md](menus/INDEX.md) |
| text-fields | `expanding-search`, `inline-edit`, `input`, `password-field`, `password-strength`, `search-field`, `textarea` | 文本输入与编辑交互：单行/多行输入框、密码明暗切换、密码强度检验、带清除搜索框、可伸展搜索条、原地行内编辑 | [text-fields/INDEX.md](text-fields/INDEX.md) |
| special-inputs | `mention-input`, `money-input`, `number-field`, `phone-input`, `shortcut-recorder`, `tag-input` | 专项格式与结构化输入：数字步进滚轮、货币金额、国际区号号码、多标签胶囊、@提及浮层、快捷键录制 | [special-inputs/INDEX.md](special-inputs/INDEX.md) |
| selects | `chip-group`, `combobox`, `morph-select`, `multi-select`, `select` | 选择与过滤交互：紧凑单选下拉、可搜索组合框、容器形变选择器、多选标签收集器、流式过滤标签组 | [selects/INDEX.md](selects/INDEX.md) |
| toggles | `billing-toggle`, `checkbox`, `radio-cards`, `radio-group`, `segmented-control`, `switch` | 开关与选项切换：二值机械拉伸开关、真实笔触复选框、分段控制胶囊、单选列表、对比单选卡片、计费周期切换 | [toggles/INDEX.md](toggles/INDEX.md) |
| sliders | `elastic-slider`, `slider` | 连续数值与范围调节：平滑拖拽滑块、触觉橡皮筋弹性拉伸滑块 | [sliders/INDEX.md](sliders/INDEX.md) |
| pickers | `calendar`, `color-picker`, `date-picker`, `date-range-picker`, `time-picker` | 数据采集与选择器：拾色器、日历面板、日期选择器、日期范围选择器、时间选择器 | [pickers/INDEX.md](pickers/INDEX.md) |
| editors | `code-block`, `file-dropzone`, `rich-text-editor`, `signature-pad` | 富文本与内容编辑：语法高亮代码块、文件拖拽投递区、富文本格式化编辑器、矢量签名手写板 | [editors/INDEX.md](editors/INDEX.md) |
| navigation | `breadcrumb`, `pagination`, `tabs` | 页面与层级导航：面包屑折叠路径、弹性分页控制器、滑动高光标签页 | [navigation/INDEX.md](navigation/INDEX.md) |
| expand | `accordion`, `expandable-card`, `resizable-panels`, `scroll-area` | 内容折叠与伸展：手风琴风琴折、卡片原位展开、可拖拽分割面板、自适应滚动容器 | [expand/INDEX.md](expand/INDEX.md) |
| overlays | `bottom-sheet`, `dialog`, `drawer`, `hover-card`, `popover`, `share-access`, `tooltip` | 浮层与模态视窗：底部抽屉、对话弹窗、侧边抽屉、悬浮预览卡片、气泡弹层、分享权限卡片、智能提示 | [overlays/INDEX.md](overlays/INDEX.md) |
| messages | `alert`, `announcement-bar`, `toast`, `toast-stack` | 通知与反馈流转：状态警示条、公告栏滚动、轻量 Toast 提示、多通知堆叠管理 | [messages/INDEX.md](messages/INDEX.md) |
| progress | `countdown`, `progress`, `skeleton`, `stepper`, `usage-meter` | 进度与加载度量：环形倒计时、线性/环形进度条、骨架屏微光、分步步骤条、用量仪表盘 | [progress/INDEX.md](progress/INDEX.md) |
| avatars | `avatar`, `avatar-group`, `badge` | 头像与标识呈现：交互头像、层叠头像组、状态指示徽标 | [avatars/INDEX.md](avatars/INDEX.md) |
| cards | `card`, `card-stack`, `metric-card` | 卡片容器与展示：多层卡片堆叠、多态信息卡片、动态指标度量卡片 | [cards/INDEX.md](cards/INDEX.md) |
| charts | `animated-counter`, `bar-chart`, `donut-chart`, `funnel-chart`, `gauge`, `line-chart`, `radar-chart`, `realtime-stream`, `ridgeline`, `slope-chart`, `sparkline`, `split-bar`, `timeline`, `waffle-chart` | 基础图表与数据可视化：滚动计数器、柱状图、环形图、漏斗图、仪表盘、折线图、雷达图、实时数据流、脊线图、斜率图、迷你走势图、分割柱图、时间轴、华夫饼图 | [charts/INDEX.md](charts/INDEX.md) |
| advanced-charts | `brush-chart`, `data-grid`, `race-bar-chart`, `sankey-flow`, `streamgraph`, `sunburst`, `treemap` | 高级可视化与流式拓扑：刷选缩放图、交互数据网格、竞速条形图、桑基能量流、河流图、旭日图、矩形树图 | [advanced-charts/INDEX.md](advanced-charts/INDEX.md) |
| tables | `chat-thread`, `comment-thread`, `json-viewer`, `sortable-data-table`, `tree-view` | 表格与树状数据结构：即时聊天对话流、嵌套评论回复树、JSON 探针查看器、列排序列宽数据表、层级文件目录树 | [tables/INDEX.md](tables/INDEX.md) |
| activity | `activity-heatmap`, `empty-state`, `filter-toolbar` | 活跃度与筛选操作：年度活跃热力图、空状态引导插画、多维筛选过滤工具栏 | [activity/INDEX.md](activity/INDEX.md) |
| media | `carousel`, `file-dropzone`, `image-compare` | 多媒体播放与展示：手势轮播画廊、媒体文件拖拽上传区、双图卷帘对比 | [media/INDEX.md](media/INDEX.md) |
| text-effects | `in-view-title`, `text-morph`, `text-reveal`, `text-shimmer` | 文本微动效与排版艺术：视口滚动触发标题、字符平滑形变、逐字翻转揭示、流光文字扫光 | [text-effects/INDEX.md](text-effects/INDEX.md) |
| docks-and-tabs | `action-morph`, `dock`, `liquid-tab-bar`, `morph-nav`, `orbit-menu`, `share-sheet` | 停靠栏与高级导航：动作原位形变、Mac 风格浮动 Dock 栏、流体水滴 Tab 栏、形态变换导航条、同心圆环绕菜单、分享面板 | [docks-and-tabs/INDEX.md](docks-and-tabs/INDEX.md) |
| glass | `glass-card`, `glass-menu`, `glass-tabbar` | 毛玻璃拟态质感组件：光泽磨砂卡片、浮动毛玻璃上下文菜单、毛玻璃底部标签栏 | [glass/INDEX.md](glass/INDEX.md) |
| surfaces | `control-center`, `holo-card`, `link-unfurl`, `sheet-stack`, `wallet-stack` | 高阶复合交互表面：控制中心磁贴面板、3D 全息翻转卡片、链接预览展开胶囊、多层抽屉堆叠、纵向折叠卡包 | [surfaces/INDEX.md](surfaces/INDEX.md) |
| galleries | `cover-flow`, `lightbox-gallery`, `photo-grid`, `product-gallery` | 相册与展示画廊：3D 封面流转、灯箱全屏画廊、瀑布流照片网格、电商商品多图联动画廊 | [galleries/INDEX.md](galleries/INDEX.md) |
| audio-and-video | `now-playing`, `voice-orb`, `voice-recorder` | 音视频与语音交互：正在播放动态胶囊、AI 语音脉冲光球、语音录制声波条 | [audio-and-video/INDEX.md](audio-and-video/INDEX.md) |
| special-data | `activity-rings`, `booking-pill`, `date-reel`, `time-dial` | 特殊领域数据交互：三环活动健身圆环、预订状态时段胶囊、滚筒日期轮盘、时钟刻度表盘 | [special-data/INDEX.md](special-data/INDEX.md) |
| special-type | `keycap-keyboard`, `sand-text`, `slot-text`, `typewriter-terminal` | 特殊字符与机械交互：机械键帽键盘按压、沙漏重力文字、老虎机滚轮字符、打字机终端控制台 | [special-type/INDEX.md](special-type/INDEX.md) |
| loaders | `morph-loader`, `skeleton-morph`, `stretch-refresh` | 加载器与刷新过渡：几何形态循环形变、骨架屏就地内容展开、橡皮筋手势下拉刷新 | [loaders/INDEX.md](loaders/INDEX.md) |
| playful | `orbit-logos`, `page-curl` | 趣味与沉浸式互动：同心圆轨道漫游展台、仿真折纸书页 | [playful/INDEX.md](playful/INDEX.md) |
| cursor | `dot-grid`, `gravity-well` | 指针跟随与光标微交互：磁性点阵矩阵追踪、引力井中心吸附 | [cursor/INDEX.md](cursor/INDEX.md) |
| illustrations | `data-flow`, `multi-region-failover`, `payment-flow`, `vector-search` | 技术拓扑与动效插画：流式管道数据流、多区域故障转移重路由、支付流向状态机、高维向量空间检索 | [illustrations/INDEX.md](illustrations/INDEX.md) |

## 未收录类别

原料库 `inbox/` 中的全部 34 个原型类别（共 155 个组件规范）已 100% 收录完毕。
若目标交互属于未收录的新领域组件，请遵循 `templates/component.md` 规范提取沉淀后再行接入，不要将其强行归入不相关的已有类别。

