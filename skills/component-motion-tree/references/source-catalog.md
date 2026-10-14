# style-1 来源与精确参数

这是 2026-10-14 从用户工作目录 `style-1` 原样复制的源码参考。`assets/style-1` 可独立搬移；示例页面用于查看/提取组件机制，不整页注入目标项目。

完整性记录见 [source-integrity.json](source-integrity.json)，包含原始路径、大小和 SHA-256。下列行号对应随附的原始文件。值是源码声明，是否生效还取决于选择器和目标运行环境；源码注释中的“官方/1:1”不作为外部认证。

## 成品与静态起点

| 类型 | 动态成品 | 静态毛坯 |
| --- | --- | --- |
| button | [打开源码](../assets/style-1/button/index.html) | [静态起点](../assets/style-1/raw_buttons/01_button.html) |
| action-button | [打开源码](../assets/style-1/action-button/index.html) | [静态起点](../assets/style-1/raw_buttons/02_action_button.html) |
| split-button | [打开源码](../assets/style-1/split-button/index.html) | [静态起点](../assets/style-1/raw_buttons/03_split_button.html) |
| button-group | [打开源码](../assets/style-1/button-group/index.html) | [静态起点](../assets/style-1/raw_buttons/04_button_group.html) |
| floating-button-group | [打开源码](../assets/style-1/floating-button-group/index.html) | [静态起点](../assets/style-1/raw_buttons/05_floating_button_group.html) |
| expanding-button-group | [打开源码](../assets/style-1/expanding-button-group/index.html) | [静态起点](../assets/style-1/raw_buttons/06_expanding_button_group.html) |
| copy-button | [打开源码](../assets/style-1/copy-button/index.html) | [静态起点](../assets/style-1/raw_buttons/07_copy_button.html) |
| icon-morph | [打开源码](../assets/style-1/icon-morph/index.html) | [静态起点](../assets/style-1/raw_buttons/08_icon_morph.html) |
| confirm-morph | [打开源码](../assets/style-1/confirm-morph/index.html) | [静态起点](../assets/style-1/raw_buttons/09_confirm_morph.html) |
| theme-switch | **缺少**：不可当作已完成动态参考 | [静态起点](../assets/style-1/raw_buttons/10_theme_switch.html) |

## 各成品的参数与定位

同名 token 的含义和值不保证跨文件一致。例如 button 的 `--duration-fast` 为 250ms，而 action-button 为 160ms。不要把目录级旧规范的值覆盖到成品。只加载选中组件这一节，再定位其实际使用位置。

### button

源码：[index.html](../assets/style-1/button/index.html)

```css
--duration-stagger: 40ms;
--duration-micro: 80ms;
--duration-quick: 150ms;
--duration-fast: 250ms;
--duration-medium: 350ms;
--duration-slow: 400ms;
--duration-very-slow: 500ms;
--ease-smooth-out: cubic-bezier(0.22, 1, 0.36, 1);
--ease-in-out: ease-in-out;
--ease-out: ease-out;
--ease-linear: linear;
--ease-bounce: cubic-bezier(0.34, 1.36, 0.64, 1);
--ease-bounce-strong: cubic-bezier(0.34, 3.85, 0.64, 1);
--distance-micro: 4px;
--distance-small: 6px;
--distance-base: 8px;
--distance-medium: 12px;
--distance-large: 30px;
--scale-large: 0.96;
--scale-medium: 0.97;
--scale-small: 0.98;
--scale-tiny: 0.99;
--blur-small: 2px;
--blur-medium: 3px;
--blur-large: 8px;
--ease-snappy: cubic-bezier(0.18, 0.89, 0.32, 1.28);
--ease-smooth: cubic-bezier(0.16, 1, 0.3, 1);
```

- `.arc-btn {`：第 269 行。
- `function swapText(`：第 747 行。
- reduced-motion CSS：第 402 行（仍需检查 JS 动画）。

### action-button

源码：[index.html](../assets/style-1/action-button/index.html)

```css
--duration-instant: 120ms;
--duration-fast: 160ms;
--duration-exit: 180ms;
--duration-standard: 240ms;
--duration-spring: 420ms;
--ease-enter: cubic-bezier(0.16, 1, 0.3, 1);
--ease-exit: cubic-bezier(0.7, 0, 0.84, 0);
--ease-standard: cubic-bezier(0.22, 1, 0.36, 1);
--ease-snappy: cubic-bezier(0.18, 0.89, 0.32, 1.28);
--ease-morph: cubic-bezier(0.16, 1, 0.3, 1);
```

- `.arc-action-btn {`：第 169 行。
- `function updateTextMorph(`：第 562 行。
- `function setState(`：第 639 行。
- reduced-motion CSS：第 372 行（仍需检查 JS 动画）。

### split-button

源码：[index.html](../assets/style-1/split-button/index.html)

```css
--duration-instant: 120ms;
--duration-fast: 160ms;
--duration-standard: 240ms;
--duration-spring: 360ms;
--ease-enter: cubic-bezier(0.16, 1, 0.3, 1);
--ease-standard: cubic-bezier(0.22, 1, 0.36, 1);
--ease-spring: cubic-bezier(0.18, 0.89, 0.32, 1.28);
--ease-morph: cubic-bezier(0.34, 1.25, 0.64, 1);
```

- `.split-menu {`：第 363 行。
- `function updateMorphText(`：第 686 行。
- `function openMenu(`：第 797 行。
- `function closeMenu(`：第 804 行。
- 当前源码未声明 reduced-motion CSS；移植时按目标组件增加减少动态效果分支。

### button-group

源码：[index.html](../assets/style-1/button-group/index.html)

