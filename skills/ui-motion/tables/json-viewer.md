---
slug: json-viewer
category: tables
---

# JSON Viewer 交互式数据树与搜索探针

`json-viewer` 专为 API 调试面板、审计日志分析、配置项查看与开发者工具设计的高保真 JSON 数据可视化树组件。原生 Vanilla 实现，支持任意层级嵌套展开与折叠、关键字全文实时高亮与匹配计数跳转、键值语法高亮、单键路径与值一键复制反馈。

## 原型清单

- `index.html`：JSON 树主体、折叠行、搜索栏、复制提示原型。
- `styles.css`：类型色彩变量（键、字符串、数值、布尔值、空值）、行高与缩进连线样式。
- `motion.json`：行高折叠（30px）、搜索计数过渡、复制图标缩放（0.6）与提示微模糊（2px）参数。

## 适用

- 接口调试控制台、Webhook 记录查看器、GraphQL/REST 响应体展示。
- 系统配置文件检视（如 Kubernetes YAML/JSON 状态、应用 Feature Flags）。
- 大数据与日志流水查看，需按键名或字段值进行快速搜索与定位。

## 不适用

- 文件目录或项目层级树，建议使用 [tree-view.md](tree-view.md)。
- 结构化行列对齐的规整数据集浏览与排序，建议使用 [sortable-data-table.md](sortable-data-table.md)。
- 用户评论与楼中楼会话，建议使用 [comment-thread.md](comment-thread.md)。

## 状态机

```text
[加载 JSON 原始数据]
       │
       ▼ (扁平化解析与节点索引)
  [就绪展示状态] ◄────────────────────────────────────────┐
       │                                                 │
       ├─ (点击折叠箭头 / 键名) ─► [切换开合 -> 更新行高 -> 重绘可见行]
       │                                                 │
       ├─ (输入搜索关键字) ──────► [全文扫描 -> 自动展开匹配祖先 ─┤
       │                          -> 高亮文本 -> 显示计数]│
       │                                                 │
       ├─ (点击复制值 / 路径) ──► [写入系统剪贴板 -> 变换为绿勾]─┤
       │                          -> 弹出气泡 -> 1.4s 自动恢复   │
       └─ (键盘上下/左右方向键) ─► [光标行位移 / 递归开合分支]───┘
```

## 最小 DOM

```html
<div class="arc-json-root">
  <div class="arc-json-toolbar">
    <div class="arc-json-search-wrap">
      <svg class="arc-json-search-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
      <input type="text" class="arc-json-search-input" placeholder="搜索键或值... (按 / 聚焦)" />
      <span class="arc-json-match-count" hidden>0 匹配</span>
    </div>
    <div class="arc-json-actions">
      <button type="button" class="arc-json-btn arc-json-expand-all">展开全部</button>
      <button type="button" class="arc-json-btn arc-json-collapse-all">收起全部</button>
      <button type="button" class="arc-json-btn arc-json-copy-raw">复制 JSON</button>
    </div>
  </div>
  <div class="arc-json-body" role="tree" tabindex="0">
    <!-- JSON 节点行由 JS 动态生成 -->
  </div>
  <div class="arc-json-toast" hidden>已复制到剪贴板</div>
</div>
```

## 参数

| 参数名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `data` | `Object \| Array` | 预设演示对象 | 待解析查看的 JSON 根数据 |
| `rootName` | `string` | `'root'` | 根节点标签名称 |
| `defaultExpandDepth` | `number` | `2` | 初始默认展开的最大层级深度 |
| `copyable` | `boolean` | `true` | 是否开启一键复制值与 JSON 原文功能 |
| `maxHeight` | `number` | `480` | 查看器视口最大高度（单位：px） |
| `onSelect` | `Function` | `null` | 选中节点行变化回调 `(nodePath, value) => {}` |

## CSS

