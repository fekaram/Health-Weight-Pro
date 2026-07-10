{\rtf1\ansi\ansicpg1252\cocoartf2639
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;\f1\fnil\fcharset0 LucidaGrande;\f2\fnil\fcharset0 AppleSymbols;
}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 # HWP Platform 3.0\
\
# 15 - DEVELOPMENT PLAYBOOK\
\
Version: 1.0\
\
Status: Official\
\
This document defines the official engineering practices of the HWP Platform.\
\
Every developer and every AI assistant working on this project shall follow this playbook.\
\
---\
\
# PURPOSE\
\
The purpose of this document is not to describe architecture.\
\
The architecture is already documented.\
\
The purpose of this document is to define how software is built inside the HWP Platform.\
\
---\
\
# ENGINEERING PHILOSOPHY\
\
Always prefer.\
\
Correctness.\
\

\f1 \uc0\u8595 
\f0 \
\
Architecture.\
\

\f1 \uc0\u8595 
\f0 \
\
Maintainability.\
\

\f1 \uc0\u8595 
\f0 \
\
Readability.\
\

\f1 \uc0\u8595 
\f0 \
\
Reusability.\
\

\f1 \uc0\u8595 
\f0 \
\
Performance.\
\
---\
\
Performance is never more important than Architecture.\
\
---\
\
Software should become simpler after every iteration.\
\
Never more complex.\
\
---\
\
# DEVELOPMENT PRINCIPLES\
\
Every implementation shall be.\
\
Small.\
\

\f1 \uc0\u8595 
\f0 \
\
Incremental.\
\

\f1 \uc0\u8595 
\f0 \
\
Deterministic.\
\

\f1 \uc0\u8595 
\f0 \
\
Documented.\
\

\f1 \uc0\u8595 
\f0 \
\
Testable.\
\

\f1 \uc0\u8595 
\f0 \
\
Observable.\
\

\f1 \uc0\u8595 
\f0 \
\
Reusable.\
\
---\
\
Never create unnecessary abstractions.\
\
Never duplicate existing solutions.\
\
Never optimize prematurely.\
\
---\
\
# BEFORE WRITING CODE\
\
Always read.\
\
Architecture.\
\

\f1 \uc0\u8595 
\f0 \
\
Component Library.\
\

\f1 \uc0\u8595 
\f0 \
\
Engine Specification.\
\

\f1 \uc0\u8595 
\f0 \
\
API Specification.\
\

\f1 \uc0\u8595 
\f0 \
\
Test Specification.\
\

\f1 \uc0\u8595 
\f0 \
\
Implementation Roadmap.\
\
---\
\
Never code based on assumptions.\
\
---\
\
If documentation is missing,\
\
stop.\
\
Clarify requirements.\
\
Never invent architecture.\
\
---\
\
# FEATURE DEVELOPMENT\
\
Every Feature follows.\
\
Requirement.\
\

\f1 \uc0\u8595 
\f0 \
\
Architecture.\
\

\f1 \uc0\u8595 
\f0 \
\
Engine.\
\

\f1 \uc0\u8595 
\f0 \
\
Repository.\
\

\f1 \uc0\u8595 
\f0 \
\
API.\
\

\f1 \uc0\u8595 
\f0 \
\
ViewModel.\
\

\f1 \uc0\u8595 
\f0 \
\
UI.\
\

\f1 \uc0\u8595 
\f0 \
\
Tests.\
\

\f1 \uc0\u8595 
\f0 \
\
Documentation.\
\
---\
\
Never start from the UI.\
\
---\
\
Business Rules always start inside Core Engines.\
\
---\
\
# CREATING A NEW ENGINE\
\
Before creating a new Engine verify.\
\
Can an existing Engine own this responsibility?\
\

\f1 \uc0\u8595 
\f0 \
\
Does it violate Single Responsibility?\
\

