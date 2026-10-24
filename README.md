# UI Motion Guide

Web 原生组件动效与微交互规范库。将纯原生（HTML5 + CSS3 + Vanilla JS）的高保真动效机制提取沉淀为自包容的 Markdown 规范文档，供 AI 与开发者直接查阅、移植与接入任意技术栈。全库共收录 34 个分类、155 个高保真动效组件规范。

## 目录结构

```text
ui-motion-guide/
├── index.html                          # 交互式动效对比与展示主页
├── assets/                             # 页面字体、图标与组件索引数据
├── templates/
│   └── component.md                    # 标准化 13 节组件规范模板
├── skills/
│   └── ui-motion/                      # 运行时动效 Skill（核心三层路由，全 34 类别，共 155 个组件）
│       ├── SKILL.md                    # 一级路由：工作流与类别总表
│       ├── buttons/                    # 01 按钮类组件 (10 个)
│       ├── gestures/                   # 02 手势类组件 (2 个)
│       ├── menus/                      # 03 菜单类组件 (3 个)
│       ├── text-fields/                # 04 文本输入类组件 (7 个)
│       ├── special-inputs/             # 05 专用与结构化输入类组件 (6 个)
│       ├── selects/                    # 06 选择与过滤类组件 (5 个)
│       ├── toggles/                    # 07 开关与单选类组件 (6 个)
│       ├── sliders/                    # 08 滑块与数值调节类组件 (2 个)
│       ├── pickers/                    # 09 数据采集与拾取类组件 (5 个)
│       ├── editors/                    # 10 内容编辑类组件 (4 个)
│       ├── navigation/                 # 11 页面导航类组件 (3 个)
│       ├── expand/                     # 12 折叠与伸展类组件 (4 个)
│       ├── overlays/                   # 13 浮层与弹窗类组件 (7 个)
│       ├── messages/                   # 14 消息与通知类组件 (4 个)
│       ├── progress/                   # 15 进度与加载度量类组件 (5 个)
│       ├── avatars/                    # 16 头像与标识类组件 (3 个)
│       ├── cards/                      # 17 卡片容器类组件 (3 个)
│       ├── charts/                     # 18 基础图表与数据可视化类组件 (14 个)
│       ├── advanced-charts/            # 19 高级图表与流式拓扑类组件 (7 个)
│       ├── tables/                     # 20 表格与树状数据结构类组件 (5 个)
│       ├── activity/                   # 21 活跃度与筛选操作类组件 (3 个)
│       ├── media/                      # 22 多媒体呈现与展示类组件 (3 个)
│       ├── text-effects/               # 23 文本微动效与排版艺术类组件 (4 个)
│       ├── docks-and-tabs/             # 24 停靠栏与高级导航类组件 (6 个)
│       ├── glass/                      # 25 毛玻璃拟态质感类组件 (3 个)
│       ├── surfaces/                   # 26 高阶复合交互表面类组件 (5 个)
│       ├── galleries/                  # 27 相册与展示画廊类组件 (4 个)
│       ├── audio-and-video/            # 28 音视频与语音交互类组件 (3 个)
│       ├── special-data/               # 29 特殊领域数据交互类组件 (4 个)
│       ├── special-type/               # 30 特殊字符与机械交互类组件 (4 个)
│       ├── loaders/                    # 31 加载器与刷新过渡类组件 (3 个)
│       ├── playful/                    # 32 趣味与沉浸式互动类组件 (2 个)
│       ├── cursor/                     # 33 指针跟随与光标微交互类组件 (2 个)
│       └── illustrations/              # 34 技术拓扑与动效插画类组件 (4 个)
└── AGENTS.md                           # AI 维护与扩展工作流指南
```

## 三层路由使用方式

为现有项目组件添加动效时，逐级读取：

1. **第 1 层**：读取 [skills/ui-motion/SKILL.md](skills/ui-motion/SKILL.md)，确定工作流与类别；
2. **第 2 层**：根据交互意图读取对应类别的 `INDEX.md`（见下方收录类别总表）；
3. **第 3 层**：读取具体组件规范文档（如 `context-menu.md`），将纯原生动效机制与参数移植到目标代码中。

