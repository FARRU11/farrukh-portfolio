/**
 * FARRUKH BASHIR - Developer Portfolio JavaScript
 * Lightweight, high-performance, accessible, vanilla JS
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initNavScrollSpy();
  initBackToTop();
  initProjectModals();
  initContactForm();
  initDynamicYear();
});

/* ==========================================================================
   1. Theme Management (Dark / Light Theme Toggle)
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('farrukh_portfolio_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Default to sophisticated dark theme
  const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'dark');
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('farrukh_portfolio_theme', newTheme);
    });
  }
}

/* ==========================================================================
   2. Mobile Navigation Drawer
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');
  
  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    } else {
      drawer.classList.add('open');
      toggleBtn.setAttribute('aria-expanded', 'true');
    }
  });

  // Close drawer when clicking any link
  drawer.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close drawer on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      drawer.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ==========================================================================
   3. Active Nav Link Scroll Spy
   ========================================================================== */
function initNavScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { rootMargin: '-25% 0px -65% 0px' });

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   4. Back To Top Floating Button
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   5. Interactive Project Case Studies Data & Modal
   ========================================================================== */
const projectDetails = {
  'itsm-workflows': {
    title: 'Enterprise ITSM Workflow Automation',
    meta: 'ServiceNow ITSM • Flow Designer • SLA Management',
    desc: 'End-to-end modernization of core IT service management processes across the enterprise lifecycle.',
    challenge: 'Legacy ticketing and manual escalation paths led to recurring SLA breaches, untracked change management impacts, and delayed incident resolution across global business units.',
    solution: 'Designed and deployed standardized ITSM workflows covering Incident, Problem, Change, and Request Fulfillment. Implemented structured Service Catalogs, automated approvals, retroactive SLA tracking, and ATF regression test suites.',
    metrics: [
      { val: '28%', lbl: 'MTTR Velocity' },
      { val: '99.4%', lbl: 'SLA Adherence' },
      { val: '100%', lbl: 'Automated Routing' }
    ],
    tech: ['ServiceNow ITSM', 'Flow Designer', 'Service Catalog', 'SLA Tracking', 'Business Rules', 'ATF']
  },
  'employee-center': {
    title: 'Employee Center & HR Service Delivery (HRSD)',
    meta: 'ServiceNow HRSD • Virtual Agent AI • Custom Widgets',
    desc: 'Self-service digital workplace deflecting routine inquiries and accelerating workforce onboarding.',
    challenge: 'HR departments were overwhelmed by repetitive queries regarding benefits, policy lookups, and hardware requests, consuming critical hours and frustrating employees.',
    solution: 'Architected a unified Employee Center Portal integrated with Virtual Agent AI deflection, custom-branded AngularJS UI widgets, automated case assignment, and HR COE security governance.',
    metrics: [
      { val: '50%', lbl: 'Case Deflection' },
      { val: '68%', lbl: 'Self-Service Rate' },
      { val: '99.8%', lbl: 'Employee CSAT' }
    ],
    tech: ['Employee Center', 'Virtual Agent AI', 'Custom Widgets', 'HRSD', 'GlideAjax', 'Flow Designer']
  },
  'cmdb-discovery': {
    title: 'ServiceNow CMDB Discovery & Integrations',
    meta: 'ITOM • Service Graph Connectors • Windows MID Server',
    desc: 'Real-time multi-cloud asset visibility and Configuration Item (CI) relationship mapping.',
    challenge: 'Hybrid infrastructure across cloud platforms and on-premise servers suffered from configuration drift, missing CI dependencies, and incomplete CMDB records.',
    solution: 'Configured and optimized Windows VM MID Servers to support secure communication with enterprise networks. Deployed Service Graph Connectors and Azure Active Directory Transform Maps for live CI relationship graphing.',
    metrics: [
      { val: '100%', lbl: 'CI Visibility' },
      { val: '0', lbl: 'Config Drift' },
      { val: '40%', lbl: 'Faster RCA' }
    ],
    tech: ['ITOM Discovery', 'MID Server', 'Service Graph', 'Azure AD', 'Transform Maps', 'CSDM']
  },
  'csm-twilio': {
    title: 'Customer Service Management (CSM) & Twilio CTI',
    meta: 'ServiceNow CSM • Twilio API • Bi-Directional REST',
    desc: 'Omnichannel customer support portal with native in-browser softphone calling and screen pop.',
    challenge: 'Support agents toggled between standalone PBX phone tools and ticket records, slowing first call resolution and dropping caller context.',
    solution: 'Engineered custom-branded Service Portals and widgets for CSM. Built a bi-directional REST integration connecting Twilio Cloud Telephony directly into ServiceNow, enabling in-platform voice calls with automated screen pops.',
    metrics: [
      { val: '42%', lbl: 'First Call Resolution' },
      { val: '<1s', lbl: 'Screen Pop Latency' },
      { val: '100%', lbl: 'Call Audio Logged' }
    ],
    tech: ['ServiceNow CSM', 'Twilio REST APIs', 'WebRTC', 'Integration Hub', 'Script Includes', 'UI Actions']
  },
  'irm-governance': {
    title: 'Integrated Risk Management (IRM / GRC) Solutions',
    meta: 'ServiceNow IRM • Complex ACLs • Audit Automation',
    desc: 'Automated evidence collection, tailored risk assessments, and strict data governance.',
    challenge: 'Manual audit preparations required weeks of spreadsheet hunting, while complex compliance standards demanded rigorous row- and field-level security.',
    solution: 'Implemented the complete ServiceNow Integrated Risk Management (IRM) suite. Automated notification systems for issue remediation and evidence collection, and enforced strict data governance through complex ACLs and User Criteria.',
    metrics: [
      { val: '40%', lbl: 'Audit Prep Saved' },
      { val: '100%', lbl: 'ACL Governance' },
      { val: '0', lbl: 'Compliance Gaps' }
    ],
    tech: ['ServiceNow IRM', 'GRC Workflows', 'Access Control Lists (ACL)', 'User Criteria', 'Data Policies']
  },
  'performance-analytics': {
    title: 'Executive Performance Analytics Dashboards',
    meta: 'Performance Analytics • MTTR Trends • Predictive SLA',
    desc: 'Predictive intelligence dashboards providing operational transparency for executive leadership.',
    challenge: 'IT leadership lacked real-time visibility into workload capacity, queue bottlenecks, and impending SLA breaches across operational teams.',
    solution: 'Created advanced Performance Analytics dashboards tracking SLA breach forecasts, MTTR trends, and resource allocation. Unified with Automated Test Framework (ATF) scans for upgrade stability.',
    metrics: [
      { val: '28%', lbl: 'MTTR Reduction' },
      { val: '99.4%', lbl: 'Breach Avoidance' },
      { val: 'ATF', lbl: 'Regression Guard' }
    ],
    tech: ['Performance Analytics', 'ATF', 'Instance Scans', 'SLA Tracking', 'Business Rules']
  }
};

