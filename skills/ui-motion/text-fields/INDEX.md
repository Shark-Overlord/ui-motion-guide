# Text Fields 类别索引

文本输入与编辑交互模型。涵盖单行/多行输入框无抖动边框过渡、自适应消息槽、密码遮罩动态画出、密码复杂度实时评分、搜索清除与宽度展开，以及排版文本的原地行内编辑。

## 意图路由表

| 用户交互意图 / 状态变化 | 核心机制 | 推荐组件 |
| --- | --- | --- |
| 常规单行表单输入：需要聚焦/悬停边框过渡无抖动、错误态边框、下方自适应高度消息提示槽 | 零尺寸抖动边框、`aria-invalid` 危险色边框、自适应高度消息槽、逐字微模糊进入与退场 | [input.md](input.md) |
| 多行文本输入：需要多行自适应排版、错误反馈与提示槽高度补间 | 多行弹性高度、聚焦高亮轮廓、自适应消息槽逐字微模糊 | [textarea.md](textarea.md) |
| 密码输入与明暗文切换：原地切换显示/隐藏密码，伴随字符微模糊防窥与 SVG 遮罩斜线画出 | 输入框 `filter: blur(4px) -> 0` 原地防窥流转、SVG 遮罩眼球与斜线 `stroke-dashoffset` 动态裁切画出 | [password-field.md](password-field.md) |
| 密码设置与强度检验：实时计算密码复杂度、四段式强度计量条、规则项对勾动态画出与字符缺额提示 | 4 段式彩色计量条平移填充、4 项规则达成圆点放大、SVG 对勾笔画动画、剩余字符差额提示 | [password-strength.md](password-strength.md) |
| 带有清除按钮的搜索框：有内容时浮现清除按钮，点击清空并返还焦点 | 预留插槽弹性缩放淡入（`scale(0.8) + blur(2px) -> 1`）、点击重置内容并返还焦点 | [search-field.md](search-field.md) |
| 导航栏空间紧凑的伸缩搜索框：平时为纯圆形图标，点击或聚焦后横向伸长，并展开下拉搜索建议面板 | 44px 至 360px 宽度物理弹簧补间、`--es-open` 渐变展开、结果面板高度自动弹性跟随 | [expanding-search.md](expanding-search.md) |
| 排版文本原地行内编辑：点击标题或段落就地切换为输入框，保存后微模糊位移更新文本 | 原地 Display ↔ Editing 状态流转、单行/多行自适应、Saving 加载中 Spinner、Esc 还原与焦点返还 | [inline-edit.md](inline-edit.md) |

## 跨类别分流

- 纯按钮点击复制输入框内容 → [copy-button](../buttons/copy-button.md)
- 异步提交按钮与多阶段表单提交流转 → [action-button](../buttons/action-button.md)
- 键盘首字母快速检索下拉菜单项 → [dropdown-menu](../menus/dropdown-menu.md)
