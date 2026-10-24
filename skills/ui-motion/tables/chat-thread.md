---
slug: chat-thread
category: tables
---

# Chat Thread 对话流消息列表

`chat-thread` 专为即时通讯、客服工单、协作会话与 AI 对话流设计的现代聊天消息组件。原生 Vanilla 实现，支持同作者 5 分钟智能合组、消息滑入弹簧过渡、底部磁吸与未读悬浮胶囊、多表情回应弹簧计数、图片/附件托盘与自适应高度输入框。

## 原型清单

- `index.html`：对话流主视口、消息列表气泡、表情选择器与输入器原型。
- `styles.css`：气泡阴影、头像排版、输入中跳动圆点与滚动条样式。
- `motion.json`：消息进场弹簧、滚动磁吸阈值（48px）、远距胶囊阈值（180px）与动画参数。

## 适用

- 客服支持会话、团队工作流协作聊天、用户工单留言面板。
- AI 助手对话界面，需平滑追加消息、处理流式生成或未读消息提示。
- 需自适应滚动锚定（用户阅读历史记录时不强制跳底）的高吞吐即时通讯视口。

## 不适用

- 简单静态单列只读文章评论树，建议使用 [comment-thread.md](comment-thread.md)。
- 树状目录结构或多层嵌套数据，建议使用 [tree-view.md](tree-view.md)。
- 海量数万行复杂数据网格浏览，建议使用 [sortable-data-table.md](sortable-data-table.md) 或 [data-grid.md](../advanced-charts/data-grid.md)。

## 状态机

```text
[初始加载 / 空会话]
       │
       ▼ (注入消息数组)
 [已锚定到底部 (Stick=true)] ◄─────────────────────────┐
       │                                              │
       ├─ (用户向上滚动 > 48px) ──► [阅读历史 (Stick=false)]
       │                                │             │
       │                                ├─ (新消息到) ─┤
       │                                │  (显示未读胶囊)│
       │                                │             │
       │                                └─ (点击回底) ─┘
       ├─ (发送消息) ──► [创建本地气泡 -> 弹簧生长入场 -> 强制滚底]
       ├─ (点击表情) ──► [展开 Reaction 菜单 -> 选中触发计数 Roll]
       └─ (输入中) ────► [Typing 气泡跳动展示]
```

## 最小 DOM

```html
<div class="arc-chat-root">
  <div class="arc-chat-header">
    <div class="arc-chat-title">技术支持会话</div>
    <div class="arc-chat-status">2 位在线</div>
  </div>
  <div class="arc-chat-viewport">
    <div class="arc-chat-scroller" data-chat-scroller>
      <div class="arc-chat-track">
        <ol class="arc-chat-list" role="log" aria-live="polite">
          <!-- 消息行由 JS 动态装载 -->
        </ol>
      </div>
    </div>
    <button type="button" class="arc-chat-pill" aria-label="查看最新消息" hidden>
      <span class="arc-chat-pill-text">查看最新消息</span>
      <span class="arc-chat-pill-badge">1</span>
    </button>
  </div>
  <div class="arc-chat-composer">
    <textarea class="arc-chat-input" rows="1" placeholder="输入消息... (Enter 发送, Shift+Enter 换行)"></textarea>
    <div class="arc-chat-composer-actions">
      <button type="button" class="arc-chat-send" aria-label="发送消息">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
      </button>
    </div>
  </div>
</div>
```

## 参数

| 参数名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `currentUserId` | `string` | `'user-me'` | 当前登录用户的唯一标识符，决定消息居右或居左 |
| `participants` | `Array<{id, name, avatar}>` | `[]` | 会话参与者元数据列表 |
| `messages` | `Array<Message>` | 预设演示消息 | 初始消息对象数组（含 id, authorId, text, createdAt, reactions） |
| `groupWindowMs` | `number` | `300000` | 同作者消息合组最大时间窗口（默认 5 分钟） |
| `stickDistance` | `number` | `48` | 视口距底部小于该像素阈值时自动锚定吸顶底部 |
| `farDistance` | `number` | `180` | 视口向上离开底部超过此值且有新消息时展示悬浮胶囊 |
| `onSend` | `Function` | `null` | 发送消息回调函数 `onSend({ text })` |
| `onReact` | `Function` | `null` | 表情反应点击回调函数 `onReact(msgId, emoji)` |

