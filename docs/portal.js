(function () {
  'use strict';
  const progress = window.SeekerProgress;
  let storage;
  try { storage = window.localStorage; } catch (_) {}
  let state = progress.read(storage);
  let storageFailed = !storage;
  let diagramLibrary;
  let diagramId = 0;
  const $ = selector => document.querySelector(selector);
  function announce(message) { $('#save-status').textContent = message; }
  function syncPreferences() {
    const dark = document.documentElement.dataset.theme === 'dark';
    $('#theme-toggle').setAttribute('aria-pressed', String(dark));
    $('#theme-toggle').setAttribute('aria-label', dark ? 'Use light appearance' : 'Use dark appearance');
    $('#text-size').setAttribute('aria-pressed', String(document.documentElement.dataset.largeText === 'true'));
  }
  function preference(key, value) {
    try { storage.setItem(key, value); } catch (_) { announce('Reading preference changed for this visit. Browser storage is unavailable.'); }
  }
  function closeMenu(restoreFocus = false) {
    document.body.classList.remove('nav-open');
    $('#menu-button').setAttribute('aria-expanded', 'false');
    $('#menu-button').setAttribute('aria-label', 'Open course navigation');
    syncSidebar();
    if (restoreFocus) $('#menu-button').focus();
  }
  function syncSidebar() {
    const sidebar = $('.sidebar');
    const mobile = matchMedia('(max-width: 800px)').matches;
    const open = document.body.classList.contains('nav-open');
    if (sidebar) sidebar.inert = mobile && !open;
    const content = $('.content');
    if (content) content.inert = mobile && open;
  }
  $('#menu-button').addEventListener('click', () => {
    if (document.body.classList.contains('nav-open')) closeMenu();
    else {
      document.body.classList.add('nav-open');
      $('#menu-button').setAttribute('aria-expanded', 'true');
      $('#menu-button').setAttribute('aria-label', 'Close course navigation');
      syncSidebar();
      $('.sidebar input, .sidebar a')?.focus();
    }
  });
  $('#nav-backdrop').addEventListener('click', () => closeMenu(true));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && document.body.classList.contains('nav-open')) closeMenu(true); });
  matchMedia('(max-width: 800px)').addEventListener('change', () => closeMenu());
  $('#skip-link').addEventListener('click', event => {
    event.preventDefault(); closeMenu(); $('#main')?.focus();
  });
  $('#theme-toggle').addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme; preference('seeker-theme', theme); syncPreferences();
  });
  $('#text-size').addEventListener('click', () => {
    const large = document.documentElement.dataset.largeText !== 'true';
    document.documentElement.dataset.largeText = String(large); preference('seeker-large-text', String(large)); syncPreferences();
  });
  syncPreferences();

  function refreshProgress() {
    const count = state.completed.length;
    const next = progress.nextDay(state);
    if ($('#study-count')) $('#study-count').textContent = `${count} / 30`;
    if ($('#study-progress')) $('#study-progress').value = count;
    if ($('#storage-note')) $('#storage-note').textContent = storageFailed ? 'Saving is unavailable. Changes last only for this visit.' : 'Saved in this browser. No account sync or mentor grading.';
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
      const day = progress.dayFromPath(link.hash);
      link.dataset.completed = String(day !== null && state.completed.includes(day));
    });
    const resume = $('#resume-link');
    if (resume) {
      resume.href = next ? `#${progress.path(next)}` : '#/curriculum/overview';
      resume.textContent = next ? `${count ? 'Continue' : 'Start'} Day ${next} →` : 'Revisit the roadmap →';
      $('#resume-title').textContent = count === 0 ? 'Start with the fundamentals' : next ? `Make time for Day ${next}` : 'All 30 days marked complete';
      $('#resume-description').textContent = count ? `${count} of 30 days marked studied. ${next ? 'Your next uncompleted lesson is ready.' : 'Review your portfolio and next steps with your mentor.'}` : '30 days of concepts, practice, and interview preparation.';
    }
    const button = $('#complete-day');
    if (button) {
      const complete = state.completed.includes(Number(button.dataset.day));
      button.textContent = complete ? 'Study complete · Undo' : 'Mark my study complete';
      button.setAttribute('aria-pressed', String(complete));
      $('#completion-note').textContent = storageFailed ? 'Saving is unavailable. This mark will be lost when you leave or reload.' : 'A personal reminder saved in this browser. Submit your work to your mentor for assessment.';
    }
  }
  function widget() {
    const sidebar = $('.sidebar');
    if (!sidebar) return;
    sidebar.id = 'course-sidebar'; sidebar.setAttribute('aria-label', 'Course navigation');
    if (!$('#study-widget')) {
      const panel = document.createElement('section');
      panel.id = 'study-widget'; panel.className = 'progress-widget'; panel.setAttribute('aria-label', 'Your study progress');
      panel.innerHTML = '<div class="progress-title"><span>My study progress</span><span id="study-count">0 / 30</span></div><progress id="study-progress" max="30" value="0" aria-label="Days marked studied"></progress><p id="storage-note"></p>';
      const nav = sidebar.querySelector('.sidebar-nav');
      sidebar.insertBefore(panel, nav);
      sidebar.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
    }
    syncSidebar();
  }
  async function renderDiagrams(content) {
    const blocks = [...content.querySelectorAll('pre[data-lang="mermaid"], pre:has(code.lang-mermaid), pre:has(code.language-mermaid)')];
    if (!blocks.length) return;
    try {
      diagramLibrary ||= import('https://cdn.jsdelivr.net/npm/mermaid@11.12.0/dist/mermaid.esm.min.mjs').then(({ default: mermaid }) => {
        mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', theme: 'default', fontFamily: 'Arial, sans-serif' }); return mermaid;
      });
      const mermaid = await diagramLibrary;
      for (const block of blocks) {
        if (!block.isConnected) continue;
        const code = block.querySelector('code')?.textContent || block.textContent;
        try {
          const { svg } = await mermaid.render(`seeker-diagram-${++diagramId}`, code);
          if (!block.isConnected) continue;
          const figure = document.createElement('figure'); figure.className = 'diagram';
          figure.setAttribute('role', 'img'); figure.setAttribute('aria-label', 'Lesson diagram');
          figure.innerHTML = svg;
          const details = document.createElement('details'); details.className = 'diagram-fallback';
          const summary = document.createElement('summary'); summary.textContent = 'Read diagram as text';
          const pre = document.createElement('pre'); pre.textContent = code;
          details.append(summary, pre); figure.append(details); block.replaceWith(figure);
        } catch (_) { block.setAttribute('aria-label', 'Diagram source: diagram could not be rendered'); }
      }
    } catch (_) { diagramLibrary = null; /* The original text remains readable without the CDN. */ }
  }
  function enhanceLesson(content, day) {
    const meta = document.createElement('p'); meta.className = 'lesson-meta';
    meta.textContent = `MANUAL QA / DAY ${String(day).padStart(2, '0')} OF 30`;
    content.prepend(meta);
    const headings = [...content.querySelectorAll('h2[id]')];
    if (headings.length) {
      const toc = document.createElement('details'); toc.className = 'lesson-toc';
      const summary = document.createElement('summary'); summary.textContent = 'In this lesson'; toc.append(summary);
      headings.forEach(heading => {
        const link = document.createElement('a'); link.href = `#${progress.path(day)}?id=${encodeURIComponent(heading.id)}`;
        link.textContent = heading.textContent; toc.append(link);
      });
      content.querySelector('h1')?.insertAdjacentElement('afterend', toc);
    }
    const completion = document.createElement('section'); completion.className = 'lesson-completion';
    completion.innerHTML = '<h2>Finished studying for today?</h2><p>Complete the exercise and explain the key ideas in your own words. Share your work with your mentor before moving on.</p><button class="button" id="complete-day" type="button" aria-pressed="false">Mark my study complete</button><p id="completion-note"></p>';
    content.append(completion);
    const button = $('#complete-day'); button.dataset.day = day;
    button.addEventListener('click', () => {
      state = progress.toggle(state, day); storageFailed = !progress.save(storage, state); refreshProgress();
      announce(storageFailed ? 'Could not save. Your study mark lasts only for this visit.' : `Day ${day} ${state.completed.includes(day) ? 'marked studied' : 'study mark removed'}. Saved in this browser.`);
    });
    const nav = document.createElement('nav'); nav.className = 'lesson-navigation'; nav.setAttribute('aria-label', 'Adjacent lessons');
    const previous = document.createElement('a'); previous.href = day > 1 ? `#${progress.path(day - 1)}` : '#/curriculum/setup/README'; previous.textContent = day > 1 ? `← Day ${day - 1}` : '← Setup guide'; nav.append(previous);
    const next = document.createElement('a'); next.href = day < 30 ? `#${progress.path(day + 1)}` : '#/curriculum/overview'; next.textContent = day < 30 ? `Day ${day + 1} →` : 'Review the roadmap →'; nav.append(next); content.append(nav);
  }
  window.addEventListener('storage', event => { if (event.key === progress.KEY || event.key === null) { state = progress.read(storage); refreshProgress(); } });
  window.$docsify.plugins = (window.$docsify.plugins || []).concat(function (hook, vm) {
    hook.doneEach(() => {
      const content = $('.markdown-section'); if (!content) return;
      content.id = 'main'; content.tabIndex = -1;
      // Strip decorative heading emoji from the rendered view, leaving lesson source intact.
      content.querySelectorAll('h1,h2,h3').forEach(heading => {
        const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
        const text = walker.nextNode(); if (text) text.textContent = text.textContent.replace(/^[^\p{L}\p{N}]+/u, '');
      });
      const day = progress.dayFromPath(vm.route.path);
      if (day) enhanceLesson(content, day);
      const footer = document.createElement('footer'); footer.className = 'site-footer';
      footer.textContent = 'Seeker / Manual QA learning path · ';
      const source = document.createElement('a'); source.href = 'https://github.com/sn8c29kyhh-star/seeker'; source.textContent = 'Course source'; footer.append(source); content.append(footer);
      widget(); refreshProgress(); closeMenu();
      document.title = `${content.querySelector('h1')?.textContent || 'Learning path'} · Seeker`;
      void renderDiagrams(content);
    });
  });
})();
