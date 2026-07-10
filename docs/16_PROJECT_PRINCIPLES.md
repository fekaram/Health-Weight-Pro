# 16 — PROJECT PRINCIPLES

Version: 3.0

Status: ACTIVE

---

# Purpose

This document defines the permanent principles of the Health Weight Pro project.

Unlike implementation documents, these principles are considered stable and must guide every future decision.

Whenever documentation conflicts with implementation details, these principles take precedence.

---

# Core Philosophy

Health Weight Pro is not a calorie tracker.

It is a personal health platform.

The application exists to minimize user effort while maximizing health insights.

Technology performs the work.

The user should only provide the minimum information necessary.

---

# Product Vision

Health Weight Pro is an offline-first health platform focused on:

- Nutrition
- Body Progress
- Medication Tracking
- Weight Management
- Healthy Habits

Artificial Intelligence is an external assistant.

The application itself remains independent from any specific AI provider.

---

# Architecture Principles

The current architecture is approved.

It must not be redesigned without an Architecture Decision Record (ADR).

Approved patterns:

- MVVM
- Repository Pattern
- Event Bus
- IndexedDB
- Generic Repository
- Repository Factory

The current folder structure is considered stable.

---

# Offline First

The application must always remain usable offline.

Internet connectivity is optional.

No feature should become unusable because an online service is unavailable.

---

# HWP_FOOD Standard

HWP_FOOD is the official nutrition exchange format.

The application consumes HWP_FOOD.

The application does not communicate directly with AI providers.

Supported origins include:

- ChatGPT
- Claude
- Gemini
- Grok
- DeepSeek
- Ollama
- Future AI systems
- Manual HWP_FOOD text

Changing AI providers must never require changes to the application's architecture.

---

# User Experience Principles

Every interaction must reduce user effort.

Never ask users to manually calculate nutritional information.

Whenever possible:

- infer
- automate
- simplify

Common actions should take less than ten seconds.

---

# Premium Experience

Health Weight Pro must feel like a premium native application.

Priorities:

- clarity
- elegance
- consistency
- accessibility
- responsiveness

Avoid unnecessary complexity.

---

# Mobile First

The primary platform is the smartphone.

Desktop support remains important but secondary.

Every new feature must first be designed for mobile.

---

# Interface Principles

Never use browser native dialogs.

Avoid:

- alert()
- confirm()
- prompt()

Prefer:

- Dialogs
- Bottom Sheets
- Toasts
- Snackbars
- Custom Modals

---

# Branding

The official Health Weight Pro logo is the application's only visual identity.

The internal name "HWP Platform" must never be displayed to end users.

---

# Data Ownership

Users own their data.

Data must remain exportable.

Data must remain importable.

Avoid proprietary lock-in.

---

# Future Integrations

Future integrations must remain optional.

Examples:

- AI
- Cloud Sync
- Wearables
- Health APIs

The Core MVP must continue functioning without them.

---

# Development Principles

Architecture before implementation.

Implementation before optimization.

Optimization before complexity.

Prefer maintainability over clever code.

Readable code is preferred over shorter code.

---

# Definition of Done

A feature is only considered complete when:

✓ Architecture respected

✓ Responsive

✓ Offline capable

✓ Tested

✓ Documented

✓ Accessible

✓ Consistent with the Design System

✓ Compatible with existing modules

---

End of Document