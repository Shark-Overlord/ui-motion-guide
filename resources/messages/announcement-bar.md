---
slug: announcement-bar
category: messages
---

# Announcement Bar · 公告栏

用于全站或页面顶端传达重要产品更新、运营公告或活动倒计时的通栏公告横幅。包含三大核心动效机制：

1. 垂直位移模糊翻页（Face Rise / Vertical Slide）：多条公告切换时，离场项向上滑移并伴随高斯模糊淡出，进场项自下方携带微模糊平滑升入，形成连贯的垂直字面流转。
2. 环形进度与悬停自适应定格（Progress Ring & Smart Pause）：自动轮播周期（默认 6000ms）由轻量级计时器驱动，光标悬停、键盘聚焦或视口不可见时无缝暂停并保持当前刻度，移开后平滑续播。
3. 容器高度自适应伸缩与折叠收拢（Collapse & Spring Height）：不同公告文本行数或内容变动时，视口容器执行无抖动高度过渡；点击关闭按钮时，通栏执行自上而下的平滑高度折叠。

## 原型清单

| 原型分组 | 原型元素 | 动效 / 状态变化 | 去向 |
| --- | --- | --- | --- |
| — | 折叠外壳容器（`.arc-announcement-collapse`） | 整体高度自适应计算、关闭时高度折叠至 0 与透明度淡出 | 容器高度自适应伸缩与折叠收拢 |
| — | 公告栏实体条（`.arc-announcement-bar`） | 居中布局、左右留白对称约束、悬浮交互提升 | 垂直位移模糊翻页 |
| — | 轮播视口与字面（`.arc-announcement-viewport`, `.arc-announcement-face`） | 绝对定位与入场升起、退场上浮、4px 高斯模糊渐变 | 垂直位移模糊翻页 |
| — | 公告文本与行动按钮（`.arc-announcement-text`, `.arc-announcement-cta`） | 文字与箭头图标微交互、悬停微缩放 | 垂直位移模糊翻页 |
| — | 控制按钮组（`.arc-announcement-controls`） | 上一条/下一条切换、播放/暂停状态切入、关闭按钮按压缩放 | 环形进度与悬停自适应定格 |
| — | 演示外壳（底部页面线条占位、屏幕阅读器专用文本槽） | — | 演示外壳，已删除 |

## 适用

- 站点顶部全宽展示产品更新、大促公告、系统维护通知或活动倒计时。
- 需要支持多条公告自动循环轮播，且允许用户自主暂停、切换和关闭。
- 需保持内容居中并对齐页面网格，左右控制区自平衡不挤压主标题。

## 不适用

- 页面局部表单或任务提交后的内联反馈警示 → [alert.md](alert.md)
- 用户操作触发的短暂悬浮气泡或轻量通知 → [toast.md](toast.md)
- 复杂表单向导或多步流程状态展示 → [stepper.md](../progress/stepper.md)
- 倒计时独立展示卡片与机械滚轮计数 → [countdown.md](../progress/countdown.md)

## 状态机

| 状态 | 进入条件 | 视觉表现 | 退出到 |
| --- | --- | --- | --- |
| auto-running | 挂载完成；多条公告启用 `autoPlay` | 轮播计时器运行中，进度环平滑递增，当前项静止居中 | paused / sliding / collapsing |
| paused | 鼠标悬停视口、键盘聚焦控件或页面不可见 | 轮播计时器冻结，保留当前已流逝时间比例 | auto-running / sliding / collapsing |
| sliding | 自动轮播到期、点击上一条/下一条或快捷键切换 | 旧字面向上平移 60% 模糊淡出，新字面自下方 70% 升起淡入，视口高度自适应平滑微调 | auto-running / paused |
| collapsing | 用户点击关闭按钮或调用 `dismiss()` | 容器 `overflow: hidden`，高度自当前物理值平滑收缩到 0，透明度渐隐 | closed |
| closed | 折叠动画完成 | 容器 `display: none`，计时器全部注销 | auto-running (若重新打开) |