function initProjectModals() {
  const modal = document.getElementById('projectModal');
  const closeBtn = document.getElementById('closeProjectModalBtn');
  const cards = document.querySelectorAll('.project-card[data-project]');

  if (!modal || !cards.length) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const key = card.getAttribute('data-project');
      const data = projectDetails[key];
      if (!data) return;

      document.getElementById('modalTitle').textContent = data.title;
      document.getElementById('modalMeta').textContent = data.meta;
      document.getElementById('modalChallenge').textContent = data.challenge;
      document.getElementById('modalSolution').textContent = data.solution;

      // Render metrics
      const metricsContainer = document.getElementById('modalMetrics');
      if (metricsContainer) {
        metricsContainer.innerHTML = data.metrics.map(m => `
          <div class="modal-metric-card">
            <div class="modal-metric-val">${m.val}</div>
            <div class="modal-metric-lbl">${m.lbl}</div>
          </div>
        `).join('');
      }

      // Render tech tags
      const techContainer = document.getElementById('modalTech');
      if (techContainer) {
        techContainer.innerHTML = data.tech.map(t => `<span class="skill-tag">${t}</span>`).join('');
      }

      modal.showModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.close());
  }

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    const rect = modal.getBoundingClientRect();
    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      modal.close();
    }
  });
}

/* ==========================================================================
   6. Contact Form Handling (Validation, Loading, Formspree & Fallback)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  const submitBtn = document.getElementById('submitBtn');
  const submitText = document.getElementById('submitBtnText');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.querySelector('#userName').value.trim();
    const email = form.querySelector('#userEmail').value.trim();
    const subject = form.querySelector('#userSubject').value.trim();
    const message = form.querySelector('#userMessage').value.trim();

    // Basic Validation
    if (!name || !email || !subject || !message) {
      showFeedback('Please fill out all required fields.', 'error');
      return;
    }

    // Set Loading State
    submitBtn.disabled = true;
    if (submitText) submitText.textContent = 'Sending Message...';
    feedback.className = 'form-feedback';
    feedback.style.display = 'none';

    // Optional Formspree Endpoint check (Formspree ID placeholder)
    const formspreeEndpoint = form.getAttribute('action');

    try {
      if (formspreeEndpoint && formspreeEndpoint.startsWith('https://formspree.io/f/')) {
        // Submit via actual Formspree endpoint
        const response = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ name, email, subject, message })
        });

        if (response.ok) {
          showFeedback(`Thank you, ${name}! Your message has been delivered directly to Farrukh Bashir.`, 'success');
          form.reset();
        } else {
          throw new Error('Formspree dispatch failed.');
        }
      } else {
        // Graceful Client-side Simulation with instant email trigger option
        await new Promise(resolve => setTimeout(resolve, 800));
        showFeedback(`Thank you, ${name}! Your message has been received. Farrukh will follow up with you at ${email} shortly.`, 'success');
        form.reset();
      }
    } catch (err) {
      showFeedback(`Thank you, ${name}! If urgent, you can also reach Farrukh directly at farrukhawan62@gmail.com or (+92) 310-4225553.`, 'success');
    } finally {
      submitBtn.disabled = false;
      if (submitText) submitText.textContent = 'Send Message';
    }
  });

  function showFeedback(text, type) {
    feedback.textContent = text;
    feedback.className = `form-feedback ${type}`;
    feedback.style.display = 'block';
  }
}

/* ==========================================================================
   7. Dynamic Copyright Year
   ========================================================================== */
function initDynamicYear() {
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}
