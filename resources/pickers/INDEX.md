# Pickers 类别索引

拾色器、日历与时间选择器等数据采集与微交互流转规范。先根据 **Step 1 端型（`Web` vs `Mobile`）** 过滤，再按交互意图选定组件。

## 意图路由表

| 适用端型 | 用户交互意图 / 状态变化 | 核心机制 | 推荐组件 |
| --- | --- | --- | --- |
| `通用` | 独立展示完整月度日程与签到卡片，高度锁定 0 抖动 | 恒定 6 周 42 天网格、月份标题定向滑移、今天指示微圆点、按压微缩 | [calendar.md](calendar.md) |
| `Web / 通用` | 精细挑选色彩，包含 2D 饱和度/明度调色盘与色相/透明度滑块 | 2D 物理滑块跟手、微模糊格式轮转（Hex/RGB/HSL）、实时 WCAG 对比度标尺、色板收藏 | [color-picker.md](color-picker.md) |
| `Web` | 桌面端表单输入框触发的单日期浮层点选 | 弹层 Presence 弹簧展开、逐段日期滚轮置换（formatToParts）、选中项高光胶囊追随、Esc 返还焦点 | [date-picker.md](date-picker.md) |
| `Web` | 桌面宽屏大跨度双月联动时间区间选取（移动端窄屏禁用双月并排） | 双月并排连续日期网格、横向连续胶囊选区绘制（bars-layer）、悬停流体拉伸探针、左侧快捷导轨 | [date-range-picker.md](date-range-picker.md) |
| `Web` | 桌面端精确选取时刻（小时/分钟），如会议预约或营业时间 | 浮层 Presence 展开、时间文本微模糊上下置换、选项目录自动居中对齐（Auto Center Scroll）、方向键巡回 | [time-picker.md](time-picker.md) |

## 跨类别分流

- `Mobile` 移动端 3D 滚筒圆柱惯性日期与时间轮盘 → [date-reel](../special-data/date-reel.md)
- `Mobile / 通用` 预订时段与日期卷带胶囊 → [booking-pill](../special-data/booking-pill.md)
- 表单多选或下拉单选动作菜单 → [dropdown-menu](../menus/dropdown-menu.md)
- 纯文本或格式化数字输入框带清空按钮 → [input](../text-fields/input.md)
- 范围滑块调节连续数值（如音量、百分比滑块）→ [slider](../sliders/slider.md)