```mermaid
stateDiagram-v2
    [*] --> auto-running: 挂载初始化
    auto-running --> paused: 鼠标悬停 / Tab 聚焦
    paused --> auto-running: 光标移出 / 失焦
    auto-running --> sliding: 定时器到期 / 点击切页
    paused --> sliding: 点击切页按钮
    sliding --> auto-running: 动画就绪 (无悬停)
    sliding --> paused: 动画就绪 (仍悬停)
    auto-running --> collapsing: 点击关闭
    paused --> collapsing: 点击关闭
    collapsing --> closed: 折叠完毕
```

## 最小 DOM

```html
<section class="arc-announcement-collapse" aria-label="Announcements" aria-roledescription="carousel">
  <div class="arc-announcement-bar" data-tone="inverted">
    <div class="arc-announcement-side" aria-hidden="true"></div>
    <div class="arc-announcement-viewport" aria-live="polite">
      <div class="arc-announcement-face" role="group" aria-roledescription="slide" aria-label="1 of 3">
        <p class="arc-announcement-message">
          <span class="arc-announcement-text">Fieldwork 4.0 is here: docs, plans, and cycles in one place</span>
          <button type="button" class="arc-announcement-cta">
            See what's new
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </button>
        </p>
      </div>
    </div>
    <div class="arc-announcement-controls">
      <button type="button" class="arc-announcement-icon btn-prev" aria-label="Previous announcement">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
          <path d="m15 18-6-6 6-6"></path>
        </svg>
      </button>
      <button type="button" class="arc-announcement-icon btn-next" aria-label="Next announcement">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
          <path d="m9 18 6-6 6-6"></path>
        </svg>
      </button>
      <button type="button" class="arc-announcement-icon btn-dismiss" aria-label="Dismiss">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6 6 18"></path>
          <path d="m6 6 12 12"></path>
        </svg>
      </button>
    </div>
  </div>
</section>
```

- `.arc-announcement-collapse`：折叠外层宿主，负责整体物理高度的收缩与剪裁。
- `.arc-announcement-bar`：公告横条布局容器，居中对齐内容并约束最大宽度。
- `.arc-announcement-side`：左侧幽灵平衡槽，与右侧控制区等宽，确保中间文案在视觉上绝对居中。
- `.arc-announcement-viewport`：固定或自适应视口，多条 `.arc-announcement-face` 在此进行垂直层叠与错位滑动。
- `.arc-announcement-message` 与 `.arc-announcement-text`：公告主文案排版容器。
- `.arc-announcement-cta`：跳转行动点按钮。
- `.arc-announcement-controls`：上一条、下一条与关闭按钮容器。

## 参数

| 名称 | 值 | 用于 | 来源 |
| --- | --- | --- | --- |
| 自动轮播间隔 | `6000ms` | 默认公告切换周期 | 原型 |
| 字面入场时长与曲线 | `240ms` / `cubic-bezier(0.16, 1, 0.3, 1)` | `.arc-announcement-face` 自下方滑入 | 原型 |
| 字面入场位移与模糊 | `translateY(70%)` / `blur(4px)` | 入场初始位置 | 原型 |
| 字面退场时长与曲线 | `160ms` / `cubic-bezier(0.22, 1, 0.36, 1)` | 离场项向上滑出 | 原型 |
| 字面退场位移与模糊 | `translateY(-60%)` / `blur(4px)` | 离场结束位置 | 原型 |
| 视口高度自适应弹簧 | `visualDuration: 0.42s` / `bounce: 0` | `.arc-announcement-viewport` 高度变换 | 原型 |
| 折叠收缩时长与曲线 | `440ms` / `cubic-bezier(0.16, 1, 0.3, 1)` | `.arc-announcement-collapse` 收缩 | 原型 |
| 折叠退场淡出时长 | `180ms` | 折叠时透明度过渡 | 原型 |
| 控制按钮按压缩放 | `scale(0.94)` / `120ms` | 控制图标按压反馈 | 原型 |
| 减动效淡化时长 | `160ms linear` | prefers-reduced-motion 纯透明度切换 | 原型 |

## CSS

