# Special Type 类别索引

特殊文本与字符动效组件集。专注于具有物理质感、机械运动或艺术粒子形态的字符渲染与交互反馈。根据用户交互意图查表选定组件。

## 意图路由表

| 用户交互意图 / 状态变化 | 核心机制 | 推荐组件 |
| --- | --- | --- |
| 拟真机械按键与虚拟键盘：需要物理键帽行程下潜、光晕渐亮、Shift 单次锁存与字符逐字入场 | 分层键帽物理行程（92% 下沉）、径向光晕、单次 Shift 锁存（50%）、打字光标常亮 | [keycap-keyboard.md](keycap-keyboard.md) |
| 艺术标题与沙粒互动：文字由沙粒重力聚合而成，光标掠过气流吹散，停留自动回填补齐 | 离屏 Canvas 光栅化提取遮罩、气流散射动力学、重力沉降与 650ms 防抖回填 | [sand-text.md](sand-text.md) |
| 金融看板与指标变动：数值突变时数字像老虎机滚轮般翻滚，多列平滑停靠，外框零像素抖动 | 确定性字符带生成、错峰 0.07s 零过冲停靠曲线、动态运动模糊、Ghost Sizer 宽度弹簧 | [slot-text.md](slot-text.md) |
| 命令行与流水线演示：拟真终端逐字敲入命令，输出多步骤任务进度条与状态，可拖拽时间轴复查 | 确定性字符输入时序、任务 Spinner 旋转、自适应滚动跟随、带吸附点的时间滑块与复制反馈 | [typewriter-terminal.md](typewriter-terminal.md) |

## 跨类别分流

- 常规单动作按钮与异步状态流转 → [action-button](../buttons/action-button.md)
- 纯文本复制与写入系统剪贴板 → [copy-button](../buttons/copy-button.md)
- 机械计数器与滑动高光分段栏 → [button-group](../buttons/button-group.md)
