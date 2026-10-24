---
slug: textarea
category: text-fields
source: inbox/04_Text_fields/textarea
---

# Textarea · 多行文本域

多行长文本输入控件。在完整保留多行排版、行高、原生软换行与输入法合成的基础上，提供与单行输入框一致的零尺寸抖动边框过渡，以及下方自适应高度消息提示槽。涵盖三大核心机制：

1. 零尺寸抖动多行边框反馈（Jitter-Free Multi-Line Border）：初始最小高度锁定为 88px（5.5rem），通过 CSS `border-color` 与背景色平滑处理悬停、聚焦与 `aria-invalid="true"` 错误态，杜绝多行排版时的任何布局跳动。
2. 动态消息插槽与微模糊文字流转（Message Slot Morphing & Blur Transition）：下方消息插槽 `.textarea-message-slot` 承载说明与错误提示，内容变动时通过微高斯模糊与纵向位移产生平滑过渡。
3. 原生换行与输入行为完整保留：支持 Enter 换行与 Shift+Enter 换行，支持原生垂直拖拽缩放（`resize: vertical`）或受控锁定。

## 原型清单

| 原型分组 | 原型元素 | 动效 / 状态变化 | 去向 |
| --- | --- | --- | --- |
| 官方多行文本舞台 | 字段容器 `.textarea-field` | 垂直网格流式布局 | 最小 DOM |
| 官方多行文本舞台 | 标签文本 `label` | 语义绑定与静态标题 | 最小 DOM |
| 官方多行文本舞台 | 多行输入控件 `.textarea-control` | 悬停/聚焦边框过渡；校验失败变红；禁用置灰 | 零尺寸抖动多行边框反馈 |
| 官方多行文本舞台 | 消息插槽 `.textarea-message-slot` | 自适应高度折叠与展开 | 动态消息插槽与微模糊文字流转 |
| 官方多行文本舞台 | 提示文本 `.textarea-hint` / `.textarea-word` | 逐字微模糊进入与淡出 | 动态消息插槽与微模糊文字流转 |
| 官方多行文本舞台 | 状态提示槽 `.demo-status` | 演示数据变动状态显示 | 演示外壳，已删除 |
| — | 顶栏独立主题切换器 `#themeBtn` | 演示主题切换 | 演示外壳，已删除 |
| — | 舞台外壳 `.demo-stack` 与 `.demo-roomy` | 演示居中外壳 | 演示外壳，已删除 |

## 适用

- 备注、描述、多行评论、反馈意见或长篇 Markdown 输入。
- 需要与单行输入框保持严格统一的视觉高保真规范的表单系统。

## 不适用

- 单行短文本输入 → [input](input.md)
- 密码输入与明暗文显示切换 → [password-field](password-field.md)
- 带有清除按钮与搜索语义的输入框 → [search-field](search-field.md)
- 排版文本的原地行内编辑 → [inline-edit](inline-edit.md)

## 状态机

```mermaid
stateDiagram-v2
    [*] --> Idle: 初始未激活
    Idle --> Hover: 指针悬停
    Hover --> Idle: 指针离开
    Idle --> Focused: 点击 / 键盘 Tab 聚焦
    Hover --> Focused: 点击聚焦
    Focused --> Idle: 失焦 blur
    Focused --> Invalid: 表单校验失败 (aria-invalid="true")
    Invalid --> Focused: 重新输入修正
    Idle --> Disabled: 字段禁用 (disabled)
```

| 状态 | 进入条件 | 视觉表现 | 退出到 |
| --- | --- | --- | --- |
| `idle` | 初始载入 / 正常无焦点 | 边框为深灰色线框（`rgba(0, 0, 0, 0.16)`），背景白底 | `hover`, `focused`, `disabled` |
| `hover` | 鼠标指针悬停于文本域上方 | 边框平滑变深为前景色，无尺寸外扩 | `idle`, `focused` |
| `focused` | 点击或通过键盘 Tab 键聚焦 | 边框稳定高亮为前景色，保持 1px 细线不发散 | `idle`, `invalid` |
| `invalid` | 设置 `aria-invalid="true"` | 边框转为警示危险色（`#f43f5e`），消息槽展示报错 | `focused`, `idle` |
| `disabled` | 设置 `disabled` 属性 | 背景变为浅灰，透明度降低至 0.5，禁用交互 | `idle` |

## 最小 DOM

```html
<div class="textarea-field">
  <label class="textarea-label" for="project-note">Project note</label>
  <textarea
    id="project-note"
    class="textarea-control"
    aria-describedby="project-note-desc"
  >Keep the final pass calm and focused.</textarea>
  <span class="textarea-message-slot" aria-live="polite">
    <span id="project-note-desc" class="textarea-hint">
      Visible to everyone on the project.
    </span>
  </span>
</div>
```

- `.textarea-field`：容器网格。
- `.textarea-control`：原生 `<textarea>` 元素。
- `.textarea-message-slot`：高度可自适应过渡的消息插槽。

## 参数

| 名称 | 值 | 用于 | 来源 |
| --- | --- | --- | --- |
| 初始最小高度 | `88px` (`5.5rem`) | 文本域默认最小垂直高度 | 原型 |
| 边框过渡时长 | `160ms` (`var(--duration-fast)`) | 悬停/聚焦/报错时的边框色过渡 | 原型 |
| 缓动曲线 | `cubic-bezier(0.22, 1, 0.36, 1)` | 边框色变动标准曲线 | 原型 |
| 圆角半径 | `18px` (`1.125rem`) | 标准控件外轮廓圆角 | 原型 |
| 错误危险色 | `#f43f5e` | `[aria-invalid="true"]` 边框与错误文本色 | 原型 |
| 消息微模糊时长 | `200ms cubic-bezier(0.16, 1, 0.3, 1)` | 提示消息更新时的平滑过渡 | 原型 |