\f1 \uc0\u8595 
\f0 \
\
Does it duplicate functionality?\
\

\f1 \uc0\u8595 
\f0 \
\
Does it create cyclic dependencies?\
\
---\
\
If any answer is yes,\
\
do not create the Engine.\
\
---\
\
Every Engine shall.\
\
Have one responsibility.\
\

\f1 \uc0\u8595 
\f0 \
\
Publish Events.\
\

\f1 \uc0\u8595 
\f0 \
\
Consume Events.\
\

\f1 \uc0\u8595 
\f0 \
\
Remain independently testable.\
\

\f1 \uc0\u8595 
\f0 \
\
Avoid Infrastructure dependencies.\
\
---\
\
# CREATING A NEW REPOSITORY\
\
Repositories exist only for persistence.\
\
---\
\
Repositories never.\
\
Contain business logic.\
\

\f1 \uc0\u8595 
\f0 \
\
Know UI.\
\

\f1 \uc0\u8595 
\f0 \
\
Know APIs.\
\

\f1 \uc0\u8595 
\f0 \
\
Render data.\
\
---\
\
Every Repository shall.\
\
Support Versioning.\
\

\f1 \uc0\u8595 
\f0 \
\
Support Pagination.\
\

\f1 \uc0\u8595 
\f0 \
\
Support Filtering.\
\

\f1 \uc0\u8595 
\f0 \
\
Support Transactions.\
\

\f1 \uc0\u8595 
\f0 \
\
Support Soft Delete.\
\
---\
\
# CREATING A NEW API\
\
Every API shall.\
\
Validate DTOs.\
\

\f1 \uc0\u8595 
\f0 \
\
Call Core Engines.\
\

\f1 \uc0\u8595 
\f0 \
\
Return standardized Responses.\
\

\f1 \uc0\u8595 
\f0 \
\
Publish Events when required.\
\

\f1 \uc0\u8595 
\f0 \
\
Be documented in OpenAPI.\
\
---\
\
Controllers never implement business rules.\
\
---\
\
# CREATING A NEW COMPONENT\
\
Always verify.\
\
Can an existing Component be reused?\
\
---\
\
If not,\
\
create one following.\
\
Design Tokens.\
\

\f1 \uc0\u8595 
\f0 \
\
Component Library.\
\

\f1 \uc0\u8595 
\f0 \
\
Accessibility Rules.\
\

\f1 \uc0\u8595 
\f0 \
\
Naming Convention.\
\
---\
\
Never hardcode.\
\
Colors.\
\

\f1 \uc0\u8595 
\f0 \
\
Spacing.\
\

\f1 \uc0\u8595 
\f0 \
\
Typography.\
\

\f1 \uc0\u8595 
\f0 \
\
Radius.\
\

\f1 \uc0\u8595 
\f0 \
\
Elevation.\
\
---\
\
# DAILY DEVELOPMENT WORKFLOW\
\
Read documentation.\
\

\f1 \uc0\u8595 
\f0 \
\
Understand requirements.\
\

\f1 \uc0\u8595 
\f0 \
\
Identify affected modules.\
\

\f1 \uc0\u8595 
\f0 \
\
Implement.\
\

\f1 \uc0\u8595 
\f0 \
\
Run tests.\
\

\f1 \uc0\u8595 
\f0 \
\
Review.\
\

\f1 \uc0\u8595 
\f0 \
\
Update documentation.\
\

\f1 \uc0\u8595 
\f0 \
\
Commit.\
\
---\
\
Never skip validation.\
\
---\
\
# PULL REQUESTS\
\
Every Pull Request shall.\
\
Solve one problem.\
\

\f1 \uc0\u8595 
\f0 \
\
Contain one logical change.\
\

\f1 \uc0\u8595 
\f0 \
\
Include tests.\
\

\f1 \uc0\u8595 
\f0 \
\
Update documentation.\
\

