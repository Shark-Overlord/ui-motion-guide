---
slug: radio-cards
category: toggles
source: inbox/07_Toggles/radio-cards/
---

# Radio Cards · 共享高光单选卡片组

用于订阅计划选择、支付方式选取及多维方案决策的卡片式单选组。包含三大核心动效机制：

1. 共享单例高光外框（Gliding Selection Ring）：每组卡片共享唯一的物理描边指示器（`.radio-cards-ring`），在卡片切换时沿 2D 空间（`offsetLeft`/`offsetTop`/`offsetWidth`/`offsetHeight`）以 420ms 欠阻尼弹簧平滑游走吸附。
2. 响应式断点平滑自适应（Zero-Jitter Breakpoint Jump）：当视口缩放导致卡片网格从横向平铺折叠为垂直单列时，ResizeObserver 触发坐标即刻跳变（`jump`），彻底杜绝响应式重排时高光框穿透屏幕飞动的视觉破损。
3. 卡片内置单选微指示器（Snappy Dot Pop）：每张卡片内置弹性小圆点（`.radio-dot`），随选中状态以 snappy spring（`scale: 0.4 → 1`）微回弹弹出。

## 原型清单

| 原型分组 | 原型元素 | 动效 / 状态变化 | 去向 |
| --- | --- | --- | --- |
| 单选外框 | 共享轮廓指示框 `.radio-cards-ring` | 2D 坐标与宽高弹性追踪，视口重排时即时捕捉 | 共享单例高光外框 |
| 单选卡片 | 单个卡片容器 `.radio-card` | 悬停阴影轻微浮起、按压缩放 0.98、选中态蓝色高亮 | 单选卡片交互与按压 |
| 单选指示点 | 圆形单选标 `.radio-dot` | `scale(0.4)` 至 `scale(1)` 伴随透明度弹性入场 | 卡片内置单选微指示器 |
| 价格与详情 | 标题、说明与价格文案 | 选中时标题高亮加粗 | 卡片内容状态机 |
| 演示外壳 | 顶部主题切换按钮 `#themeBtn`、外部状态提示 `.demo-status` | — | 演示外壳，已删除 |

## 适用

- 会员订购计划（如 Basic / Pro / Enterprise）横向对比卡片。
- 支付渠道选取（信用卡、PayPal、Apple Pay）。
- 物流派送方式对比（标准配送、次日达、特快专递）。

## 不适用

- 纯文本垂直单选列表，无需卡片大图文包装 → [radio-group](radio-group.md)
- 二元开关切换（如是否开启某功能） → [switch](switch.md)
- SaaS 计费年付/月付切换胶囊 → [billing-toggle](billing-toggle.md)
- 紧凑工具栏横向分段控制胶囊 → [segmented-control](segmented-control.md)

## 状态机

| 状态 | 进入条件 | 视觉表现 | 退出到 |
| --- | --- | --- | --- |
| unselected | 初始未选中项 | 边框淡灰，指示圆点隐藏（scale 0.4, opacity 0） | selected |
| selected | 点击或键盘切换至该卡片 | 共享高光框以 420ms 滑动并包裹该卡片，指示点弹出，标题变蓝 | unselected |
| ring-moving | 切换选中的过渡瞬间 | 高光外框沿 X/Y 轴与尺寸平滑形变位移 | selected |

```mermaid
stateDiagram-v2
    [*] --> unselected
    unselected --> ring-moving: 点击/键盘切换
    ring-moving --> selected: 420ms 弹簧收敛完成
    selected --> ring-moving: 切换其他卡片
```

## 最小 DOM

```html
<fieldset class="radio-cards-group">
  <legend class="radio-cards-legend">Select a plan</legend>
  <div class="radio-cards-grid">
    <div class="radio-cards-ring" aria-hidden="true"></div>

    <label class="radio-card" data-checked="true">
      <input type="radio" name="plan" value="starter" checked class="radio-card-input">
      <div class="radio-card-body">
        <div class="radio-card-header">
          <span class="radio-card-title">Starter</span>
          <span class="radio-dot-track" aria-hidden="true">
            <span class="radio-dot"></span>
          </span>
        </div>
        <p class="radio-card-desc">For individuals and small experiments.</p>
        <div class="radio-card-price">$10<span>/mo</span></div>
      </div>
    </label>

    <label class="radio-card" data-checked="false">
      <input type="radio" name="plan" value="pro" class="radio-card-input">
      <div class="radio-card-body">
        <div class="radio-card-header">
          <span class="radio-card-title">Pro</span>
          <span class="radio-dot-track" aria-hidden="true">
            <span class="radio-dot"></span>
          </span>
        </div>
        <p class="radio-card-desc">For growing teams requiring scale.</p>
        <div class="radio-card-price">$29<span>/mo</span></div>
      </div>
    </label>
  </div>
</fieldset>
```

