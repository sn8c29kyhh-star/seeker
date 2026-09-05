/**
 * Candidate Progressive Unlocker & Cognitive Ease Plugin for Docsify
 * Enables independent, per-candidate progression stored in browser localStorage.
 */
(function () {
  const STORAGE_KEY = 'qa_candidate_unlocked_phase';

  const PHASES = [
    { id: 1, name: 'Phase 1: Foundations (Days 1–7)', match: 'Phase 1', endDay: 'day-07' },
    { id: 2, name: 'Phase 2: Jira & Defects (Days 8–14)', match: 'Phase 2', endDay: 'day-14' },
    { id: 3, name: 'Phase 3: SQL Data Validation (Days 15–20)', match: 'Phase 3', endDay: 'day-20' },
    { id: 4, name: 'Phase 4: Postman API Testing (Days 21–25)', match: 'Phase 4', endDay: 'day-25' },
    { id: 5, name: 'Phase 5: Live Project & Jobs (Days 26–30)', match: 'Phase 5', endDay: 'day-30' }
  ];

  function getUnlockedPhase() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'all') return 'all';
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed >= 1 && parsed <= 5) {
        return parsed;
      }
    } catch (e) {
      console.warn('localStorage access failed:', e);
    }
    return 1; // Default to Phase 1 for all new students
  }

  function setUnlockedPhase(val) {
    try {
      localStorage.setItem(STORAGE_KEY, val);
    } catch (e) {
      console.warn('localStorage save failed:', e);
    }
    updateWidgetState();
    applySidebarFiltering();
  }

  function injectWidget() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar || document.getElementById('candidate-progress-widget')) return;

    const widget = document.createElement('div');
    widget.id = 'candidate-progress-widget';
    widget.className = 'progress-widget';

    widget.innerHTML = `
      <div class="progress-widget-header">
        <span class="progress-widget-title">🎯 My Learning Level</span>
        <span id="progress-badge" class="progress-widget-badge">Phase 1 of 5</span>
      </div>
      <div class="progress-bar-track">
        <div id="progress-bar-fill" class="progress-bar-fill" style="width: 20%;"></div>
      </div>
      <label class="progress-select-label" for="candidate-phase-select">Unlocked Curriculum View:</label>
      <select id="candidate-phase-select" class="progress-select">
        <option value="1">Phase 1: Foundations (Days 1–7)</option>
        <option value="2">Phase 2: Jira & Defects (Days 8–14)</option>
        <option value="3">Phase 3: SQL Data Validation (Days 15–20)</option>
        <option value="4">Phase 4: API Testing via Postman (Days 21–25)</option>
        <option value="5">Phase 5: Live Project & Job Prep (Days 26–30)</option>
        <option value="all">🔓 All Unlocked (Mentor / Full View)</option>
      </select>
    `;

    // Insert right above the search bar or navigation
    const searchBox = sidebar.querySelector('.search');
    if (searchBox && searchBox.nextSibling) {
      sidebar.insertBefore(widget, searchBox.nextSibling);
    } else {
      const nav = sidebar.querySelector('.sidebar-nav');
      if (nav) {
        sidebar.insertBefore(widget, nav);
      } else {
        sidebar.appendChild(widget);
      }
    }

    const select = document.getElementById('candidate-phase-select');
    if (select) {
      select.value = getUnlockedPhase().toString();
      select.addEventListener('change', function (e) {
        setUnlockedPhase(e.target.value);
      });
    }

    updateWidgetState();
  }

  function updateWidgetState() {
    const current = getUnlockedPhase();
    const select = document.getElementById('candidate-phase-select');
    const badge = document.getElementById('progress-badge');
    const fill = document.getElementById('progress-bar-fill');

    if (select) select.value = current.toString();

    let percent = 20;
    let label = 'Phase 1 of 5';

    if (current === 'all') {
      percent = 100;
      label = 'Full Access 🔓';
    } else {
      percent = Math.min(100, current * 20);
      label = `Phase ${current} of 5`;
    }

    if (badge) badge.textContent = label;
    if (fill) fill.style.width = `${percent}%`;
  }

  function applySidebarFiltering() {
    const unlocked = getUnlockedPhase();
    const sidebarNav = document.querySelector('.sidebar-nav');
    if (!sidebarNav) return;

    const listItems = sidebarNav.querySelectorAll('li');
    listItems.forEach(li => {
      const text = li.textContent || '';
      
      PHASES.forEach(phase => {
        if (text.includes(phase.match)) {
          // Check if this phase should be locked
          const isLocked = unlocked !== 'all' && phase.id > unlocked;
          
          if (isLocked) {
            li.classList.add('phase-locked');
            if (!li.querySelector('.lock-pill')) {
              const pill = document.createElement('span');
              pill.className = 'lock-pill';
              pill.textContent = '🔒 Locked';
              const heading = li.querySelector('p, strong, span');
              if (heading) heading.appendChild(pill);
            }
          } else {
            li.classList.remove('phase-locked');
            const pill = li.querySelector('.lock-pill');
            if (pill) pill.remove();
          }
        }
      });
    });
  }

  function injectMilestoneCards() {
    const hash = window.location.hash || '';
    const unlocked = getUnlockedPhase();
    if (unlocked === 'all') return;

    PHASES.forEach(phase => {
      if (hash.includes(phase.endDay)) {
        const nextPhaseId = phase.id + 1;
        if (nextPhaseId <= 5 && unlocked === phase.id) {
          const content = document.querySelector('.markdown-section');
          if (content && !document.getElementById('milestone-unlock-card')) {
            const card = document.createElement('div');
            card.id = 'milestone-unlock-card';
            card.className = 'phase-milestone-card';
            card.innerHTML = `
              <h3>🎉 Phase ${phase.id} Complete!</h3>
              <p>Awesome effort! You have completed the curriculum deliverables for Phase ${phase.id}. Ready to move forward?</p>
              <button class="phase-milestone-btn" id="btn-unlock-next">
                🚀 Unlock Phase ${nextPhaseId}: ${PHASES[nextPhaseId - 1].name}
              </button>
            `;
            content.appendChild(card);

            document.getElementById('btn-unlock-next').addEventListener('click', function () {
              setUnlockedPhase(nextPhaseId);
              alert(`🎉 Phase ${nextPhaseId} is now unlocked in your sidebar!`);
            });
          }
        }
      }
    });
  }

  // Register Docsify plugin
  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = (window.$docsify.plugins || []).concat([
    function (hook) {
      hook.doneEach(function () {
        injectWidget();
        applySidebarFiltering();
        injectMilestoneCards();
      });
    }
  ]);
})();