\f1 \uc0\u8595 
\f0 \
\
Preserve architecture.\
\
---\
\
Never mix unrelated features.\
\
---\
\
# CODE REVIEW\
\
Every review shall validate.\
\
Architecture.\
\

\f1 \uc0\u8595 
\f0 \
\
Naming.\
\

\f1 \uc0\u8595 
\f0 \
\
Reuse.\
\

\f1 \uc0\u8595 
\f0 \
\
Performance.\
\

\f1 \uc0\u8595 
\f0 \
\
Accessibility.\
\

\f1 \uc0\u8595 
\f0 \
\
Security.\
\

\f1 \uc0\u8595 
\f0 \
\
Tests.\
\

\f1 \uc0\u8595 
\f0 \
\
Documentation.\
\
---\
\
Review architecture first.\
\
Code second.\
\
---\
\
# TESTING\
\
Every feature requires.\
\
Unit Tests.\
\

\f1 \uc0\u8595 
\f0 \
\
Integration Tests.\
\

\f1 \uc0\u8595 
\f0 \
\
Regression Tests.\
\
---\
\
Every bug fixed.\
\

\f1 \uc0\u8595 
\f0 \
\
New Regression Test.\
\
---\
\
Never remove existing tests.\
\
---\
\
# DOCUMENTATION\
\
Documentation is part of the source code.\
\
---\
\
Whenever architecture changes.\
\
Update documentation first.\
\

\f1 \uc0\u8595 
\f0 \
\
Implement later.\
\
---\
\
Never allow documentation drift.\
\
---\
\
# VERSIONING\
\
Semantic Versioning.\
\
Major.\
\

\f1 \uc0\u8595 
\f0 \
\
Minor.\
\

\f1 \uc0\u8595 
\f0 \
\
Patch.\
\
---\
\
Every release shall contain.\
\
Release Notes.\
\

\f1 \uc0\u8595 
\f0 \
\
Migration Notes.\
\

\f1 \uc0\u8595 
\f0 \
\
Compatibility Notes.\
\

\f1 \uc0\u8595 
\f0 \
\
Known Issues.\
\
---\
\
# RELEASE PROCESS\
\
Development.\
\

\f1 \uc0\u8595 
\f0 \
\
Testing.\
\

\f1 \uc0\u8595 
\f0 \
\
Review.\
\

\f1 \uc0\u8595 
\f0 \
\
Release Candidate.\
\

\f1 \uc0\u8595 
\f0 \
\
Production Validation.\
\

\f1 \uc0\u8595 
\f0 \
\
Production Release.\
\

\f1 \uc0\u8595 
\f0 \
\
Monitoring.\
\
---\
\
Never deploy without rollback strategy.\
\
---\
\
# OBSERVABILITY\
\
Every feature shall expose.\
\
Logs.\
\

\f1 \uc0\u8595 
\f0 \
\
Metrics.\
\

\f1 \uc0\u8595 
\f0 \
\
Tracing.\
\

\f1 \uc0\u8595 
\f0 \
\
Health Checks.\
\
---\
\
Never log sensitive information.\
\
---\
\
# SECURITY\
\
Always validate.\
\
Authentication.\
\

\f1 \uc0\u8595 
\f0 \
\
Authorization.\
\

\f1 \uc0\u8595 
\f0 \
\
Inputs.\
\

\f1 \uc0\u8595 
\f0 \
\
Outputs.\
\

\f1 \uc0\u8595 
\f0 \
\
Uploads.\
\

\f1 \uc0\u8595 
\f0 \
\
Rate Limits.\
\

\f1 \uc0\u8595 
\f0 \
\
Encryption.\
\
---\
\
Security is mandatory.\
\
Not optional.\
\
---\
\
# OFFLINE FIRST\
\
Always assume.\
\
Network may fail.\
\
---\
\
Every feature shall behave correctly.\
\
Online.\
\

\f1 \uc0\u8595 
\f0 \
\
Offline.\
\