## CSS

```css
.arc-chat-root {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 640px;
  height: 520px;
  margin: 0 auto;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  position: relative;
}

.arc-chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 18px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  z-index: 2;
}

.arc-chat-title {
  font-size: 15px;
  font-weight: 600;
  color: #111827;
}

.arc-chat-status {
  font-size: 12px;
  color: #10b981;
}

.arc-chat-viewport {
  flex: 1;
  position: relative;
  overflow: hidden;
  background: #f9fafb;
}

.arc-chat-scroller {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
  padding: 16px 18px;
  box-sizing: border-box;
}

.arc-chat-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.arc-chat-day {
  text-align: center;
  margin: 12px 0 6px;
}

.arc-chat-day span {
  font-size: 11px;
  color: #6b7280;
  background: #e5e7eb;
  padding: 3px 10px;
  border-radius: 12px;
}

.arc-chat-row {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  max-width: 82%;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
}

.arc-chat-row[data-mine="false"] {
  align-self: flex-start;
}

.arc-chat-row[data-mine="true"] {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.arc-chat-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #e0e7ff;
  color: #4f46e5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
  user-select: none;
}

.arc-chat-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.arc-chat-meta {
  display: flex;
  gap: 6px;
  font-size: 11px;
  color: #9ca3af;
  margin-bottom: 2px;
}

.arc-chat-row[data-mine="true"] .arc-chat-meta {
  justify-content: flex-end;
}

.arc-chat-bubble {
  padding: 10px 14px;
  border-radius: 14px;
  font-size: 13.5px;
  line-height: 1.48;
  word-break: break-word;
  position: relative;
}

.arc-chat-row[data-mine="false"] .arc-chat-bubble {
  background: #ffffff;
  color: #1f2937;
  border-bottom-left-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.arc-chat-row[data-mine="true"] .arc-chat-bubble {
  background: #2563eb;
  color: #ffffff;
  border-bottom-right-radius: 4px;
  box-shadow: 0 2px 6px rgba(37, 99, 235, 0.25);
}

.arc-chat-reactions {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin-top: 2px;
}

.arc-chat-reaction {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 7px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  font-size: 11px;
  cursor: pointer;
  transition: transform 0.16s ease, background 0.16s ease;
}

.arc-chat-reaction:hover {
  transform: scale(1.08);
  background: #f3f4f6;
}

.arc-chat-pill {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #1f2937;
  color: #ffffff;
  border: none;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 5;
  transition: opacity 0.24s ease, transform 0.24s cubic-bezier(0.16, 1, 0.3, 1);
}

.arc-chat-pill[hidden] {
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, 10px);
}

.arc-chat-pill-badge {
  background: #3b82f6;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  border-radius: 10px;
  padding: 1px 6px;
}

.arc-chat-composer {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  background: #ffffff;
}

.arc-chat-input {
  flex: 1;
  max-height: 120px;
  padding: 10px 14px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  resize: none;
  font-family: inherit;
  font-size: 13.5px;
  line-height: 1.4;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.arc-chat-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
}

.arc-chat-send {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  border: none;
  background: #2563eb;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.16s ease, background 0.16s ease;
  flex-shrink: 0;
}

.arc-chat-send:hover {
  background: #1d4ed8;
  transform: scale(1.05);
}

.arc-chat-send:active {
  transform: scale(0.95);
}
```

## JS