## CSS

```css
.textarea-field {
  display: grid;
  min-width: 0;
  width: 100%;
  font-family: inherit;
  box-sizing: border-box;
}

.textarea-label {
  margin-bottom: 8px;
  color: var(--foreground, #0b0b0b);
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  user-select: none;
}

.textarea-control {
  width: 100%;
  min-height: 88px;
  padding: 12px 14px;
  border: 1px solid rgba(0, 0, 0, 0.16);
  border-radius: 18px;
  background: var(--surface, #ffffff);
  color: var(--foreground, #0b0b0b);
  font: inherit;
  font-size: 14px;
  line-height: 1.4;
  outline: none;
  box-sizing: border-box;
  resize: vertical;
  transition: border-color 160ms cubic-bezier(0.22, 1, 0.36, 1),
              background-color 160ms cubic-bezier(0.22, 1, 0.36, 1);
}

.textarea-control::placeholder {
  color: #888888;
}

@media (hover: hover) and (pointer: fine) {
  .textarea-control:hover:not(:disabled):not([aria-invalid="true"]) {
    border-color: var(--foreground, #0b0b0b);
  }
}

.textarea-control:focus,
.textarea-control:focus-visible {
  border-color: var(--foreground, #0b0b0b);
}

.textarea-control[aria-invalid="true"] {
  border-color: #f43f5e;
}

.textarea-control:disabled {
  cursor: not-allowed;
  opacity: 0.5;
  background: var(--surface-muted, #f4f4f4);
}

.textarea-message-slot {
  display: block;
  overflow: hidden;
  transition: height 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

.textarea-hint {
  display: block;
  padding-top: 6px;
  font-size: 12.5px;
  line-height: 1.4;
  color: #777777;
  will-change: opacity, transform, filter;
}

.textarea-control[aria-invalid="true"] ~ .textarea-message-slot .textarea-hint {
  color: #f43f5e;
}
```

## JS

```js
/**
 * 绑定多行文本域控制器
 * @param {HTMLElement} fieldEl .textarea-field 容器
 * @param {Object} options 配置项
 * @param {(value: string) => void} [options.onChange] 内容变更回调
 * @returns {{ setMessage: Function, setInvalid: Function, destroy: Function }} 控制接口
 */
export function bindTextareaField(fieldEl, { onChange } = {}) {
  const textarea = fieldEl.querySelector('.textarea-control');
  const hint = fieldEl.querySelector('.textarea-hint');

  const onInput = () => {
    if (typeof onChange === 'function') {
      onChange(textarea.value);
    }
  };
  textarea.addEventListener('input', onInput);

  function setMessage(nextText) {
    if (!hint) return;
    if (hint.textContent.trim() === nextText.trim()) return;

    hint.animate(
      [
        { opacity: 1, transform: 'translateY(0)', filter: 'blur(0px)' },
        { opacity: 0, transform: 'translateY(-2px)', filter: 'blur(2px)' }
      ],
      { duration: 120, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
    ).onfinish = () => {
      hint.textContent = nextText;
      hint.animate(
        [
          { opacity: 0, transform: 'translateY(2px)', filter: 'blur(2px)' },
          { opacity: 1, transform: 'translateY(0)', filter: 'blur(0px)' }
        ],
        { duration: 160, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
      );
    };
  }

  function setInvalid(isInvalid) {
    textarea.setAttribute('aria-invalid', String(isInvalid));
  }

  return {
    setMessage,
    setInvalid,
    destroy() {
      textarea.removeEventListener('input', onInput);
    }
  };
}
```

## 接入目标项目

- 状态来源：长文本业务状态。
- 尺寸策略：宽度 100%，最小高度 88px，允许垂直 resize。
- 驱动方式：纯 CSS 驱动核心边框与聚焦状态；动态错误与消息提示通过 `setMessage` 和 `setInvalid` 驱动。

## 重入与清理

- 连续快速输入：直接放行原生渲染管道，不做多余防抖截断。
- 销毁机制：调用 `destroy()` 解除绑定的输入监听。

## 减少动态效果

系统开启 `prefers-reduced-motion: reduce` 时：
1. 边框变色过渡时间置为 `0.01ms`，保持即时响应。
2. 提示文字更新移除微高斯模糊与位移动画。

```css
@media (prefers-reduced-motion: reduce) {
  .textarea-control,
  .textarea-message-slot,
  .textarea-hint {
    transition: none !important;
    animation: none !important;
  }
}
```

## 焦点与键盘

- 原生换行支持：保留 Enter 换行与文本编辑标准键盘快捷键。
- 轮廓规范：通过 `:focus-visible` 清除默认双层轮廓，收敛至组件自身 1px 高对比度边框高亮。

## 兼容回退

| 特性 | 不支持时 |
| --- | --- |
| WAAPI `element.animate()` | 直接同步赋值 `hint.textContent = nextText`，无动效平滑回退。 |

## 验收清单

- [ ] 鼠标悬停在多行文本域上方，边框颜色平滑深色过渡，无尺寸跳动。
- [ ] 键盘 Tab 键聚焦进入，边框高亮为纯黑/前景色，光标闪烁正常。
- [ ] 设置 `aria-invalid="true"` 时，边框平滑过渡为危险红色，下方消息提示同步标红。
- [ ] 更新下方消息提示文本，文字带有轻微模糊与向上过渡，无排版撕裂。
- [ ] 减弱动态效果开启时，所有颜色过渡与文字渐变瞬时完成。
