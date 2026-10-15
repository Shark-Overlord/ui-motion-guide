# UI Motion Guide · 组件动效指南

让 AI 为现有组件添加过渡动效，保留原有样式和业务逻辑。

目前支持按钮按压、加载反馈、复制提示、图标切换等交互，更多组件将陆续加入。

## 使用

克隆到你想存放的目录（替换 `<目标目录>`）：

```bash
git clone --depth 1 https://github.com/Shark-Overlord/ui-motion-guide.git "<目标目录>/ui-motion-guide"
```

然后告诉能读取本地文件的 AI：

```text
先读取 <目标目录>/ui-motion-guide/AGENTS.md，按索引选择 Skill，
给我的项目 src/components/SaveButton.tsx 中的按钮添加过渡，保留现有样式和业务逻辑。
```

未指定组件时，让 AI 先扫描当前界面，列出可修改组件，等你选择后再添加动效。

无需专用安装器；入口和参考都在仓库内。放在任意目录时，首次使用请明确给 AI 入口路径。

## 组件动效目录

按 [UI Arc](https://uiarc.dev/components/dropdown-menu) 的 Components 二级分类整理。已勾选表示该类别已接入，具体组件覆盖以现有参考为准；其余待加入。

- [x] Buttons · 按钮
- [ ] Gestures · 手势交互
- [ ] Menus · 菜单
- [ ] Text fields · 文本输入
- [ ] Special inputs · 特殊输入
- [ ] Selects · 选择控件
- [ ] Toggles · 切换控件
- [ ] Sliders · 滑块
- [ ] Pickers · 选择器
- [ ] Editors · 编辑器
- [ ] Navigation · 导航
- [ ] Expand · 展开与折叠
- [ ] Overlays · 浮层
- [ ] Messages · 消息反馈
- [ ] Progress · 进度
- [ ] Avatars · 头像
- [ ] Cards · 卡片
- [ ] Charts · 图表
- [ ] Advanced charts · 高级图表
- [ ] Tables · 表格
- [ ] Activity · 动态记录
- [ ] Media · 媒体
- [ ] Text effects · 文字动效

## 动效展示

原始页面录制，保留原有布局与样式，原速播放。Before 为初始静态状态，After 为带鼠标的主要过渡；演示不调用真实发布或删除接口。

### 基础按钮

Before

![Before](docs/images/browser-native/button-before-original.png)

After

![After](docs/images/browser-native/button-after-original.png)

### 异步按钮

Before

![Before](docs/images/browser-native/action-button-before-original.png)

After

![After](docs/images/browser-native/action-button-after-original.png)

### 分割按钮

Before

![Before](docs/images/browser-native/split-button-before-original.png)

After

![After](docs/images/browser-native/split-button-after-original.png)

### 浮动工具栏

Before

![Before](docs/images/browser-native/floating-button-group-before-original.png)

After

![After](docs/images/browser-native/floating-button-group-after-original.png)

### 展开按钮组

Before

![Before](docs/images/browser-native/expanding-button-group-before-original.png)

After

![After](docs/images/browser-native/expanding-button-group-after-original.png)

### 复制反馈

Before

![Before](docs/images/browser-native/copy-button-before-original.png)

After

![After](docs/images/browser-native/copy-button-after-original.png)

### 图标切换

Before

![Before](docs/images/browser-native/icon-morph-before-original.png)

After

![After](docs/images/browser-native/icon-morph-after-original.png)

### 原地确认

Before

![Before](docs/images/browser-native/confirm-morph-before-original.png)

After

![After](docs/images/browser-native/confirm-morph-after-original.png)
