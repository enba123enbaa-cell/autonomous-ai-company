const STORAGE_KEY = 'orbit-studio-v1';
const AGENTS = [
  { id: 'ceo', name: 'CEO Agent', icon: '✦', role: 'Company leadership', description: 'Oversees the studio, balances priorities, and keeps delivery aligned with client goals.' },
  { id: 'pm', name: 'Project Manager', icon: '◷', role: 'Planning & coordination', description: 'Turns client briefs into scoped plans, milestones, and clear work assignments.' },
  { id: 'design', name: 'UI/UX Designer', icon: '◈', role: 'Product design', description: 'Shapes user journeys, interface direction, and practical design specifications.' },
  { id: 'frontend', name: 'Frontend Developer', icon: '⌘', role: 'Client applications', description: 'Builds responsive interfaces and connects them to application services.' },
  { id: 'backend', name: 'Backend Developer', icon: '⟡', role: 'APIs & data', description: 'Designs APIs, data models, business logic, and secure service foundations.' },
  { id: 'ai', name: 'AI Engineer', icon: '✳', role: 'AI & automation', description: 'Plans model integrations, intelligent features, and responsible automation.' },
  { id: 'qa', name: 'QA Testing', icon: '✓', role: 'Quality assurance', description: 'Checks requirements, scenarios, accessibility, and release readiness.' },
  { id: 'debug', name: 'Debugging Agent', icon: '⌕', role: 'Issue resolution', description: 'Investigates reported defects and coordinates fixes and retesting.' },
  { id: 'docs', name: 'Documentation', icon: '▤', role: 'Technical writing', description: 'Prepares setup notes, technical references, and clear user guidance.' }
];
const WORKFLOW = ['Receive client brief', 'Analyse requirements', 'Plan scope & tasks', 'Assign specialist work', 'Build & integrate', 'Test and fix issues', 'Final quality review', 'Prepare deliverables', 'Client handoff'];
const PLAN = [
  ['Confirm scope and acceptance criteria', 'pm'], ['Map user journeys and interface requirements', 'design'], ['Define technical architecture and data model', 'backend'], ['Build core user interface', 'frontend'], ['Implement services and business logic', 'backend'], ['Integrate AI and automation requirements', 'ai'], ['Test key flows and report issues', 'qa'], ['Resolve defects and retest', 'debug'], ['Prepare setup and handoff documentation', 'docs']
];
const STATUS_FLOW = ['todo', 'in-progress', 'review', 'done'];
const STATUS_LABELS = { planning: 'Planning', active: 'In progress', completed: 'Completed', 'on-hold': 'On hold' };
const TASK_LABELS = { todo: 'To do', 'in-progress': 'In progress', review: 'In review', done: 'Done' };
const initials = (value) => String(value || '').split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'AI';
const escapeHTML = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const byId = (id) => document.getElementById(id);
const nowLabel = () => new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(new Date());