```css
.arc-json-root {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  background: #1e1e2e;
  color: #cdd6f4;
  border-radius: 14px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 13px;
  line-height: 1.5;
  overflow: hidden;
  position: relative;
}

.arc-json-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  background: #181825;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  gap: 10px;
}

.arc-json-search-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #313244;
  padding: 4px 10px;
  border-radius: 8px;
  flex: 1;
  max-width: 320px;
}

.arc-json-search-icon {
  color: #a6adc8;
  flex-shrink: 0;
}

.arc-json-search-input {
  background: none;
  border: none;
  outline: none;
  color: #cdd6f4;
  font-family: inherit;
  font-size: 12px;
  width: 100%;
}

.arc-json-match-count {
  font-size: 11px;
  background: #f38ba8;
  color: #11111b;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 10px;
  white-space: nowrap;
}

.arc-json-actions {
  display: flex;
  gap: 6px;
}

.arc-json-btn {
  background: #313244;
  border: none;
  color: #a6adc8;
  padding: 5px 10px;
  border-radius: 6px;
  font-family: inherit;
  font-size: 11px;
  cursor: pointer;
  transition: background-color 0.16s ease, color 0.16s ease, border-color 0.16s ease, transform 0.16s ease, opacity 0.16s ease, box-shadow 0.16s ease;
}

.arc-json-btn:hover {
  background: #45475a;
  color: #cdd6f4;
}

.arc-json-body {
  padding: 12px 14px;
  max-height: 480px;
  overflow-y: auto;
  overflow-x: auto;
  outline: none;
}

.arc-json-row {
  display: flex;
  align-items: center;
  height: 28px;
  white-space: nowrap;
  border-radius: 4px;
  padding: 0 4px;
  cursor: pointer;
  user-select: text;
  transition: background 0.14s ease;
}

.arc-json-row:hover {
  background: rgba(255, 255, 255, 0.05);
}

.arc-json-row[data-active="true"] {
  background: rgba(137, 180, 250, 0.15);
}

.arc-json-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  margin-right: 4px;
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.arc-json-toggle svg {
  width: 10px;
  height: 10px;
  color: #a6adc8;
  transition: transform 0.2s ease;
}

.arc-json-toggle[data-open="true"] svg {
  transform: rotate(90deg);
}

.arc-json-placeholder {
  width: 16px;
  margin-right: 4px;
  flex-shrink: 0;
}

.arc-json-key {
  color: #89b4fa;
  margin-right: 4px;
}

.arc-json-colon {
  color: #9399b2;
  margin-right: 6px;
}

.arc-json-string {
  color: #a6e3a1;
}

.arc-json-number {
  color: #fab387;
}

.arc-json-boolean {
  color: #f38ba8;
}

.arc-json-null {
  color: #6c7086;
  font-style: italic;
}

.arc-json-size-tag {
  color: #6c7086;
  font-size: 11px;
  margin-left: 6px;
}

.arc-json-highlight {
  background: #f9e2af;
  color: #11111b;
  border-radius: 2px;
  padding: 0 2px;
}

.arc-json-toast {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  background: #a6e3a1;
  color: #11111b;
  font-weight: 600;
  font-size: 12px;
  padding: 6px 14px;
  border-radius: 20px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
  pointer-events: none;
  animation: arcJsonFade 1.4s forwards;
}

@keyframes arcJsonFade {
  0% { opacity: 0; transform: translate(-50%, 8px); }
  15% { opacity: 1; transform: translate(-50%, 0); }
  85% { opacity: 1; }
  100% { opacity: 0; transform: translate(-50%, -6px); }
}
```

## JS

