# Orbit Studio — AI Software Company Dashboard

A responsive, browser-based project operations dashboard for a proposed AI-assisted software studio. It includes a client project intake form, automatically drafted task plan, specialist department directory, project and task tracking, bug reporting, activity feed, and delivery status controls.

## Run locally

No build step or package installation is required. Open `index.html` in a modern browser, or serve this directory with any static file server:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## What works

- Create projects with client, project type, requirements, budget, email, and delivery date.
- Draft a nine-task starter plan and associate tasks with the relevant specialist department.
- Track project status and task progress; completed tasks update progress and activity.
- Report and resolve project issues; bugs appear in the dashboard totals.
- Search and filter projects, and navigate the task board and team directory.
- Save changes in the current browser using `localStorage`.
- Start with example projects so the dashboard is populated on first visit.

## Important limitations

This is a functional front-end MVP, not an autonomous AI execution backend. The listed agents are role descriptions and workflow assignments; they do not call language models, write or run project code, exchange files, or send messages. Project plans are starter templates, not AI-generated estimates. Data is local to one browser and is not shared with clients or other users. There is no authentication, server/database, email delivery, billing, external service connection, or deployment integration. No paid services or external deployments are initiated.

Before using this with real client work, connect a secure backend and explicitly approved model/tool integrations, add authentication and authorization, persist data server-side, and implement human review, budget controls, audit logs, and tested delivery pipelines. Do not enter sensitive client information into this demo.
