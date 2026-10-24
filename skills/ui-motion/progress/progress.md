---
slug: progress
category: progress
source: inbox/15_Progress/progress/
---

# Progress · 进度条

用于反馈文件上传、批量下载、数据同步或步骤完成度的线性进度条组件。包含三大核心动效机制：

1. 标量弹簧平滑填充（Spring Scaled Fill）：采用基于 GPU 硬件加速的 `translateX(calc(value - 100%))` 变换机制，数值发生阶段性跳变（如 10% → 60%）时执行无超调平滑弹簧阻尼过渡（visualDuration 0.4s, bounce 0）。
2. 完成态对勾弹出与色调延时流转（Delayed Checkmark & Success Tone）：当进度推进至 100% 时，进度条颜色在 200ms 延迟后平滑过渡至成功态（绿色），并在 240ms 后弹性弹出成功对勾图标。
3. 文本微模糊形态置换（Micro-Blur Label Morph）：顶部状态文案发生更新时通过 160ms/240ms 微模糊平滑过渡，右侧数值始终以固定槽位等宽渲染，杜绝宽度抖动。

## 原型清单

| 原型分组 | 原型元素 | 动效 / 状态变化 | 去向 |
| --- | --- | --- | --- |
| — | 进度总容器（`.arc-progress`） | 无障碍角色 `role="progressbar"` 属性同步、完成态 class 切换 | 标量弹簧平滑填充 |
| — | 进度轨道与填充条（`.arc-progress-track`, `.arc-progress-fill`） | 7px 细条轨道、99px 胶囊圆角、`translateX` 硬件加速平移动画、颜色渐变过渡 | 标量弹簧平滑填充 |
| — | 标题与状态标签（`.arc-progress-label`） | 文本变动时的微模糊浮入浮出 | 文本微模糊形态置换 |
| — | 数值指示器（`.arc-progress-value`） | 实时百分比数值递增更新、等宽字符对齐锁定 | 标量弹簧平滑填充 |
| — | 成功状态图标（`.arc-progress-check`） | 100% 达标后延迟 240ms 弹性缩放弹出 `scale(0.6 -> 1)` | 完成态对勾弹出与色调延时流转 |
| — | 演示外壳（底部 Advance/Restart 控制按钮、快捷键） | — | 演示外壳，已删除 |

## 适用

- 耗时可预期的文件传输、表单填写完成度、多任务批处理或报表生成。
- 允许数值离散步进，但要求界面呈现连贯顺滑的物理进度推进。
- 在达到 100% 时需要醒目的成功达成视觉反馈。

## 不适用

- 绝对时间截止与活动倒计时 → [countdown.md](countdown.md)
- 耗时不可预期的内容加载骨架屏占位 → [skeleton.md](skeleton.md)
- 多步骤表单流程的分段向导 → [stepper.md](stepper.md)
- 磁盘存储或多维度配额用量仪表盘 → [usage-meter.md](usage-meter.md)

## 状态机

| 状态 | 进入条件 | 视觉表现 | 退出到 |
| --- | --- | --- | --- |
| in-progress | 进度值在 0 到 99 之间 | 填充条采用主题色，数值平滑推进，对勾图标隐藏 | complete / in-progress |
| complete | 进度值达到 100% | 填充条占满轨道，200ms 后切换为成功绿，240ms 后对勾弹性滑入 | in-progress (若重置) |
| reduced | 启用减少动态效果 | 填充条立即到达目标物理位置，不执行平移动画与变色延迟 | in-progress / complete |

```mermaid
stateDiagram-v2
    [*] --> in-progress: 初始挂载 (value < 100)
    in-progress --> in-progress: value 更新
    in-progress --> complete: value >= 100
    complete --> in-progress: 重新开始 / 重置为 0
```

## 最小 DOM

```html
<div class="arc-progress" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" aria-label="Progress">
  <div class="arc-progress-header">
    <span class="arc-progress-label">Exporting assets</span>
    <div class="arc-progress-meta">
      <span class="arc-progress-value">45%</span>
      <span class="arc-progress-check" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </span>
    </div>
  </div>
  <div class="arc-progress-track">
    <div class="arc-progress-fill" style="transform: translateX(-55%);"></div>
  </div>
</div>
```

