/**
 * Quant Finance Terminal - Main Logic
 * Adds "useful" interactivity: Market Ticker, Live Clock, and Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initTicker();
  initScrollAnimations();
  initChartInteractivity();
});

/* --- 1. Live Terminal Clock --- */
function initClock() {
  const clockEl = document.createElement('div');
  clockEl.className = 'terminal-clock';
  clockEl.style.fontFamily = 'var(--font-mono)';
  clockEl.style.fontSize = '0.8rem';
  clockEl.style.color = 'var(--accent-cyan)';
  clockEl.style.marginRight = '2rem';

  // Insert into navbar before the links
  const navContent = document.querySelector('.navbar-content');
  if (navContent) {
    navContent.insertBefore(clockEl, navContent.querySelector('.nav-links'));
  }

  function updateTime() {
    const now = new Date();
    // Format: HKG 14:00:00 | LND 07:00:00 | NYC 02:00:00
    const options = { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const timeNYC = now.toLocaleTimeString('en-US', { ...options, timeZone: 'America/New_York' });
    const timeLIM = now.toLocaleTimeString('en-US', { ...options, timeZone: 'America/Lima' });

    clockEl.innerHTML = `<span style="opacity:0.7">NYC</span> ${timeNYC} <span style="color:var(--text-secondary)">|</span> <span style="opacity:0.7">LIM</span> ${timeLIM} <span style="color:#22C55E">● MKT OPEN</span>`;
  }

  setInterval(updateTime, 1000);
  updateTime();
}

/* --- 2. Infinite Market Ticker --- */
function initTicker() {
  const tickerContainer = document.createElement('div');
  tickerContainer.className = 'market-ticker-wrap';
  tickerContainer.innerHTML = `
        <div class="market-ticker-scroll">
            <span class="ticker-item">1. RISK <span class="down">▼</span></span>
            <span class="ticker-item">2. RETURN <span class="up">▲</span></span>
            <span class="ticker-item">3. KNOWLEDGE <span class="up">▲</span></span>
            <span class="ticker-item">4. QUANT <span class="up">▲</span></span>
            <span class="ticker-item">5. PYTHON <span class="up">▲</span></span>
            <span class="ticker-item">6. POWER BI <span class="up">▲</span></span>
            <span class="ticker-item">7. MARKETS <span class="up">▲</span></span>
            <span class="ticker-item">8. TEACH <span class="up">▲</span></span>
            <span class="ticker-item">9. LEAD <span class="up">▲</span></span>
            <span class="ticker-item">10. MOMENTUM <span class="up">▲</span></span>
            <!-- Duplicate for loop -->
            <span class="ticker-item">1. RISK <span class="down">▼</span></span>
            <span class="ticker-item">2. RETURN <span class="up">▲</span></span>
            <span class="ticker-item">3. KNOWLEDGE <span class="up">▲</span></span>
            <span class="ticker-item">4. QUANT <span class="up">▲</span></span>
            <span class="ticker-item">5. PYTHON <span class="up">▲</span></span>
            <span class="ticker-item">6. POWER BI <span class="up">▲</span></span>
            <span class="ticker-item">7. MARKETS <span class="up">▲</span></span>
            <span class="ticker-item">8. TEACH <span class="up">▲</span></span>
            <span class="ticker-item">9. LEAD <span class="up">▲</span></span>
            <span class="ticker-item">10. MOMENTUM <span class="up">▲</span></span>
        </div>
    `;

  document.body.appendChild(tickerContainer);

  // Add styles dynamically
  const style = document.createElement('style');
  style.textContent = `
        .market-ticker-wrap {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background: #020202;
            border-top: 1px solid #1f2937;
            padding: 8px 0;
            overflow: hidden;
            z-index: 9999;
            font-family: var(--font-mono);
            font-size: 0.75rem;
            white-space: nowrap;
        }
        .market-ticker-scroll {
            display: inline-block;
            animation: ticker 30s linear infinite;
        }
        .ticker-item {
            margin: 0 20px;
            color: #9CA3AF;
        }
        .up { color: #22C55E; }
        .down { color: #EF4444; }
        .flat { color: #9CA3AF; }
        @keyframes ticker {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
        }
        /* Offset body to not hide content behind ticker */
        body { padding-bottom: 40px; }
    `;
  document.head.appendChild(style);
}

/* --- 3. Scroll Reveal --- */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section-title, .card, .project-card, .resume-block').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });

  // CSS class for visibility
  const style = document.createElement('style');
  style.textContent = `
        .visible { opacity: 1 !important; transform: translateY(0) !important; }
    `;
  document.head.appendChild(style);
}

/* --- 4. Interactive Chart Tooltips --- */
function initChartInteractivity() {
  const points = document.querySelectorAll('.point');
  const tooltip = document.createElement('div');
  tooltip.className = 'chart-tooltip';
  document.body.appendChild(tooltip);

  // Tooltip Styles
  const style = document.createElement('style');
  style.textContent = `
        .chart-tooltip {
            position: absolute;
            background: rgba(10, 15, 24, 0.95);
            border: 1px solid var(--accent-cyan);
            padding: 10px;
            border-radius: 4px;
            font-family: var(--font-mono);
            font-size: 0.75rem;
            color: var(--text-primary);
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.2s;
            z-index: 10000;
            box-shadow: 0 0 15px rgba(6, 182, 212, 0.2);
            max-width: 200px;
        }
    `;
  document.head.appendChild(style);

  const pointDetails = {
    '2019': "Initial Public Offering (High School Graduation). Top Student Rating.",
    '2022': "First M&A Activity: Zubale Experience. Operational efficiency increased.",
    '2023': "Series A Funding: Beca 18 Award. Secured full tuition coverage.",
    '2025': "Strategic Partnership: Teaching Assistantship. Knowledge transfer initiated.",
    'Current': "Market Peak: FinLab Summer School. Advanced quantitative modeling."
  };

  points.forEach(point => {
    point.addEventListener('mouseenter', (e) => {
      const year = point.getAttribute('data-year');
      const rect = point.getBoundingClientRect();

      tooltip.innerHTML = `<strong style="color:var(--accent-cyan)">${year}</strong><br>${pointDetails[year] || 'Data distinct'}`;
      tooltip.style.left = `${rect.left - 80}px`;
      tooltip.style.top = `${rect.top - 60}px`; // Above the dot
      tooltip.style.opacity = '1';
    });

    point.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
    });
  });
}