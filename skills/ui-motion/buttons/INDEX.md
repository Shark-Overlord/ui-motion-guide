# Buttons 类别索引

按钮及其直接关联的微交互、异步状态与容器流转。根据用户交互意图查表选定组件。

## 意图路由表

| 用户交互意图 / 状态变化 | 核心机制 | 推荐组件 |
| --- | --- | --- |
| 常规单动作按钮：需要按压微物理缩放、异步加载 Spinner、闪现成功反馈或下方浮现提示 | 物理缩放、异步状态槽占位、绿色描边对勾、下方微提示 | [button.md](button.md) |
| 点击复制文本或代码：需要真实写入系统剪贴板，文案逐字形变与成功勾选反馈 | 剪贴板 Promise 真实绑定、逐字形变文案、防抖宽度占位、描边对勾 | [copy-button.md](copy-button.md) |
| 异步业务操作：提交表单、发送请求，带多阶段流转与方向性箭头/加载动画 | popLayout 逐字平滑退场、方向性图标切入、Intl.Segmenter 字符分割 | [action-button.md](action-button.md) |
| 主动作附带次级下拉选项：主从按钮既能独立交互又能协同按压，带弹出菜单与宽度自适应 | 主从联动微缩放、ResizeObserver 自适应测量、弹出菜单与 Esc 焦点返还 | [split-button.md](split-button.md) |
| 分段切换栏或紧凑工具栏：需要滑动高光胶囊（Gliding Pill）跟手过渡与数字滚动 | 滑动胶囊跟随、邻近分割线静音渐隐、Sizer 尺寸防抖、滚轮计数器 | [button-group.md](button-group.md) |
| 浮动操作条 / 工具坞：纯图标展示，悬停/聚焦时弹出单例智能提示（Smart Tooltip） | 35ms 意图防抖与 350ms 预热保持、高光跟随、全键盘 Roving Tabindex | [floating-button-group.md](floating-button-group.md) |
| 空间紧凑操作栏：默认仅展开激活项文本，悬停/聚焦其他项手风琴展开文字让位 | 智能手风琴伸展测量、Linear 弹簧回退、动作确认与对勾书写 | [expanding-button-group.md](expanding-button-group.md) |
| 纯图标几何变形：汉堡切关闭、播放切暂停、加号切勾选、点赞爱心爆裂等矢量切换 | 8 类 SVG 路径数据插值、遮罩位移生成月牙、关键帧粒子迸发 | [icon-morph.md](icon-morph.md) |
| 破坏性或高风险操作：原地展开询问、Cancel/Delete、倒计时自动触发与 Undo 撤回 | 表面宽度 400ms 自适应形变、微模糊面切换、Click/Hold/Countdown 三模式 | [confirm-morph.md](confirm-morph.md) |
| 全局白天/暗黑主题切换：太阳月亮旋转换位，伴随全屏 View Transition 遮罩转场 | 双图层 30° 旋转换位、Reveal/Eclipse/Split/Rise 全屏视图转场 | [theme-switch.md](theme-switch.md) |

## 跨类别分流

- 纯手势驱动的持续长按确认（含触觉振动与指针拖拽捕获）→ [hold-to-confirm](../gestures/hold-to-confirm.md)
- 列表行内横向滑动以显露操作项 → [swipe-actions](../gestures/swipe-actions.md)
