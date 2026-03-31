# Nutrition Tracker (Personal)

A personal nutrition web app inspired by Cal AI: log food, estimate macros from photos, track goals, and get simple guidance—**without login or accounts**. Built with **Next.js** and optionally installable as a **PWA**.

---

## Vision

- **Solo / personal use first** — fast to open, no friction.
- **Privacy-friendly** — no mandatory cloud account; prefer on-device or minimal server processing (define clearly in implementation).
- **Actionable numbers** — calories and protein targets tied to weight, height, BMI, and chosen deficit level.

---

## Tech Stack

| Layer | Choice |
|--------|--------|
| Framework | **Next.js** (App Router) |
| Language | **TypeScript** (recommended) |
| Styling | Match your preference (e.g. Tailwind CSS) |
| Storage | Browser **IndexedDB** or **localStorage** for profile + logs (no DB account) |
| AI / vision | Server Route Handlers calling a vision + nutrition API (keys stay server-side) OR client-side flow as documented |

---

## Core Principles

1. **No login / logout** — state lives on the device (or explicitly documented server behavior).
2. **Estimates, not guarantees** — food photos yield approximate macros; user can always edit.
3. **Safety** — aggressive calorie deficits are labeled; short disclaimer that the app is educational, not medical advice.

---

## Features

### Phase 1 — MVP

| Feature | Description |
|---------|-------------|
| **Profile** | Weight, height, age (optional), sex (optional for formulas), activity level (simple scale). |
| **BMI** | Calculate and display BMI with standard category (underweight / normal / overweight / obese). |
| **Calorie & protein targets** | From profile + goal: lose / maintain / gain + **deficit intensity**: low / medium / aggressive (with warnings on aggressive). |
| **Daily budget** | Show daily calorie and protein targets; **remaining** vs **consumed** for the current day. |
| **Manual meal log** | Add food name, calories, protein (carbs/fat optional). |
| **Photo → macros** | Take or upload a photo; call AI pipeline → show estimated calories, protein, etc.; **user can edit** before saving. |
| **Meal list (today)** | Chronological list of logged items with running totals. |

### Phase 2 — Richer guidance

| Feature | Description |
|---------|-------------|
| **Food suggestions** | Based on remaining calories, protein gap, and preference: **vegetarian**, **non-vegetarian**, or **either**. |
| **Deficit clarity** | Show approximate daily deficit vs maintenance; explain “low / medium / aggressive” in plain language. |
| **Saved meals / favorites** | Reuse a previous meal without re-scanning. |
| **Weekly summary** | Averages, protein hit-rate, simple trends. |

### Phase 3 — Polish & habits

| Feature | Description |
|---------|-------------|
| **Water / steps** | Optional quick inputs. |
| **Streaks** | Optional “days logged” without heavy gamification. |
| **Barcode scan** | For packaged foods when photo estimate is weak (web APIs / libraries as feasible). |
| **Export / backup** | JSON or CSV download so data can move with the user. |
| **PWA** | Install prompt, offline-friendly shell, icons. |

### Cross-cutting

| Topic | Notes |
|-------|--------|
| **Allergies / diets** | Filters on suggestions (e.g. nut-free, vegan) when suggestion engine exists. |
| **Cooking vs restaurant** | Optional toggle to bias portion assumptions for photo estimates. |

---

## Suggested App Structure (routes)

Rough map for a Next.js App Router project:

- `/` — Dashboard: today’s totals, quick add, camera entry.
- `/log` — Full daily log and edit meals.
- `/profile` — Weight, height, goals, targets, BMI.
- `/settings` — Units (kg/lb), dietary prefs, export, disclaimer.

(Adjust names to your taste.)

---

## Non-goals (for v1)

- Social feeds, friends, or public sharing.
- Mandatory cloud sync or multi-device account system.
- Replacing professional medical or dietitian advice.

---

## Success Criteria (personal)

- Open the app and **log a meal in under a minute**.
- **Photo flow** returns usable estimates **most** of the time, with **easy correction**.
- **Daily targets** feel aligned with profile and chosen goal.

---

## License

Personal project — set license as you prefer.

---

## Changelog

- **2026-03-30** — Initial project brief from concept discussion.