```css
--duration-instant: 120ms;
--duration-fast: 160ms;
--duration-standard: 240ms;
--duration-spring: 320ms;
--duration-morph: 380ms;
--ease-enter: cubic-bezier(0.16, 1, 0.3, 1);
--ease-standard: cubic-bezier(0.22, 1, 0.36, 1);
--ease-snappy: cubic-bezier(0.18, 0.89, 0.32, 1.12);
--ease-morph: cubic-bezier(0.16, 1, 0.3, 1);
--ease-spring: cubic-bezier(0.18, 0.89, 0.32, 1.12);
```

- `function placeHighlight(`：第 904 行。
- `class DigitColumn`：第 1063 行。
- `class AnimatedCounter`：第 1147 行。
- `function updateZoomState(`：第 1241 行。
- reduced-motion CSS：第 557 行（仍需检查 JS 动画）。

### floating-button-group

源码：[index.html](../assets/style-1/floating-button-group/index.html)

```css
--duration-instant: 120ms;
--duration-fast: 160ms;
--duration-exit: 180ms;
--duration-standard: 240ms;
--duration-morph: 400ms;
--duration-snappy: 260ms;
--ease-enter: cubic-bezier(0.16, 1, 0.3, 1);
--ease-exit: cubic-bezier(0.7, 0, 0.84, 0);
--ease-standard: cubic-bezier(0.22, 1, 0.36, 1);
--ease-morph: cubic-bezier(0.16, 1, 0.3, 1);
--ease-snappy: cubic-bezier(0.18, 0.89, 0.32, 1.12);
```

- `.fbg-highlight {`：第 250 行。
- `function renderTooltip(`：第 842 行。
- `function queueTooltip(`：第 896 行。
- `function dismissTooltip(`：第 911 行。
- `function place(`：第 949 行。
- reduced-motion CSS：第 469 行（仍需检查 JS 动画）。

### expanding-button-group

源码：[index.html](../assets/style-1/expanding-button-group/index.html)

```css
--duration-instant: 120ms;
--duration-fast: 160ms;
--duration-standard: 240ms;
--duration-morph: 420ms;
--ease-enter: cubic-bezier(0.16, 1, 0.3, 1);
--ease-standard: cubic-bezier(0.22, 1, 0.36, 1);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
--ease-morph-spring: linear(
        0 0%, 0.0258 2.78%, 0.09 5.56%, 0.1763 8.33%, 0.2732 11.11%,
        0.3724 13.89%, 0.4683 16.67%, 0.5573 19.44%, 0.6376 22.22%,
        0.7082 25%, 0.7689 27.78%, 0.8202 30.56%, 0.8628 33.33%,
        0.8976 36.11%, 0.9256 38.89%, 0.9476 41.67%, 0.9648 44.44%,
        0.9778 47.22%, 0.9875 50%, 0.9945 52.78%, 0.9994 55.56%,
        1.0026 58.33%, 1.0047 61.11%, 1.0058 63.89%, 1.0062 66.67%,
        1.0062 69.44%, 1.0059 72.22%, 1.0055 75%, 1.0049 77.78%,
        1.0043 80.56%, 1.0036 83.33%, 1.0031 86.11%, 1.0025 88.89%,
        1.002 91.67%, 1.0016 94.44%, 1.0013 97.22%, 1 100%
      );
```

- `function calculateExpandedWidth(`：第 863 行。
- `function applyLayout(`：第 874 行。
- reduced-motion CSS：第 406 行（仍需检查 JS 动画）。

### copy-button

源码：[index.html](../assets/style-1/copy-button/index.html)

```css
--duration-instant: 120ms;
--duration-fast: 160ms;
--duration-standard: 240ms;
--duration-settle: 480ms;
--ease-enter: cubic-bezier(0.16, 1, 0.3, 1);
--ease-standard: cubic-bezier(0.22, 1, 0.36, 1);
--ease-settle: cubic-bezier(0.25, 1, 0.35, 1.06);
--ease-snappy: cubic-bezier(0.18, 0.89, 0.32, 1.28);
```

- `async function copyToClipboard(`：第 608 行。
- `function morphLabel(`：第 635 行。
- reduced-motion CSS：第 407 行（仍需检查 JS 动画）。

### icon-morph

源码：[index.html](../assets/style-1/icon-morph/index.html)

```css
--duration-instant: 120ms;
--duration-fast: 160ms;
--duration-standard: 240ms;
--duration-spring: 360ms;
--ease-enter: cubic-bezier(0.16, 1, 0.3, 1);
--ease-standard: cubic-bezier(0.22, 1, 0.36, 1);
--ease-snappy: cubic-bezier(0.18, 0.89, 0.32, 1.28);
--ease-morph: cubic-bezier(0.34, 1.25, 0.64, 1);
```

- `const PLAY_D`：第 754 行。
- `const PAUSE_D`：第 755 行。
- `cardTheme.addEventListener`：第 803 行。
- 当前源码未声明 reduced-motion CSS；移植时按目标组件增加减少动态效果分支。

### confirm-morph

源码：[index.html](../assets/style-1/confirm-morph/index.html)

```css
--duration-instant: 120ms;
--duration-fast: 160ms;
--duration-standard: 240ms;
--duration-spring: 360ms;
--ease-enter: cubic-bezier(0.16, 1, 0.3, 1);
--ease-standard: cubic-bezier(0.22, 1, 0.36, 1);
--ease-snappy: cubic-bezier(0.18, 0.89, 0.32, 1.28);
--ease-morph: cubic-bezier(0.34, 1.25, 0.64, 1);
```

- `function syncSurfaceWidth(`：第 816 行。
- `function switchFace(`：第 822 行。
- `function toCounting(`：第 860 行。
- `function toPending(`：第 886 行。
- `function startHold(`：第 917 行。
- 当前源码未声明 reduced-motion CSS；移植时按目标组件增加减少动态效果分支。