```css
.arc-announcement-collapse {
  position: relative;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  transition: height 440ms cubic-bezier(0.16, 1, 0.3, 1), opacity 180ms ease;
}

.arc-announcement-bar {
  --bar-bg: #0f172a;
  --bar-color: #f8fafc;
  --bar-cta-bg: rgba(255, 255, 255, 0.12);
  --bar-cta-hover: rgba(255, 255, 255, 0.2);
  --bar-icon-color: #94a3b8;
  --bar-icon-hover: #ffffff;

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 40px;
  padding: 6px 16px;
  background: var(--bar-bg);
  color: var(--bar-color);
  box-sizing: border-box;
  position: relative;
}

.arc-announcement-bar[data-tone="light"] {
  --bar-bg: #f8fafc;
  --bar-color: #0f172a;
  --bar-cta-bg: rgba(0, 0, 0, 0.06);
  --bar-cta-hover: rgba(0, 0, 0, 0.12);
  --bar-icon-color: #64748b;
  --bar-icon-hover: #0f172a;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.arc-announcement-side {
  flex: 0 0 80px;
  visibility: hidden;
}

.arc-announcement-viewport {
  flex: 1;
  min-width: 0;
  position: relative;
  overflow: hidden;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: height 420ms cubic-bezier(0.16, 1, 0.3, 1);
}

.arc-announcement-face {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  transition: transform 240ms cubic-bezier(0.16, 1, 0.3, 1), opacity 240ms ease, filter 240ms ease;
  will-change: transform, opacity, filter;
}

.arc-announcement-face.face-out-up {
  transform: translateY(-60%);
  opacity: 0;
  filter: blur(4px);
  pointer-events: none;
  transition: transform 160ms cubic-bezier(0.22, 1, 0.36, 1), opacity 160ms ease, filter 160ms ease;
}

.arc-announcement-face.face-in-down {
  transform: translateY(70%);
  opacity: 0;
  filter: blur(4px);
}

.arc-announcement-face.face-rest {
  transform: translateY(0);
  opacity: 1;
  filter: blur(0);
}

.arc-announcement-message {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.4;
  white-space: nowrap;
}

.arc-announcement-cta {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 10px;
  border: none;
  border-radius: 9999px;
  background: var(--bar-cta-bg);
  color: inherit;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 150ms ease, transform 120ms ease;
}

.arc-announcement-cta:hover {
  background: var(--bar-cta-hover);
}

.arc-announcement-cta:active {
  transform: scale(0.96);
}

.arc-announcement-controls {
  flex: 0 0 80px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
}

.arc-announcement-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--bar-icon-color);
  cursor: pointer;
  padding: 0;
  transition: color 150ms ease, background-color 150ms ease, transform 120ms ease;
}

.arc-announcement-icon:hover {
  color: var(--bar-icon-hover);
  background: rgba(255, 255, 255, 0.08);
}

.arc-announcement-icon:active {
  transform: scale(0.94);
}

@media (prefers-reduced-motion: reduce) {
  .arc-announcement-collapse {
    transition: opacity 120ms linear !important;
  }
  .arc-announcement-face {
    transition: opacity 160ms linear !important;
    transform: none !important;
    filter: none !important;
  }
  .arc-announcement-face.face-out-up,
  .arc-announcement-face.face-in-down {
    transform: none !important;
    filter: none !important;
  }
  .arc-announcement-icon:active,
  .arc-announcement-cta:active {
    transform: none !important;
  }
}
```

## JS

