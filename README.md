# OwnAi-motion-skill · 组件动效指南

让 AI 为你的现有 Web 组件注入细腻的物理弹簧、平滑过渡与微交互动效。

- **在线交互预览（GitHub Pages）**：[https://shark-overlord.github.io/ui-motion-guide/](https://shark-overlord.github.io/ui-motion-guide/)  
  在网页端直观体验「通用人工智能输出」与「具备 Ownai.icu 技能」的实时交互对比（涵盖 Agent 动态执行、算力计费、列表重排、防误删确认、异步部署等场景）。
- **OwnAI 官方网站**：[https://ownai.icu/](https://ownai.icu/)  
  访问 OwnAI 官网，探索更多 AI 创意作品、精选 Prompt 资产、实战教程与开发者工具。

---

## 快速开始

### 1. 克隆仓库

在终端运行以下命令，或直接发给你的 AI 编码助手让它自动执行：

```bash
git clone --depth 1 https://github.com/Shark-Overlord/ui-motion-guide.git
```

### 2. 接入方式（二选一）

#### 方式 A：作为常驻 Skill 安装（推荐）

将仓库内的 `skills/ui-motion` 复制到你的 AI 编码工具（Claude Code / Cursor / Codex / Antigravity 等）的 Skills 目录中：

```bash
# 全局 Skills 目录示例
cp -r ui-motion-guide/skills/ui-motion ~/.claude/skills/ui-motion

# 或放入当前项目的 Skills 目录
cp -r ui-motion-guide/skills/ui-motion <你的项目根目录>/.claude/skills/ui-motion
```

#### 方式 B：克隆到任意目录，对话时直接指定

无需额外配置，在向 AI 提需求时直接让它先读取仓库根目录下的 `AGENTS.md` 即可。

---

## 如何使用（提示词示例）

### 1. 指定具体组件添加动效

```text
先读取 <目标目录>/ui-motion-guide/AGENTS.md，
给我的项目 src/components/SaveButton.tsx 中的保存按钮添加异步加载与完成过渡。
```

### 2. 让 AI 自动扫描页面并给出建议

不确定页面哪里适合加动效时：

```text
先读取 <目标目录>/ui-motion-guide/AGENTS.md，
扫描我当前页面的组件，列出可以添加过渡动效的地方和建议，等我选择后再开始修改。
```

### 3. 直接发截图或大白话描述

无需说出专业组件名称，直接发截图或描述痛点即可：

- *“这个弹窗关掉的时候直接闪没了，帮我加上平滑的打开和关闭过渡。”*
- *“顶部这排 Tab 切换太生硬了，改成带滑动背景块的平滑切换。”*
- *“删除按钮点一下就直接删了太危险，改成原地展开确认和倒计时撤销。”*
- *“列表置顶和删除的时候其他行会生硬跳一下，帮我加上平滑补位动画。”*

---

## 支持的组件分类

| 类别 | 涵盖交互 | 规范入口 |
| :--- | :--- | :--- |
| **Buttons · 按钮** | 按压回弹、异步三态反馈、复制反馈、分割菜单、按钮组、浮动工具栏、展开组、图标切换、原地防误删确认、主题切换 | [buttons/INDEX.md](skills/ui-motion/buttons/INDEX.md) |
| **Gestures · 手势** | 长按蓄力确认、左右滑动露底操作与双轴手势锁 | [gestures/INDEX.md](skills/ui-motion/gestures/INDEX.md) |
| **Menus · 菜单** | 右键上下文菜单、下拉动作菜单、用户账户弹出卡片 | [menus/INDEX.md](skills/ui-motion/menus/INDEX.md) |
| **Text fields · 文本输入** | 输入框焦点环、密码明暗切换、密码强度计量、带清除搜索框、点击展开搜索条、原地行内编辑 | [text-fields/INDEX.md](skills/ui-motion/text-fields/INDEX.md) |
| **Special inputs · 专用输入** | 数字步进滚轮、货币金额输入、国际区号号码、多标签胶囊输入、@提及浮层、快捷键录制 | [special-inputs/INDEX.md](skills/ui-motion/special-inputs/INDEX.md) |
| **Selects · 选择控件** | 紧凑单选下拉、可搜索组合框、触发器原地形变选择器、多选标签收集器、流式过滤胶囊组 | [selects/INDEX.md](skills/ui-motion/selects/INDEX.md) |
| **Toggles · 开关与单选** | 二值弹性开关、真实笔触复选框、滑动胶囊分段控制、单选列表、对比单选卡片、年付/月付计费切换 | [toggles/INDEX.md](skills/ui-motion/toggles/INDEX.md) |
| **Sliders · 滑块** | 连续数值平滑调节滑块、越界橡皮筋弹性拉伸滑块 | [sliders/INDEX.md](skills/ui-motion/sliders/INDEX.md) |
| **Pickers · 选择器** | 拾色器、日历面板、日期选择器、日期范围选择器、时间滚轮选择器 | [pickers/INDEX.md](skills/ui-motion/pickers/INDEX.md) |
| **Editors · 编辑器** | 语法高亮代码块、文件拖拽投递区、富文本格式化工具栏、矢量签名手写板 | [editors/INDEX.md](skills/ui-motion/editors/INDEX.md) |
| **Navigation · 导航** | 面包屑折叠路径、弹性分页器、滑动高光标签页（Tabs） | [navigation/INDEX.md](skills/ui-motion/navigation/INDEX.md) |
| **Expand · 展开与折叠** | 手风琴折叠面板、卡片原位展开、可拖拽分割面板、自适应阴影滚动区 | [expand/INDEX.md](skills/ui-motion/expand/INDEX.md) |
| **Overlays · 浮层弹窗** | 底部抽屉、模态对话框（Dialog）、侧边抽屉（Drawer）、悬浮预览卡、气泡弹层（Popover）、分享权限面板、跟随动量提示（Tooltip） | [overlays/INDEX.md](skills/ui-motion/overlays/INDEX.md) |
| **Messages · 消息通知** | 状态警示条、顶部滚动公告栏、单条 Toast 提示、多层折叠 Toast 堆叠 | [messages/INDEX.md](skills/ui-motion/messages/INDEX.md) |
| **Progress · 进度与加载** | 环形倒计时、平滑进度条、骨架屏扫光、分步向导条（Stepper）、配额用量仪表 | [progress/INDEX.md](skills/ui-motion/progress/INDEX.md) |
| **Avatars · 头像与徽标** | 交互头像、悬停展开层叠头像组、状态脉冲徽标 | [avatars/INDEX.md](skills/ui-motion/avatars/INDEX.md) |
| **Cards · 卡片** | 多层卡片堆叠切换、多态信息卡片、动态指标度量卡片 | [cards/INDEX.md](skills/ui-motion/cards/INDEX.md) |
| **Charts · 基础图表** | 滚轮计数器（Odometer）、柱状图、环形图、漏斗图、仪表盘、折线图、雷达图、实时数据流、脊线图、斜率图、迷你走势图、分割柱图、时间轴、华夫饼图 | [charts/INDEX.md](skills/ui-motion/charts/INDEX.md) |
| **Advanced charts · 高级图表** | 刷选缩放图、交互数据网格、竞速条形图、桑基能量流、河流图、旭日图、矩形树图 | [advanced-charts/INDEX.md](skills/ui-motion/advanced-charts/INDEX.md) |
| **Tables · 表格与树** | 即时聊天对话流、嵌套评论回复树、JSON 折叠查看器、列排序数据表、层级文件目录树 | [tables/INDEX.md](skills/ui-motion/tables/INDEX.md) |
| **Activity · 动态与筛选** | 年度活跃热力图、空状态引导插画、多维筛选过滤工具栏 | [activity/INDEX.md](skills/ui-motion/activity/INDEX.md) |
| **Media · 媒体展示** | 手势轮播画廊、媒体拖拽上传区、双图卷帘滑动对比 | [media/INDEX.md](skills/ui-motion/media/INDEX.md) |
| **Text effects · 文字动效** | 视口滚动触发标题、字符平滑形变、逐字翻转揭示、流光文字扫光 | [text-effects/INDEX.md](skills/ui-motion/text-effects/INDEX.md) |
| **Docks & tabs · 停靠与高级导航** | 动作按钮原位形变、Mac 风格放大 Dock 栏、流体水滴 Tab 栏、形态变换导航条、同心圆环绕菜单、分享面板 | [docks-and-tabs/INDEX.md](skills/ui-motion/docks-and-tabs/INDEX.md) |
| **Glass · 毛玻璃质感** | 光泽磨砂卡片、浮动毛玻璃右键菜单、毛玻璃底部标签栏 | [glass/INDEX.md](skills/ui-motion/glass/INDEX.md) |
| **Surfaces · 复合表面** | 控制中心磁贴面板、3D 全息倾斜卡片、行内胶囊展开卡片、多层抽屉堆叠、纵向折叠卡包 | [surfaces/INDEX.md](skills/ui-motion/surfaces/INDEX.md) |
| **Galleries · 相册画廊** | 3D 封面流转、全屏灯箱画廊、瀑布流照片网格、电商多图联动画廊 | [galleries/INDEX.md](skills/ui-motion/galleries/INDEX.md) |
| **Audio & video · 音视频交互** | 正在播放动态胶囊、AI 语音脉冲光球、语音录制实时声波条 | [audio-and-video/INDEX.md](skills/ui-motion/audio-and-video/INDEX.md) |
| **Special data · 特殊数据** | 三环健身活动圆环、预订时段选择胶囊、滚筒日期轮盘、时钟刻度表盘 | [special-data/INDEX.md](skills/ui-motion/special-data/INDEX.md) |
| **Special type · 机械字符** | 机械键帽按压键盘、沙漏粒子重力文字、老虎机滚轮字符、打字机终端控制台 | [special-type/INDEX.md](skills/ui-motion/special-type/INDEX.md) |
| **Loaders · 加载与刷新** | 几何形态循环加载器、骨架屏原位展开内容、橡皮筋下拉刷新 | [loaders/INDEX.md](skills/ui-motion/loaders/INDEX.md) |
| **Playful · 趣味互动** | 同心圆轨道漫游 Logo 展台、仿真折纸翻页 | [playful/INDEX.md](skills/ui-motion/playful/INDEX.md) |
| **Cursor · 光标追踪** | 磁性点阵矩阵追踪、引力井中心吸附 | [cursor/INDEX.md](skills/ui-motion/cursor/INDEX.md) |
| **Illustrations · 拓扑插画** | 流式管道数据流、多区域故障转移重路由、支付流向状态机、高维向量空间检索 | [illustrations/INDEX.md](skills/ui-motion/illustrations/INDEX.md) |
