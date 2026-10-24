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

## 动效涵盖组件范围

- [x] Buttons · 按钮
- [x] Gestures · 手势交互
- [x] Menus · 菜单
- [x] Text fields · 文本输入
- [x] Special inputs · 特殊输入
- [x] Selects · 选择控件
- [x] Toggles · 切换控件
- [x] Sliders · 滑块
- [x] Pickers · 选择器
- [x] Editors · 编辑器
- [x] Navigation · 导航
- [x] Expand · 展开与折叠
- [x] Overlays · 浮层弹窗
- [x] Messages · 消息通知
- [x] Progress · 进度与加载
- [x] Avatars · 头像与徽标
- [x] Cards · 卡片
- [x] Charts · 图表
- [x] Advanced charts · 高级图表
- [x] Tables · 表格与树
- [x] Activity · 动态记录与筛选
- [x] Media · 媒体展示
- [x] Text effects · 文字动效
- [x] Docks & tabs · 停靠栏与标签页
- [x] Glass · 毛玻璃组件
- [x] Surfaces · 复合交互表面
- [x] Galleries · 相册画廊
- [x] Audio & video · 音视频交互
- [x] Special data · 特殊数据组件
- [x] Special type · 机械与特殊字符
- [x] Loaders · 加载与刷新
- [x] Playful · 趣味互动
- [x] Cursor · 光标追踪
- [x] Illustrations · 动效拓扑插画
