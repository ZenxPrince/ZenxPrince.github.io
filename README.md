# PRINCE VYAS // Personal System Interface

**AI · Systems Engineering · Embedded · Cybersecurity · FinTech**

[![Live Portfolio](https://img.shields.io/badge/live-portfolio-111111?style=flat-square)](https://zenxprince.github.io/)
[![GitHub](https://img.shields.io/badge/GitHub-ZenxPrince-111111?style=flat-square&logo=github)](https://github.com/ZenxPrince)

> A technical personal portfolio for Prince Vyas, designed as an interactive system
> interface rather than a conventional résumé page.

## Live

**https://zenxprince.github.io/**

The site is deployed from this repository with GitHub Pages.

## What it represents

The portfolio is the public interface for work and exploration across:

- Artificial intelligence and AI agent systems
- Software and systems engineering
- Embedded systems, electronics and robotics
- Cybersecurity and networking
- Cloud infrastructure and distributed systems
- Computer vision and automation
- Financial technology and financial computing

Private or unreleased systems are deliberately described at the appropriate level
rather than presenting private implementation details as public work.

## Technical architecture

The site is intentionally lightweight and dependency-free at runtime:

```text
index.html
├── css/style.css        visual system
├── js/model.js          content + GitHub data model
├── js/view.js           DOM rendering
├── js/controller.js     navigation + interaction
└── assets/              interface media
```

The application follows a small MVC-style separation so content and presentation
can be changed without rewriting the interaction layer.

### GitHub integration

The Systems screen queries the public GitHub API for repositories belonging to
`ZenxPrince`. Forks are excluded, and the interface has a local fallback when the
API cannot be reached.

## Run locally

Python is sufficient for local development:

```powershell
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

The site should be served over HTTP rather than opened directly with `file://`,
because the browser needs normal HTTP behavior for the GitHub API request.

## Deployment

The repository includes a GitHub Actions workflow at
`.github/workflows/pages.yml`. Pushes to `main` deploy the static site to GitHub
Pages.

## Design direction

The interface keeps the high-energy, menu-driven visual language of the original
Persona-style portfolio while replacing its personal content with Prince Vyas's
identity, domains, and public engineering surface.

The goal is not to imitate a corporate template. The interface is meant to feel
like a compact control surface for a multidisciplinary builder.

## Provenance and attribution

This repository is a customized derivative of the public
`Omicron69/persona5-style-portfolio` project. The original project supplied the
base interaction architecture, visual approach, and MVC structure. This repository
adds Prince Vyas-specific content, configuration, styling changes, and deployment
infrastructure.

The original project's copyright, licensing terms, and any third-party intellectual
property remain applicable to the material inherited from that project. This
repository does **not** claim ownership of the original Persona/ATLUS intellectual
property or the original author's work.

Before redistributing the inherited source or assets, review the upstream project's
current licensing and attribution requirements.

## Status

**Active personal portfolio.** The public surface will evolve as substantive
projects, research, and engineering work become ready to publish.

## Mobile experience

The mobile breakpoint uses a dedicated interaction layer rather than simply shrinking the desktop composition. It is built around a brutal-black systems interface with restrained red activation states, luminous depth surfaces, layered reveals, focus-state dimming, touch-friendly accordion navigation, domain indexing, and a live public GitHub surface.

The desktop interaction model remains preserved separately.
