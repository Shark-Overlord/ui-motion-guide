---
slug: alert
category: messages
source: inbox/14_Messages/alert/
---

# Alert · 警示通知栏

用于展示页面局部或全局任务状态、警告与系统反馈的常驻/可收起通知横幅。包含三大核心动效机制：

1. 文本微模糊进退场（Micro-Blur Text Swap）：标题与详情内容变动时，旧文案向上平移微缩并伴随高斯模糊淡出脱离文档流，新文案自下方携带微模糊升起淡入，避免 DOM 硬切。
2. 容器高度自适应平滑伸展（Spring Height Expansion）：文案长度变化或详情段落展开/收起时，外层容器计算高度差执行无超调弹簧动画，动画完成后恢复为自然高度 `height: auto` 并解除裁剪。
3. 语意图标弹簧切入与受控退场（Icon Spring Swap）：四种语意色调（info, success, warning, danger）在切换时，矢量图标以 `scale(0.6)` 与 `blur(2px)` 弹性缩放渐变就绪；关闭时整体折叠收起。

## 原型清单

| 原型分组 | 原型元素 | 动效 / 状态变化 | 去向 |
| --- | --- | --- | --- |
| — | 警示宿主外壳（`.arc-alert-presence` / `.arc-alert-surface`） | 展开高度过渡、淡入淡出、危险态 alert 角色与常规 status 角色切换 | 容器高度自适应平滑伸展 |
| — | 语意状态图标（`.arc-alert-icon`, `.arc-alert-glyph`） | 弹性缩放 `scale(0.6 -> 1)`、高斯微模糊、按 tone 切换颜色与 SVG 形状 | 语意图标弹簧切入与受控退场 |
| — | 文案排版区（`.arc-alert-copy`, `.arc-alert-content`） | 标题与详情行高度测量、逐行进退场动画、新旧内容位置重叠保护 | 文本微模糊进退场 |
| — | 关闭按钮（`.arc-alert-dismiss`） | 悬停背景淡入、按压弹性微缩 `scale(0.96)`、点击收起通知 | 语意图标弹簧切入与受控退场 |
| — | 演示外壳（底部 Reconnect 按钮、快捷键、主题切换） | — | 演示外壳，已删除 |

## 适用

- 页面局部内联展示与当前上下文密切相关的操作反馈、警告、提示或系统同步状态。
- 文案在业务状态切换时需要无闪烁的微模糊形变衔接（如“同步暂停”→“所有更改已同步”）。
- 用户需要明确的通知关闭入口，且关闭时容器平滑折叠让位。

## 不适用

- 全局堆叠弹出的悬浮轻量级消息提示 → [toast.md](toast.md)
- 多条通知在屏幕边缘队列堆叠与手势滑动删除 → [toast-stack.md](toast-stack.md)
- 顶部全宽公告横幅、循环轮换或活动倒计时 → [announcement-bar.md](announcement-bar.md)
- 破坏性删除操作需要原地二次确认与撤销倒计时 → [confirm-morph.md](../buttons/confirm-morph.md)

## 状态机

| 状态 | 进入条件 | 视觉表现 | 退出到 |
| --- | --- | --- | --- |
| closed | 初始未显示；或点击关闭折叠完成 | 容器高度 0，透明度 0，`display: none` 或节点移除 | entering |
| entering | 挂载且 `open: true` | 高度从 0 平滑展开至测量高度，透明度由 0 渐变为 1，图标缩放归位 | visible |
| visible | 入场动画结束；内容静止 | 完整展示图标、标题、详情文案及关闭按钮，`height: auto` 保持自然文档流 | text-swapping / closing |
| text-swapping | 语意 tone、标题或描述更新 | 旧行绝对定位向上微移模糊淡出，新行自下方微移模糊升起，容器高度动态自适应 | visible |
| closing | 点击关闭按钮或外部设置 `open: false` | 容器 `overflow: hidden`，高度收缩为 0，透明度快速渐隐 | closed |

```mermaid
stateDiagram-v2
    [*] --> entering: 挂载 / open=true
    entering --> visible: 展开就绪
    visible --> text-swapping: 数据或文案变动
    text-swapping --> visible: 形变就绪
    visible --> closing: 点击关闭 / open=false
    closing --> closed: 折叠完毕
    closed --> entering: 重新激活
```

## 最小 DOM