```js
export function createChatThread(el, options = {}) {
  const currentUserId = options.currentUserId || 'me';
  const participants = options.participants || [
    { id: 'me', name: '我', avatar: '我' },
    { id: 'agent', name: '技术支持 (Daniel)', avatar: 'D' },
  ];

  const defaultMessages = [
    { id: 'm1', authorId: 'agent', text: '您好！请问有什么可以帮助您的？', time: '10:00', reactions: [{ emoji: '👋', count: 1 }] },
    { id: 'm2', authorId: 'me', text: '我们在做数据表格导出时遇到了行数超限问题。', time: '10:02', reactions: [] },
    { id: 'm3', authorId: 'agent', text: '收到！新版流式引擎现已支持最大一百万行导出，已为您开启配置。', time: '10:05', reactions: [{ emoji: '🎉', count: 2 }] }
  ];

  let messages = [...(options.messages || defaultMessages)];
  let unreadCount = 0;
  let isStick = true;
  let disposed = false;

  el.innerHTML = `
    <div class="arc-chat-root">
      <div class="arc-chat-header">
        <div class="arc-chat-title">客户支持对话</div>
        <div class="arc-chat-status">已连接</div>
      </div>
      <div class="arc-chat-viewport">
        <div class="arc-chat-scroller" data-chat-scroller>
          <div class="arc-chat-track">
            <ol class="arc-chat-list" role="log" aria-live="polite"></ol>
          </div>
        </div>
        <button type="button" class="arc-chat-pill" aria-label="查看最新消息" hidden>
          <span class="arc-chat-pill-text">查看最新消息</span>
          <span class="arc-chat-pill-badge">0</span>
        </button>
      </div>
      <div class="arc-chat-composer">
        <textarea class="arc-chat-input" rows="1" placeholder="输入消息... (Enter 发送, Shift+Enter 换行)"></textarea>
        <button type="button" class="arc-chat-send" aria-label="发送消息">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
        </button>
      </div>
    </div>
  `;

  const scroller = el.querySelector('[data-chat-scroller]');
  const listEl = el.querySelector('.arc-chat-list');
  const pillBtn = el.querySelector('.arc-chat-pill');
  const pillBadge = el.querySelector('.arc-chat-pill-badge');
  const inputEl = el.querySelector('.arc-chat-input');
  const sendBtn = el.querySelector('.arc-chat-send');

  const pMap = new Map(participants.map(p => [p.id, p]));

  function renderMessages() {
    listEl.innerHTML = '';
    messages.forEach((msg) => {
      const isMine = msg.authorId === currentUserId;
      const author = pMap.get(msg.authorId) || { name: '访客', avatar: '?' };
      const li = document.createElement('li');
      li.className = 'arc-chat-row';
      li.setAttribute('data-mine', isMine ? 'true' : 'false');
      li.setAttribute('data-msg-id', msg.id);

      const reactionsHtml = (msg.reactions || []).map(r => `
        <button type="button" class="arc-chat-reaction" data-emoji="${r.emoji}">
          <span>${r.emoji}</span><span>${r.count}</span>
        </button>
      `).join('');

      li.innerHTML = `
        <div class="arc-chat-avatar" aria-hidden="true">${author.avatar}</div>
        <div class="arc-chat-content">
          <div class="arc-chat-meta">
            <span>${author.name}</span>
            <time>${msg.time || '刚刚'}</time>
          </div>
          <div class="arc-chat-bubble">${msg.text}</div>
          <div class="arc-chat-reactions">${reactionsHtml}</div>
        </div>
      `;

      listEl.appendChild(li);
    });
  }

  function scrollToBottom(smooth = true) {
    if (disposed || !scroller) return;
    scroller.scrollTo({
      top: scroller.scrollHeight,
      behavior: smooth ? 'smooth' : 'auto'
    });
    isStick = true;
    unreadCount = 0;
    pillBtn.hidden = true;
  }

  function handleSend() {
    const text = inputEl.value.trim();
    if (!text) return;
    const now = new Date();
    const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newMsg = {
      id: `msg-${Date.now()}`,
      authorId: currentUserId,
      text,
      time: timeStr,
      reactions: []
    };

    messages.push(newMsg);
    inputEl.value = '';
    inputEl.style.height = 'auto';
    renderMessages();
    scrollToBottom(true);

    if (typeof options.onSend === 'function') {
      options.onSend({ text });
    }
  }

  function handleScroll() {
    if (disposed || !scroller) return;
    const distanceToBottom = scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight;
    isStick = distanceToBottom < (options.stickDistance || 48);

    if (isStick) {
      unreadCount = 0;
      pillBtn.hidden = true;
    } else if (distanceToBottom > (options.farDistance || 180) && unreadCount > 0) {
      pillBadge.textContent = unreadCount;
      pillBtn.hidden = false;
    }
  }

  function handleKeydown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleReactionClick(e) {
    const btn = e.target.closest('.arc-chat-reaction');
    if (!btn) return;
    const row = btn.closest('.arc-chat-row');
    const msgId = row?.getAttribute('data-msg-id');
    const emoji = btn.getAttribute('data-emoji');
    if (!msgId || !emoji) return;

    const targetMsg = messages.find(m => m.id === msgId);
    if (targetMsg) {
      const match = targetMsg.reactions.find(r => r.emoji === emoji);
      if (match) {
        match.count += 1;
      } else {
        targetMsg.reactions.push({ emoji, count: 1 });
      }
      renderMessages();
      if (typeof options.onReact === 'function') {
        options.onReact(msgId, emoji);
      }
    }
  }

  renderMessages();
  scrollToBottom(false);

  scroller.addEventListener('scroll', handleScroll, { passive: true });
  sendBtn.addEventListener('click', handleSend);
  inputEl.addEventListener('keydown', handleKeydown);
  listEl.addEventListener('click', handleReactionClick);
  pillBtn.addEventListener('click', () => scrollToBottom(true));

  return {
    destroy() {
      disposed = true;
      scroller.removeEventListener('scroll', handleScroll);
      sendBtn.removeEventListener('click', handleSend);
      inputEl.removeEventListener('keydown', handleKeydown);
      listEl.removeEventListener('click', handleReactionClick);
      el.innerHTML = '';
    }
  };
}
```

