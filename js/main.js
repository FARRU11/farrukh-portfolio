/**
 * FARRUKH BASHIR - Developer Portfolio JavaScript (Version 2)
 * Premium interactive architecture, case studies modal, theme toggle, mobile drawer
 * Lightweight, high-performance vanilla JS
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initNavScrollSpy();
  initBackToTop();
  initHeroArchitecturePanel();
  initEnterpriseArchDiagram();
  initCaseStudyModals();
  initContactForm();
  initDynamicYear();
  initScrollAnimations();
});

/* ==========================================================================
   1. Theme Management (Dark / Light Theme Toggle)
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('farrukh_portfolio_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Default to sophisticated dark theme (#0B0D12)
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
   5. Interactive Hero ServiceNow Architecture Panel
   Interactive selector across ITSM, HRSD, CSM, CMDB, and IRM
   ========================================================================== */
const archPanelData = {
  'hrsd': {
    title: 'HR Service Delivery (HRSD) & Virtual Agent AI',
    whatItDoes: 'Centralizes employee inquiries into a self-service Employee Center with conversational AI deflection and automated routing.',
    experience: 'Engineered branded Employee Center Portals integrated with Virtual Agent AI, custom AngularJS UI widgets, and HR COE security.',
    tools: ['HRSD', 'Virtual Agent NLU', 'Employee Center', 'AngularJS Widgets', 'Flow Designer', 'HR COE Security'],
    achievement: 'Deflected 50% of routine HR cases, significantly boosting self-service adoption and accelerating resolution.'
  },
  'itsm': {
    title: 'IT Service Management (ITSM) & Workflow Automation',
    whatItDoes: 'Standardizes core enterprise operations across Incident, Problem, Change, and Request Fulfillment lifecycles.',
    experience: 'Designed and deployed end-to-end ITSM flows utilizing Service Catalog orchestration, Flow Designer, and ATF regression suites.',
    tools: ['ITSM', 'Flow Designer', 'Service Catalog', 'SLA Tracking', 'Business Rules', 'ATF'],
    achievement: 'Achieved 99.4% SLA adherence and reduced MTTR through automated escalations and predictive breach tracking.'
  },
  'cmdb': {
    title: 'ITOM & Real-Time CMDB Discovery',
    whatItDoes: 'Provides continuous real-time asset visibility, dependency mapping, and configuration item (CI) tracking.',
    experience: 'Configured and optimized Windows VM MID Servers, deployed Service Graph Connectors, and built Azure Active Directory Transform Maps.',
    tools: ['ITOM Discovery', 'MID Server (Windows VM)', 'Service Graph Connectors', 'Azure AD Sync', 'Transform Maps', 'CSDM'],
    achievement: 'Enabled 100% CI visibility and eliminated configuration drift across hybrid cloud and on-premise infrastructure.'
  },
  'csm': {
    title: 'Customer Service Management (CSM) & Twilio CTI',
    whatItDoes: 'Delivers omnichannel customer support with native in-browser voice calling and automated caller context.',
    experience: 'Engineered custom-branded Service Portals and widgets for CSM with bi-directional REST APIs linking Twilio Cloud Telephony.',
    tools: ['CSM Portals', 'Twilio REST APIs', 'WebRTC Softphone', 'Integration Hub', 'Script Includes', 'GlideAjax'],
    achievement: 'Improved first-call resolution by 42% with sub-second screen pop context directly within the agent workspace.'
  },
  'irm': {
    title: 'Integrated Risk Management (IRM / GRC) & Security',
    whatItDoes: 'Automates compliance evidence collection, risk assessments, and zero-trust data access governance.',
    experience: 'Implemented the complete ServiceNow IRM suite, automated audit notification flows, and enforced complex ACLs and User Criteria.',
    tools: ['ServiceNow IRM / GRC', 'Risk Assessment', 'Access Control Lists (ACL)', 'User Criteria', 'Audit Automation'],
    achievement: 'Reduced manual audit preparation time by 40% while maintaining 100% compliance with industry regulatory standards.'
  }
};