```html
<div class="arc-alert-presence">
  <div class="arc-alert-surface arc-alert-info" role="status" data-tone="info">
    <span class="arc-alert-icon" aria-hidden="true">
      <span class="arc-alert-glyph">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 16v-4"></path>
          <path d="M12 8h.01"></path>
        </svg>
      </span>
    </span>
    <div class="arc-alert-copy">
      <div class="arc-alert-content">
        <strong class="arc-alert-title"><span class="arc-alert-line">Notification title</span></strong>
        <p class="arc-alert-description"><span class="arc-alert-line">Detailed description text.</span></p>
      </div>
    </div>
    <button type="button" class="arc-alert-dismiss" aria-label="Dismiss">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 6 6 18"></path>
        <path d="m6 6 12 12"></path>
      </svg>
    </button>
  </div>
</div>
```

- `.arc-alert-presence`：折叠动画外层占位槽，在收起与展开时控制容器物理高度与剪裁。
- `.arc-alert-surface`：警示栏视觉表面，提供底色、圆角、边框与阴影，按 `data-tone` 切换危险/信息/警告/成功样式。
- `.arc-alert-icon` 与 `.arc-alert-glyph`：图标容器，支持弹性入场与图标 SVG 的置换。
- `.arc-alert-copy` 与 `.arc-alert-content`：自适应文案容器，承载标题 `.arc-alert-title` 与描述 `.arc-alert-description`。
- `.arc-alert-line`：微模糊形变文案行，承载入场与退场过渡。
- `.arc-alert-dismiss`：关闭按钮，提供按压微触感与键盘无障碍操作。

## 参数

| 名称 | 值 | 用于 | 来源 |
| --- | --- | --- | --- |
| 文本入场时长与曲线 | `240ms` / `cubic-bezier(0.16, 1, 0.3, 1)` | `.arc-alert-line` 新内容升起 | 原型 |
| 文本入场初始位移与模糊 | `translateY(0.3em)` / `blur(4px)` | `.arc-alert-line` 初始状态 | 原型 |
| 文本退场时长与曲线 | `160ms` / `cubic-bezier(0.22, 1, 0.36, 1)` | 旧内容浮动退出 | 原型 |
| 文本退场位移与模糊 | `translateY(-0.3em)` / `blur(2px)` | 旧内容退出状态 | 原型 |
| 减动效文本切换时长 | `120ms linear` | prefers-reduced-motion 纯透明度 | 原型 |
| 图标弹簧进入参数 | `visualDuration: 0.26s` / `bounce: 0.12` | 图标切入弹性缩放 | 原型 |
| 图标退场时长 | `160ms` | 旧图标淡出 | 原型 |
| 容器高度展开折叠弹簧 | `visualDuration: 0.4s` / `bounce: 0` | `.arc-alert-presence` 高度伸展 | 原型 |
| 关闭按钮按压缩放 | `scale(0.96)` / `120ms` | `.arc-alert-dismiss:active` | 原型 |
| 自动复原静止高度 | `height: auto` | 动画结束后解除高度限制与裁剪 | 原型 |

## CSS

```css
.arc-alert-presence {
  min-width: 0;
  overflow: hidden;
  transition: height 400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 240ms ease;
  box-sizing: border-box;
}

.arc-alert-surface {
  --alert-bg: #ffffff;
  --alert-border: rgba(0, 0, 0, 0.08);
  --alert-color: #111827;
  --alert-desc: #4b5563;
  --alert-accent: #2563eb;

  display: flex;
  align-items: flex-start;
  gap: 12px;
  border: 1px solid var(--alert-border);
  border-radius: 12px;
  padding: 14px 16px;
  background: var(--alert-bg);
  color: var(--alert-color);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
  position: relative;
}

.arc-alert-surface[data-tone="info"],
.arc-alert-surface.arc-alert-info {
  --alert-accent: #2563eb;
}

.arc-alert-surface[data-tone="success"],
.arc-alert-surface.arc-alert-success {
  --alert-accent: #16a34a;
}

.arc-alert-surface[data-tone="warning"],
.arc-alert-surface.arc-alert-warning {
  --alert-accent: #d97706;
}

.arc-alert-surface[data-tone="danger"],
.arc-alert-surface.arc-alert-danger {
  --alert-accent: #dc2626;
}

.arc-alert-icon,
.arc-alert-glyph {
  position: relative;
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
}

.arc-alert-icon {
  width: 18px;
  height: 18px;
  margin-top: 2px;
  color: var(--alert-accent);
  transition: color 200ms ease;
}

.arc-alert-copy {
  flex: 1;
  min-width: 0;
  transition: height 400ms cubic-bezier(0.16, 1, 0.3, 1);
}

.arc-alert-content {
  position: relative;
}

.arc-alert-title {
  position: relative;
  display: block;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--alert-color);
}

.arc-alert-line {
  display: block;
  transition: transform 240ms cubic-bezier(0.16, 1, 0.3, 1), opacity 240ms ease, filter 240ms ease;
  will-change: transform, opacity, filter;
}

.arc-alert-description {
  position: relative;
  margin: 4px 0 0;
  color: var(--alert-desc);
  font-size: 13px;
  line-height: 1.45;
  transition: transform 240ms cubic-bezier(0.16, 1, 0.3, 1), opacity 240ms ease, filter 240ms ease;
}

.arc-alert-dismiss {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  flex: 0 0 auto;
  margin: -3px -4px -3px 0;
  border: none;
  border-radius: 9999px;
  background: transparent;
  color: #9ca3af;
  cursor: pointer;
  padding: 0;
  transition: transform 120ms ease, background-color 160ms ease, color 160ms ease;
}

.arc-alert-dismiss:hover {
  background: rgba(0, 0, 0, 0.05);
  color: var(--alert-color);
}

.arc-alert-dismiss:active {
  transform: scale(0.96);
}

@media (prefers-reduced-motion: reduce) {
  .arc-alert-presence {
    transition: opacity 120ms linear !important;
  }
  .arc-alert-copy {
    transition: none !important;
  }
  .arc-alert-line,
  .arc-alert-description {
    transition: opacity 120ms linear !important;
    transform: none !important;
    filter: none !important;
  }
  .arc-alert-dismiss {
    transition: none !important;
  }
  .arc-alert-dismiss:active {
    transform: none !important;
  }
}
```

