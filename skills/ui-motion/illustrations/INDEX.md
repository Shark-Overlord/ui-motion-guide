# Illustrations 类别索引

高阶业务系统、数据管道与底层架构原理的动态技术插画组件集。专注于 ETL 流水线、跨区容灾故障切换、四方支付流转与向量空间检索的交互式原理演示。根据用户交互意图查表选定组件。

## 意图路由表

| 用户交互意图 / 状态变化 | 核心机制 | 推荐组件 |
| --- | --- | --- |
| ETL 数据管道与多路分流：数据由 App/DB/Events 汇入，在核心 Transform 节点融合，分流至数仓与看板 | 72 段弧长采样路径、42px 拖尾、Transform 节点形态融合与吞吐计数累加 | [data-flow.md](data-flow.md) |
| 多区域高可用容灾演练：展示双活、降级、故障转移、单区承载、服务恢复与流量回切完整 6 阶段 | 21s 六阶段生命周期状态机、等轴测 2.5D 拓扑、连续 3 次失败健康检查与暂停/跳转控制 | [multi-region-failover.md](multi-region-failover.md) |
| 跨境与电商支付结算全周期：授权逐跳转发、银行批准对勾回传、扣除手续费净额入账与商户余额累加 | 客户/商户/网关/银行四方拓扑、多跳光斑动力学、扣费分账与账户余额动态递增 | [payment-flow.md](payment-flow.md) |
| 高维向量语义检索与聚类：文档嵌入、聚类凸包与图索引构建、查询针脚注入与 Top-3 相似度召回 | 18 点高维向量 2D 平面投影、四阶段检索时序、相似度扩散环与 Top-3 召回出榜 | [vector-search.md](vector-search.md) |

## 跨类别分流

- 拟真终端命令输入与构建日志流水线 → [typewriter-terminal](../special-type/typewriter-terminal.md)
- 金融数字与指标翻牌动态滚轮 → [slot-text](../special-type/slot-text.md)
- 异步操作按钮与多阶段流转状态 → [action-button](../buttons/action-button.md)