- `.arc-progress`：进度条根容器，管理 `aria-valuenow` 与完成状态 class。
- `.arc-progress-header`：信息标题行，排列任务名称与当前百分比。
- `.arc-progress-label`：任务文案描述。
- `.arc-progress-meta`：右侧数值与图标插槽。
- `.arc-progress-value`：当前进度百分比。
- `.arc-progress-check`：达成 100% 时弹性呈现的对勾。
- `.arc-progress-track`：7px 灰色背景轨道，溢出隐藏。
- `.arc-progress-fill`：硬件加速平移的彩色填充色块。

## 参数

| 名称 | 值 | 用于 | 来源 |
| --- | --- | --- | --- |
| 进度填充弹簧物理参数 | `visualDuration: 0.4s` / `bounce: 0` | `.arc-progress-fill` 平移 | 原型 |
| 轨道物理高度与圆角 | `height: 7px` / `border-radius: 99px` | 轨道槽结构 | 原型 |
| 达成完成态变色延迟 | `200ms` | 填充完毕到颜色变换的延时 | 原型 |
| 达成完成态变色时长 | `240ms` / `cubic-bezier(0.22, 1, 0.36, 1)` | 主题色渐变为成功绿 | 原型 |
| 成功对勾弹出延时 | `240ms` | 对勾切入延时 | 原型 |
| 成功对勾弹簧参数 | `visualDuration: 0.26s` / `bounce: 0.12` | 对勾弹性放大入场 | 原型 |
| 减动效过渡模式 | `0ms` (直接落地无动画) | prefers-reduced-motion 推进 | 原型 |

## CSS

```css
.arc-progress {
  --prog-track-bg: rgba(0, 0, 0, 0.06);
  --prog-fill: #2563eb;
  --prog-success: #16a34a;
  --prog-label: #0f172a;
  --prog-desc: #64748b;

  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 420px;
  box-sizing: border-box;
}

.arc-progress-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  line-height: 1.4;
}

.arc-progress-label {
  font-weight: 500;
  color: var(--prog-label);
}

.arc-progress-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  position: relative;
  min-height: 18px;
}

.arc-progress-value {
  font-variant-numeric: tabular-nums;
  font-size: 12px;
  font-weight: 600;
  color: var(--prog-desc);
  min-width: 34px;
  text-align: right;
  transition: color 240ms ease;
}

.arc-progress-check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  color: var(--prog-success);
  opacity: 0;
  transform: scale(0.6);
  transition: transform 260ms cubic-bezier(0.18, 0.89, 0.32, 1.28), opacity 180ms ease;
}

.arc-progress.is-complete .arc-progress-check {
  opacity: 1;
  transform: scale(1);
}

.arc-progress.is-complete .arc-progress-value {
  color: var(--prog-success);
}

.arc-progress-track {
  position: relative;
  width: 100%;
  height: 7px;
  background: var(--prog-track-bg);
  border-radius: 99px;
  overflow: hidden;
  box-sizing: border-box;
}

.arc-progress-fill {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: var(--prog-fill);
  border-radius: 99px;
  transform: translateX(-100%);
  transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1), background-color 240ms ease;
  will-change: transform;
}

.arc-progress.is-complete .arc-progress-fill {
  background: var(--prog-success);
}

@media (prefers-reduced-motion: reduce) {
  .arc-progress-fill {
    transition: none !important;
  }
  .arc-progress-check {
    transition: opacity 120ms linear !important;
    transform: none !important;
  }
}
```

## JS