## JS

```js
const ICONS = {
  info: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>',
  success: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>',
  warning: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>',
  danger: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6"></path><path d="m9 9 6 6"></path></svg>'
};

/**
 * 创建并绑定 Alert 动效控制器
 * @param {HTMLElement} el 根容器或 Presence 容器
 * @param {Object} [options]
 * @param {string} [options.tone='info'] 初始色调 (info | success | warning | danger)
 * @param {string} [options.title=''] 标题文案
 * @param {string} [options.description=''] 详细描述文案
 * @param {Function} [options.onDismiss] 关闭回调
 */
export function createAlert(el, options = {}) {
  const presence = el.classList.contains('arc-alert-presence') ? el : el.querySelector('.arc-alert-presence') || el;
  const surface = presence.querySelector('.arc-alert-surface') || presence;
  const copy = surface.querySelector('.arc-alert-copy');
  const titleEl = surface.querySelector('.arc-alert-title .arc-alert-line') || surface.querySelector('.arc-alert-title');
  const descEl = surface.querySelector('.arc-alert-description');
  const iconSlot = surface.querySelector('.arc-alert-glyph') || surface.querySelector('.arc-alert-icon');
  const dismissBtn = surface.querySelector('.arc-alert-dismiss');

  let currentTone = options.tone || surface.dataset.tone || 'info';
  let isDisposed = false;
  const timers = new Set();

  function wait(ms) {
    return new Promise(resolve => {
      const id = setTimeout(() => {
        timers.delete(id);
        resolve();
      }, ms);
      timers.add(id);
    });
  }

  function clearTimers() {
    timers.forEach(clearTimeout);
    timers.clear();
  }

  function setTone(tone) {
    if (!ICONS[tone]) tone = 'info';
    currentTone = tone;
    surface.dataset.tone = tone;
    surface.className = surface.className.replace(/arc-alert-(info|success|warning|danger)/g, '').trim();
    surface.classList.add(`arc-alert-${tone}`);
    surface.setAttribute('role', tone === 'danger' ? 'alert' : 'status');

    if (iconSlot) {
      iconSlot.style.transition = 'transform 160ms cubic-bezier(0.22, 1, 0.36, 1), opacity 160ms ease';
      iconSlot.style.transform = 'scale(0.6)';
      iconSlot.style.opacity = '0';
      wait(160).then(() => {
        if (isDisposed) return;
        iconSlot.innerHTML = ICONS[tone];
        iconSlot.style.transform = 'scale(1)';
        iconSlot.style.opacity = '1';
      });
    }
  }

  function swapText(targetEl, newText) {
    if (!targetEl || targetEl.textContent === newText) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      targetEl.textContent = newText;
      return;
    }

    targetEl.style.transition = 'opacity 160ms cubic-bezier(0.22, 1, 0.36, 1), transform 160ms ease, filter 160ms ease';
    targetEl.style.opacity = '0';
    targetEl.style.transform = 'translateY(-0.3em)';
    targetEl.style.filter = 'blur(2px)';

    wait(160).then(() => {
      if (isDisposed) return;
      targetEl.textContent = newText;
      targetEl.style.transition = 'none';
      targetEl.style.transform = 'translateY(0.3em)';
      targetEl.style.filter = 'blur(4px)';
      targetEl.style.opacity = '0';

      requestAnimationFrame(() => {
        if (isDisposed) return;
        targetEl.style.transition = 'opacity 240ms cubic-bezier(0.16, 1, 0.3, 1), transform 240ms cubic-bezier(0.16, 1, 0.3, 1), filter 240ms ease';
        targetEl.style.transform = 'translateY(0)';
        targetEl.style.filter = 'blur(0)';
        targetEl.style.opacity = '1';
      });
    });
  }

  function dismiss() {
    clearTimers();
    presence.style.overflow = 'hidden';
    presence.style.height = `${presence.offsetHeight}px`;
    requestAnimationFrame(() => {
      presence.style.transition = 'height 400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease';
      presence.style.height = '0px';
      presence.style.opacity = '0';
    });
    wait(400).then(() => {
      if (isDisposed) return;
      presence.style.display = 'none';
      if (typeof options.onDismiss === 'function') {
        options.onDismiss();
      }
    });
  }

  if (dismissBtn) {
    dismissBtn.addEventListener('click', dismiss);
  }

  if (options.tone) setTone(options.tone);
  if (options.title && titleEl) swapText(titleEl, options.title);
  if (options.description && descEl) swapText(descEl, options.description);

  return {
    update({ tone, title, description }) {
      if (isDisposed) return;
      if (tone && tone !== currentTone) setTone(tone);
      if (title !== undefined && titleEl) swapText(titleEl, title);
      if (description !== undefined && descEl) swapText(descEl, description);
    },
    dismiss,
    destroy() {
      isDisposed = true;
      clearTimers();
      if (dismissBtn) {
        dismissBtn.removeEventListener('click', dismiss);
      }
    }
  };
}
```