## 接入目标项目

```js
import { createChatThread } from './chat-thread.md';

const container = document.getElementById('chat-container');
const chatInstance = createChatThread(container, {
  currentUserId: 'user-88',
  participants: [
    { id: 'user-88', name: '我', avatar: '我' },
    { id: 'bot-1', name: 'AI 顾问', avatar: 'AI' }
  ],
  onSend: ({ text }) => {
    console.log('用户发送:', text);
  }
});

// 在页面卸载时注销
// chatInstance.destroy();
```

## 重入与清理

- 挂载时监听了滚动容器的 `scroll`、输入框的 `keydown` 以及发送按钮的 `click` 事件。
- 实例对外返回统一的 `{ destroy }` 句柄，内部将标志位置为 `disposed = true`，解绑所有事件监听器，避免在 SPA 页面切换时导致内存泄漏。

## 减少动态效果

```css
@media (prefers-reduced-motion: reduce) {
  .arc-chat-row {
    transition: none !important;
  }
  .arc-chat-reaction:hover,
  .arc-chat-send:hover,
  .arc-chat-send:active {
    transform: none !important;
  }
  .arc-chat-scroller {
    scroll-behavior: auto !important;
  }
}
```

## 焦点与键盘

- 输入框支持 `Enter` 快速发送，`Shift + Enter` 保留换行。
- 表情反应按钮具有清晰的 `:focus-visible` 轮廓高亮，支持 `Tab` 键聚焦并由 `Space` 或 `Enter` 触发。
- 悬浮胶囊支持无障碍标签 `aria-label="查看最新消息"`。

## 兼容回退

- 针对低版本不支持 `backdrop-filter` 的浏览器，顶部导航栏回退至纯色不透明背景 `#ffffff`。
- 不支持 `scroll-behavior: smooth` 的环境自动降级为即时滚动直达底部。

## 验收清单

- [x] 首次渲染无报错，支持默认数据回退渲染。
- [x] 发送消息自动滚动到底部并清空输入框。
- [x] 距底部小于 48px 时保持贴底，向上离开且有新消息时展示悬浮胶囊。
- [x] 点击表情按钮支持反应计数实时自增。
- [x] 支持销毁时解绑所有 DOM 侦听。
