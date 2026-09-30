/* PRINCE VYAS — MOBILE SYSTEMS INTERFACE */
(() => {
  const root = document.getElementById('mobile-app');
  if (!root) return;

  const systems = [
    { id:'phoenix', no:'001', title:'PHOENIX', tag:'AI / SYSTEMS', state:'PRIVATE SYSTEM', icon:'◈', desc:'Experimental persistent AI architecture exploring orchestration, memory, tool-mediated execution, model routing, and resource-aware computation.', meta:['AGENTS','MEMORY','ORCHESTRATION'] },
    { id:'agents', no:'002', title:'AI & AGENT SYSTEMS', tag:'INTELLIGENCE', state:'ACTIVE EXPLORATION', icon:'⌬', desc:'LLMs, agentic workflows, context management, automation, local inference, and the infrastructure around usable model systems.', meta:['LLM','TOOLS','AUTOMATION'] },
    { id:'physical', no:'003', title:'EMBEDDED / ROBOTICS', tag:'PHYSICAL COMPUTATION', state:'ACTIVE EXPLORATION', icon:'◇', desc:'Microcontrollers, sensors, networking, electronics, edge computation, and software-controlled physical systems.', meta:['EDGE','SENSORS','CONTROL'] },
    { id:'finance', no:'004', title:'FINANCIAL COMPUTING', tag:'FINTECH / DATA', state:'RESEARCH SURFACE', icon:'₿', desc:'Computational approaches to financial data, analytics, automation, AI-assisted workflows, and technology infrastructure.', meta:['DATA','AI','FINTECH'] },
    { id:'security', no:'005', title:'SECURITY SYSTEMS', tag:'CYBERSECURITY', state:'RESEARCH SURFACE', icon:'▣', desc:'Security-oriented systems thinking across networks, software, device surfaces, defensive engineering, and automation.', meta:['NETWORKS','DEFENSE','SYSTEMS'] }
  ];

  const el = (s, c) => { const n = document.createElement(s); if (c) n.className = c; return n; };
  const esc = s => String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));

  function card(s) {
    const article = el('article','ms-card');
    article.dataset.id = s.id;
    article.innerHTML = `
      <button class="ms-row" type="button" aria-expanded="false">
        <span class="ms-index">${s.no}</span>
        <span class="ms-card-main"><span class="ms-card-title">${esc(s.title)}</span><span class="ms-card-tag">${esc(s.tag)}</span></span>
        <span class="ms-state-dot" aria-hidden="true"></span><span class="ms-plus">+</span>
      </button>
      <div class="ms-drawer" aria-hidden="true">
        <div class="ms-lumen">
          <div class="ms-light l1"></div><div class="ms-light l2"></div><div class="ms-light l3"></div>
          <div class="ms-icon">${esc(s.icon)}</div>
          <div class="ms-lumen-grid"></div>
          <span class="ms-lumen-label">LUMEN / ACTIVE SURFACE</span>
        </div>
        <div class="ms-drawer-copy">
          <div class="ms-state">${esc(s.state)}</div>
          <p>${esc(s.desc)}</p>
          <div class="ms-tags">${s.meta.map(x=>`<span>${esc(x)}</span>`).join('')}</div>
          <a class="ms-action" href="https://github.com/ZenxPrince" target="_blank" rel="noopener"><span>EXPLORE SYSTEM</span><b>↗</b></a>
        </div>
      </div>`;
    const row = article.querySelector('.ms-row');
    row.addEventListener('click', () => toggle(article));
    return article;
  }

  function toggle(cardEl) {
    const open = cardEl.classList.contains('open');
    root.querySelectorAll('.ms-card.open').forEach(c => { if (c !== cardEl) close(c); });
    open ? close(cardEl) : openCard(cardEl);
  }
  function openCard(c) {
    c.classList.add('open');
    c.querySelector('.ms-row').setAttribute('aria-expanded','true');
    c.querySelector('.ms-drawer').setAttribute('aria-hidden','false');
    root.classList.add('focus-mode');
    requestAnimationFrame(() => c.scrollIntoView({behavior:'smooth', block:'nearest'}));
  }
  function close(c) {
    c.classList.remove('open');
    c.querySelector('.ms-row').setAttribute('aria-expanded','false');
    c.querySelector('.ms-drawer').setAttribute('aria-hidden','true');
  }

  const list = root.querySelector('#ms-system-list');
  systems.forEach(s => list.appendChild(card(s)));

  const menu = root.querySelector('#ms-menu');
  const menuBtn = root.querySelector('#ms-menu-btn');
  const closeMenu = () => { menu.classList.remove('open'); menuBtn.setAttribute('aria-expanded','false'); };
  menuBtn.addEventListener('click', () => { const on = menu.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', String(on)); });
  menu.querySelectorAll('[data-ms-jump]').forEach(a => a.addEventListener('click', () => { closeMenu(); }));

  root.querySelector('#ms-year').textContent = new Date().getFullYear();
  root.querySelector('#ms-count').textContent = String(systems.length).padStart(2,'0');

  const github = root.querySelector('#ms-github-grid');
  const status = root.querySelector('#ms-github-status');
  fetch('https://api.github.com/users/ZenxPrince/repos?per_page=8&sort=updated')
    .then(r => { if (!r.ok) throw new Error(); return r.json(); })
    .then(repos => {
      const publicRepos = repos.filter(r => !r.fork);
      status.textContent = `${publicRepos.length} RECENT PUBLIC SURFACES · GITHUB LIVE`;
      publicRepos.slice(0,6).forEach(r => {
        const a = document.createElement('a'); a.className='ms-repo'; a.href=r.html_url; a.target='_blank'; a.rel='noopener';
        a.innerHTML = `<span>${esc(r.name.replace(/[-_]/g,' ').toUpperCase())}</span><small>${esc(r.language || 'REPOSITORY')} · ★ ${r.stargazers_count || 0}</small><b>↗</b>`;
        github.appendChild(a);
      });
    })
    .catch(() => { status.textContent = 'GITHUB SURFACE · CONNECTION UNAVAILABLE'; });
})();
