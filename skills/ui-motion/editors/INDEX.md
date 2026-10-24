# Editors 类别索引

富文本编辑器、代码块、文件投递区与电子签名板等内容创作与编辑流转规范。根据用户交互意图查表选定组件。

## 意图路由表

| 用户交互意图 / 状态变化 | 核心机制 | 推荐组件 |
| --- | --- | --- |
| 技术文档或示例代码段展示，需高度自适应与带反馈的一键复制代码 | 视口高度测量伸缩（Measured Viewport Height）、文件名幽灵标尺（Ghost Sizer）、复制三态反馈对勾 | [code-block.md](code-block.md) |
| 文档附件、稿件素材与混合文件拖拽/粘贴投放区 | 三层纸张 3D 浮动展开（Three Sheets Spread）、SVG 周长流动发光边框、错峰升起文件卡片 | [file-dropzone.md](file-dropzone.md) |
| 现代化富文本排版创作，需选区浮动工具栏与快捷格式指令 | 选区坐标吸附浮动工具栏、工具栏排版/链接双面形变置换、实时字数微模糊统计 | [rich-text-editor.md](rich-text-editor.md) |
| 电子协议、手写签名、压感墨水绘制与签名确认 | 贝塞尔平滑笔触插值（Smooth Ink Spline）、提示语微模糊渐隐、笔迹撤销与回放、异步签署三态流转 | [signature-pad.md](signature-pad.md) |

## 跨类别分流

- 单行或多行纯文本输入框（带前缀图标/清除按钮/字数限制）→ [input](../text-fields/input.md)
- 专属媒体库批量处理与相册瀑布流投递区（跨类别：`media/file-dropzone.md` 专注于大图/视频流媒体上传处理，而本类别的 `editors/file-dropzone.md` 专注于文档稿件与编辑器素材附件）
- 下拉选择或标签选择器 → [dropdown-menu](../menus/dropdown-menu.md)
- 纯手势长按确认提交 → [hold-to-confirm](../gestures/hold-to-confirm.md)