function seededData() {
  const date = (offset) => { const d = new Date(); d.setDate(d.getDate() + offset); return d.toISOString().slice(0, 10); };
  return {
    projects: [
      { id: 'p-1001', name: 'Mindful Moments', client: 'Kindred Health', email: '', type: 'Mobile app', deadline: date(24), budget: 24000, requirements: 'A calm, accessible mindfulness app with guided sessions, habit tracking, and a simple progress view. Prioritise a friendly onboarding experience and clear privacy expectations.', status: 'active', createdAt: new Date().toISOString(), tasks: PLAN.map(([title, agent], i) => ({ id: `t-1001-${i}`, title, agent, status: ['done', 'done', 'done', 'in-progress', 'todo', 'todo', 'todo', 'todo', 'todo'][i] })), bugs: [] },
      { id: 'p-1002', name: 'Fieldnotes Commerce', client: 'Fieldnotes Supply', email: '', type: 'Web application', deadline: date(38), budget: 18000, requirements: 'A streamlined online shop for a small outdoor goods brand. Include product discovery, a responsive catalog, and a simple admin workflow.', status: 'active', createdAt: new Date().toISOString(), tasks: PLAN.map(([title, agent], i) => ({ id: `t-1002-${i}`, title, agent, status: ['done', 'done', 'in-progress', 'todo', 'todo', 'todo', 'todo', 'todo', 'todo'][i] })), bugs: [{ id: 'b-1002-1', title: 'Mobile filter panel needs a close control', status: 'open', createdAt: new Date().toISOString() }] },
      { id: 'p-1003', name: 'Atlas Support Assistant', client: 'Atlas Logistics', email: '', type: 'AI application', deadline: date(8), budget: 32000, requirements: 'A support assistant concept that helps staff find answers in internal procedures. Include clear source references and a human handoff path.', status: 'planning', createdAt: new Date().toISOString(), tasks: PLAN.map(([title, agent], i) => ({ id: `t-1003-${i}`, title, agent, status: i === 0 ? 'in-progress' : 'todo' })), bugs: [] }
    ],
    activity: [
      { id: 'a1', agent: 'pm', text: 'created a delivery plan for', project: 'Atlas Support Assistant', at: new Date(Date.now() - 6 * 60000).toISOString() },
      { id: 'a2', agent: 'qa', text: 'reported an issue on', project: 'Fieldnotes Commerce', at: new Date(Date.now() - 34 * 60000).toISOString() },
      { id: 'a3', agent: 'design', text: 'completed interface requirements for', project: 'Mindful Moments', at: new Date(Date.now() - 95 * 60000).toISOString() },
      { id: 'a4', agent: 'frontend', text: 'started a new task on', project: 'Mindful Moments', at: new Date(Date.now() - 145 * 60000).toISOString() }
    ]
  };
}
function loadData() {
  try { const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)); if (saved && Array.isArray(saved.projects) && Array.isArray(saved.activity)) return saved; } catch (error) { console.warn('Could not read saved workspace data.', error); }
  return seededData();
}
let data = loadData();
let toastTimer;
function save() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (error) { console.warn('Could not save workspace data.', error); showToast('Could not save changes in this browser.'); } }
function getAgent(id) { return AGENTS.find((agent) => agent.id === id) || AGENTS[0]; }
function getProject(id) { return data.projects.find((project) => project.id === id); }
function progress(project) { return project.tasks.length ? Math.round(project.tasks.filter((task) => task.status === 'done').length / project.tasks.length * 100) : 0; }
function allTasks() { return data.projects.flatMap((project) => project.tasks.map((task) => ({ ...task, projectId: project.id, projectName: project.name, client: project.client }))); }
function addActivity(agent, text, project) { data.activity.unshift({ id: `a-${Date.now()}`, agent, text, project, at: new Date().toISOString() }); data.activity = data.activity.slice(0, 15); }
function formatDate(value) { if (!value) return 'No deadline'; const parsed = new Date(`${value}T12:00:00`); return Number.isNaN(parsed.getTime()) ? 'No deadline' : new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(parsed); }
function formatRelative(value) { const mins = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 60000)); if (mins < 1) return 'just now'; if (mins < 60) return `${mins} min ago`; if (mins < 1440) return `${Math.floor(mins / 60)} hr ago`; return `${Math.floor(mins / 1440)} days ago`; }
function statusClass(status) { return status === 'active' ? 'status-active' : status === 'planning' ? 'status-planning' : status === 'completed' ? 'status-completed' : 'status-on-hold'; }
function showToast(message) { const toast = byId('toast'); toast.textContent = message; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 2600); }
function renderStats() {
  const projects = data.projects;
  const tasks = allTasks();
  const stats = [
    ['Active projects', projects.filter((p) => p.status === 'active').length, 'Across your studio', '▣'],
    ['Completed projects', projects.filter((p) => p.status === 'completed').length, 'Ready for client handoff', '✓'],
    ['Open tasks', tasks.filter((t) => t.status !== 'done').length, `${tasks.filter((t) => t.status === 'review').length} awaiting review`, '☷'],
    ['Open bugs', projects.reduce((total, p) => total + p.bugs.filter((bug) => bug.status === 'open').length, 0), 'Tracked across projects', '⌕']
  ];
  byId('stats-grid').innerHTML = stats.map(([label, value, foot, icon]) => `<article class="stat-card"><div class="stat-top">${label}<span class="stat-icon">${icon}</span></div><div class="stat-value">${value}</div><div class="stat-foot">${foot}</div></article>`).join('');
  byId('project-nav-count').textContent = projects.length;
}
function renderProjectRow(project) { return `<div class="project-row" data-project="${escapeHTML(project.id)}"><div><div class="project-name">${escapeHTML(project.name)}</div><div class="project-client">${escapeHTML(project.client)}</div></div><div><div class="progress-track"><div class="progress-fill" style="width:${progress(project)}%"></div></div><div class="progress-label">${progress(project)}% complete</div></div><span class="status-badge ${statusClass(project.status)}">${STATUS_LABELS[project.status]}</span></div>`; }
function renderDashboardProjects() { const target = byId('dashboard-projects'); const projects = data.projects.filter((p) => p.status !== 'completed').slice(0, 4); target.innerHTML = projects.length ? projects.map(renderProjectRow).join('') : '<div class="empty-state"><strong>No active projects yet</strong>Create a project to get your studio moving.</div>'; }
function renderActivity() { byId('activity-list').innerHTML = data.activity.slice(0, 5).map((item) => { const agent = getAgent(item.agent); return `<div class="activity-item"><div class="agent-avatar">${agent.icon}</div><div><div class="activity-copy"><strong>${escapeHTML(agent.name)}</strong> ${escapeHTML(item.text)} <strong>${escapeHTML(item.project)}</strong></div><div class="activity-time">${formatRelative(item.at)}</div></div></div>`; }).join('') || '<div class="empty-state">No activity yet.</div>'; }
function renderCompactTasks() { const tasks = allTasks().filter((task) => task.status !== 'done').slice(0, 4); byId('dashboard-tasks').innerHTML = tasks.length ? tasks.map((task) => `<div class="compact-task"><span class="task-dot"></span><div class="task-copy"><strong>${escapeHTML(task.title)}</strong><small>${escapeHTML(task.projectName)} · ${escapeHTML(getAgent(task.agent).name)}</small></div></div>`).join('') : '<div class="empty-state">No pending tasks. Nice work!</div>'; }
function renderMiniTeam() { byId('mini-team').innerHTML = AGENTS.slice(0, 6).map((agent) => `<div class="mini-agent"><span class="agent-avatar">${agent.icon}</span><span>${escapeHTML(agent.name.replace(' Agent', ''))}</span></div>`).join(''); }
function renderProjects() {
  const query = byId('project-search').value.trim().toLowerCase(); const filter = byId('project-filter').value;
  const projects = data.projects.filter((project) => (filter === 'all' || (filter === 'active' ? project.status === 'active' : project.status === filter)) && `${project.name} ${project.client} ${project.type}`.toLowerCase().includes(query));
  byId('all-projects').innerHTML = projects.length ? projects.map((project) => `<article class="project-card" data-project="${escapeHTML(project.id)}"><div class="card-type">${escapeHTML(project.type)}</div><h3>${escapeHTML(project.name)}</h3><div class="card-client">${escapeHTML(project.client)}</div><div class="card-progress-head"><span>Project progress</span><span>${progress(project)}%</span></div><div class="progress-track"><div class="progress-fill" style="width:${progress(project)}%"></div></div><div class="card-meta"><span>${project.tasks.filter((task) => task.status === 'done').length} / ${project.tasks.length} tasks complete</span><span class="status-badge ${statusClass(project.status)}">${STATUS_LABELS[project.status]}</span></div><div class="card-meta"><span>Due ${formatDate(project.deadline)}</span><span>${project.bugs.filter((bug) => bug.status === 'open').length} open bugs</span></div></article>`).join('') : '<div class="empty-state"><strong>No matching projects</strong>Try a different search or create a new project.</div>';
}
function renderBoard() {
  const tasks = allTasks(); const columns = [['todo', 'To do', 'todo'], ['in-progress', 'In progress', 'progress'], ['review', 'In review', 'review'], ['done', 'Done', 'done']];
  byId('task-board').innerHTML = columns.map(([status, title, css]) => { const items = tasks.filter((task) => task.status === status); return `<section class="task-column"><div class="column-heading"><span class="column-title ${css}"><i></i>${title}</span><span class="column-count">${items.length}</span></div>${items.length ? items.map((task) => `<article class="board-task"><h3>${escapeHTML(task.title)}</h3><p>${escapeHTML(task.projectName)}</p><div class="board-task-footer"><span>${escapeHTML(getAgent(task.agent).name)}</span>${status !== 'done' ? `<button class="task-action" data-task-action="${escapeHTML(task.projectId)}|${escapeHTML(task.id)}">${status === 'todo' ? 'Start task' : status === 'in-progress' ? 'Send to review' : 'Mark done'} →</button>` : '<span>✓ Complete</span>'}</div></article>`).join('') : '<div class="empty-state">Nothing here</div>'}</section>`; }).join('');
}
function renderAgents() {
  byId('agents-grid').innerHTML = AGENTS.map((agent) => `<article class="agent-card"><div class="agent-card-top"><div class="agent-card-icon">${agent.icon}</div><div><h3>${escapeHTML(agent.name)}</h3><span class="role">${escapeHTML(agent.role)}</span></div></div><p>${escapeHTML(agent.description)}</p><span class="agent-state">Available for assignment</span></article>`).join('');
  byId('workflow-steps').innerHTML = WORKFLOW.map((step, index) => `<div class="workflow-step"><span>STEP ${String(index + 1).padStart(2, '0')}</span><strong>${escapeHTML(step)}</strong></div>`).join('');
}
function render() { renderStats(); renderDashboardProjects(); renderActivity(); renderCompactTasks(); renderMiniTeam(); renderProjects(); renderBoard(); renderAgents(); }
function setView(name) { document.querySelectorAll('.view').forEach((view) => view.classList.toggle('active', view.id === `view-${name}`)); document.querySelectorAll('.nav-link').forEach((link) => link.classList.toggle('active', link.dataset.view === name)); const active = document.querySelector(`.nav-link[data-view="${name}"]`); byId('breadcrumb-current').textContent = active ? active.textContent.trim().replace(/\d+$/, '').trim() : 'Overview'; window.scrollTo({ top: 0, behavior: 'smooth' }); }
function openProjectModal() { byId('project-modal').hidden = false; setTimeout(() => byId('project-form').elements.name.focus(), 0); }
function closeModal() { byId('project-modal').hidden = true; }
function taskStatusSelect(projectId, task) { return `<select aria-label="Status for ${escapeHTML(task.title)}" data-task-status="${escapeHTML(projectId)}|${escapeHTML(task.id)}">${STATUS_FLOW.map((status) => `<option value="${status}" ${task.status === status ? 'selected' : ''}>${TASK_LABELS[status]}</option>`).join('')}</select>`; }
function openDetails(projectId) {
  const project = getProject(projectId); if (!project) return;
  byId('detail-header').innerHTML = `<div><div class="detail-tags"><span class="status-badge ${statusClass(project.status)}">${STATUS_LABELS[project.status]}</span><span class="card-type">${escapeHTML(project.type)}</span></div><h2 id="detail-title">${escapeHTML(project.name)}</h2><p>${escapeHTML(project.client)}</p></div>`;
  const tasks = project.tasks.map((task) => `<div class="detail-task-row"><span>${escapeHTML(task.title)}<br><small>${escapeHTML(getAgent(task.agent).name)}</small></span>${taskStatusSelect(project.id, task)}<small>${TASK_LABELS[task.status]}</small></div>`).join('');
  const bugs = project.bugs.map((bug) => `<div class="bug-row"><div>${escapeHTML(bug.title)}<small>${bug.status === 'open' ? 'Open · assigned to Debugging Agent' : 'Resolved'} · ${formatRelative(bug.createdAt)}</small></div>${bug.status === 'open' ? `<button class="bug-button" data-resolve-bug="${escapeHTML(project.id)}|${escapeHTML(bug.id)}">Resolve</button>` : '<span class="status-badge status-completed">Resolved</span>'}</div>`).join('');
  byId('detail-body').innerHTML = `<div class="detail-meta"><span>Due ${formatDate(project.deadline)}</span><span>${project.budget ? `$${Number(project.budget).toLocaleString()} budget` : 'Budget not set'}</span><span>${progress(project)}% complete</span></div><div class="progress-track"><div class="progress-fill" style="width:${progress(project)}%"></div></div><p class="detail-overview">${escapeHTML(project.requirements)}</p><section class="detail-section"><h3>Project tasks <span class="column-count">${project.tasks.filter((task) => task.status === 'done').length}/${project.tasks.length}</span></h3>${tasks || '<div class="empty-state">No tasks assigned.</div>'}</section><section class="detail-section"><div class="panel-heading"><h3>Bugs & issues</h3><button class="bug-button" data-report-bug="${escapeHTML(project.id)}">＋ Report bug</button></div>${bugs || '<div class="empty-state">No bugs reported. Keep it that way!</div>'}</section><section class="detail-section"><h3>Delivery status</h3><div class="detail-meta"><span>Project status</span><select data-project-status="${escapeHTML(project.id)}" aria-label="Project status">${Object.entries(STATUS_LABELS).map(([key, label]) => `<option value="${key}" ${project.status === key ? 'selected' : ''}>${label}</option>`).join('')}</select></div></section>`;
  byId('detail-modal').hidden = false;
}
function createProject(form) {
  const values = new FormData(form); const name = String(values.get('name')).trim(); const client = String(values.get('client')).trim(); const requirements = String(values.get('requirements')).trim();
  if (!name || !client || requirements.length < 10) { showToast('Please complete the required project details.'); return; }
  const project = { id: `p-${Date.now()}`, name, client, email: String(values.get('email') || '').trim(), type: String(values.get('type')), deadline: String(values.get('deadline') || ''), budget: Number(values.get('budget')) || 0, requirements, status: 'planning', createdAt: new Date().toISOString(), tasks: PLAN.map(([title, agent], i) => ({ id: `t-${Date.now()}-${i}`, title, agent, status: 'todo' })), bugs: [] };
  data.projects.unshift(project); addActivity('pm', 'created a delivery plan for', project.name); save(); form.reset(); closeModal(); render(); setView('projects'); showToast('Project plan created and saved in this browser.');
}
function findTask(projectId, taskId) { const project = getProject(projectId); return { project, task: project?.tasks.find((task) => task.id === taskId) }; }
function updateTask(projectId, taskId, status) {
  const { project, task } = findTask(projectId, taskId); if (!project || !task || !STATUS_FLOW.includes(status)) return;
  const oldStatus = task.status; task.status = status;
  const agentId = status === 'review' ? 'qa' : status === 'done' ? 'pm' : task.agent;
  addActivity(agentId, `${status === 'done' ? 'completed' : status === 'review' ? 'sent for review' : status === 'in-progress' ? 'started' : 'updated'} a task on`, project.name);
  if (project.tasks.every((item) => item.status === 'done')) { project.status = 'completed'; addActivity('ceo', 'marked the project ready for handoff:', project.name); showToast('All tasks complete — project marked completed.'); }
  else if (project.status === 'planning' && status === 'in-progress') project.status = 'active';
  else if (project.status === 'completed' && oldStatus !== 'done') project.status = 'active';
  save(); render(); if (!byId('detail-modal').hidden) openDetails(projectId);
}
function reportBug(projectId) {
  const project = getProject(projectId); if (!project) return;
  const title = window.prompt('Describe the bug or issue:'); if (!title || !title.trim()) return;
  project.bugs.unshift({ id: `b-${Date.now()}`, title: title.trim().slice(0, 180), status: 'open', createdAt: new Date().toISOString() }); addActivity('qa', 'reported an issue on', project.name); save(); render(); openDetails(projectId); showToast('Issue added to the project.');
}
function handleAction(event) {
  const nav = event.target.closest('[data-view]'); if (nav) { setView(nav.dataset.view); return; }
  const navShortcut = event.target.closest('[data-nav]'); if (navShortcut) { setView(navShortcut.dataset.nav); return; }
  if (event.target.closest('[data-open-project]')) { openProjectModal(); return; }
  if (event.target.closest('[data-close-modal]')) { closeModal(); return; }
  if (event.target.closest('[data-close-detail]')) { byId('detail-modal').hidden = true; return; }
  const projectCard = event.target.closest('[data-project]'); if (projectCard) { openDetails(projectCard.dataset.project); return; }
  const taskAction = event.target.closest('[data-task-action]'); if (taskAction) { const [projectId, taskId] = taskAction.dataset.taskAction.split('|'); const { task } = findTask(projectId, taskId); if (task) updateTask(projectId, taskId, STATUS_FLOW[Math.min(STATUS_FLOW.indexOf(task.status) + 1, STATUS_FLOW.length - 1)]); return; }
  const bugAction = event.target.closest('[data-report-bug]'); if (bugAction) { reportBug(bugAction.dataset.reportBug); return; }
  const resolveBug = event.target.closest('[data-resolve-bug]'); if (resolveBug) { const [projectId, bugId] = resolveBug.dataset.resolveBug.split('|'); const project = getProject(projectId); const bug = project?.bugs.find((item) => item.id === bugId); if (bug) { bug.status = 'resolved'; addActivity('debug', 'resolved an issue on', project.name); save(); render(); openDetails(projectId); showToast('Issue marked as resolved.'); } return; }
}
document.addEventListener('click', handleAction);
byId('project-form').addEventListener('submit', (event) => { event.preventDefault(); createProject(event.currentTarget); });
byId('project-search').addEventListener('input', renderProjects);
byId('project-filter').addEventListener('change', renderProjects);
document.addEventListener('change', (event) => {
  if (event.target.matches('[data-task-status]')) { const [projectId, taskId] = event.target.dataset.taskStatus.split('|'); updateTask(projectId, taskId, event.target.value); }
  if (event.target.matches('[data-project-status]')) { const project = getProject(event.target.dataset.projectStatus); if (project) { project.status = event.target.value; addActivity('pm', `updated project status for`, project.name); save(); render(); openDetails(project.id); showToast('Project status updated.'); } }
});
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { closeModal(); byId('detail-modal').hidden = true; } });
[byId('project-modal'), byId('detail-modal')].forEach((backdrop) => backdrop.addEventListener('click', (event) => { if (event.target === backdrop) backdrop.hidden = true; }));
render();