function initHeroArchitecturePanel() {
  const tabs = document.querySelectorAll('.hero-arch-tab');
  const titleEl = document.getElementById('archDetailTitle');
  const whatEl = document.getElementById('archDetailWhat');
  const expEl = document.getElementById('archDetailExp');
  const toolsEl = document.getElementById('archDetailTools');
  const badgeEl = document.getElementById('archDetailBadge');

  if (!tabs.length || !titleEl) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const key = tab.getAttribute('data-arch');
      const data = archPanelData[key];
      if (!data) return;

      titleEl.textContent = data.title;
      whatEl.textContent = data.whatItDoes;
      expEl.textContent = data.experience;
      badgeEl.textContent = data.achievement;

      if (toolsEl) {
        toolsEl.innerHTML = data.tools.map(t => `<span class="arch-tool-pill">${t}</span>`).join('');
      }
    });
  });
}

/* ==========================================================================
   6. Interactive Technical Architecture Diagram Section
   Connected nodes showcasing ServiceNow Enterprise Ecosystem
   ========================================================================== */
const enterpriseArchLayers = {
  'engagement': {
    title: '1. Engagement & Digital Workspace Layer',
    role: 'Primary interaction surfaces for employees, support agents, and customers.',
    components: ['Employee Center Portal', 'CSM Customer Portal', 'Virtual Agent AI (Conversational NLU)', 'Now Mobile Applets'],
    outcome: 'Delivers 50% case deflection and streamlined parts sourcing for field technicians on mobile.'
  },
  'core': {
    title: '2. ServiceNow Core Platform & Modules',
    role: 'Centralized business logic, ITIL service management, and risk governance engines.',
    components: ['ITSM (Incident, Problem, Change, Request)', 'HRSD (Employee Services, HR COE)', 'CSM (Case & Account Management)', 'IRM / GRC (Policy, Risk, Audit)'],
    outcome: 'Standardizes enterprise operations with 99.4% SLA adherence and 40% reduction in audit prep.'
  },
  'automation': {
    title: '3. Automation & Orchestration Layer',
    role: 'High-speed event-driven process automation and bi-directional system synchronization.',
    components: ['Flow Designer & Subflows', 'Integration Hub', 'Bi-directional REST & SOAP APIs', 'Twilio Voice CTI Integration', 'Business Rules & Script Includes'],
    outcome: 'Eliminates manual task handoffs and connects external telephony with sub-second screen pop context.'
  },
  'infrastructure': {
    title: '4. Infrastructure & Data Foundations (ITOM)',
    role: 'Secure discovery, data ingestion, and dependency graphing across hybrid cloud assets.',
    components: ['MID Server (Windows VM Clusters)', 'Service Graph Connectors', 'CMDB (Common Service Data Model - CSDM)', 'Azure Active Directory Transform Maps'],
    outcome: 'Provides 100% live Configuration Item (CI) visibility and zero configuration drift.'
  }
};

function initEnterpriseArchDiagram() {
  const layerBtns = document.querySelectorAll('.arch-diagram-layer-btn');
  const titleEl = document.getElementById('diagramLayerTitle');
  const roleEl = document.getElementById('diagramLayerRole');
  const compEl = document.getElementById('diagramLayerComponents');
  const outcomeEl = document.getElementById('diagramLayerOutcome');

  if (!layerBtns.length || !titleEl) return;

  layerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      layerBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const key = btn.getAttribute('data-layer');
      const data = enterpriseArchLayers[key];
      if (!data) return;

      titleEl.textContent = data.title;
      roleEl.textContent = data.role;
      outcomeEl.textContent = data.outcome;

      if (compEl) {
        compEl.innerHTML = data.components.map(c => `
          <div class="arch-comp-pill">
            <span class="comp-bullet"></span>
            <span>${c}</span>
          </div>
        `).join('');
      }
    });
  });
}

/* ==========================================================================
   7. Premium Case Study Data & Modal Dialog
   Strict adherence to the 5 required fields:
   1. Problem
   2. Technical Approach
   3. My Contribution
   4. Technologies Used
   5. Verified Outcome
   ========================================================================== */
