# UI Motion Guide · 组件动效指南

让 AI 为你的现有项目组件添加物理弹簧、平滑状态切换与微交互动效，**保留原有样式、配色和业务逻辑**。

现已完整收录 **34 个分类、155 个组件动效规范**，覆盖按钮、手势、表单输入、选择器、导航、浮层弹窗、消息通知、卡片、表格、画廊、图表等全部主流 Web 交互场景，支持 React、Vue、Svelte 及原生 HTML/CSS/JS 项目。

---

## 快速开始

### 1. 获取仓库

在终端运行以下命令（或直接粘贴给你的 AI 编码助手让它自动执行）：

```bash
git clone --depth 1 https://github.com/Shark-Overlord/ui-motion-guide.git
```

### 2. 安装或引用方式（二选一）

#### 方式 A：安装为 AI 编码助手的常驻 Skill（推荐）

将仓库中的 `skills/ui-motion` 目录复制或软链接到你的 AI 工具 Skills 目录中，之后在任何项目里提到“加动效 / 优化过渡”即可自动生效：

```bash
# Claude Code / 通用 Agent Skills 全局目录示例
cp -r ui-motion-guide/skills/ui-motion ~/.claude/skills/ui-motion

# 或放入当前项目的 Skills 目录
cp -r ui-motion-guide/skills/ui-motion <你的项目根目录>/.claude/skills/ui-motion
```

#### 方式 B：存放在任意目录，对话时直接指定入口

无需安装器，克隆到任意位置后，在对话时让 AI 读取入口文件 `AGENTS.md` 或 `skills/ui-motion/SKILL.md` 即可。

---

## 怎么对 AI 提需求（常用提示词模板）

### 场景 1：指定具体组件添加动效

当你明确知道要改哪个文件或哪个按钮/弹窗时，直接告诉 AI：

```text
先读取 <目标目录>/ui-motion-guide/AGENTS.md，
给我的项目 src/components/SaveButton.tsx 中的保存按钮添加异步加载与完成过渡，保留现有样式和业务逻辑。
```

### 场景 2：不确定改哪里，让 AI 先扫描页面并给出建议

当你只想让页面交互更有质感，但不确定具体改哪些组件时：

```text
先读取 <目标目录>/ui-motion-guide/AGENTS.md，
扫描我当前页面的组件，列出可以添加过渡动效的地方和具体建议，等我选择后再开始修改。
```

### 场景 3：直接发截图或口语化描述问题

你**不需要**记住任何专业组件名称，直接发截图或用大白话描述痛点即可：

- *“这个弹窗关掉的时候直接闪没了，帮我加上平滑的打开和关闭过渡。”*
- *“顶部这排 Tab 切换太生硬了，改成带滑动背景块的平滑切换。”*
- *“删除按钮点一下就直接删了太危险，改成原地展开确认和倒计时撤销。”*
- *“列表置顶和删除的时候其他行会生硬跳一下，帮我加上平滑补位动画。”*
- *“价格切换的时候数字直接跳变，改成滚轮数字过渡。”*

---

## 它会如何改造你的代码？

1. **只改过渡，不破原貌**：只将物理曲线、状态机与测量逻辑移植到你现有的组件中，自动适配你项目所用的框架（React Hooks、Vue Composition API 或原生 JS），不改动你原本的配色、布局、文案与接口逻辑。
2. **自动修复常见动效 Bug**：
   - 自动清除导致卡顿与抖动的 `transition: all`；
   - 自动修复 React / Vue 条件渲染（如 `{open && <Modal />}`）直接卸载 DOM 导致退场动画丢失的问题；
   - 自动排查父级 `overflow: hidden` 裁切按压回弹与浮动阴影的问题。
3. **按需读取，不撑爆上下文**：采用三层路由结构（`SKILL.md` → `<类别>/INDEX.md` → `<组件>.md`），AI 每次只精准读取用到的 1~2 个组件规范，不预读无关文件。

---

## 已收录组件目录（34 类别 / 155 组件）