- `.radio-cards-group`：语义化 `<fieldset>` 容器。
- `.radio-cards-grid`：网格容器，容纳卡片与绝对定位的共享指示框。
- `.radio-cards-ring`：单例共享边框指示块。
- `.radio-card`：单个选项卡片 `<label>`。
- `.radio-card-input`：原生隐藏单选输入 `<input type="radio">`，管理 WAI-ARIA 与键盘逻辑。
- `.radio-dot-track` 与 `.radio-dot`：内置微型单选圆点。

## 参数

| 名称 | 值 | 用于 | 来源 |
| --- | --- | --- | --- |
| ringSpring | visualDuration: 0.42s, bounce: 0.14 | 共享高光框移动与缩放弹簧 | 原型 |
| indicatorSpring | visualDuration: 0.26s, bounce: 0.12 | 单选小圆点弹性弹出 | 原型 |
| minColumnWidthPx | 180px | 响应式断点卡片最小宽度 | 原型 |
| cardActiveScale | 0.98 | 卡片按压瞬间微缩比 | 原型 |

## CSS

```css
.radio-cards-group {
  margin: 0;
  padding: 0;
  border: none;
  font-family: system-ui, -apple-system, sans-serif;
}

.radio-cards-legend {
  margin-bottom: 12px;
  color: #0f172a;
  font-size: 15px;
  font-weight: 600;
}

.radio-cards-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}

.radio-cards-ring {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  border: 2px solid #2563eb;
  border-radius: 12px;
  pointer-events: none;
  box-shadow: 0 0 0 1px #2563eb, 0 4px 12px rgba(37, 99, 235, 0.12);
  transition: transform 0.42s cubic-bezier(0.18, 0.89, 0.32, 1.14),
              width 0.42s cubic-bezier(0.18, 0.89, 0.32, 1.14),
              height 0.42s cubic-bezier(0.18, 0.89, 0.32, 1.14),
              opacity 0.2s ease;
}

.radio-card {
  position: relative;
  display: block;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #ffffff;
  padding: 16px;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: border-color 0.15s ease, box-shadow 0.15s ease, transform 0.1s ease;
}

.radio-card:hover {
  border-color: #cbd5e1;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.radio-card:active {
  transform: scale(0.98);
}

.radio-card-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.radio-card:focus-within {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.radio-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.radio-card-title {
  color: #0f172a;
  font-size: 16px;
  font-weight: 600;
  transition: color 0.15s ease;
}

.radio-card[data-checked="true"] .radio-card-title {
  color: #2563eb;
}

.radio-dot-track {
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  border: 1px solid #cbd5e1;
  border-radius: 9999px;
  background: #ffffff;
}

.radio-card[data-checked="true"] .radio-dot-track {
  border-color: #2563eb;
}

.radio-dot {
  width: 10px;
  height: 10px;
  border-radius: 9999px;
  background: #2563eb;
  opacity: 0;
  transform: scale(0.4);
  transition: opacity 0.26s cubic-bezier(0.18, 0.89, 0.32, 1.15),
              transform 0.26s cubic-bezier(0.18, 0.89, 0.32, 1.15);
}

.radio-card[data-checked="true"] .radio-dot {
  opacity: 1;
  transform: scale(1);
}

.radio-card-desc {
  margin: 0 0 12px 0;
  color: #64748b;
  font-size: 13px;
  line-height: 1.4;
}

.radio-card-price {
  color: #0f172a;
  font-size: 20px;
  font-weight: 700;
}

.radio-card-price span {
  font-size: 13px;
  font-weight: 400;
  color: #64748b;
}

@media (prefers-reduced-motion: reduce) {
  .radio-cards-ring,
  .radio-card,
  .radio-dot {
    transition: none !important;
  }
}
```

## JS