## 收录类别总表 (34 类别 / 155 组件)

| 序号 | 类别 | 组件数 | 涵盖范围与核心交互 | 二级路由入口 |
| :--- | :--- | :---: | :--- | :--- |
| 01 | buttons | 10 | 基础物理按压、异步反馈、复制、分割菜单、按钮组、浮动工具栏、展开组、图标切换、原地确认、主题切换 | [buttons/INDEX.md](skills/ui-motion/buttons/INDEX.md) |
| 02 | gestures | 2 | 长按蓄力确认、双轴滑动操作与手势锁 | [gestures/INDEX.md](skills/ui-motion/gestures/INDEX.md) |
| 03 | menus | 3 | 右键上下文菜单、自适应下拉动作菜单、用户账户卡片面板 | [menus/INDEX.md](skills/ui-motion/menus/INDEX.md) |
| 04 | text-fields | 7 | 单行/多行输入框、密码明暗切换、密码强度检验、带清除搜索框、可伸展搜索条、原地行内编辑 | [text-fields/INDEX.md](skills/ui-motion/text-fields/INDEX.md) |
| 05 | special-inputs | 6 | 数字步进滚轮、货币金额、国际区号号码、多标签胶囊、@提及浮层、快捷键录制 | [special-inputs/INDEX.md](skills/ui-motion/special-inputs/INDEX.md) |
| 06 | selects | 5 | 紧凑单选下拉、可搜索组合框、容器形变选择器、多选标签收集器、流式过滤标签组 | [selects/INDEX.md](skills/ui-motion/selects/INDEX.md) |
| 07 | toggles | 6 | 二值机械拉伸开关、真实笔触复选框、分段控制胶囊、单选列表、对比单选卡片、计费周期切换 | [toggles/INDEX.md](skills/ui-motion/toggles/INDEX.md) |
| 08 | sliders | 2 | 连续数值平滑调节滑块、触觉橡皮筋弹性拉伸滑块 | [sliders/INDEX.md](skills/ui-motion/sliders/INDEX.md) |
| 09 | pickers | 5 | 拾色器、日历面板、日期选择器、日期范围选择器、时间选择器 | [pickers/INDEX.md](skills/ui-motion/pickers/INDEX.md) |
| 10 | editors | 4 | 语法高亮代码块、文件拖拽投递区、富文本格式化编辑器、矢量签名手写板 | [editors/INDEX.md](skills/ui-motion/editors/INDEX.md) |
| 11 | navigation | 3 | 面包屑折叠路径、弹性分页控制器、滑动高光标签页 | [navigation/INDEX.md](skills/ui-motion/navigation/INDEX.md) |
| 12 | expand | 4 | 手风琴风琴折、卡片原位展开、可拖拽分割面板、自适应滚动容器 | [expand/INDEX.md](skills/ui-motion/expand/INDEX.md) |
| 13 | overlays | 7 | 底部抽屉、对话弹窗、侧边抽屉、悬浮预览卡片、气泡弹层、分享权限卡片、智能提示 | [overlays/INDEX.md](skills/ui-motion/overlays/INDEX.md) |
| 14 | messages | 4 | 状态警示条、公告栏滚动、轻量 Toast 提示、多通知堆叠管理 | [messages/INDEX.md](skills/ui-motion/messages/INDEX.md) |
| 15 | progress | 5 | 环形倒计时、线性/环形进度条、骨架屏微光、分步步骤条、用量仪表盘 | [progress/INDEX.md](skills/ui-motion/progress/INDEX.md) |
| 16 | avatars | 3 | 交互头像、层叠头像组、状态指示徽标 | [avatars/INDEX.md](skills/ui-motion/avatars/INDEX.md) |
| 17 | cards | 3 | 多层卡片堆叠、多态信息卡片、动态指标度量卡片 | [cards/INDEX.md](skills/ui-motion/cards/INDEX.md) |
| 18 | charts | 14 | 滚动计数器、柱状图、环形图、漏斗图、仪表盘、折线图、雷达图、实时数据流、脊线图、斜率图、迷你走势图、分割柱图、时间轴、华夫饼图 | [charts/INDEX.md](skills/ui-motion/charts/INDEX.md) |
| 19 | advanced-charts | 7 | 刷选缩放图、交互数据网格、竞速条形图、桑基能量流、河流图、旭日图、矩形树图 | [advanced-charts/INDEX.md](skills/ui-motion/advanced-charts/INDEX.md) |
| 20 | tables | 5 | 即时聊天对话流、嵌套评论回复树、JSON 探针查看器、列排序列宽数据表、层级文件目录树 | [tables/INDEX.md](skills/ui-motion/tables/INDEX.md) |
| 21 | activity | 3 | 年度活跃热力图、空状态引导插画、多维筛选过滤工具栏 | [activity/INDEX.md](skills/ui-motion/activity/INDEX.md) |
| 22 | media | 3 | 手势轮播画廊、媒体文件拖拽上传区、双图卷帘对比 | [media/INDEX.md](skills/ui-motion/media/INDEX.md) |
| 23 | text-effects | 4 | 视口滚动触发标题、字符平滑形变、逐字翻转揭示、流光文字扫光 | [text-effects/INDEX.md](skills/ui-motion/text-effects/INDEX.md) |
| 24 | docks-and-tabs | 6 | 动作原位形变、Mac 风格浮动 Dock 栏、流体水滴 Tab 栏、形态变换导航条、同心圆环绕菜单、分享面板 | [docks-and-tabs/INDEX.md](skills/ui-motion/docks-and-tabs/INDEX.md) |
| 25 | glass | 3 | 光泽磨砂卡片、浮动毛玻璃上下文菜单、毛玻璃底部标签栏 | [glass/INDEX.md](skills/ui-motion/glass/INDEX.md) |
| 26 | surfaces | 5 | 控制中心磁贴面板、3D 全息翻转卡片、链接预览展开胶囊、多层抽屉堆叠、纵向折叠卡包 | [surfaces/INDEX.md](skills/ui-motion/surfaces/INDEX.md) |
| 27 | galleries | 4 | 3D 封面流转、灯箱全屏画廊、瀑布流照片网格、电商商品多图联动画廊 | [galleries/INDEX.md](skills/ui-motion/galleries/INDEX.md) |
| 28 | audio-and-video | 3 | 正在播放动态胶囊、AI 语音脉冲光球、语音录制声波条 | [audio-and-video/INDEX.md](skills/ui-motion/audio-and-video/INDEX.md) |
| 29 | special-data | 4 | 三环活动健身圆环、预订状态时段胶囊、滚筒日期轮盘、时钟刻度表盘 | [special-data/INDEX.md](skills/ui-motion/special-data/INDEX.md) |
| 30 | special-type | 4 | 机械键帽键盘按压、沙漏重力文字、老虎机滚轮字符、打字机终端控制台 | [special-type/INDEX.md](skills/ui-motion/special-type/INDEX.md) |
| 31 | loaders | 3 | 几何形态循环形变、骨架屏就地内容展开、橡皮筋手势下拉刷新 | [loaders/INDEX.md](skills/ui-motion/loaders/INDEX.md) |
| 32 | playful | 2 | 同心圆轨道漫游展台、仿真折纸书页 | [playful/INDEX.md](skills/ui-motion/playful/INDEX.md) |
| 33 | cursor | 2 | 磁性点阵矩阵追踪、引力井中心吸附 | [cursor/INDEX.md](skills/ui-motion/cursor/INDEX.md) |
| 34 | illustrations | 4 | 流式管道数据流、多区域故障转移重路由、支付流向状态机、高维向量空间检索 | [illustrations/INDEX.md](skills/ui-motion/illustrations/INDEX.md) |

## 规范设计原则

- **自包容完整性**：每个组件 `.md` 遵循统一的 13 节结构，包含状态机、最小 DOM、组件级参数、纯 CSS、纯 JS、接入策略与浏览器实际验收清单。
- **技术栈解耦**：代码仅使用原生 CSS 与 JavaScript，杜绝任何第三方框架绑定，可零摩擦适配 React、Vue、Svelte 或原生环境。
- **真实环境验证**：所有收录代码均已通过无头 Chrome 真实时间渲染（CDP）实测，保障动效时间线与物理弹簧阻尼的精确呈现。