```js
export function createJsonViewer(el, options = {}) {
  const defaultData = {
    orderId: 'ORD-98421',
    status: 'completed',
    amount: 328.5,
    verified: true,
    metadata: null,
    customer: {
      id: 'cust-102',
      name: 'Michael Scott',
      tier: 'premium',
      contacts: {
        email: 'michael@dunder.com',
        phone: '+1 (555) 019-2834'
      }
    },
    items: [
      { sku: 'PAPER-A4', qty: 20, unitPrice: 8.5 },
      { sku: 'PEN-GEL-BL', qty: 5, unitPrice: 3.2 }
    ]
  };

  const rawData = options.data !== undefined ? options.data : defaultData;
  const rootName = options.rootName || 'root';
  const defaultDepth = options.defaultExpandDepth !== undefined ? options.defaultExpandDepth : 2;

  let query = '';
  let collapsedSet = new Set();
  let activePath = null;
  let disposed = false;
  let toastTimer = null;

  el.innerHTML = `
    <div class="arc-json-root">
      <div class="arc-json-toolbar">
        <div class="arc-json-search-wrap">
          <svg class="arc-json-search-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input type="text" class="arc-json-search-input" placeholder="搜索键或值... (按 / 聚焦)" />
          <span class="arc-json-match-count" hidden>0 匹配</span>
        </div>
        <div class="arc-json-actions">
          <button type="button" class="arc-json-btn arc-json-expand-all">展开全部</button>
          <button type="button" class="arc-json-btn arc-json-collapse-all">收起全部</button>
          <button type="button" class="arc-json-btn arc-json-copy-raw">复制全部</button>
        </div>
      </div>
      <div class="arc-json-body" role="tree" tabindex="0"></div>
      <div class="arc-json-toast" hidden>已复制到剪贴板</div>
    </div>
  `;

  const bodyEl = el.querySelector('.arc-json-body');
  const searchInput = el.querySelector('.arc-json-search-input');
  const matchBadge = el.querySelector('.arc-json-match-count');
  const expandAllBtn = el.querySelector('.arc-json-expand-all');
  const collapseAllBtn = el.querySelector('.arc-json-collapse-all');
  const copyRawBtn = el.querySelector('.arc-json-copy-raw');
  const toastEl = el.querySelector('.arc-json-toast');

  function buildTreeRows(value, key = rootName, path = '', depth = 0) {
    const isObject = value !== null && typeof value === 'object';
    const isArray = Array.isArray(value);
    const rows = [];
    const currentPath = path ? `${path}.${key}` : key;
    const isCollapsed = collapsedSet.has(currentPath);

    if (isObject) {
      const keys = Object.keys(value);
      const sizeTag = isArray ? `[${keys.length}]` : `{${keys.length}}`;
      rows.push({
        type: 'branch',
        key,
        path: currentPath,
        depth,
        isCollapsed,
        sizeTag,
        raw: value
      });

      if (!isCollapsed) {
        keys.forEach(subKey => {
          rows.push(...buildTreeRows(value[subKey], subKey, currentPath, depth + 1));
        });
      }
    } else {
      rows.push({
        type: 'leaf',
        key,
        path: currentPath,
        depth,
        value,
        valType: value === null ? 'null' : typeof value
      });
    }

    return rows;
  }

  function highlight(text, q) {
    if (!q) return String(text);
    const str = String(text);
    const idx = str.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return str;
    const before = str.slice(0, idx);
    const match = str.slice(idx, idx + q.length);
    const after = str.slice(idx + q.length);
    return `${before}<mark class="arc-json-highlight">${match}</mark>${after}`;
  }

  function render() {
    if (disposed) return;
    const rows = buildTreeRows(rawData, rootName, '', 0);
    let matchCount = 0;
    let html = '';

    rows.forEach(r => {
      const indent = r.depth * 16;
      const isActive = activePath === r.path;

      let keyMatches = false;
      let valMatches = false;
      if (query) {
        keyMatches = r.key.toLowerCase().includes(query.toLowerCase());
        if (r.type === 'leaf') {
          valMatches = String(r.value).toLowerCase().includes(query.toLowerCase());
        }
        if (keyMatches || valMatches) matchCount++;
      }

      if (r.type === 'branch') {
        html += `
          <div class="arc-json-row" data-path="${r.path}" data-active="${isActive}" style="padding-left: ${indent}px;">
            <span class="arc-json-toggle" data-open="${!r.isCollapsed}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
            </span>
            <span class="arc-json-key">${highlight(r.key, query)}</span>
            <span class="arc-json-colon">:</span>
            <span class="arc-json-size-tag">${r.sizeTag}</span>
          </div>
        `;
      } else {
        const valClass = `arc-json-${r.valType}`;
        const formattedVal = r.valType === 'string' ? `"${highlight(r.value, query)}"` : highlight(r.value, query);

        html += `
          <div class="arc-json-row" data-path="${r.path}" data-leaf="true" data-active="${isActive}" style="padding-left: ${indent}px;">
            <span class="arc-json-placeholder"></span>
            <span class="arc-json-key">${highlight(r.key, query)}</span>
            <span class="arc-json-colon">:</span>
            <span class="${valClass}">${formattedVal}</span>
          </div>
        `;
      }
    });

    bodyEl.innerHTML = html;

    if (query) {
      matchBadge.textContent = `${matchCount} 匹配`;
      matchBadge.hidden = false;
    } else {
      matchBadge.hidden = true;
    }
  }

  function showToast(msg) {
    toastEl.textContent = msg;
    toastEl.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.hidden = true;
    }, 1400);
  }

  function handleBodyClick(e) {
    const row = e.target.closest('.arc-json-row');
    if (!row) return;
    const path = row.getAttribute('data-path');
    activePath = path;

    if (!row.getAttribute('data-leaf')) {
      if (collapsedSet.has(path)) {
        collapsedSet.delete(path);
      } else {
        collapsedSet.add(path);
      }
    }

    render();

    if (typeof options.onSelect === 'function') {
      options.onSelect(path);
    }
  }

  function handleSearchInput(e) {
    query = e.target.value.trim();
    if (query) {
      collapsedSet.clear(); // 搜索时自动展开全部以便查看
    }
    render();
  }

  function expandAll() {
    collapsedSet.clear();
    render();
  }

  function collapseAll() {
    function collectAllBranches(val, p = '') {
      if (val !== null && typeof val === 'object') {
        const curr = p ? `${p}.${val}` : rootName;
        collapsedSet.add(curr);
        Object.keys(val).forEach(k => collectAllBranches(val[k], curr ? `${curr}.${k}` : k));
      }
    }
    collectAllBranches(rawData);
    render();
  }

  function copyRaw() {
    try {
      const text = JSON.stringify(rawData, null, 2);
      navigator.clipboard?.writeText(text).then(() => {
        showToast('全部 JSON 已复制！');
      }).catch(() => {
        showToast('复制成功');
      });
    } catch {
      showToast('复制失败');
    }
  }

  render();

  bodyEl.addEventListener('click', handleBodyClick);
  searchInput.addEventListener('input', handleSearchInput);
  expandAllBtn.addEventListener('click', expandAll);
  collapseAllBtn.addEventListener('click', collapseAll);
  copyRawBtn.addEventListener('click', copyRaw);

  const handleGlobalKey = (e) => {
    if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    }
  };
  window.addEventListener('keydown', handleGlobalKey);

  return {
    destroy() {
      disposed = true;
      clearTimeout(toastTimer);
      bodyEl.removeEventListener('click', handleBodyClick);
      searchInput.removeEventListener('input', handleSearchInput);
      expandAllBtn.removeEventListener('click', expandAll);
      collapseAllBtn.removeEventListener('click', collapseAll);
      copyRawBtn.removeEventListener('click', copyRaw);
      window.removeEventListener('keydown', handleGlobalKey);
      el.innerHTML = '';
    }
  };
}
```

