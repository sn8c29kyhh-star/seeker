/* Device-local study reminders. Never use this state as an assessment result. */
(function (root) {
  'use strict';
  const KEY = 'seeker-study-v1';
  const validDay = day => Number.isInteger(day) && day >= 1 && day <= 30;
  function normalize(value) {
    return { version: 1, completed: [...new Set(value && value.version === 1 && Array.isArray(value.completed) ? value.completed.filter(validDay) : [])].sort((a, b) => a - b) };
  }
  function read(storage) {
    try { return normalize(JSON.parse(storage.getItem(KEY))); } catch (_) { return normalize(null); }
  }
  function toggle(state, day) {
    const next = normalize(state);
    if (validDay(day)) next.completed = next.completed.includes(day) ? next.completed.filter(item => item !== day) : [...next.completed, day].sort((a, b) => a - b);
    return next;
  }
  function save(storage, state) {
    try { storage.setItem(KEY, JSON.stringify(normalize(state))); return true; } catch (_) { return false; }
  }
  function nextDay(state) {
    const completed = normalize(state).completed;
    for (let day = 1; day <= 30; day++) if (!completed.includes(day)) return day;
    return null;
  }
  function path(day) {
    if (!validDay(day)) throw new RangeError('Day must be between 1 and 30');
    const phase = day <= 7 ? 1 : day <= 14 ? 2 : day <= 20 ? 3 : day <= 25 ? 4 : 5;
    return `/curriculum/days/phase-${phase}/day-${String(day).padStart(2, '0')}${day === 1 ? '/README' : ''}`;
  }
  function dayFromPath(route) {
    const clean = route.replace(/^#/, '').split('?')[0].replace(/\.md$/, '').replace(/\/$/, '');
    for (let day = 1; day <= 30; day++) if (clean === path(day)) return day;
    return null;
  }
  const api = { KEY, normalize, read, toggle, save, nextDay, path, dayFromPath };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.SeekerProgress = api;
})(typeof window !== 'undefined' ? window : globalThis);