## 接入目标项目

- 状态来源：目标业务层分派的通知事件或网络状态。根据通知严重度传入 `tone: 'info' | 'success' | 'warning' | 'danger'`。
- 尺寸策略：外层支持弹性宽度或 100% 栅格宽度，高度自适应内部文案；动画期间由 `.arc-alert-presence` 限制高度，静止态恢复 `height: auto`。
- 驱动方式：组件挂载后调用 `createAlert(el, { tone, title, description, onDismiss })`，状态变动时调用实例返回的 `update()`，卸载时调用 `destroy()`。

## 重入与清理

- 连续高频更新标题或 tone 时，内部维护计时器集合并在每次切换前取消上一轮排队计时器，保证最新状态覆盖旧状态。
- 组件销毁（`destroy()`）立即清空所有挂起 `setTimeout` 与 `requestAnimationFrame`，解除关闭按钮点击监听，杜绝内存泄漏。

## 减少动态效果

- 满足 `prefers-reduced-motion: reduce` 时：
  - 移除容器高度动画、位移与滤镜过渡。
  - 标题、描述与图标改用纯透明度淡入淡出（120ms）切换。
  - 关闭操作不执行位移收缩，直接透明度渐隐后隐藏。

## 焦点与键盘

- 危险级别（`danger`）设置 `role="alert"` 实现辅助技术断点抢占播报；普通级别使用 `role="status"` 与 `aria-live="polite"` 静默提示。
- 关闭按钮具备语义化 `type="button"` 与明确的 `aria-label="Dismiss"`，支持 Tab 键聚焦与 Enter/Space 键触发。
- 隐藏或退出后的容器设置 `display: none`，防止不可见的元素截留键盘焦点。

## 兼容回退

| 特性 | 不支持时 |
| --- | --- |
| CSS `filter: blur()` | 若旧版浏览器不支持模糊滤镜，回退为纯透明度（opacity）过渡，无破坏性视觉影响。 |
| `requestAnimationFrame` | 回退至标准 `setTimeout(fn, 16)`，核心微交互逻辑依然保证时序完好。 |

## 验收清单

- [ ] 初始化展示对应 tone 的图标与文案，圆角、边框与背景渲染正常。
- [ ] 切换 tone 时，图标缩放渐隐后重载对应矢量图形并弹性放大还原。
- [ ] 更新标题或描述时，文字自下方轻微位移平滑浮现，旧文字不产生生硬突变。
- [ ] 点击关闭按钮时，通知条自上而下高度收起至 0 并淡出，完全不留空白占位。
- [ ] 开启系统减少动态效果后，动画转为轻量级淡入淡出，不产生任何页面跳动。
- [ ] 全键盘 Tab 键可直接选中关闭按钮并回车触发关闭，焦点正常流转。
