:root {
  --bg: #0e1117;
  --bg-2: #141b28;
  --panel: #171f2d;
  --panel-soft: #1d2839;
  --panel-alt: #111827;
  --line: rgba(148, 163, 184, 0.18);
  --text: #edf2ff;
  --muted: #a9b4c5;
  --purple: #9b8cff;
  --purple-strong: #7d6cff;
  --green: #52d9a7;
  --blue: #75b9ff;
  --orange: #f7b86d;
  --red: #ff8e8e;
  --shadow: 0 18px 40px rgba(4, 7, 16, 0.4);
}

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  min-height: 100%;
  background: linear-gradient(180deg, var(--bg) 0%, #0a0d16 100%);
  color: var(--text);
  font-family: "Inter", sans-serif;
}

button, input, select, textarea {
  font: inherit;
}

body {
  min-height: 100vh;
}

button {
  cursor: pointer;
}

.app-shell {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 242px;
  background: rgba(14, 17, 23, 0.9);
  border-right: 1px solid var(--line);
  padding: 26px 16px;
  display: flex;
  flex-direction: column;
  gap: 26px;
  position: sticky;
  top: 0;
  height: 100vh;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 4px 10px 12px;
}

.brand-mark {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: linear-gradient(135deg, #bcaeff, #7464ff);
  display: grid;
  place-items: center;
  font-weight: 800;
  color: #130f23;
}

.brand-title {
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.brand-subtitle {
  font-size: 0.58rem;
  letter-spacing: 0.19em;
  color: var(--muted);
}

.nav-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-header {
  text-transform: uppercase;
  font-size: 0.63rem;
  letter-spacing: 0.16em;
  padding: 0 8px 6px;
  color: #7f8aa1;
}

.nav-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border: 1px solid transparent;
  background: transparent;
  color: #dfe7f6;
  border-radius: 10px;
  padding: 11px 12px;
  font-size: 0.9rem;
  text-align: left;
  transition: 0.2s ease;
}

.nav-item:hover,
.nav-item.active {
  border-color: rgba(155, 140, 255, 0.35);
  background: rgba(155, 140, 255, 0.11);
}

.nav-item b {
  min-width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.12);
  font-size: 0.66rem;
  color: var(--muted);
}

.sidebar-card {
  margin-top: auto;
  padding: 16px 14px;
  border-radius: 14px;
  background: linear-gradient(180deg, rgba(123, 106, 255, 0.18), rgba(19, 27, 39, 0.8));
  border: 1px solid rgba(155, 140, 255, 0.22);
}

.sidebar-card-label {
  color: #c7d5ff;
  font-size: 0.6rem;
  letter-spacing: 0.16em;
  margin-bottom: 8px;
}

.sidebar-card p {
  margin: 0;
  color: var(--muted);
  font-size: 0.78rem;
  line-height: 1.55;
}

.main-area {
  flex: 1;
  min-width: 0;
  padding: 18px 28px 34px;
}

.topbar {
  height: 62px;
  border-bottom: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.crumbs {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--muted);
  font-size: 0.77rem;
}

.crumbs strong {
  color: var(--text);
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.status-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.74rem;
  color: var(--muted);
  padding: 8px 10px;
  background: rgba(148, 163, 184, 0.05);
  border: 1px solid var(--line);
  border-radius: 999px;
}

.dot {
  display: inline-block;
  width: 7px;
  height: 7px;
  background: var(--green);
  border-radius: 50%;
  box-shadow: 0 0 12px rgba(82, 217, 167, 0.9);
}

.icon-button {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid var(--line);
  background: rgba(148, 163, 184, 0.04);
  color: var(--text);
}

.avatar-mini {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-weight: 700;
  color: #dbd5ff;
  background: linear-gradient(135deg, rgba(155, 140, 255, 0.75), rgba(125, 108, 255, 0.4));
}

.view {
  display: none;
  padding-top: 24px;
}

.view.active {
  display: block;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 16px;
  margin-bottom: 20px;
}

.eyebrow {
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #8895ae;
  font-size: 0.6rem;
  margin-bottom: 8px;
}

h1 {
  margin: 0;
  font-size: clamp(1.6rem, 2vw, 2.4rem);
}