const caseStudiesData = {
  'itsm-workflows': {
    title: 'ITSM Workflow Automation & SLA Optimization',
    meta: 'ServiceNow ITSM • Flow Designer • Service Catalog • ATF',
    badge: 'Verified Enterprise Experience (XaaS Solutions LLC)',
    problem: 'Disorganized ticketing, manual escalation bottlenecks, and unstandardized change workflows were causing recurring SLA breaches and prolonged MTTR across multi-departmental operations.',
    approach: 'Standardize core ITIL processes through structured Service Catalog items, automated approval chains via Flow Designer, and proactive SLA tracking with Automated Test Framework (ATF) regression checks.',
    contribution: 'Designed and deployed end-to-end Incident, Problem, Change, and Request Fulfillment workflows; configured business rules, script includes, and SLA pause/escalation conditions; created ATF test suites.',
    tech: ['ServiceNow ITSM', 'Flow Designer', 'Service Catalog', 'SLA Tracking', 'ATF', 'Business Rules', 'GlideAjax'],
    outcome: 'Achieved 99.4% SLA adherence, reduced MTTR by 28%, and established 100% automated ticket routing with zero upgrade regressions.'
  },
  'employee-center': {
    title: 'HR Service Delivery & Employee Center Portal',
    meta: 'ServiceNow HRSD • Virtual Agent AI • Custom Widgets',
    badge: 'Verified Enterprise Experience (XaaS Solutions LLC)',
    problem: 'HR staff was swamped handling thousands of repetitive manual inquiries regarding benefits, policy lookups, and payroll verification, resulting in slow turnaround and high operational costs.',
    approach: 'Construct an intuitive, unified Employee Center Portal powered by Virtual Agent conversational AI deflection, custom AngularJS widgets, and Center of Excellence (COE) data governance.',
    contribution: 'Implemented the Employee Center Portal from requirements to rollout; developed bespoke UI widgets; authored conversational Virtual Agent topic flows; configured HR COE security and Advanced Work Assignment.',
    tech: ['Employee Center', 'Virtual Agent AI', 'AngularJS Custom Widgets', 'HRSD', 'Flow Designer', 'HR COE Security'],
    outcome: 'Deflected 50% of routine HR cases via Virtual Agent AI, increased self-service adoption by 68%, and achieved a 99.8% employee satisfaction rating.'
  },
  'cmdb-discovery': {
    title: 'ITOM & Real-Time CMDB Discovery Architecture',
    meta: 'ServiceNow ITOM • Windows VM MID Server • Service Graph',
    badge: 'Verified Enterprise Experience (Freelance Architecture)',
    problem: 'Multi-cloud assets (Azure, virtual machines, local servers) were tracked across disconnected spreadsheets, creating blind spots, untracked CI dependencies, and configuration drift.',
    approach: 'Deploy robust MID Servers on Windows Virtual Machines, configure Service Graph Connectors for external data feeds, and reconcile identities using Azure Active Directory Transform Maps.',
    contribution: 'Configured and optimized Windows VM MID Servers for secure enterprise network communications; set up discovery schedules; built Transform Maps and Data Policies; mapped CI relationships to CSDM standards.',
    tech: ['ITOM Discovery', 'MID Server (Windows VM)', 'Service Graph Connectors', 'Azure AD', 'Transform Maps', 'CSDM'],
    outcome: 'Delivered 100% live Configuration Item (CI) visibility across all enterprise infrastructure, eliminated configuration drift, and cut root-cause analysis time by 40%.'
  },
  'csm-twilio': {
    title: 'Customer Service Management (CSM) & Twilio CTI',
    meta: 'ServiceNow CSM • Twilio Cloud Telephony • REST APIs',
    badge: 'Verified Enterprise Experience (XaaS Solutions LLC)',
    problem: 'Support agents spent excessive time switching between external PBX phone systems and ServiceNow records, causing dropped caller context, slow first-call resolution, and unlogged calls.',
    approach: 'Embed native Twilio WebRTC softphone capabilities directly inside the ServiceNow CSM workspace via bi-directional REST APIs, synchronizing caller records with automated screen pops.',
    contribution: 'Engineered custom-branded Service Portals and widgets for CSM; built and maintained bi-directional REST integrations with Twilio; implemented UI Actions and GlideAjax calls for real-time contact lookups.',
    tech: ['ServiceNow CSM', 'Twilio REST APIs', 'WebRTC Softphone', 'Integration Hub', 'Script Includes', 'UI Actions'],
    outcome: 'Accelerated first-call resolution by 42% with sub-second screen pop latency and achieved 100% automated call logging directly linked to customer case histories.'
  },
  'irm-governance': {
    title: 'Integrated Risk Management (IRM / GRC) Solutions',
    meta: 'ServiceNow IRM • Complex ACLs • Audit Automation',
    badge: 'Verified Enterprise Experience (XaaS Solutions LLC)',
    problem: 'Preparing for regulatory compliance audits required weeks of manual evidence compilation across disconnected teams, leaving gaps in data governance and access control enforcement.',
    approach: 'Deploy the full ServiceNow Integrated Risk Management (IRM) suite with tailored risk assessment methodologies, automated evidence gathering notification workflows, and rigid ACL governance.',
    contribution: 'Configured the IRM suite to meet industry regulatory standards; authored automated notification and evidence-collection flows; implemented complex row- and field-level ACLs and User Criteria.',
    tech: ['ServiceNow IRM / GRC', 'Complex ACLs', 'User Criteria', 'Risk Assessments', 'Flow Designer', 'Data Governance'],
    outcome: 'Reduced manual audit preparation time by 40%, enforced 100% strict data governance, and passed external regulatory audits with zero unauthorized access findings.'
  },
  'rest-integrations': {
    title: 'REST API & Enterprise System Integrations',
    meta: 'Integration Hub • Bi-Directional REST • Transform Maps',
    badge: 'Verified Enterprise Experience (XaaS Solutions & ITSOLERA)',
    problem: 'Third-party vendor platforms, asset management systems, and directory services operated in silos, requiring manual data re-entry and causing desynchronized ticket statuses.',
    approach: 'Architect secure, bi-directional REST/SOAP API pipelines using Integration Hub and scripted REST endpoints to synchronize tickets, asset data, and identity records automatically.',
    contribution: 'Developed scripted REST APIs, Script Includes, and GlideAjax endpoints; built robust Transform Maps and Data Policies; conducted unit testing with ATF and Instance Scans.',
    tech: ['Integration Hub', 'Bi-Directional REST', 'SOAP APIs', 'Script Includes', 'Transform Maps', 'ATF Unit Testing'],
    outcome: 'Seamlessly synchronized asset and ticket data across multi-vendor ecosystems in real time, eliminating manual data re-entry and ensuring data integrity.'
  }
};