```js
/**
 * 创建并绑定 Progress 进度条控制器
 * @param {HTMLElement} el 宿主容器元素
 * @param {Object} [options]
 * @param {number} [options.value=0] 初始进度值 (0 - 100)
 * @param {number} [options.max=100] 最大值
 * @param {string} [options.label] 标题文案
 * @param {Function} [options.onChange] 进度变化回调
 * @param {Function} [options.onComplete] 达到 100% 回调
 */
export function createProgress(el, options = {}) {
  const root = el.classList.contains('arc-progress') ? el : el.querySelector('.arc-progress') || el;
  const fill = root.querySelector('.arc-progress-fill');
  const valueEl = root.querySelector('.arc-progress-value');
  const labelEl = root.querySelector('.arc-progress-label');

  const max = options.max || 100;
  let currentValue = Math.max(0, Math.min(max, options.value || 0));
  let isDisposed = false;
  let completeTimer = null;

  function setProgress(val) {
    if (isDisposed) return;
    const clamped = Math.max(0, Math.min(max, val));
    currentValue = clamped;
    const percent = Math.round((clamped / max) * 100);

    root.setAttribute('aria-valuenow', String(percent));

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (fill) {
      if (reduced) {
        fill.style.transition = 'none';
      }
      fill.style.transform = `translateX(${percent - 100}%)`;
    }

    if (valueEl) {
      valueEl.textContent = `${percent}%`;
    }

    if (percent >= 100) {
      clearTimeout(completeTimer);
      completeTimer = setTimeout(() => {
        if (isDisposed) return;
        root.classList.add('is-complete');
        if (typeof options.onComplete === 'function') {
          options.onComplete();
        }
      }, 200);
    } else {
      clearTimeout(completeTimer);
      root.classList.remove('is-complete');
    }

    if (typeof options.onChange === 'function') {
      options.onChange(percent);
    }
  }

  if (options.label && labelEl) {
    labelEl.textContent = options.label;
  }

  setProgress(currentValue);

  return {
    setProgress,
    setLabel(text) {
      if (labelEl && !isDisposed) labelEl.textContent = text;
    },
    destroy() {
      isDisposed = true;
      clearTimeout(completeTimer);
    }
  };
}
```

## 接入目标项目

- 状态来源：目标业务层上传组件（`onUploadProgress`）、异步轮询任务或向导表单完成度。
- 尺寸策略：100% 宽度响应式伸缩，高度由 7px 细条轨道与文字排版自适应组合。
- 驱动方式：挂载时调用 `createProgress(el, { value, max, onChange, onComplete })`；数值变化时调用 `setProgress(num)`；卸载时调用 `destroy()`。

## 重入与清理

- 连续高频传入数值时，防抖重置完成态延时定时器，确保仅在最终稳定维持在 100% 时触发一次成功变色与回调。
- 实例销毁（`destroy()`）及时中止挂起定时器，防止组件卸载后操作残留 DOM 节点。

## 减少动态效果

- 满足 `prefers-reduced-motion: reduce` 时：
  - 彻底停用进度条填充位移过渡（`transition: none`）。
  - 对勾弹出动画停用缩放过渡，改由纯透明度淡入。
  - 完成变色即时生效，不设置延迟。

## 焦点与键盘

- 根元素配置标准 `role="progressbar"`、`aria-valuenow`、`aria-valuemin="0"`、`aria-valuemax="100"`，读屏软件能实时捕获当前百分比。
- 进度条自身通常为非交互只读展示，无需接收键盘焦点，避免多余 Tab 停驻。

## 兼容回退

| 特性 | 不支持时 |
| --- | --- |
| CSS `translateX()` 变换 | 回退至标准 `width: ${percent}%`，视觉呈现同样平滑无缺损。 |
| `font-variant-numeric: tabular-nums` | 回退至等宽字体 monospace，保证百分比文字不挤压跳动。 |

## 验收清单

- [ ] 初始化展示进度条轨道与当前百分比数值，轨道圆角平整，底色纯净。
- [ ] 动态更新进度值（如从 20% 推进至 70%），填充条平滑向右推进，无顿挫与阶跃。
- [ ] 进度推进至 100% 时，进度条在 200ms 后变为成功绿色，右侧弹出成功对勾图标。
- [ ] 数值递增过程中，右侧百分比数字严格保持固定宽度与右对齐，外框绝对零抖动。
- [ ] 在系统启用减少动态效果时，填充条跳过滑动动画直接定位到最新百分比。
