const STORAGE_KEY = 'orbit-studio-company-state';

const AGENTS = [
  { id: 'ceo', icon: '✦', name: 'CEO Agent', role: 'Company leadership', status: 'Monitoring', description: 'Manages the company, prioritises projects, and reviews strategic execution.' },
  { id: 'pm', icon: '◈', name: 'Project Manager', role: 'Planning & coordination', status: 'Scheduling', description: 'Defines milestones, decomposes work, and assigns tasks across the studio.' },
  { id: 'design', icon: '✧', name: 'UI/UX Designer', role: 'Design systems', status: 'Designing', description: 'Creates interfaces, flows, prototypes and design requirements for each project.' },
  { id: 'frontend', icon: '⌘', name: 'Frontend Developer', role: 'Client interfaces', status: 'Building', description: 'Delivers responsive interfaces and connects them with application services.' },
  { id: 'backend', icon: '⬡', name: 'Backend Developer', role: 'APIs & data', status: 'Developing', description: 'Builds databases, APIs, authentication, and business logic foundations.' },
  { id: 'ai', icon: '✳', name: 'AI Engineer', role: 'AI features', status: 'Integrating', description: 'Implements AI models, automation logic and intelligent workflows.' },
  { id: 'qa', icon: '✓', name: 'QA Testing Agent', role: 'Quality checks', status: 'Verifying', description: 'Runs tests, validates requirements and logs defects before approval.' },
  { id: 'debug', icon: '⌕', name: 'Debugging Agent', role: 'Issue resolution', status: 'Resolving', description: 'Investigates failures and verifies fixes before release.' },
  { id: 'docs', icon: '▣', name: 'Documentation Agent', role: 'Technical writing', status: 'Documenting', description: 'Writes setup instructions, architecture notes and user guides.' }
];

const WORKFLOW_STEPS = [
  { step: '01', title: 'Receive brief', text: 'Client submits goals, scope, budget, and deadline.' },
  { step: '02', title: 'Analyse requirements', text: 'Project Manager turns the brief into a structured brief.' },
  { step: '03', title: 'Plan & assign', text: 'Tasks are decomposed and delegated to specialist agents.' },
  { step: '04', title: 'Build', text: 'Design, frontend, backend, and AI development happen in parallel.' },
  { step: '05', title: 'Test & fix', text: 'QA and debugging validate issues before sign-off.' },
  { step: '06', title: 'Deliver', text: 'Documentation, handoff, and client-ready delivery package are prepared.' }
];

