# HWP Platform 3.0

# Documentation Index

Version: 3.0

Status: Official

This document is the entry point for the complete HWP Platform documentation.

---

# Overview

The HWP Platform documentation is organized into independent documents.

Each document describes one aspect of the platform.

Together they represent the complete software specification.

---

# Documentation Structure

## Foundation

| # | Document | Description |
|---:|----------|-------------|
| 01 | ARCHITECTURE.md | Overall system architecture and technical principles |
| 02 | DESIGN_SYSTEM.md | Design Tokens, UI standards and visual identity |
| 03 | DOMAIN_MODEL.md | Business Domains, Bounded Contexts and ownership |
| 04 | DATA_MODEL.md | Entities, relationships and persistence model |
| 05 | FEATURES.md | Complete functional capabilities of the platform |

---

## Product

| # | Document | Description |
|---:|----------|-------------|
| 06 | MODULES.md | Platform modules and responsibilities |
| 07 | USER_FLOWS.md | User journeys and interaction flows |
| 08 | UI_SPECIFICATION.md | Screen specifications and behavior |
| 09 | COMPONENT_LIBRARY.md | Official reusable UI components |

---

## Engineering

| # | Document | Description |
|---:|----------|-------------|
| 10 | ENGINE_SPECIFICATION.md | Core Business Engines |
| 11 | API_SPECIFICATION.md | REST APIs and contracts |
| 12 | TEST_SPECIFICATION.md | Testing strategy and quality gates |

---

## Artificial Intelligence

| # | Document | Description |
|---:|----------|-------------|
| 13 | CODEX_MASTER_CONTEXT.md | Mandatory AI development rules |
| 14 | IMPLEMENTATION_ROADMAP.md | Official implementation roadmap |
| 15 | DEVELOPMENT_PLAYBOOK.md | Engineering practices and workflow |

---

# Supporting Documents

| Document | Purpose |
|----------|---------|
| README.md | Project overview |
| PRD.md | Product Requirements Document |
| MASTER_PROMPT.md | Master prompt for AI assistants |

---

# Reading Order

Every developer shall read the documentation in the following order.

```
Architecture

↓

Design System

↓

Domain Model

↓

Data Model

↓

Features

↓

Modules

↓

User Flows

↓

UI Specification

↓

Component Library

↓

Engine Specification

↓

API Specification

↓

Test Specification

↓

Codex Master Context

↓

Implementation Roadmap

↓

Development Playbook
```

---

# Implementation Order

The implementation must follow the official roadmap.

```
Sprint 0

↓

Sprint 1

↓

Sprint 2

↓

Sprint 3

↓

Sprint 4

↓

Sprint 5

↓

Sprint 6

↓

Sprint 7

↓

Sprint 8

↓

Sprint 9

↓

Sprint 10

↓

Sprint 11

↓

Sprint 12
```

Never change Sprint order.

---

# Documentation Dependencies

```
ARCHITECTURE
        │
        ▼
DOMAIN MODEL
        │
        ▼
DATA MODEL
        │
        ▼
FEATURES
        │
        ▼
MODULES
        │
        ▼
USER FLOWS
        │
        ▼
UI SPECIFICATION
        │
        ▼
COMPONENT LIBRARY
        │
        ▼
ENGINE SPECIFICATION
        │
        ▼
API SPECIFICATION
        │
        ▼
TEST SPECIFICATION
        │
        ▼
CODEX MASTER CONTEXT
        │
        ▼
IMPLEMENTATION ROADMAP
        │
        ▼
DEVELOPMENT PLAYBOOK
```

---

# Documentation Status

| Area | Status |
|------|:------:|
| Architecture | ✅ |
| Design System | ✅ |
| Domain Model | ✅ |
| Data Model | ✅ |
| Features | ✅ |
| Modules | ✅ |
| User Flows | ✅ |
| UI Specification | ✅ |
| Component Library | ✅ |
| Engine Specification | ✅ |
| API Specification | ✅ |
| Test Specification | ✅ |
| Codex Master Context | ✅ |
| Implementation Roadmap | ✅ |
| Development Playbook | ✅ |

---

# Platform Status

Architecture

✅ Complete

Documentation

✅ Complete

Design

✅ Complete

Business Model

✅ Complete

Implementation

⏳ Not Started

Current Sprint

Sprint 0

---

# Source of Truth

The official source of truth of the HWP Platform is:

1. Documentation

2. Architecture

3. Source Code

Whenever code and documentation disagree,

the documentation is correct.

---

# Final Statement

Every developer and every AI assistant shall use this document as the entry point for the HWP Platform documentation.

No implementation shall begin before the official documentation has been reviewed.

---

# END OF DOCUMENT