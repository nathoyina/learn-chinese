# 中文会话练习 | Chinese Conversation Practice

## The Problem

There are **no apps** that help learners practice conversational Chinese with **real-world examples tailored to product managers**.

Most Chinese learning tools focus on:

- Textbook phrases (ordering at restaurants, asking for directions)
- Reading and writing (characters, grammar drills)
- Generic business vocabulary

If you're a PM working with designers, engineers, and stakeholders in Chinese-speaking teams, you need to practice **actual work conversations**: sprint planning, design reviews, scope negotiation, bug triage, API discussions, deployment coordination, and more. You need the vocabulary and phrases that come up in meetings—technical terms like API, schema, CI/CD, rollback—not just "你好" and "谢谢".

This app fills that gap.

## What This App Does

A voice-first web app for practicing conversational Chinese with scripted, realistic dialogues:

- **Work scenarios** — Sprint planning, design review, scope negotiation, bug triage, requirements clarification, status updates, technical feasibility, timeline pushback, cross-team alignment, API integration, database migration, frontend performance, deployment, code review, monitoring alerts
- **Everyday scenarios** — Greetings, ordering food/drinks, asking directions, making plans
- **Technical vocabulary** — RESTful, JSON, Swagger, schema, rollback, CI/CD, Jenkins, staging, 金丝雀 (canary), Grafana, Sentry, Redis, TTL, and more

**How it works:** Listen to the partner's line (text-to-speech), type your response in Chinese, compare with suggested replies, then advance. Track your streak and practice daily.

## Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Tech Stack

- React + Vite + TypeScript
- Tailwind CSS
- Web Speech API (TTS for partner lines)
- localStorage for progress and streaks