const DEFAULT_STATE = {
  projects: [
    {
      id: 'p-1',
      name: 'Mindful Moments',
      client: 'Kindred Health',
      type: 'Mobile app',
      budget: 24000,
      deadline: '2026-12-08',
      email: 'team@kindredhealth.com',
      requirements: 'A guided mindfulness mobile app for stress reduction and habit tracking with onboarding, sessions, and a calm dashboard.',
      status: 'active',
      tasks: [
        { title: 'Project brief and scope review', agent: 'pm', status: 'done' },
        { title: 'User journey and onboarding flow', agent: 'design', status: 'done' },
        { title: 'Core application UI', agent: 'frontend', status: 'in-progress' },
        { title: 'Session and progress APIs', agent: 'backend', status: 'todo' },
        { title: 'Habit recognition automation', agent: 'ai', status: 'todo' },
        { title: 'Functional QA sign-off', agent: 'qa', status: 'todo' }
      ]
    },
    {
      id: 'p-2',
      name: 'Fieldnotes Commerce',
      client: 'Fieldnotes Supply',
      type: 'Web application',
      budget: 18500,
      deadline: '2026-12-19',
      email: 'hello@fieldnotessupply.com',
      requirements: 'A product catalog and checkout experience for an outdoor brand with responsive browsing, discounts, and admin ordering.',
      status: 'planning',
      tasks: [
        { title: 'Scope, deliverables, and risk review', agent: 'pm', status: 'done' },
        { title: 'Storefront experience design', agent: 'design', status: 'in-progress' },
        { title: 'Catalog and product pages', agent: 'frontend', status: 'todo' },
        { title: 'Orders and inventory logic', agent: 'backend', status: 'todo' },
        { title: 'Checkout automation rules', agent: 'ai', status: 'todo' },
        { title: 'Pre-release QA', agent: 'qa', status: 'todo' }
      ]
    },
    {
      id: 'p-3',
      name: 'Atlas Support Assistant',
      client: 'Atlas Logistics',
      type: 'AI application',
      budget: 32000,
      deadline: '2026-11-27',
      email: 'ops@atlaslogistics.com',
      requirements: 'A support assistant that helps internal staff answer process questions with traceable citations and human escalation.',
      status: 'completed',
      tasks: [
        { title: 'Problem framing and dataset plan', agent: 'pm', status: 'done' },
        { title: 'Assistant UX and prompts', agent: 'design', status: 'done' },
        { title: 'AI chat interface', agent: 'frontend', status: 'done' },
        { title: 'RAG and model orchestration', agent: 'ai', status: 'done' },
        { title: 'Final validation and sign-off', agent: 'qa', status: 'done' }
      ]
    }
  ],
  activity: [
    { agent: 'design', text: 'completed a new mobile onboarding flow for', project: 'Mindful Moments', time: Date.now() - 120000 },
    { agent: 'qa', text: 'reported a validation issue in', project: 'Fieldnotes Commerce', time: Date.now() - 390000 },
    { agent: 'ai', text: 'integrated retrieval logic for', project: 'Atlas Support Assistant', time: Date.now() - 900000 },
    { agent: 'pm', text: 'assigned milestone priorities to', project: 'Kindred Health rollout', time: Date.now() - 1500000 }
  ],
  requests: [
    { title: 'Healthcare app MVP', client: 'Kindred Health', type: 'Mobile app', budget: 24000, due: '12 days' },
    { title: 'Operations dashboard', client: 'Summit Works', type: 'Web application', budget: 18000, due: '18 days' },
    { title: 'Internal AI assistant', client: 'North Pine', type: 'AI application', budget: 30000, due: '26 days' }
  ]
};

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return structuredClone(DEFAULT_STATE);
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed.projects) && Array.isArray(parsed.activity) ? parsed : structuredClone(DEFAULT_STATE);
  } catch (error) {
    console.warn('Unable to load saved state', error);
    return structuredClone(DEFAULT_STATE);
  }
}

let state = loadState();

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getAgent(agentId) {
  return AGENTS.find((agent) => agent.id === agentId) || AGENTS[0];
}

function projectProgress(project) {
  if (!project.tasks || project.tasks.length === 0) return 0;
  const done = project.tasks.filter((task) => task.status === 'done').length;
  return Math.round((done / project.tasks.length) * 100);
}

function formatRelative(time) {
  const minutes = Math.max(1, Math.round((Date.now() - time) / 60000));
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.round(hours / 24);
  return `${days} day${days === 1 ? '' : 's'} ago`;
}

function formatMoney(value) {
  const amount = Number(value || 0);
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
}

function formatDate(value) {
  if (!value) return 'No deadline';
  const date = new Date(value + 'T12:00:00');
  if (Number.isNaN(date.getTime())) return 'No deadline';
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
}

function countOpenTasks() {
  return state.projects.reduce((count, project) => count + project.tasks.filter((task) => task.status !== 'done').length, 0);
}

function renderStats() {
  const projectCount = state.projects.length;
  const active = state.projects.filter((p) => p.status === 'active').length;
  const completed = state.projects.filter((p) => p.status === 'completed').length;
  const openTasks = countOpenTasks();
  const stats = [
    { label: 'Active projects', value: active, detail: 'Delivery in motion', icon: '▣' },
    { label: 'Completed projects', value: completed, detail: 'Ready for sign-off', icon: '✓' },
    { label: 'Pending tasks', value: openTasks, detail: 'Work requiring action', icon: '☷' },
    { label: 'Client requests', value: state.requests.length, detail: 'New project briefs', icon: '✦' }
  ];

  document.getElementById('stats-grid').innerHTML = stats.map((stat) => `
    <article class="stat-card">
      <div class="stat-top">
        <span>${stat.label}</span>
        <span class="stat-icon">${stat.icon}</span>
      </div>
      <div class="stat-value">${stat.value}</div>
      <div class="stat-foot">${stat.detail}</div>
    </article>
  `).join('');

  document.getElementById('nav-project-count').textContent = projectCount;
}