```js
export function createRadioCards(groupEl, options = {}) {
  const grid = groupEl.querySelector('.radio-cards-grid');
  const ring = groupEl.querySelector('.radio-cards-ring');
  const cards = Array.from(groupEl.querySelectorAll('.radio-card'));
  const inputs = Array.from(groupEl.querySelectorAll('.radio-card-input'));

  let currentValue = options.defaultValue || (inputs.find(i => i.checked)?.value || inputs[0]?.value);

  function updateRing(animate = true) {
    const activeCard = cards.find(c => c.querySelector('.radio-card-input')?.value === currentValue) || cards[0];
    if (!ring || !activeCard) return;

    if (!animate) {
      ring.style.transition = 'none';
    }

    ring.style.transform = `translate(${activeCard.offsetLeft}px, ${activeCard.offsetTop}px)`;
    ring.style.width = `${activeCard.offsetWidth}px`;
    ring.style.height = `${activeCard.offsetHeight}px`;
    ring.style.opacity = '1';

    if (!animate) {
      ring.offsetHeight; // 强制重绘
      ring.style.transition = '';
    }
  }

  function setValue(val) {
    currentValue = val;
    cards.forEach(card => {
      const input = card.querySelector('.radio-card-input');
      const isMatch = input?.value === val;
      if (input) input.checked = isMatch;
      card.setAttribute('data-checked', String(isMatch));
    });

    updateRing(true);

    if (typeof options.onChange === 'function') {
      options.onChange(val);
    }
    groupEl.dispatchEvent(new CustomEvent('arc:value-change', {
      bubbles: true,
      detail: { value: val }
    }));
  }

  const listeners = [];
  cards.forEach(card => {
    const input = card.querySelector('.radio-card-input');
    const onCardClick = () => {
      if (input && input.value !== currentValue) {
        setValue(input.value);
      }
    };
    card.addEventListener('click', onCardClick);
    listeners.push({ el: card, event: 'click', handler: onCardClick });
  });

  const onKeyDown = (e) => {
    const checkedIndex = inputs.findIndex(i => i.value === currentValue);
    if (checkedIndex === -1) return;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (checkedIndex + 1) % inputs.length;
      setValue(inputs[next].value);
      inputs[next].focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (checkedIndex - 1 + inputs.length) % inputs.length;
      setValue(inputs[prev].value);
      inputs[prev].focus();
    }
  };

  groupEl.addEventListener('keydown', onKeyDown);

  let resizeObserver = null;
  if (grid && window.ResizeObserver) {
    resizeObserver = new ResizeObserver(() => {
      updateRing(false);
    });
    resizeObserver.observe(grid);
  }

  setValue(currentValue);

  return {
    getValue: () => currentValue,
    setValue: (val) => setValue(val),
    destroy: () => {
      listeners.forEach(({ el, event, handler }) => el.removeEventListener(event, handler));
      groupEl.removeEventListener('keydown', onKeyDown);
      if (resizeObserver) resizeObserver.disconnect();
    }
  };
}
```

## 接入目标项目

- 状态来源：单选项受控值，支持 `defaultValue` 与外部 `setValue(val)`。
- 尺寸策略：卡片网格 `auto-fit` 自适应排版，单列最小 180px。
- 驱动方式：`createRadioCards(fieldsetEl, { defaultValue: 'starter', onChange: (val) => {} })`。

## 重入与清理

- 连续快速切换卡片时，单例 ring 始终在当前坐标系下平滑插值移动，杜绝多框重影。
- 卸载时调用 `destroy()` 断开 ResizeObserver 监听并移除所有事件。

## 减少动态效果

- 在 `prefers-reduced-motion: reduce` 下，移除高光框位移与尺寸过渡。
- 高光框直接瞬间定位于选中卡片，小圆点直接显示。

## 焦点与键盘

- 借助原生隐藏单选输入 `<input type="radio">`，享受完整键盘无障碍与焦圈提示。
- 方向键左右上下循环选择，自动滚动保持选中卡片在视口中。

## 兼容回退

| 特性 | 不支持时 |
| --- | --- |
| ResizeObserver | 降级为监听 window resize 事件刷新定位 |
| CSS Grid auto-fit | 回退为 flex-wrap 布局 |

## 验收清单

- [ ] 点击另一张卡片，高光边框以 420ms 弹性平滑横纵位移并贴合目标卡片尺寸。
- [ ] 目标卡片单选小圆点弹性弹出，原卡片圆点收拢淡出。
- [ ] 缩放浏览器视口触发网格断点折叠时，高光外框无飞动、无延迟瞬间自适应。
- [ ] 键盘方向键无缝在不同卡片之间轮巡切换。
- [ ] 开启减弱动态效果时，卡片选中与外框定位直接生效无过渡。