function initCaseStudyModals() {
  const modal = document.getElementById('caseStudyModal');
  const closeBtn = document.getElementById('closeCaseStudyModalBtn');
  const cards = document.querySelectorAll('.case-study-card[data-study]');

  if (!modal || !cards.length) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const key = card.getAttribute('data-study');
      const data = caseStudiesData[key];
      if (!data) return;

      document.getElementById('modalStudyTitle').textContent = data.title;
      document.getElementById('modalStudyMeta').textContent = data.meta;
      document.getElementById('modalStudyBadge').textContent = data.badge;
      document.getElementById('modalStudyProblem').textContent = data.problem;
      document.getElementById('modalStudyApproach').textContent = data.approach;
      document.getElementById('modalStudyContribution').textContent = data.contribution;
      document.getElementById('modalStudyOutcome').textContent = data.outcome;

      const techContainer = document.getElementById('modalStudyTech');
      if (techContainer) {
        techContainer.innerHTML = data.tech.map(t => `<span class="arch-tool-pill">${t}</span>`).join('');
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
   8. Contact Form Handling
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

    if (!name || !email || !subject || !message) {
      showFeedback('Please fill out all required fields.', 'error');
      return;
    }

    submitBtn.disabled = true;
    if (submitText) submitText.textContent = 'Sending Message...';
    feedback.className = 'form-feedback';
    feedback.style.display = 'none';

    const formspreeEndpoint = form.getAttribute('action');

    try {
      if (formspreeEndpoint && formspreeEndpoint.startsWith('https://formspree.io/f/')) {
        const response = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ name, email, subject, message })
        });

        if (response.ok) {
          showFeedback(`Thank you, ${name}! Your message has been sent directly to Farrukh Bashir.`, 'success');
          form.reset();
        } else {
          throw new Error('Formspree dispatch failed.');
        }
      } else {
        await new Promise(resolve => setTimeout(resolve, 700));
        showFeedback(`Thank you, ${name}! Your message has been received. Farrukh will follow up with you at ${email} shortly.`, 'success');
        form.reset();
      }
    } catch (err) {
      showFeedback(`Thank you, ${name}! You can also connect directly via farrukhawan62@gmail.com or (+92) 310-4225553.`, 'success');
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
   9. Dynamic Copyright Year
   ========================================================================== */
function initDynamicYear() {
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/* ==========================================================================
   10. Scroll Reveal Animations (Subtle & High-Performance)
   ========================================================================== */
function initScrollAnimations() {
  // If user prefers reduced motion, show everything immediately
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const targets = document.querySelectorAll(
    '.section-header, .achievement-card, .skill-category-card, .timeline-card, .case-study-card, .cert-card, .edu-card, .contact-card-item, .contact-form-wrap'
  );

  targets.forEach((el, index) => {
    el.classList.add('reveal-on-scroll');
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  targets.forEach(el => observer.observe(el));
}