h2 {
  margin: 0;
  font-size: 1rem;
}

.primary-btn, .secondary-btn, .link-btn {
  border-radius: 10px;
  border: 1px solid transparent;
  padding: 10px 14px;
  font-weight: 600;
  transition: 0.2s ease;
}

.primary-btn {
  background: linear-gradient(135deg, var(--purple), var(--purple-strong));
  color: #111827;
}

.primary-btn:hover {
  filter: brightness(1.05);
}

.secondary-btn {
  background: rgba(148, 163, 184, 0.05);
  border-color: var(--line);
  color: var(--text);
}

.link-btn {
  background: transparent;
  border-color: rgba(155, 140, 255, 0.22);
  color: #d4cbff;
  padding: 7px 10px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 18px;
}

.stat-card {
  background: linear-gradient(180deg, rgba(23, 31, 45, 0.9), rgba(17, 24, 39, 0.8));
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 16px 18px;
  min-height: 118px;
}

.stat-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  color: var(--muted);
  font-size: 0.73rem;
}

.stat-icon {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: rgba(155, 140, 255, 0.12);
  color: #dcd2ff;
}

.stat-value {
  font-size: clamp(1.4rem, 2vw, 2rem);
  font-weight: 800;
  margin-bottom: 4px;
  letter-spacing: -0.04em;
}

.stat-foot {
  color: var(--muted);
  font-size: 0.68rem;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 16px;
}

.panel {
  background: linear-gradient(180deg, rgba(23, 31, 45, 0.96), rgba(17, 24, 39, 0.94));
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 18px;
}

.wide-panel {
  grid-column: 1 / 2;
}

.panel-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 14px;
}

.small-title {
  color: #8a96ac;
  letter-spacing: 0.16em;
  font-size: 0.58rem;
  margin-bottom: 6px;
}

.stack-list,
.activity-feed {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.request-item, .activity-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  border-top: 1px solid var(--line);
  padding-top: 10px;
}

.request-item:first-child, .activity-item:first-child {
  border-top: none;
  padding-top: 0;
}

.request-badge {
  min-width: 28px;
  height: 28px;
  border-radius: 9px;
  display: grid;
  place-items: center;
  background: rgba(155, 140, 255, 0.12);
  color: #d9d1ff;
  font-size: 0.8rem;
}

.request-copy strong, .activity-copy strong {
  display: block;
  margin-bottom: 3px;
  color: #edf2ff;
}

.request-copy p, .activity-copy p, .tiny-copy {
  margin: 0;
  color: var(--muted);
  font-size: 0.75rem;
  line-height: 1.5;
}

.mini-team {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.mini-agent {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 8px 6px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: rgba(148, 163, 184, 0.02);
}

.mini-agent .chip {
  width: 28px;
  height: 28px;
  border-radius: 9px;
  display: grid;
  place-items: center;
  background: rgba(155, 140, 255, 0.12);
  color: #d7d0ff;
  font-size: 0.78rem;
}

.mini-agent small {
  color: var(--muted);
  display: block;
}

.progress-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.progress-item {
  display: grid;
  gap: 8px;
}

.progress-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.72rem;
  color: var(--muted);
}

.progress-bar {
  height: 7px;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.1);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--purple), var(--blue));
}

.project-grid, .client-grid, .agent-grid, .workflow-grid {
  display: grid;
  gap: 16px;
}

