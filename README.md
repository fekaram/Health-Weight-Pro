{\rtf1\ansi\ansicpg1252\cocoartf2639
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;\f1\fnil\fcharset0 LucidaGrande;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 # HWP Platform 3.0\
\
> Enterprise-grade Health & Weight Management Platform\
\
---\
\
# Overview\
\
HWP Platform is an Offline First, Event-Driven Health Platform focused on nutrition, workouts, medication management, body progress tracking and AI-assisted health insights.\
\
The platform was designed following enterprise software architecture principles to guarantee long-term maintainability, scalability and reliability.\
\
---\
\
# Project Philosophy\
\
The HWP Platform is built around five core principles.\
\
\'95 Clean Architecture\
\
\'95 Domain Driven Design (DDD)\
\
\'95 Event Driven Architecture\
\
\'95 Offline First\
\
\'95 AI Ready\
\
The objective is not simply to build an application.\
\
The objective is to build a platform capable of evolving for many years without architectural degradation.\
\
---\
\
# Documentation\
\
All project decisions are documented.\
\
Every implementation must follow these documents.\
\
| Order | Document | Purpose |\
|------:|----------|---------|\
| 01 | ARCHITECTURE.md | Overall system architecture |\
| 02 | DESIGN_SYSTEM.md | Design Tokens and UI Standards |\
| 03 | DATA_MODEL.md | Entities and persistence model |\
| 04 | DOMAIN_MODEL.md | Business domain |\
| 05 | FEATURES.md | Functional requirements |\
| 06 | MODULES.md | Platform modules |\
| 07 | USER_FLOWS.md | User journeys |\
| 08 | UI_SPECIFICATION.md | Screen specifications |\
| 09 | COMPONENT_LIBRARY.md | UI Components |\
| 10 | ENGINE_SPECIFICATION.md | Business Engines |\
| 11 | API_SPECIFICATION.md | REST APIs |\
| 12 | TEST_SPECIFICATION.md | Testing strategy |\
| 13 | CODEX_MASTER_CONTEXT.md | AI Coding Rules |\
| 14 | IMPLEMENTATION_ROADMAP.md | Development Roadmap |\
| 15 | DEVELOPMENT_PLAYBOOK.md | Engineering Playbook |\
\
---\
\
# Reading Order\
\
Every new developer must read the documentation in this order.\
\
Architecture\
\

\f1 \uc0\u8595 
\f0 \
\
Design System\
\

\f1 \uc0\u8595 
\f0 \
\
Data Model\
\

\f1 \uc0\u8595 
\f0 \
\
Domain Model\
\

\f1 \uc0\u8595 
\f0 \
\
Modules\
\

\f1 \uc0\u8595 
\f0 \
\
User Flows\
\

\f1 \uc0\u8595 
\f0 \
\
UI Specification\
\

\f1 \uc0\u8595 
\f0 \
\
Component Library\
\

\f1 \uc0\u8595 
\f0 \
\
Engine Specification\
\

\f1 \uc0\u8595 
\f0 \
\
API Specification\
\

\f1 \uc0\u8595 
\f0 \
\
Test Specification\
\

\f1 \uc0\u8595 
\f0 \
\
Codex Master Context\
\

\f1 \uc0\u8595 
\f0 \
\
Implementation Roadmap\
\

\f1 \uc0\u8595 
\f0 \
\
Development Playbook\
\
---\
\
# Architecture\
\
The platform follows.\
\
Clean Architecture\
\

\f1 \uc0\u8595 
\f0 \
\
MVVM\
\

\f1 \uc0\u8595 
\f0 \
\
Repository Pattern\
\

\f1 \uc0\u8595 
\f0 \
\
Dependency Injection\
\

\f1 \uc0\u8595 
\f0 \
\
Event Bus\
\

\f1 \uc0\u8595 
\f0 \
\
Offline First\
\

\f1 \uc0\u8595 
\f0 \
\
Domain Driven Design\
\
---\
\
# Project Structure\
\
```\
src/\
\
assets/\
\
components/\
\
core/\
\
engines/\
\
events/\
\
navigation/\
\
repositories/\
\
screens/\
\
services/\
\
storage/\
\
theme/\
\
types/\
\
utils/\
\
viewmodels/\
\
tests/\
```\
\
---\
\
# Core Engines\
\
The platform is composed of specialized business engines.\
\
\'95 Metrics Engine\
\
\'95 Nutrition Engine\
\
\'95 Workout Engine\
\
\'95 Medication Engine\
\
\'95 Goals Engine\
\
\'95 Body Progress Engine\
\
\'95 Timeline Engine\
\
\'95 Search Engine\
\
\'95 Insights Engine\
\
\'95 Notification Engine\
\
\'95 Sync Engine\
\
\'95 Backup Engine\
\
\'95 AI Integration Engine\
\
---\
\
# Application Layers\
\
```\
UI\
\

\f1 \uc0\u8595 
\f0 \
\
ViewModels\
\

\f1 \uc0\u8595 
\f0 \
\
Core Engines\
\

\f1 \uc0\u8595 
\f0 \
\
Repositories\
\

\f1 \uc0\u8595 
\f0 \
\
Storage\
```\
\
Every implementation shall respect this architecture.\
\
---\
\
# Event Driven\
\
Every business module communicates through the Event Bus.\
\
Never.\
\
Engine 
\f1 \uc0\u8594 
\f0  Engine\
\
Always.\
\
Engine 
\f1 \uc0\u8594 
\f0  Event Bus 
\f1 \uc0\u8594 
\f0  Engine\
\
---\
\
# Offline First\
\
The application must always work.\
\
Online\
\

\f1 \uc0\u8595 
\f0 \
\
Offline\
\

\f1 \uc0\u8595 
\f0 \
\
During Synchronization\
\

\f1 \uc0\u8595 
\f0 \
\
After Recovery\
\
Offline behavior is mandatory.\
\
---\
\
# Artificial Intelligence\
\
AI is an assistant.\
\
Never the owner of business rules.\
\
Business Rules belong to the Core Engines.\
\
---\
\
# Design System\
\
Every UI element must use.\
\
Design Tokens\
\

\f1 \uc0\u8595 
\f0 \
\
Component Library\
\

\f1 \uc0\u8595 
\f0 \
\
Accessibility Standards\
\

\f1 \uc0\u8595 
\f0 \
\
Responsive Layout\
\
Hardcoded values are prohibited.\
\
---\
\
# Testing\
\
Every implementation requires.\
\
Unit Tests\
\

\f1 \uc0\u8595 
\f0 \
\
Integration Tests\
\

\f1 \uc0\u8595 
\f0 \
\
Architecture Tests\
\

\f1 \uc0\u8595 
\f0 \
\
Performance Tests\
\

\f1 \uc0\u8595 
\f0 \
\
Security Tests\
\

\f1 \uc0\u8595 
\f0 \
\
Accessibility Tests\
\

\f1 \uc0\u8595 
\f0 \
\
Regression Tests\
\
Minimum Coverage\
\
95%\
\
---\
\
# Development Workflow\
\
Requirement\
\

\f1 \uc0\u8595 
\f0 \
\
Architecture\
\

\f1 \uc0\u8595 
\f0 \
\
Engine\
\

\f1 \uc0\u8595 
\f0 \
\
Repository\
\

\f1 \uc0\u8595 
\f0 \
\
API\
\

\f1 \uc0\u8595 
\f0 \
\
ViewModel\
\

\f1 \uc0\u8595 
\f0 \
\
UI\
\

\f1 \uc0\u8595 
\f0 \
\
Tests\
\

\f1 \uc0\u8595 
\f0 \
\
Documentation\
\
---\
\
# Coding Rules\
\
Always.\
\
Reuse Components\
\

\f1 \uc0\u8595 
\f0 \
\
Reuse Engines\
\

\f1 \uc0\u8595 
\f0 \
\
Reuse Repositories\
\

\f1 \uc0\u8595 
\f0 \
\
Reuse Events\
\

\f1 \uc0\u8595 
\f0 \
\
Write Tests\
\

\f1 \uc0\u8595 
\f0 \
\
Update Documentation\
\
Never.\
\
Duplicate Components\
\

\f1 \uc0\u8595 
\f0 \
\
Duplicate Business Rules\
\

\f1 \uc0\u8595 
\f0 \
\
Access Storage directly\
\

\f1 \uc0\u8595 
\f0 \
\
Place Business Logic inside UI\
\

\f1 \uc0\u8595 
\f0 \
\
Bypass Event Bus\
\
---\
\
# Versioning\
\
Semantic Versioning\
\
Major\
\
Minor\
\
Patch\
\
---\
\
# Branch Strategy\
\
Suggested branches.\
\
```\
main\
\
develop\
\
feature/*\
\
hotfix/*\
\
release/*\
```\
\
---\
\
# Pull Requests\
\
Every Pull Request shall.\
\
Solve one problem\
\

\f1 \uc0\u8595 
\f0 \
\
Contain one logical change\
\

\f1 \uc0\u8595 
\f0 \
\
Include Tests\
\

\f1 \uc0\u8595 
\f0 \
\
Update Documentation\
\

\f1 \uc0\u8595 
\f0 \
\
Pass CI/CD\
\
---\
\
# Definition of Done\
\
A feature is complete only when.\
\

\f1 \uc0\u10003 
\f0  Architecture preserved\
\

\f1 \uc0\u10003 
\f0  Tests passing\
\

\f1 \uc0\u10003 
\f0  Documentation updated\
\

\f1 \uc0\u10003 
\f0  Accessibility validated\
\

\f1 \uc0\u10003 
\f0  Performance validated\
\

\f1 \uc0\u10003 
\f0  Security validated\
\

\f1 \uc0\u10003 
\f0  Offline validated\
\

\f1 \uc0\u10003 
\f0  No TODOs\
\

\f1 \uc0\u10003 
\f0  No Debug Code\
\

\f1 \uc0\u10003 
\f0  CI/CD approved\
\
---\
\
# AI Development\
\
Before generating code.\
\
Read all documentation.\
\

\f1 \uc0\u8595 
\f0 \
\
Respect Architecture.\
\

\f1 \uc0\u8595 
\f0 \
\
Reuse existing Components.\
\

\f1 \uc0\u8595 
\f0 \
\
Reuse existing Engines.\
\

\f1 \uc0\u8595 
\f0 \
\
Never invent architecture.\
\

\f1 \uc0\u8595 
\f0 \
\
Never violate Clean Architecture.\
\
---\
\
# Technology Stack\
\
Frontend\
\
\'95 TypeScript\
\
\'95 Vite\
\
\'95 PWA\
\
\'95 HTML5\
\
\'95 CSS3\
\
Backend (future)\
\
\'95 REST API\
\
\'95 Event Driven\
\
\'95 JWT Authentication\
\
\'95 Repository Pattern\
\
Database\
\
\'95 Local Storage\
\
\'95 IndexedDB\
\
\'95 Future Cloud Sync\
\
AI\
\
\'95 OpenAI\
\
\'95 Provider Abstraction Layer\
\
---\
\
# Roadmap\
\
Implementation shall follow.\
\
Sprint 0\
\

\f1 \uc0\u8595 
\f0 \
\
Sprint 1\
\

\f1 \uc0\u8595 
\f0 \
\
Sprint 2\
\

\f1 \uc0\u8595 
\f0 \
\
Sprint 3\
\

\f1 \uc0\u8595 
\f0 \
\
Sprint 4\
\

\f1 \uc0\u8595 
\f0 \
\
Sprint 5\
\

\f1 \uc0\u8595 
\f0 \
\
Sprint 6\
\

\f1 \uc0\u8595 
\f0 \
\
Sprint 7\
\

\f1 \uc0\u8595 
\f0 \
\
Sprint 8\
\

\f1 \uc0\u8595 
\f0 \
\
Sprint 9\
\

\f1 \uc0\u8595 
\f0 \
\
Sprint 10\
\

\f1 \uc0\u8595 
\f0 \
\
Sprint 11\
\

\f1 \uc0\u8595 
\f0 \
\
Sprint 12\
\
Never change Sprint order.\
\
---\
\
# Contributing\
\
Before implementing any feature.\
\
Read the documentation.\
\

\f1 \uc0\u8595 
\f0 \
\
Respect the architecture.\
\

\f1 \uc0\u8595 
\f0 \
\
Run all tests.\
\

\f1 \uc0\u8595 
\f0 \
\
Update documentation.\
\

\f1 \uc0\u8595 
\f0 \
\
Submit Pull Request.\
\
---\
\
# Final Statement\
\
The HWP Platform is not only an application.\
\
It is an enterprise software platform designed to evolve for many years.\
\
Architecture is the source of truth.\
\
Documentation is the contract.\
\
Code is the implementation.\
\
Whenever documentation and code disagree,\
\
documentation wins.\
\
---\
\
# License\
\
Copyright \'a9 HWP Platform\
\
All rights reserved.\
}