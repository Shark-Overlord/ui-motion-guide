// Offline sampling clock. Inject only in the renderer; source pages stay unchanged.
(() => {
  if (window.__motionRenderClock) return;
  let now = 0, sequence = 1;
  const tasks = new Map();
  const nativeDate = Date;
  const epoch = nativeDate.now();
  const step = 1000 / 240;
  class RenderDate extends nativeDate {
    constructor(...args) { super(...(args.length ? args : [epoch + now])); }
    static now() { return epoch + now; }
  }
  window.Date = RenderDate;
  Object.defineProperty(performance, 'now', { value: () => now, configurable: true });
  function schedule(callback, delay, repeat, raf = false, args = []) {
    if (typeof callback !== 'function') throw new Error('Renderer supports function timers only');
    const id = sequence++;
    const duration = Math.max(raf ? step : 0, Number(delay) || 0);
    tasks.set(id, { callback, due: now + duration, repeat, duration, raf, args });
    return id;
  }
  window.setTimeout = (callback, delay, ...args) => schedule(callback, delay, false, false, args);
  window.setInterval = (callback, delay, ...args) => schedule(callback, Math.max(1, Number(delay) || 0), true, false, args);
  window.clearTimeout = window.clearInterval = id => tasks.delete(id);
  window.requestAnimationFrame = callback => schedule(callback, step, false, true);
  window.cancelAnimationFrame = id => tasks.delete(id);
  const animations = new WeakMap();
  let animationId = 0;
  window.__motionRenderClock = {
    get now() { return now; },
    tick(target) {
      if (target + 0.00001 < now) throw new Error('Render clock cannot move backwards');
      let iterations = 0;
      while (true) {
        let nextId, next;
        for (const [id, task] of tasks) {
          if (task.due <= target + 0.00001 && (!next || task.due < next.due)) { nextId = id; next = task; }
        }
        if (!next) break;
        if (++iterations > 10000) throw new Error('Runaway render timers');
        now = next.due;
        if (next.repeat) next.due += next.duration;
        else tasks.delete(nextId);
        next.callback(...(next.raf ? [now] : next.args));
      }
      now = target;
      // Force style creation before detecting and seeking CSS transitions.
      void document.documentElement.offsetHeight;
      const active = [];
      for (const animation of document.getAnimations()) {
        let record = animations.get(animation);
        if (!record) {
          record = { start: now, id: ++animationId };
          animations.set(animation, record);
          animation.pause();
        }
        const timing = animation.effect.getComputedTiming();
        const elapsed = Math.max(0, now - record.start);
        const end = Number(timing.endTime);
        const position = Number.isFinite(end) ? Math.min(elapsed, end) : elapsed;
        animation.currentTime = position;
        let visible = true;
        for (let node = animation.effect.target; node && node.nodeType === 1; node = node.parentElement) {
          const style = getComputedStyle(node);
          if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) { visible = false; break; }
        }
        if (visible && (!Number.isFinite(end) || position < end)) active.push(record.id + ':' + position.toFixed(5));
      }
      const root = document.body;
      const hovered = [...document.querySelectorAll(':hover')].map(el => el.id + '.' + el.className).join('|');
      const pressed = [...document.querySelectorAll(':active')].map(el => el.id + '.' + el.className).join('|');
      return { fingerprint: root.innerHTML + active.join('|') + hovered + pressed + document.activeElement?.outerHTML, activeAnimations: active.length, time: now };
    }
  };
})();