.project-grid {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.client-grid {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.agent-grid {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.workflow-grid {
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}

.card {
  background: linear-gradient(180deg, rgba(23, 31, 45, 0.96), rgba(17, 24, 39, 0.94));
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 18px;
}

.project-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.project-tag,
.status-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 8px;
  border-radius: 999px;
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.project-tag {
  background: rgba(155, 140, 255, 0.12);
  color: #ddd4ff;
}

.status-tag.active {
  background: rgba(82, 217, 167, 0.12);
  color: #8fe9c8;
}

.status-tag.planning {
  background: rgba(117, 185, 255, 0.12);
  color: #9ecbff;
}

.status-tag.completed {
  background: rgba(82, 217, 167, 0.12);
  color: #8fe9c8;
}

.project-card h3, .client-card h3, .agent-card h3 {
  margin: 0;
  font-size: 1.08rem;
}

.client-card p, .agent-card p, .project-card p {
  margin: 0;
  color: var(--muted);
  font-size: 0.78rem;
  line-height: 1.6;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 0.72rem;
  color: var(--muted);
}

.client-card .meta-row, .agent-card .meta-row {
  margin-top: 12px;
}

.workflow-step {
  padding: 18px;
  border-radius: 16px;
  background: rgba(155, 140, 255, 0.08);
  border: 1px solid rgba(155, 140, 255, 0.18);
}

.workflow-step small {
  display: inline-block;
  font-size: 0.58rem;
  letter-spacing: 0.14em;
  color: #c7d5ff;
  margin-bottom: 10px;
}

.workflow-step h3 {
  margin: 0;
  font-size: 1rem;
}

.agent-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.agent-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.agent-icon {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: rgba(155, 140, 255, 0.12);
  color: #d9d2ff;
  font-size: 1.2rem;
}

.agent-role {
  color: var(--muted);
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.agent-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #9be7cb;
  font-size: 0.74rem;
}

.agent-status::before {
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--green);
}

.toolbar {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  width: min(380px, 100%);
  border: 1px solid var(--line);
  border-radius: 12px;
  background: rgba(148, 163, 184, 0.04);
  padding: 0 12px;
  color: var(--muted);
}

.search-box input, .toolbar select {
  width: 100%;
  background: transparent;
  border: 0;
  outline: none;
  color: var(--text);
  padding: 12px 0;
}

.toolbar select {
  width: 180px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: rgba(148, 163, 184, 0.04);
  padding: 0 12px;
}

.modal {
  position: fixed;
  inset: 0;
  background: rgba(6, 9, 15, 0.72);
  display: grid;
  place-items: center;
  z-index: 30;
  padding: 20px;
}

.modal.hidden {
  display: none;
}

.modal-card {
  width: min(720px, 100%);
  background: linear-gradient(180deg, rgba(22, 31, 45, 1), rgba(14, 19, 30, 1));
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 22px;
  box-shadow: var(--shadow);
}

.modal-head {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 20px;
}

.close-btn {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: rgba(148, 163, 184, 0.06);
  border: 1px solid var(--line);
  color: var(--text);
  font-size: 1.4rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 12px;
}

label {
  display: block;
  color: #dfe7f6;
  font-size: 0.77rem;
  margin-bottom: 12px;
}

input, select, textarea {
  margin-top: 7px;
  width: 100%;
  background: rgba(15, 22, 30, 0.9);
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 12px;
  color: var(--text);
  padding: 11px 12px;
  outline: none;
}

input:focus, select:focus, textarea:focus {
  border-color: rgba(155, 140, 255, 0.5);
  box-shadow: 0 0 0 3px rgba(155, 140, 255, 0.12);
}

textarea {
  resize: vertical;
  min-height: 118px;
}

.approval-box {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: 16px 0;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid rgba(155, 140, 255, 0.2);
  background: rgba(155, 140, 255, 0.08);
  color: var(--muted);
  font-size: 0.73rem;
  line-height: 1.5;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 12px;
}

.toast {
  position: fixed;
  right: 24px;
  bottom: 24px;
  min-width: 190px;
  background: rgba(17, 24, 39, 0.96);
  color: var(--text);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 10px 12px;
  box-shadow: var(--shadow);
  opacity: 0;
  transform: translateY(8px);
  transition: 0.2s ease;
  pointer-events: none;
  font-size: 0.76rem;
}

.toast.show {
  opacity: 1;
  transform: translateY(0);
}

.empty-state {
  padding: 18px 10px 10px;
  color: var(--muted);
  font-size: 0.8rem;
}

@media (max-width: 980px) {
  .sidebar {
    width: 190px;
  }

  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .app-shell {
    display: block;
  }

  .sidebar {
    width: 100%;
    height: auto;
    position: static;
    border-right: none;
    border-bottom: 1px solid var(--line);
    padding-bottom: 18px;
  }

  .nav-group {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .main-area {
    padding: 16px;
  }

  .toolbar {
    flex-direction: column;
  }

  .search-box {
    width: 100%;
  }

  .toolbar select {
    width: 100%;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }
}
