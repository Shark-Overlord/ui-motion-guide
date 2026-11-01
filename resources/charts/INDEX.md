# Charts 类别索引

数据可视化、时序趋势、结构构成、流程漏斗与统计图表组件，涵盖离散柱状对比、平滑时间曲线、圆弧环形分布、10×10 华夫饼网格、分组时间线、雷达多维特征及 60fps 实时高频数据流。根据用户交互意图查表选定组件。

## 意图路由表

| 用户交互意图 / 状态变化 | 核心机制 | 推荐组件 |
| --- | --- | --- |
| 关键 KPI、金额与统计指标数字翻转滚动：零宽度抖动与高频平滑滚动 | Ghost Sizer 尺寸锁、0-9 垂直数字列滚轮、非数字字符原地微模糊置换 | [animated-counter.md](animated-counter.md) |
| 周期性离散时序或多维度数值对比：柱高柱宽动态适应、均值基准线对齐与横向巡航 | 错峰生长动画（35ms Stagger）、均值基准虚线、十字磁吸光标与表头滚动数值展台 | [bar-chart.md](bar-chart.md) |
| 单维度多分类环形占比分布：悬停单一切片凸起与圆心指示鼓联动 | 240°~360° 环状圆弧展开、切片 4px 径向悬停浮起、圆心指标展台与图例过滤重平衡 | [donut-chart.md](donut-chart.md) |
| 业务转化链路与漏斗流转损耗：多阶段阶梯收缩与粒子转化流向 | 五次平滑阶跃曲线（Quintic Smoothstep）、动态渐变发光裁切、转化流向微粒子 Canvas | [funnel-chart.md](funnel-chart.md) |
| 系统健康度、车速或评分仪表盘：270° 径向表盘、阈值变色与安全预警 | 270° 径向弧度标量生长、渐变阈值色相插值、中央读数展台与无障碍 Meter 语义 | [gauge.md](gauge.md) |
| 连续时间走势与多维趋势波动：平滑样条曲线、面积填充与游标跟随工具提示 | Catmull-Rom 平滑样条、面积渐变垂直展开、横向十字光标与防溢出翻转 Tooltip | [line-chart.md](line-chart.md) |
| 多维能力画像与多指标特征评分：多边形轮廓、多轴网格与悬停特征点高亮 | 正多边形环与射线投影、轮廓路径平滑形变、活动轴高亮与顶点跟随浮动提示 | [radar-chart.md](radar-chart.md) |
| 高频秒级监控流、网络吞吐与传感器波形：60fps 连续滚动窗口与探针冻结检查 | Canvas 高性能双缓冲渲染、FIFO 固定容量队列、探针悬停冻结窗口与实时切换 | [realtime-stream.md](realtime-stream.md) |
| 多类别随时间变化的概率密度分布：纵向层叠山脊线与透镜放大镜交互 | 核密度估计（KDE）高斯曲线、Z 轴层叠透明渐变、6px 聚焦透镜上浮与中位数线 | [ridgeline.md](ridgeline.md) |
| 两阶段（如前后两季度或版本对比）多维度位次与数值升降斜率对比 | 两端点固定纵坐标连接斜线、排名徽标跟随、线端圆点与悬停高亮关联线 | [slope-chart.md](slope-chart.md) |
| 表格行内或仪表盘卡片内的微型内联走势图：极简体积、端点着陆与光标探针 | 紧凑 Catmull-Rom 曲线与渐变底色、末端落点光标、微型探针与 Ghost Sizer 数值 | [sparkline.md](sparkline.md) |
| 单维度多分类横向配额与占比切片：空间不足自动引线外排与图例隐藏重平衡 | 弹性横向切片重分配、狭窄分段 SVG 引线与外部文字排版、图例显隐重构 | [split-bar.md](split-bar.md) |
| 项目活动流、审计日志与工单生命周期：按日期自动分组、吸顶日历与展开详情 | 日期分组吸顶头部、标记点弹性弹出（Bounce 0.32）、垂直连线拉伸与手风琴抽屉 | [timeline.md](timeline.md) |
| 强调整整 100% 构成（每格恰好 1%）：整合格子分配、分类压暗与最少移动重分配 | 最大余数法整性格子分配、10×10 网格插槽错峰入场、分类 26% 压暗与四向键盘巡航 | [waffle-chart.md](waffle-chart.md) |

## 跨类别分流

- 纯数字倒计时或时钟递减翻牌 → [countdown.md](../progress/countdown.md)
- 资源配额与阈值警戒进度条 → [usage-meter.md](../progress/usage-meter.md)
- 流程步骤推进与状态流水线 → [stepper.md](../progress/stepper.md)
- 骨架屏占位与加载动画 → [skeleton.md](../progress/skeleton.md)
- 按钮内部操作加载态与微交互 → [action-button.md](../buttons/action-button.md)