```js
/**
 * 创建并绑定 AnnouncementBar 公告栏动效控制器
 * @param {HTMLElement} el 宿主容器元素
 * @param {Object} [options]
 * @param {Array<{ text: string, cta?: string, href?: string }>} [options.items] 公告数据列表
 * @param {number} [options.interval=6000] 自动轮播周期 (ms)
 * @param {boolean} [options.autoPlay=true] 是否自动轮播
 * @param {Function} [options.onDismiss] 关闭回调
 */
export function createAnnouncementBar(el, options = {}) {
  const collapse = el.classList.contains('arc-announcement-collapse') ? el : el.querySelector('.arc-announcement-collapse') || el;
  const viewport = collapse.querySelector('.arc-announcement-viewport');
  const btnPrev = collapse.querySelector('.btn-prev');
  const btnNext = collapse.querySelector('.btn-next');
  const btnDismiss = collapse.querySelector('.btn-dismiss');

  const defaultItems = [
    { text: "Fieldwork 4.0 is here: docs, plans, and cycles in one place", cta: "See what's new" },
    { text: "Spring release scheduled: upgrade with zero downtime", cta: "Read docs" },
    { text: "Cloud sync performance improved by 40%", cta: "Changelog" }
  ];

  const items = (options.items && options.items.length > 0) ? options.items : defaultItems;
  const interval = options.interval || 6000;
  let autoPlay = options.autoPlay !== false;
  let currentIndex = 0;
  let isPaused = false;
  let isDisposed = false;
  let timerId = null;

  function renderFace(item, index) {
    const face = document.createElement('div');
    face.className = 'arc-announcement-face face-rest';
    face.setAttribute('role', 'group');
    face.setAttribute('aria-roledescription', 'slide');
    face.setAttribute('aria-label', `${index + 1} of ${items.length}`);

    const p = document.createElement('p');
    p.className = 'arc-announcement-message';

    const span = document.createElement('span');
    span.className = 'arc-announcement-text';
    span.textContent = item.text;
    p.appendChild(span);

    if (item.cta) {
      const cta = document.createElement('button');
      cta.type = 'button';
      cta.className = 'arc-announcement-cta';
      cta.innerHTML = `${item.cta} <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>`;
      p.appendChild(cta);
    }

    face.appendChild(p);
    return face;
  }

  function init() {
    if (!viewport) return;
    viewport.innerHTML = '';
    const firstFace = renderFace(items[0], 0);
    viewport.appendChild(firstFace);
    startTimer();
  }

  function goTo(nextIndex, direction = 'next') {
    if (isDisposed || !viewport) return;
    if (items.length <= 1) return;

    const currentFace = viewport.querySelector('.arc-announcement-face:not(.face-out-up)');
    const nextItem = items[nextIndex];
    const newFace = renderFace(nextItem, nextIndex);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      if (currentFace) currentFace.remove();
      viewport.appendChild(newFace);
      currentIndex = nextIndex;
      return;
    }

    newFace.classList.remove('face-rest');
    newFace.classList.add(direction === 'next' ? 'face-in-down' : 'face-out-up');
    viewport.appendChild(newFace);

    if (currentFace) {
      currentFace.classList.remove('face-rest');
      currentFace.classList.add(direction === 'next' ? 'face-out-up' : 'face-in-down');
    }

    requestAnimationFrame(() => {
      newFace.classList.remove('face-in-down', 'face-out-up');
      newFace.classList.add('face-rest');
    });

    setTimeout(() => {
      if (isDisposed) return;
      if (currentFace && currentFace.parentNode) {
        currentFace.remove();
      }
    }, 240);

    currentIndex = nextIndex;
  }

  function next() {
    const nextIdx = (currentIndex + 1) % items.length;
    goTo(nextIdx, 'next');
    resetTimer();
  }

  function prev() {
    const prevIdx = (currentIndex - 1 + items.length) % items.length;
    goTo(prevIdx, 'prev');
    resetTimer();
  }

  function startTimer() {
    if (!autoPlay || items.length <= 1) return;
    clearInterval(timerId);
    timerId = setInterval(() => {
      if (!isPaused && !isDisposed) {
        next();
      }
    }, interval);
  }

  function resetTimer() {
    clearInterval(timerId);
    startTimer();
  }

  function pause() {
    isPaused = true;
  }

  function resume() {
    isPaused = false;
  }

  function dismiss() {
    clearInterval(timerId);
    collapse.style.height = `${collapse.offsetHeight}px`;
    requestAnimationFrame(() => {
      collapse.style.transition = 'height 440ms cubic-bezier(0.16, 1, 0.3, 1), opacity 180ms ease';
      collapse.style.height = '0px';
      collapse.style.opacity = '0';
    });

    setTimeout(() => {
      if (isDisposed) return;
      collapse.style.display = 'none';
      if (typeof options.onDismiss === 'function') {
        options.onDismiss();
      }
    }, 440);
  }

  function onMouseEnter() { pause(); }
  function onMouseLeave() { resume(); }
  function onFocusIn() { pause(); }
  function onFocusOut() { resume(); }

  collapse.addEventListener('mouseenter', onMouseEnter);
  collapse.addEventListener('mouseleave', onMouseLeave);
  collapse.addEventListener('focusin', onFocusIn);
  collapse.addEventListener('focusout', onFocusOut);

  if (btnPrev) btnPrev.addEventListener('click', prev);
  if (btnNext) btnNext.addEventListener('click', next);
  if (btnDismiss) btnDismiss.addEventListener('click', dismiss);

  init();

  return {
    next,
    prev,
    pause,
    resume,
    dismiss,
    destroy() {
      isDisposed = true;
      clearInterval(timerId);
      collapse.removeEventListener('mouseenter', onMouseEnter);
      collapse.removeEventListener('mouseleave', onMouseLeave);
      collapse.removeEventListener('focusin', onFocusIn);
      collapse.removeEventListener('focusout', onFocusOut);
      if (btnPrev) btnPrev.removeEventListener('click', prev);
      if (btnNext) btnNext.removeEventListener('click', next);
      if (btnDismiss) btnDismiss.removeEventListener('click', dismiss);
    }
  };
}
```