function renderActiveProjects() {
  const items = state.projects.slice(0, 4);
  const html = items.map((project) => {
    const progress = projectProgress(project);
    return `
      <div class="progress-list">
        <div class="progress-item">
          <div class="progress-head">
            <strong>${project.name}</strong>
            <span>${progress}%</span>
          </div>
          <div class="progress-bar"><div class="progress-fill" style="width:${progress}%"></div></div>
          <div class="meta-row">
            <span>${project.client}</span>
            <span>${project.type}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  document.getElementById('active-projects').innerHTML = html || '<div class="empty-state">No active work yet.</div>';
}

function renderClientRequests() {
  document.getElementById('client-requests').innerHTML = state.requests.map((request) => `
    <div class="request-item">
      <div class="request-badge">✦</div>
      <div class="request-copy">
        <strong>${request.title}</strong>
        <p>${request.client} · ${request.type}</p>
        <p>Budget ${formatMoney(request.budget)} · Due in ${request.due}</p>
      </div>
    </div>
  `).join('');
}

function renderActivity() {
  document.getElementById('activity-feed').innerHTML = state.activity.slice(0, 5).map((event) => {
    const agent = getAgent(event.agent);
    return `
      <div class="activity-item">
        <div class="request-badge">${agent.icon}</div>
        <div class="activity-copy">
          <strong>${agent.name}</strong>
          <p>${event.text} <strong>${event.project}</strong></p>
          <div class="tiny-copy">${formatRelative(event.time)}</div>
        </div>
      </div>
    `;
  }).join('');
}

function renderTeamPreview() {
  document.getElementById('team-preview').innerHTML = AGENTS.slice(0, 6).map((agent) => `
    <div class="mini-agent">
      <div class="chip">${agent.icon}</div>
      <div>
        <strong>${agent.name}</strong>
        <small>${agent.role}</small>
      </div>
    </div>
  `).join('');
}

function renderProjectList() {
  const search = document.getElementById('project-search').value.trim().toLowerCase();
  const filter = document.getElementById('project-filter').value;

  const filtered = state.projects.filter((project) => {
    const matchesFilter = filter === 'all' || project.status === filter;
    const haystack = `${project.name} ${project.client} ${project.type}`.toLowerCase();
    const matchesSearch = !search || haystack.includes(search);
    return matchesFilter && matchesSearch;
  });

  document.getElementById('project-grid').innerHTML = filtered.length
    ? filtered.map((project) => {
        const progress = projectProgress(project);
        const statusClass = project.status === 'active' ? 'active' : project.status === 'planning' ? 'planning' : 'completed';
        return `
          <article class="card project-card">
            <div class="card-top">
              <span class="project-tag">${project.type}</span>
              <span class="status-tag ${statusClass}">${project.status}</span>
            </div>
            <div>
              <h3>${project.name}</h3>
              <p>${project.client}</p>
            </div>
            <div class="progress-head">
              <span>Progress</span>
              <strong>${progress}%</strong>
            </div>
            <div class="progress-bar"><div class="progress-fill" style="width:${progress}%"></div></div>
            <div class="meta-row">
              <span>${project.tasks.filter((t) => t.status === 'done').length}/${project.tasks.length} tasks</span>
              <span>${formatDate(project.deadline)}</span>
            </div>
            <div class="meta-row">
              <span>Budget</span>
              <strong>${formatMoney(project.budget)}</strong>
            </div>
          </article>
        `;
      }).join('')
    : '<div class="empty-state">No projects match your filters.</div>';
}

function renderClients() {
  document.getElementById('client-grid').innerHTML = state.projects.map((project) => `
    <article class="card client-card">
      <div class="card-top">
        <span class="project-tag">${project.type}</span>
        <span class="status-tag ${project.status === 'active' ? 'active' : project.status === 'planning' ? 'planning' : 'completed'}">${project.status}</span>
      </div>
      <h3>${project.client}</h3>
      <p>${project.name}</p>
      <div class="meta-row">
        <span>Email</span>
        <strong>${project.email || 'Not provided'}</strong>
      </div>
      <div class="meta-row">
        <span>Budget</span>
        <strong>${formatMoney(project.budget)}</strong>
      </div>
      <div class="meta-row">
        <span>Due</span>
        <strong>${formatDate(project.deadline)}</strong>
      </div>
    </article>
  `).join('');
}

function renderAgents() {
  document.getElementById('agent-grid').innerHTML = AGENTS.map((agent) => `
    <article class="card agent-card">
      <div class="agent-header">
        <div class="agent-icon">${agent.icon}</div>
        <div>
          <h3>${agent.name}</h3>
          <div class="agent-role">${agent.role}</div>
        </div>
      </div>
      <p>${agent.description}</p>
      <div class="meta-row">
        <span>Status</span>
        <strong class="agent-status">${agent.status}</strong>
      </div>
    </article>
  `).join('');
}

function renderWorkflow() {
  document.getElementById('workflow-steps').innerHTML = WORKFLOW_STEPS.map((step) => `
    <div class="workflow-step">
      <small>STEP ${step.step}</small>
      <h3>${step.title}</h3>
      <p>${step.text}</p>
    </div>
  `).join('');
}

function render() {
  renderStats();
  renderActiveProjects();
  renderClientRequests();
  renderActivity();
  renderTeamPreview();
  renderProjectList();
  renderClients();
  renderAgents();
  renderWorkflow();
}

function setView(viewId) {
  document.querySelectorAll('.view').forEach((view) => view.classList.toggle('active', view.id === viewId));
  document.querySelectorAll('.nav-item').forEach((item) => item.classList.toggle('active', item.dataset.view === viewId));
  const topbarTitle = document.getElementById('topbar-title');
  const titles = {
    dashboard: 'Overview',
    projects: 'Projects',
    clients: 'Clients',
    team: 'Agents',
    workflow: 'Workflow'
  };
  topbarTitle.textContent = titles[viewId] || 'Overview';
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function openModal() {
  document.getElementById('project-modal').classList.remove('hidden');
  document.getElementById('project-modal').setAttribute('aria-hidden', 'false');
}

function closeModal() {
  document.getElementById('project-modal').classList.add('hidden');
  document.getElementById('project-modal').setAttribute('aria-hidden', 'true');
}

function handleProjectSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());

  if (!payload.name || !payload.client || !payload.requirements) {
    showToast('Project brief is incomplete.');
    return;
  }

  const project = {
    id: `p-${Date.now()}`,
    name: String(payload.name).trim(),
    client: String(payload.client).trim(),
    type: String(payload.type || 'Web application'),
    budget: Number(payload.budget || 0),
    deadline: String(payload.deadline || ''),
    email: String(payload.email || '').trim(),
    requirements: String(payload.requirements).trim(),
    status: 'planning',
    tasks: [
      { title: 'Client brief and deliverables review', agent: 'pm', status: 'in-progress' },
      { title: 'Design concept and interface spec', agent: 'design', status: 'todo' },
      { title: 'Prototype and frontend build', agent: 'frontend', status: 'todo' },
      { title: 'API and data model setup', agent: 'backend', status: 'todo' },
      { title: 'AI feature integration', agent: 'ai', status: 'todo' },
      { title: 'QA and regression testing', agent: 'qa', status: 'todo' }
    ]
  };

  state.projects.unshift(project);
  state.requests.unshift({
    title: project.name,
    client: project.client,
    type: project.type,
    budget: project.budget,
    due: project.deadline ? 'awaiting review' : 'review pending'
  });
  state.activity.unshift({
    agent: 'pm',
    text: 'accepted a new project brief for',
    project: project.name,
    time: Date.now()
  });

  saveState();
  render();
  form.reset();
  closeModal();
  setView('projects');
  showToast('Project brief created successfully.');
}

function wireEvents() {
  document.querySelectorAll('.nav-item').forEach((button) => {
    button.addEventListener('click', () => setView(button.dataset.view));
  });

  document.querySelectorAll('[data-view]').forEach((button) => {
    if (!button.classList.contains('nav-item')) {
      button.addEventListener('click', () => setView(button.dataset.view));
    }
  });

  document.getElementById('open-project-modal').addEventListener('click', openModal);
  document.getElementById('open-project-modal-2').addEventListener('click', openModal);
  document.getElementById('close-project-modal').addEventListener('click', closeModal);
  document.getElementById('cancel-project-modal').addEventListener('click', closeModal);
  document.getElementById('project-form').addEventListener('submit', handleProjectSubmit);
  document.getElementById('project-search').addEventListener('input', renderProjectList);
  document.getElementById('project-filter').addEventListener('change', renderProjectList);

  document.getElementById('project-modal').addEventListener('click', (event) => {
    if (event.target.id === 'project-modal') closeModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
  });
}

wireEvents();
render();