| 序号 | 类别 | 组件数 | 支持的交互效果 | 规范入口 |
| :--- | :--- | :---: | :--- | :--- |
| 01 | **Buttons · 按钮** | 10 | 基础物理按压、三态异步反馈、复制反馈、分割菜单、按钮组、浮动工具栏、展开组、图标切换、原地防误删确认、主题切换 | [buttons/INDEX.md](skills/ui-motion/buttons/INDEX.md) |
| 02 | **Gestures · 手势** | 2 | 长按蓄力确认、左右滑动露底操作与双轴手势锁 | [gestures/INDEX.md](skills/ui-motion/gestures/INDEX.md) |
| 03 | **Menus · 菜单** | 3 | 右键上下文菜单、下拉动作菜单、用户账户弹出卡片 | [menus/INDEX.md](skills/ui-motion/menus/INDEX.md) |
| 04 | **Text fields · 文本输入** | 7 | 单行/多行输入框焦点环、密码明暗切换、密码强度计量、带清除搜索框、点击展开搜索条、原地行内编辑 | [text-fields/INDEX.md](skills/ui-motion/text-fields/INDEX.md) |
| 05 | **Special inputs · 专用输入** | 6 | 数字步进滚轮、货币金额输入、国际区号号码、多标签胶囊输入、@提及浮层、快捷键录制 | [special-inputs/INDEX.md](skills/ui-motion/special-inputs/INDEX.md) |
| 06 | **Selects · 选择控件** | 5 | 紧凑单选下拉、可搜索组合框、触发器原地形变选择器、多选标签收集器、流式过滤胶囊组 | [selects/INDEX.md](skills/ui-motion/selects/INDEX.md) |
| 07 | **Toggles · 开关与单选** | 6 | 二值弹性开关、真实笔触复选框、滑动胶囊分段控制、单选列表、对比单选卡片、年付/月付计费切换 | [toggles/INDEX.md](skills/ui-motion/toggles/INDEX.md) |
| 08 | **Sliders · 滑块** | 2 | 连续数值平滑调节滑块、越界橡皮筋弹性拉伸滑块 | [sliders/INDEX.md](skills/ui-motion/sliders/INDEX.md) |
| 09 | **Pickers · 选择器** | 5 | 拾色器、日历面板、日期选择器、日期范围选择器、时间滚轮选择器 | [pickers/INDEX.md](skills/ui-motion/pickers/INDEX.md) |
| 10 | **Editors · 编辑器** | 4 | 语法高亮代码块、文件拖拽投递区、富文本格式化工具栏、矢量签名手写板 | [editors/INDEX.md](skills/ui-motion/editors/INDEX.md) |
| 11 | **Navigation · 导航** | 3 | 面包屑折叠路径、弹性分页器、滑动高光标签页（Tabs） | [navigation/INDEX.md](skills/ui-motion/navigation/INDEX.md) |
| 12 | **Expand · 展开与折叠** | 4 | 手风琴折叠面板、卡片原位展开、可拖拽分割面板、自适应阴影滚动区 | [expand/INDEX.md](skills/ui-motion/expand/INDEX.md) |
| 13 | **Overlays · 浮层弹窗** | 7 | 底部抽屉、模态对话框（Dialog）、侧边抽屉（Drawer）、悬浮预览卡、气泡弹层（Popover）、分享权限面板、跟随动量提示（Tooltip） | [overlays/INDEX.md](skills/ui-motion/overlays/INDEX.md) |
| 14 | **Messages · 消息通知** | 4 | 状态警示条、顶部滚动公告栏、单条 Toast 提示、多层折叠 Toast 堆叠 | [messages/INDEX.md](skills/ui-motion/messages/INDEX.md) |
| 15 | **Progress · 进度与加载** | 5 | 环形倒计时、平滑进度条、骨架屏扫光、分步向导条（Stepper）、配额用量仪表 | [progress/INDEX.md](skills/ui-motion/progress/INDEX.md) |
| 16 | **Avatars · 头像与徽标** | 3 | 交互头像、悬停展开层叠头像组、状态脉冲徽标 | [avatars/INDEX.md](skills/ui-motion/avatars/INDEX.md) |
| 17 | **Cards · 卡片** | 3 | 多层卡片堆叠切换、多态信息卡片、动态指标度量卡片 | [cards/INDEX.md](skills/ui-motion/cards/INDEX.md) |
| 18 | **Charts · 基础图表** | 14 | 滚轮计数器（Odometer）、柱状图、环形图、漏斗图、仪表盘、折线图、雷达图、实时数据流、脊线图、斜率图、迷你走势图、分割柱图、时间轴、华夫饼图 | [charts/INDEX.md](skills/ui-motion/charts/INDEX.md) |
| 19 | **Advanced charts · 高级图表** | 7 | 刷选缩放图、交互数据网格、竞速条形图、桑基能量流、河流图、旭日图、矩形树图 | [advanced-charts/INDEX.md](skills/ui-motion/advanced-charts/INDEX.md) |
| 20 | **Tables · 表格与树** | 5 | 即时聊天对话流、嵌套评论回复树、JSON 折叠查看器、列排序数据表、层级文件目录树 | [tables/INDEX.md](skills/ui-motion/tables/INDEX.md) |
| 21 | **Activity · 动态与筛选** | 3 | 年度活跃热力图、空状态引导插画、多维筛选过滤工具栏 | [activity/INDEX.md](skills/ui-motion/activity/INDEX.md) |
| 22 | **Media · 媒体展示** | 3 | 手势轮播画廊、媒体拖拽上传区、双图卷帘滑动对比 | [media/INDEX.md](skills/ui-motion/media/INDEX.md) |
| 23 | **Text effects · 文字动效** | 4 | 视口滚动触发标题、字符平滑形变、逐字翻转揭示、流光文字扫光 | [text-effects/INDEX.md](skills/ui-motion/text-effects/INDEX.md) |
| 24 | **Docks & tabs · 停靠与高级导航** | 6 | 动作按钮原位形变、Mac 风格放大 Dock 栏、流体水滴 Tab 栏、形态变换导航条、同心圆环绕菜单、分享面板 | [docks-and-tabs/INDEX.md](skills/ui-motion/docks-and-tabs/INDEX.md) |
| 25 | **Glass · 毛玻璃质感** | 3 | 光泽磨砂卡片、浮动毛玻璃右键菜单、毛玻璃底部标签栏 | [glass/INDEX.md](skills/ui-motion/glass/INDEX.md) |
| 26 | **Surfaces · 复合表面** | 5 | 控制中心磁贴面板、3D 全息倾斜卡片、行内胶囊展开卡片、多层抽屉堆叠、纵向折叠卡包 | [surfaces/INDEX.md](skills/ui-motion/surfaces/INDEX.md) |
| 27 | **Galleries · 相册画廊** | 4 | 3D 封面流转、全屏灯箱画廊、瀑布流照片网格、电商多图联动画廊 | [galleries/INDEX.md](skills/ui-motion/galleries/INDEX.md) |
| 28 | **Audio & video · 音视频交互** | 3 | 正在播放动态胶囊、AI 语音脉冲光球、语音录制实时声波条 | [audio-and-video/INDEX.md](skills/ui-motion/audio-and-video/INDEX.md) |
| 29 | **Special data · 特殊数据** | 4 | 三环健身活动圆环、预订时段选择胶囊、滚筒日期轮盘、时钟刻度表盘 | [special-data/INDEX.md](skills/ui-motion/special-data/INDEX.md) |
| 30 | **Special type · 机械字符** | 4 | 机械键帽按压键盘、沙漏粒子重力文字、老虎机滚轮字符、打字机终端控制台 | [special-type/INDEX.md](skills/ui-motion/special-type/INDEX.md) |
| 31 | **Loaders · 加载与刷新** | 3 | 几何形态循环加载器、骨架屏原位展开内容、橡皮筋下拉刷新 | [loaders/INDEX.md](skills/ui-motion/loaders/INDEX.md) |
| 32 | **Playful · 趣味互动** | 2 | 同心圆轨道漫游 Logo 展台、仿真折纸翻页 | [playful/INDEX.md](skills/ui-motion/playful/INDEX.md) |
| 33 | **Cursor · 光标追踪** | 2 | 磁性点阵矩阵追踪、引力井中心吸附 | [cursor/INDEX.md](skills/ui-motion/cursor/INDEX.md) |
| 34 | **Illustrations · 拓扑插画** | 4 | 流式管道数据流、多区域故障转移重路由、支付流向状态机、高维向量空间检索 | [illustrations/INDEX.md](skills/ui-motion/illustrations/INDEX.md) |