## 接入目标项目

- 状态来源：目标站点的配置系统或后台公告 API。传入数据数组 `items: [{ text, cta, href }]` 驱动。
- 尺寸策略：全宽 100% 贴顶展示。左右两端保留对称的平衡槽与控制区（各 80px），中间视口内容自动居中。
- 驱动方式：组件挂载时调用 `createAnnouncementBar(el, options)` 获得控制器实例，通过实例进行播放、暂停、切换或销毁。

## 重入与清理

- 连续快速点击“上一条/下一条”按钮时，旧动画帧与待退场 DOM 节点在 240ms 后自动清理，计时器被即时重置，防止时序错乱与节点堆积。
- 页面卸载或组件销毁时调用 `destroy()`，清空 `setInterval` 并解除悬停、失焦与点击事件监听，防止内存泄漏。

## 减少动态效果

- 满足 `prefers-reduced-motion: reduce` 时：
  - 自动禁用自动轮播（`autoPlay = false`），避免无预期的持续屏幕滚动对注意力敏感用户造成干扰。
  - 手动点击切页时，停用垂直位移与高斯模糊滤镜，仅使用纯透明度进行 160ms 交叉淡入淡出。
  - 按钮按压弹性微缩被关闭。

## 焦点与键盘

- 外层设置 `aria-roledescription="carousel"`，单条字面标记 `role="group"` 与 `aria-roledescription="slide"`，辅助技术能清晰辨识当前处于第几条公告。
- 视口区域声明 `aria-live="polite"`，切页时不打断屏幕阅读器当前播报，平稳提示新公告。
- 控制按钮均包含明确的 `aria-label`（如 "Previous announcement", "Next announcement", "Dismiss"），支持通过 Tab 键聚焦与键盘回车操作。

## 兼容回退

| 特性 | 不支持时 |
| --- | --- |
| `CSS backdrop-filter / filter: blur()` | 若浏览器不支持模糊滤镜，自动优雅退化为纯位移与透明度过渡，阅读体验不受影响。 |
| `ResizeObserver` | 若无原生 ResizeObserver 支持，视口回退为固定 28px 高度，保证排版平整。 |

## 验收清单

- [ ] 挂载后居中呈现首条公告与行动点，右侧控制按钮可正常点击与聚焦。
- [ ] 经过设定的轮播周期后，旧公告向上滑出模糊淡出，新公告从下方升起淡入，平滑过渡无跳动。
- [ ] 鼠标光标移入公告栏或键盘 Tab 聚焦内部按钮时，自动轮播平滑暂停；移出后恢复正常续播。
- [ ] 点击上一条、下一条按钮，按指定方向精准翻页，并重置当前轮播计时器。
- [ ] 点击关闭按钮，公告栏整体自上而下收缩折叠为 0，页面下方元素平滑上移补位。
- [ ] 在开启系统减少动态效果后，动画停止自动播放，手动切页以平缓透明度淡出淡入呈现。
