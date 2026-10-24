# UI Motion 共享微原语 (`PRIMITIVES.md`)

> **何时读取本文件**：仅在 **Step 4.5（多组件协同改造，目标组件数 $N \ge 2$，或项目存在公共动画工具模块）** 时读取一次。单组件改造（$N = 1$）无需读取本文件，直接使用对应 `<类别>/<slug>.md` 内的自包含代码即可。

当同一页面或同一项目需要为多个组件接入动效时，将以下 **CSS 核心缓动令牌** 与 **3 个零依赖 JS 微原语** 注入公共层（如全局样式表 / `motion-primitives.js`），各组件直接复用，避免在同一代码库重复拷贝多份物理循环与测量函数。

---

## 1. 核心 CSS 缓动令牌 (Core Easing Tokens)

```css
:root {
  /* 物理回弹阻尼：共享滑块、浮层展开、手风琴、卡片形变 */
  --ease-spring: cubic-bezier(0.22, 1, 0.36, 1);
  /* 干脆响应：按钮按压释放、高亮跟随、拖拽松手归位 */
  --ease-snappy: cubic-bezier(0.16, 1, 0.3, 1);
  /* 标准过渡：背景色、边框色、阴影、不透明度 */
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  /* 退场加速：弹窗关闭、Toast 移除、下拉收起 */
  --ease-exit: cubic-bezier(0.4, 0, 1, 1);
}
```

---

## 2. 二阶弹簧数值求解器 (`createSpring`)

用于驱动滑块越界拉伸、按钮宽度自适应、滚动计数器、拖拽回弹等连续物理量。支持**途中随时改写目标值并继承当前速度**，且内置帧率无关步长钳位（`dt <= 64ms`）。

```javascript
export function createSpring(initialValue = 0, { stiffness = 320, damping = 26, precision = 0.01 } = {}) {
  let value = initialValue;
  let target = initialValue;
  let velocity = 0;
  let rafId = 0;
  let lastTime = 0;
  const listeners = new Set();

  function tick(now) {
    const dt = Math.min((now - lastTime) / 1000, 0.064);
    lastTime = now;

    const force = -stiffness * (value - target) - damping * velocity;
    velocity += force * dt;
    value += velocity * dt;

    if (Math.abs(value - target) <= precision && Math.abs(velocity) <= precision) {
      value = target;
      velocity = 0;
      rafId = 0;
      listeners.forEach((fn) => fn(value, true));
      return;
    }

    listeners.forEach((fn) => fn(value, false));
    rafId = requestAnimationFrame(tick);
  }

  return {
    set(nextTarget, { hard = false } = {}) {
      target = nextTarget;
      if (hard) {
        value = nextTarget;
        velocity = 0;
        if (rafId) cancelAnimationFrame(rafId);
        rafId = 0;
        listeners.forEach((fn) => fn(value, true));
        return;
      }
      if (!rafId) {
        lastTime = performance.now();
        rafId = requestAnimationFrame(tick);
      }
    },
    subscribe(fn) {
      listeners.add(fn);
      fn(value, rafId === 0);
      return () => listeners.delete(fn);
    },
    getValue: () => value,
    stop() {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
    },
  };
}
```

---

## 3. 微模糊无抖动换字 (`swapText`)

用于按钮状态文案切换（如 `Copy` → `Copied`）、计费周期价格变更、原地确认文案过渡。支持配合外层容器平滑变宽，消除文案长短变化引发的硬跳。

```javascript
export function swapText(labelEl, nextText, { containerEl = null, duration = 260 } = {}) {
  if (!labelEl) return;
  // 防呆保护：若传入的 labelEl 就是按钮/外框容器本身，自动包裹内联文本节点，严禁把按钮边框与背景一起设为 opacity: 0
  let textTarget = labelEl;
  if (labelEl === containerEl || labelEl.tagName === 'BUTTON') {
    let inner = labelEl.querySelector(':scope > [data-swap-inner]');
    if (!inner) {
      inner = document.createElement('span');
      inner.setAttribute('data-swap-inner', '');
      inner.style.display = 'inline-block';
      inner.textContent = labelEl.textContent;
      labelEl.textContent = '';
      labelEl.appendChild(inner);
    }
    textTarget = inner;
  }

  if (textTarget.textContent === nextText) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    textTarget.textContent = nextText;
    return;
  }

  const outDuration = Math.round(duration * 0.42);
  const inDuration = Math.round(duration * 0.68);
  if (containerEl) {
    const prevWidth = containerEl.getBoundingClientRect().width;
    const prevText = textTarget.textContent;
    const prevTransition = containerEl.style.transition;
    containerEl.style.transition = 'none';
    containerEl.style.width = 'max-content';
    textTarget.textContent = nextText;
    const nextWidth = Math.ceil(containerEl.getBoundingClientRect().width);
    textTarget.textContent = prevText;
    containerEl.style.width = `${prevWidth}px`;
    void containerEl.offsetWidth;
    containerEl.style.transition = prevTransition || `width ${Math.round(duration * 1.4)}ms var(--ease-spring, cubic-bezier(0.22, 1, 0.36, 1))`;
    containerEl.style.width = `${nextWidth}px`;
  }

  const outAnim = textTarget.animate(
    [
      { opacity: 1, filter: 'blur(0px)', transform: 'translateY(0) scale(1)' },
      { opacity: 0, filter: 'blur(4px)', transform: 'translateY(-4px) scale(0.96)' },
    ],
    { duration: outDuration, easing: 'cubic-bezier(0.4, 0, 1, 1)', fill: 'forwards' }
  );

  outAnim.onfinish = () => {
    textTarget.textContent = nextText;
    outAnim.cancel();
    const inAnim = textTarget.animate(
      [
        { opacity: 0, filter: 'blur(4px)', transform: 'translateY(4px) scale(0.96)' },
        { opacity: 1, filter: 'blur(0px)', transform: 'translateY(0) scale(1)' },
      ],
      { duration: inDuration, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' }
    );
    inAnim.onfinish = () => {
      inAnim.cancel();
      if (containerEl) containerEl.style.width = '';
    };
  };
}
```

---

## 4. 列表增删重排 FLIP 动画 (`flipChildren`)

用于多标签输入框（Tag Input）、过滤胶囊组（Chip Group）、通知堆叠（Toast Stack）、文件上传列表在增删或排序时的平滑补位过渡。

```javascript
export function flipChildren(containerEl, mutateDom, { selector = ':scope > *', duration = 280 } = {}) {
  if (!containerEl) {
    mutateDom();
    return;
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    mutateDom();
    return;
  }

  const firstRects = new Map();
  containerEl.querySelectorAll(selector).forEach((el) => {
    firstRects.set(el, el.getBoundingClientRect());
  });

  mutateDom();

  containerEl.querySelectorAll(selector).forEach((el) => {
    const first = firstRects.get(el);
    const last = el.getBoundingClientRect();
    if (!first) {
      el.animate(
        [
          { opacity: 0, transform: 'scale(0.86)' },
          { opacity: 1, transform: 'scale(1)' },
        ],
        { duration: duration * 0.85, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
      );
      return;
    }
    const dx = first.left - last.left;
    const dy = first.top - last.top;
    if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
      el.animate(
        [
          { transform: `translate3d(${dx}px, ${dy}px, 0)` },
          { transform: 'translate3d(0, 0, 0)' },
        ],
        { duration, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
      );
    }
  });
}
```
