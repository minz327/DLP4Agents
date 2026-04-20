# DLP4Agents

PM spec and interactive prototype for a Microsoft Purview-style Data Loss Prevention authoring experience focused on Agent-to-Tool policy creation.

## Purpose

This project is a front-end prototype that explores how admins could create and scope DLP policies for agents, tools, and related Microsoft 365 surfaces. It is intended to communicate product direction, workflow design, and interaction patterns rather than serve as a production implementation.

The prototype is optimized for:

- walkthroughs with design, engineering, and leadership
- validating step-by-step authoring flow
- discussing scoping models for agents and tools
- demonstrating Purview-aligned information architecture and UI behavior

## What this prototype covers

The current experience includes a Purview-inspired shell and a multi-step create-policy flow.

Implemented areas:

- Policies landing page with sample policy inventory
- Create policy entry point
- Initial policy-type modal
- Full-screen policy wizard shell with breadcrumb, vertical stepper, and bottom action bar
- Template or custom policy selection
- Policy naming step
- Admin units step
- Locations step
- Agent location scoping with a dedicated flyout
- Policy settings step
- Advanced DLP rules step
- Create rule flyout layered on top of the advanced rules page

## Key UX concepts represented

- Purview-style navigation shell with top bar and left navigation
- Progressive disclosure for complex configuration, especially for Agent scope selection
- Support for multiple agent scoping models:
  - all agents
  - agent categories
  - specific agents
- Dynamic scope summary reflected back into the Locations table
- Rule authoring shown as an overlay workflow instead of a separate page transition

## Current flow

The main authored flow currently looks like this:

1. Open Policies
2. Select Create policy
3. Choose Enterprise applications and devices
4. Start from template or custom policy
5. Name the policy
6. Assign admin units
7. Choose locations
8. Configure agent scope through the Agent flyout
9. Define policy settings
10. Customize advanced DLP rules
11. Open Create rule in a flyout and draft a rule

## Prototype status

This is a prototype, not a production-ready service.

What is intentionally true today:

- data is local and mocked
- there is no backend persistence
- tables and forms are UI-driven prototypes
- many controls are representative rather than fully modeled business logic
- some later wizard steps remain placeholders

## Tech stack

- React 19
- TypeScript
- Vite
- CSS modules are not used; styling is custom CSS per component
- Fluent UI icons package is installed, though most visuals are currently hand-crafted with CSS and simple inline graphics

## Project structure

Important files and folders:

- `src/App.tsx`: application shell and view switching between policy list and wizard
- `src/components/TopBar.tsx`: Purview-style top navigation
- `src/components/Sidebar.tsx`: Purview-style left navigation
- `src/components/PolicyList.tsx`: policy inventory landing page
- `src/components/CreatePolicyModal.tsx`: entry modal for policy type selection
- `src/components/PolicyWizard.tsx`: main authoring workflow and flyouts
- `src/data/samplePolicies.ts`: mocked policy list data

## Running locally

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Run linting:

```bash
npm run lint
```

## GitHub Pages

This repo is configured to deploy to GitHub Pages from `main` using GitHub Actions.

Expected site URL:

```text
https://minz327.github.io/DLP4Agents/
```

To finish setup in GitHub:

1. Open the repository settings.
2. Go to Pages.
3. Set the source to GitHub Actions.
4. Push to `main` or run the `Deploy to GitHub Pages` workflow manually.

## Design intent

This prototype aims to stay visually and behaviorally close to Microsoft Purview conventions:

- Segoe UI typography
- enterprise admin layout patterns
- wizard-based configuration for policy authoring
- right-side flyouts for scoped configuration tasks
- low-friction empty states that can progressively expand into advanced authoring

## Suggested next areas

Natural next extensions for this prototype:

- flesh out Policy mode and Finish steps
- refine rule authoring controls to match the intended spec exactly
- replace placeholder icons with consistent Fluent assets
- introduce richer mock data for conditions, actions, and saved rules
- add lightweight state persistence for demo continuity

## Audience

This repository is best understood as:

- a PM prototype
- a UX concept vehicle
- a conversation artifact for engineering and design collaboration

It is not yet a production architecture, API contract, or finalized admin experience.