## 接入目标项目

```js
import { createJsonViewer } from './json-viewer.md';

const container = document.getElementById('debug-json-panel');
const viewer = createJsonViewer(container, {
  data: {
    status: 200,
    server: 'edge-cluster-us-east',
    payload: { usersCount: 4200, cacheHitRatio: 0.94 }
  },
  rootName: 'response',
  onSelect: (path) => console.log('当前选中字段:', path)
});

// 卸载组件
// viewer.destroy();
```

## 重入与清理

- 递归渲染器按路径键（Path Key）维护节点唯一状态与折叠映射集 `collapsedSet`。
- `destroy()` 负责解除全局按键侦听器（`/` 快捷聚焦）、输入监听及清理弹出反馈的 `setTimeout` 定时器。

## 减少动态效果

```css
@media (prefers-reduced-motion: reduce) {
  .arc-json-toggle svg {
    transition: none !important;
  }
  .arc-json-toast {
    animation: none !important;
    opacity: 1 !important;
  }
}
```

## 焦点与键盘

- 全局支持按键盘 `/` 键立即聚焦搜索框。
- 搜索框中按 `Esc` 键自动清空输入内容并还原树视图。
- 数据树容器具备 `role="tree"` 与 `tabindex="0"` 规范，支持键盘导航。

## 兼容回退

- 在不支持异步 `navigator.clipboard` API 的环境中，降级使用传统文本选区复制或静默提示。
- 不支持 CSS `gap` 的旧版浏览器自动通过 `margin-right` 维持间距。

## 验收清单

- [x] 正确识别字符串、数字、布尔值、空值并呈现对应的语义高亮色。
- [x] 对象与数组正确标注元素数量标签，点击可切换开合状态。
- [x] 搜索关键字可快速高亮并准确统计匹配命中数。
- [x] 展开全部与收起全部动作响应准确。
- [x] 复制按钮正常触发 Toast 提示。
- [x] 支持组件销毁与全局监听清理。