\f1 \uc0\u8595 
\f0 \
\
During Synchronization.\
\

\f1 \uc0\u8595 
\f0 \
\
After Recovery.\
\
---\
\
# GOLDEN RULES\
\
Never violate Clean Architecture.\
\
---\
\
Never duplicate business rules.\
\
---\
\
Never bypass the Repository layer.\
\
---\
\
Never bypass the Event Bus.\
\
---\
\
Never place business logic inside UI.\
\
---\
\
Never access Storage directly.\
\
---\
\
Always reuse Components.\
\
---\
\
Always reuse Engines.\
\
---\
\
Always reuse Repositories.\
\
---\
\
Always preserve backward compatibility.\
\
---\
\
Always write tests.\
\
---\
\
Always update documentation.\
\
---\
\
Always preserve Offline First behavior.\
\
---\
\
Always think long term.\
\
---\
\
# MASTER CHECKLIST\
\
Before considering any implementation complete.\
\

\f2 \uc0\u9744 
\f0  Architecture preserved.\
\

\f2 \uc0\u9744 
\f0  Documentation updated.\
\

\f2 \uc0\u9744 
\f0  Tests passing.\
\

\f2 \uc0\u9744 
\f0  Coverage preserved.\
\

\f2 \uc0\u9744 
\f0  Accessibility validated.\
\

\f2 \uc0\u9744 
\f0  Performance validated.\
\

\f2 \uc0\u9744 
\f0  Security validated.\
\

\f2 \uc0\u9744 
\f0  Offline behavior validated.\
\

\f2 \uc0\u9744 
\f0  Event Bus validated.\
\

\f2 \uc0\u9744 
\f0  No TODOs.\
\

\f2 \uc0\u9744 
\f0  No Debug Code.\
\

\f2 \uc0\u9744 
\f0  No Dead Code.\
\

\f2 \uc0\u9744 
\f0  No duplicated Components.\
\

\f2 \uc0\u9744 
\f0  No duplicated Engines.\
\

\f2 \uc0\u9744 
\f0  No architecture violations.\
\
---\
\
# FINAL ENGINEERING CONTRACT\
\
The responsibility of every engineer working on the HWP Platform is not merely to write code.\
\
The responsibility is to preserve the architecture.\
\
Every implementation shall improve the project.\
\
Never degrade it.\
\
The architecture is the source of truth.\
\
The documentation is the contract.\
\
The code is the implementation.\
\
Whenever they disagree,\
\
the documentation wins.\
\
---\
\
# PROJECT STATUS\
\
Architecture\
\

\f1 \uc0\u10003 
\f0  Completed\
\
Design System\
\

\f1 \uc0\u10003 
\f0  Completed\
\
Data Model\
\

\f1 \uc0\u10003 
\f0  Completed\
\
Domain Model\
\

\f1 \uc0\u10003 
\f0  Completed\
\
Features\
\

\f1 \uc0\u10003 
\f0  Completed\
\
Modules\
\

\f1 \uc0\u10003 
\f0  Completed\
\
User Flows\
\

\f1 \uc0\u10003 
\f0  Completed\
\
UI Specification\
\

\f1 \uc0\u10003 
\f0  Completed\
\
Component Library\
\

\f1 \uc0\u10003 
\f0  Completed\
\
Engine Specification\
\

\f1 \uc0\u10003 
\f0  Completed\
\
API Specification\
\

\f1 \uc0\u10003 
\f0  Completed\
\
Test Specification\
\

\f1 \uc0\u10003 
\f0  Completed\
\
Codex Master Context\
\

\f1 \uc0\u10003 
\f0  Completed\
\
Implementation Roadmap\
\

\f1 \uc0\u10003 
\f0  Completed\
\
Development Playbook\
\

\f1 \uc0\u10003 
\f0  Completed\
\
---\
\
# END OF DOCUMENT}