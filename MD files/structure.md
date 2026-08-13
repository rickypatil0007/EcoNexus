# EcoNexus — System Architecture & Project Structure

> **Document ID:** EN-STRUCTURE-001
> **Version:** 1.0.0
> **Status:** Active
> **Project:** EcoNexus
> **Owner:** Core Engineering Team
> **Depends On:** `01-plan.md` and `overview.md`

---

# Table of Contents

1. Purpose
2. Architecture Vision
3. Core Engineering Principles
4. Architectural Style
5. High-Level System Architecture
6. Layered Architecture
7. Data Flow
8. Feature-Driven Architecture
9. Folder Philosophy
10. Cross-Cutting Concerns
11. Architecture Decision Records
12. Mandatory Architecture Rules
13. Implementation Order
14. Acceptance Criteria

---

# 1. Purpose

This document defines the complete software architecture for EcoNexus.

Every engineer and AI coding agent must treat this document as the **single source of truth** for the application's structure.

Its objectives are to:

* Standardize the project architecture.
* Ensure scalability.
* Improve maintainability.
* Prevent architectural drift.
* Support AI-assisted development.
* Enable future expansion without major restructuring.

No implementation should violate the principles defined in this document.

---

# 2. Architecture Vision

EcoNexus is not a simple web application.

It is a modular digital ecosystem composed of multiple independent yet interconnected domains.

Major domains include:

* Authentication
* User Management
* Dashboard
* Carbon Blueprint
* AI Assistant
* AI Vision
* EcoForest
* Community
* Challenges
* Rewards
* Organizations
* Reports
* Analytics
* Notifications

Each domain must evolve independently while remaining integrated through shared contracts and services.

---

# 3. Core Engineering Principles

The architecture is built around the following principles.

## 3.1 Feature First

Every feature owns its own:

* Components
* Services
* Hooks
* Types
* Validation
* Tests
* Server Actions

Features should never depend directly on each other's internal implementation.

---

## 3.2 Separation of Concerns

Business logic must never exist inside UI components.

Presentation

↓

Application Logic

↓

Domain Logic

↓

Repository

↓

Database

Every layer has exactly one responsibility.

---

## 3.3 Reusability

Common UI elements belong in the shared component library.

Business logic belongs inside services.

Database access belongs inside repositories.

Validation belongs inside validators.

Utilities belong inside utility modules.

---

## 3.4 Scalability

Every decision should allow EcoNexus to grow from:

Hackathon MVP

↓

Production Startup

↓

Enterprise Platform

without requiring architectural redesign.

---

## 3.5 AI-First Engineering

Artificial Intelligence is part of the architecture.

Not an external feature.

AI modules should communicate through defined interfaces and orchestration layers.

Future AI providers should be replaceable with minimal code changes.

---

# 4. Architectural Style

EcoNexus follows a hybrid architecture composed of:

## Clean Architecture

Responsibilities are separated into logical layers.

No layer should bypass another.

---

## Domain-Driven Design

Each feature represents a business domain.

Examples

Carbon Blueprint

EcoForest

Rewards

Challenges

Community

Organizations

Each domain owns its own models, logic, and workflows.

---

## Feature-Based Architecture

The project is organized around business features rather than technical categories.

Incorrect

```
components/

pages/

hooks/

utils/
```

Correct

```
carbon-blueprint/

dashboard/

community/

rewards/

reports/
```

Each feature contains everything required for its operation.

---

## Server-First Architecture

The application should prioritize:

* React Server Components
* Server Actions
* Streaming Rendering
* Edge Runtime

Client Components should exist only where interactivity requires them.

---

# 5. High-Level System Architecture

```
User
│
▼
Landing Experience
│
▼
Authentication
│
▼
Role Selection
│
▼
Dashboard
│
├──────────────┐
│              │
▼              ▼
Carbon      AI Assistant
Blueprint        │
│                │
▼                ▼
EcoForest    Vision AI
│                │
└──────┬─────────┘
       ▼
Community
       │
       ▼
Organizations
       │
       ▼
Reports
       │
       ▼
Rewards
```

All domains communicate through shared services and repositories.

No direct coupling should exist between feature modules.

---

# 6. Layered Architecture

EcoNexus consists of the following logical layers.

---

## Presentation Layer

Responsible for:

* UI
* Layouts
* Components
* Animations
* Navigation
* Forms

Contains no business logic.

---

## Application Layer

Responsible for:

* Server Actions
* Use Cases
* Validation
* Workflow Orchestration

Coordinates business processes.

---

## Domain Layer

Contains:

Business Rules

Carbon Logic

Challenge Logic

Reward Logic

EcoForest Logic

AI Workflows

Organization Rules

This is the heart of the application.

---

## Repository Layer

Responsible for:

Database Communication

Storage

Caching

External APIs

No UI knowledge exists here.

---

## Infrastructure Layer

Contains

Supabase

Claude API

GPT Vision

Google Vision

Roboflow

WAQI

OpenWeather

Resend

Mapbox

GitHub

Vercel

Infrastructure should always remain replaceable.

---

# 7. Data Flow

Every request should follow the same pattern.

```
User Interaction

↓

React Component

↓

Server Action

↓

Validation

↓

Domain Service

↓

Repository

↓

Database / External API

↓

Response Mapping

↓

UI Update
```

Direct communication between UI components and databases is prohibited.

---

# 8. Feature-Driven Architecture

Each feature should remain self-contained.

Example:

```
Carbon Blueprint

├── Components
├── Hooks
├── Actions
├── Services
├── Repository
├── Types
├── Validators
├── Utilities
├── Tests
└── Documentation
```

The same philosophy applies to:

Authentication

Dashboard

Challenges

EcoForest

AI Assistant

Organizations

Reports

Community

Rewards

Notifications

Settings

---

# 9. Folder Philosophy

Every folder must answer one question:

"What responsibility does this folder own?"

Folders should never exist without a clear responsibility.

Good

```
carbon-blueprint

reports

community
```

Bad

```
misc

helpers2

new-folder

random
```

Avoid generic names.

Folder names should represent business capabilities.

---

# 10. Cross-Cutting Concerns

The following systems affect every feature.

Authentication

Authorization

Logging

Error Handling

Analytics

Accessibility

Performance Monitoring

Caching

Internationalization (future)

Feature Flags (future)

Telemetry

These concerns should be implemented once and shared across all modules.

---

# 11. Architecture Decision Records (ADR)

## ADR-001

Architecture Style

Feature-Based Architecture

Status

Approved

---

## ADR-002

Framework

Next.js App Router

Status

Approved

---

## ADR-003

Language

TypeScript

Status

Approved

---

## ADR-004

Database

Supabase PostgreSQL

Status

Approved

---

## ADR-005

Authentication

Supabase Auth

Status

Approved

---

## ADR-006

AI Integration

Claude API as primary reasoning engine with modular adapters for additional providers.

Status

Approved

---

## ADR-007

Landing Experience

Canvas-based 100-frame Earth animation with scroll-driven rendering.

Status

Locked

---

# 12. Mandatory Architecture Rules

Every engineer and AI coding agent must follow these rules.

* Never place business logic inside React components.
* Never access Supabase directly from UI.
* Never duplicate business logic.
* Never create feature dependencies without defined interfaces.
* Always use typed responses.
* Always validate server inputs.
* Prefer composition over inheritance.
* Prefer Server Components over Client Components.
* Isolate AI providers behind service layers.
* Keep modules independently testable.

---

# 13. Implementation Order

The architecture should be implemented in the following sequence:

1. Core project setup
2. Design system
3. Shared infrastructure
4. Authentication
5. Dashboard framework
6. Carbon Blueprint
7. AI Assistant
8. EcoForest
9. Community
10. Organizations
11. Rewards
12. Reports
13. Final optimization

No feature should skip foundational layers.

---

# 14. Acceptance Criteria

This architecture is considered correctly implemented when:

* Every feature is modular.
* Business logic is isolated.
* Data access is centralized.
* Shared components are reusable.
* AI integrations are provider-agnostic.
* New features can be added without modifying unrelated modules.
* The project remains understandable to both human developers and AI coding agents.
* The codebase supports long-term growth without structural redesign.

---

# End of Part 1

**Part 2** will define the complete physical folder structure of the repository, including every directory, its purpose, ownership, naming conventions, and how modules interact. It will also specify the exact project tree that AI coding agents must generate and follow.
---

# 15. Physical Repository Structure

The EcoNexus repository shall follow a **Feature-Driven, Clean Architecture** folder structure.

Every folder must have one clear responsibility.

The project must remain understandable to:

* Developers
* AI Coding Agents
* Future Contributors
* Hackathon Team Members

The repository should be organized as follows:

```text
EcoNexus/
│
├── app/
├── actions/
├── features/
├── components/
├── providers/
├── hooks/
├── services/
├── repositories/
├── lib/
├── stores/
├── config/
├── db/
├── middleware/
├── types/
├── utils/
├── constants/
├── styles/
├── assets/
├── public/
├── tests/
├── docs/
├── scripts/
├── prisma/ (Future)
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
├── components.json
├── middleware.ts
├── .env.local
└── README.md
```

---

# 16. Root Folder Responsibilities

## `/app`

Contains the complete Next.js App Router.

Responsibilities

* Routes
* Layouts
* Loading Pages
* Error Pages
* Server Components
* Route Groups

Never place reusable business logic here.

---

## `/actions`

Contains all Server Actions.

Examples

```text
login.ts

register.ts

uploadReceipt.ts

uploadWaste.ts

calculateCarbon.ts

redeemReward.ts

createChallenge.ts

updateForest.ts
```

Responsibilities

* Server-side execution
* Validation
* Calling Services
* Returning Typed Results

No database queries directly inside actions.

---

## `/features`

The heart of the project.

Every business feature owns everything required for itself.

Example

```text
features/

authentication/

dashboard/

carbon-blueprint/

ecoforest/

assistant/

community/

rewards/

reports/

organizations/

settings/

notifications/
```

No feature should depend on another feature's internal implementation.

---

## `/components`

Shared reusable UI.

Contains

Buttons

Cards

Inputs

Dialogs

Tables

Charts

Skeletons

Navigation

Modals

Icons

Never include feature-specific business logic.

---

## `/providers`

Application providers.

Examples

Theme Provider

Supabase Provider

Session Provider

Tooltip Provider

Toast Provider

React Query Provider (Future)

---

## `/hooks`

Reusable hooks.

Examples

```text
useTheme

useUser

useCarbon

useAQI

useMediaQuery

useDebounce

useScrollProgress

useWindowSize
```

Hooks should remain generic whenever possible.

---

## `/services`

Business services.

Examples

Carbon Service

Reward Service

AI Service

Report Service

Community Service

Notification Service

No UI code.

No React code.

---

## `/repositories`

Responsible for

Database Access

Supabase

Storage

External APIs

Every feature communicates with data sources only through repositories.

---

## `/lib`

Reusable libraries.

Examples

Supabase Client

Utility Helpers

API Clients

Date Helpers

Logger

Formatter

Validators

---

## `/stores`

Global state.

Prefer minimal global state.

Possible Stores

User

Theme

Notifications

Preferences

Never store server data unnecessarily.

---

## `/config`

Application configuration.

Examples

Navigation

Routes

Permissions

Feature Flags

Theme Tokens

Constants

---

## `/db`

Database utilities.

Contains

Schema Helpers

Seed Files

Migrations (Future)

Database Types

---

## `/middleware`

Authentication

Authorization

Security

Redirect Logic

Request Validation

---

## `/types`

Global TypeScript types.

Examples

User

Carbon

Challenge

Reward

Organization

Report

Forest

API Responses

---

## `/utils`

Pure helper functions.

Examples

Calculations

Formatting

Sorting

Parsing

Date Utilities

No side effects.

---

## `/constants`

Application constants.

Examples

Carbon Thresholds

Reward Levels

Badge IDs

Routes

Roles

Animation Values

Colors

---

## `/styles`

Global CSS

Fonts

Animations

Theme Variables

---

## `/assets`

Development assets.

SVG

Illustrations

Icons

Logos

Mock Data

---

## `/public`

Static assets.

Earth Frames

Images

Videos

Fonts

Manifest

Robots

Favicon

---

## `/tests`

Testing.

Unit

Integration

E2E

Fixtures

Mock Data

---

## `/docs`

Engineering documentation.

Contains

01-plan.md

02-structure.md

03-memory.md

...

Acts as the project's single source of truth.

---

# 17. Feature Module Structure

Every feature should follow the exact same structure.

Example

```text
features/

carbon-blueprint/

├── actions/
├── components/
├── hooks/
├── services/
├── repository/
├── validators/
├── types/
├── utils/
├── constants/
├── tests/
├── README.md
└── index.ts
```

This consistency allows AI coding agents to navigate the codebase predictably.

---

# 18. Shared Component Structure

```text
components/

ui/

layout/

navigation/

forms/

charts/

animations/

feedback/

modals/

dialogs/

cards/

tables/

icons/

loading/
```

Each directory should contain only reusable components.

---

# 19. Asset Organization

```text
public/

earth/

images/

icons/

illustrations/

logos/

videos/

fonts/

manifest/

```

The `earth/` directory should contain the complete 100-frame Earth animation sequence (e.g., `0001.jpg` to `0100.jpg`) used exclusively by the landing page canvas renderer.

---

# 20. Naming Conventions

Folders

```text
carbon-blueprint

organization-dashboard

ecoforest

landing-page
```

Files

```text
carbon-card.tsx

ecoforest-scene.tsx

challenge-list.tsx
```

Components

PascalCase

```text
CarbonCard

EcoForestScene

LandingHero
```

Hooks

camelCase

```text
useCarbonScore

useForestGrowth
```

Server Actions

Verb First

```text
createChallenge

uploadReceipt

generateReport

calculateCarbon
```

Services

```text
CarbonService

RewardService

VisionService
```

Repositories

```text
CarbonRepository

UserRepository

ChallengeRepository
```

---

# 21. Import Rules

Preferred import order:

1. React / Next.js
2. Third-party packages
3. Internal libraries
4. Shared components
5. Feature modules
6. Utilities
7. Types
8. Local files

Use absolute imports where configured.

Avoid deeply nested relative imports such as:

```text
../../../../components
```

---

# 22. Dependency Rules

Allowed:

UI → Actions → Services → Repository → Database

Not Allowed:

UI → Database

UI → External APIs

Feature A → Feature B internals

Repository → UI

Services → React Components

These rules preserve modularity and maintainability.

---

# 23. Feature Ownership

Each feature owns:

* UI
* Business Logic
* Validation
* Types
* Tests
* Documentation

Shared functionality belongs in shared directories only if it is reused by multiple features.

---

# 24. AI Coding Agent Guidelines

When generating code:

* Always create the folder structure before implementing features.
* Never invent new top-level folders without approval.
* Place new code in the correct feature module.
* Reuse shared components before creating new ones.
* Keep each feature self-contained.
* Follow naming conventions consistently.
* Update documentation when introducing structural changes.

---

# 25. Acceptance Criteria

The repository structure is considered complete when:

* Every folder has a single responsibility.
* Feature modules are isolated.
* Shared components are reusable.
* Import paths remain clean.
* New developers can locate any file within minutes.
* AI coding agents can generate code without restructuring the project.
* The architecture supports future scaling without reorganizing the repository.

---

# End of Part 2

**Part 3** will define the complete routing architecture, App Router structure, authentication flow, dashboard navigation, protected routes, middleware strategy, API endpoints, and feature navigation hierarchy for the entire EcoNexus platform.
---

# 26. Application Routing Architecture

EcoNexus uses the **Next.js App Router** as the primary routing system.

The routing structure must be:

* Scalable
* SEO-friendly
* Modular
* Role-aware
* AI-friendly
* Easy to maintain

Every route should belong to a business domain rather than a technical grouping.

---

# 27. Route Groups

The application is divided into the following major route groups.

```text
/
├── (marketing)
├── (auth)
├── (dashboard)
├── (organization)
├── (admin)
├── (legal)
├── api
└── not-found
```

Each route group has a dedicated responsibility.

---

# 28. Marketing Routes

These routes are publicly accessible.

```text
/

/about

/features

/pricing

/contact

/blog (Future)

/faq

/privacy

/terms

/careers (Future)
```

The landing page (`/`) is the flagship experience.

It contains:

* Apple-inspired storytelling
* Earth Canvas Animation
* Scroll Experience
* Feature Showcase
* AI Introduction
* Carbon Blueprint Overview
* EcoForest Preview
* Organization Showcase
* CTA Sections

---

# 29. Authentication Routes

Authentication is completely separated from the rest of the application.

```text
/auth

/auth/login

/auth/register

/auth/forgot-password

/auth/reset-password

/auth/verify-email

/auth/onboarding
```

After authentication, users are redirected according to:

* Role
* Profile Completion
* Organization Status

---

# 30. Onboarding Flow

After registration:

```text
Register

↓

Email Verification

↓

Role Selection

↓

Profile Creation

↓

Lifestyle Questionnaire

↓

Carbon Blueprint Initialization

↓

Dashboard
```

The onboarding should never overwhelm users.

Questions should be grouped into short, easy-to-complete sections.

---

# 31. Dashboard Routing

The dashboard serves as the operational hub of EcoNexus.

```text
/dashboard

/dashboard/home

/dashboard/profile

/dashboard/carbon

/dashboard/ecoforest

/dashboard/assistant

/dashboard/challenges

/dashboard/community

/dashboard/rewards

/dashboard/reports

/dashboard/history

/dashboard/notifications

/dashboard/settings
```

Every route represents one independent feature.

---

# 32. Dashboard Navigation Structure

The left sidebar should contain:

```text
Home

Carbon Blueprint

AI Assistant

EcoForest

Challenges

Community

Rewards

Reports

History

Notifications

Settings
```

Navigation should remain consistent across all screen sizes.

---

# 33. Carbon Blueprint Routes

```text
/dashboard/carbon

/dashboard/carbon/overview

/dashboard/carbon/history

/dashboard/carbon/recommendations

/dashboard/carbon/insights

/dashboard/carbon/comparison
```

Responsibilities:

* Carbon Score
* Historical Trends
* AI Recommendations
* Lifestyle Analysis
* Progress Tracking

---

# 34. EcoForest Routes

```text
/dashboard/ecoforest

/dashboard/ecoforest/progress

/dashboard/ecoforest/species

/dashboard/ecoforest/achievements
```

The EcoForest should function as a persistent virtual environment.

Future updates may introduce:

* Interactive Wildlife
* Seasons
* Weather
* Multiplayer Visits

---

# 35. AI Assistant Routes

```text
/dashboard/assistant

/dashboard/assistant/chat

/dashboard/assistant/history

/dashboard/assistant/uploads
```

Future capabilities:

* Voice Assistant
* Multi-language
* AI Memory
* Smart Suggestions

---

# 36. Challenge Routes

```text
/dashboard/challenges

/dashboard/challenges/daily

/dashboard/challenges/weekly

/dashboard/challenges/monthly

/dashboard/challenges/history
```

Each challenge should update:

* Green Points
* Carbon Blueprint
* EcoForest
* Leaderboard

---

# 37. Community Routes

```text
/dashboard/community

/dashboard/community/feed

/dashboard/community/events

/dashboard/community/leaderboard

/dashboard/community/groups

/dashboard/community/profile
```

Future:

* Messaging
* Clubs
* Volunteer Matching

---

# 38. Rewards Routes

```text
/dashboard/rewards

/dashboard/rewards/store

/dashboard/rewards/history

/dashboard/rewards/achievements
```

Responsibilities:

* Redeem Green Points
* Coupons
* Badges
* Certificates

---

# 39. Reports Routes

```text
/dashboard/reports

/dashboard/reports/monthly

/dashboard/reports/yearly

/dashboard/reports/download
```

Users should be able to:

* View
* Download
* Share
* Compare

their sustainability reports.

---

# 40. Organization Routes

Organizations have their own workspace.

```text
/organization

/organization/dashboard

/organization/events

/organization/challenges

/organization/analytics

/organization/reports

/organization/members

/organization/campaigns

/organization/settings
```

Supported organization types:

* Colleges
* NGOs
* CSR Organizations

Each organization has isolated data access.

---

# 41. Admin Routes

Reserved for platform administration.

```text
/admin

/admin/users

/admin/reports

/admin/organizations

/admin/analytics

/admin/challenges

/admin/rewards

/admin/settings
```

Only authorized administrators may access these routes.

---

# 42. API Route Structure

Internal API routes should be grouped logically.

```text
/api

/api/auth

/api/ai

/api/carbon

/api/challenges

/api/community

/api/ecoforest

/api/reports

/api/rewards

/api/upload

/api/webhooks
```

Most business logic should use **Server Actions**, with API routes reserved for integrations, webhooks, and external consumers.

---

# 43. Middleware Strategy

Middleware responsibilities:

* Authentication
* Session Validation
* Role Authorization
* Redirect Logic
* Protected Routes
* Rate Limiting (Future)
* Logging (Future)

Example flow:

```text
Request

↓

Middleware

↓

Authentication Check

↓

Role Check

↓

Route Permission

↓

Continue

↓

Render
```

---

# 44. Navigation Principles

Navigation should follow these rules:

* Maximum three levels deep.
* Breadcrumbs for nested pages.
* Persistent sidebar on desktop.
* Collapsible navigation on tablet.
* Bottom navigation may be introduced for mobile in future versions.
* Current route must always be visually highlighted.

Users should never feel lost.

---

# 45. Route Protection Matrix

| Route                  | Guest |     User    | Organization |    Admin    |
| ---------------------- | :---: | :---------: | :----------: | :---------: |
| Landing                |   ✅   |      ✅      |       ✅      |      ✅      |
| Login/Register         |   ✅   | ⚠️ Redirect |  ⚠️ Redirect | ⚠️ Redirect |
| Dashboard              |   ❌   |      ✅      |       ✅      |      ✅      |
| Carbon Blueprint       |   ❌   |      ✅      |       ✅      |      ✅      |
| EcoForest              |   ❌   |      ✅      |       ❌      |      ✅      |
| AI Assistant           |   ❌   |      ✅      |       ✅      |      ✅      |
| Community              |   ❌   |      ✅      |       ✅      |      ✅      |
| Organization Workspace |   ❌   |      ❌      |       ✅      |      ✅      |
| Admin Panel            |   ❌   |      ❌      |       ❌      |      ✅      |

---

# 46. URL Design Rules

URLs must be:

* Human-readable
* SEO-friendly
* Consistent
* Lowercase
* Hyphen-separated

Correct:

```text
/dashboard/carbon-history

/dashboard/ai-assistant
```

Incorrect:

```text
/dashboard/carbonHistory

/dashboard/page1

/dashboard/temp
```

---

# 47. Deep Linking

Every major page should support direct linking.

Examples:

* Sustainability reports
* Challenge details
* EcoForest progress
* Organization campaigns
* Shared achievements

URLs should remain stable and bookmarkable.

---

# 48. Error & Fallback Routes

The application should include:

```text
/not-found

/error

/loading

/offline (Future)

/maintenance (Future)
```

Every feature should define:

* Loading State
* Empty State
* Error State
* Retry Action

---

# 49. AI Coding Agent Instructions

When generating routes:

* Use the App Router.
* Prefer nested layouts to avoid duplication.
* Keep page components lightweight.
* Move business logic to Server Actions and Services.
* Protect routes through middleware and role checks.
* Use route groups for logical organization.
* Never expose sensitive data through URLs.
* Follow naming conventions exactly.

---

# 50. Acceptance Criteria

The routing architecture is considered complete when:

* Every feature has a dedicated route.
* Authentication and authorization are enforced.
* Navigation is intuitive across desktop and mobile.
* URLs are clean and descriptive.
* Route protection is role-aware.
* Server Actions handle business logic.
* Middleware secures protected areas.
* Future modules can be added without restructuring existing routes.

---

# End of Part 3

**Part 4** will define the backend architecture, including Server Actions, Repository Pattern, AI orchestration, Supabase integration, storage strategy, event-driven workflows, caching, realtime updates, and communication between services. This section will act as the implementation blueprint for the application's backend and AI infrastructure.
---

# 51. Backend Architecture

The EcoNexus backend is designed around a **Server-First, AI-Driven, Modular Architecture**.

The backend must:

* Be scalable
* Be secure
* Be independently testable
* Support AI orchestration
* Minimize client-side logic
* Enable future microservice extraction if required

Business logic must **never** reside inside React components.

---

# 52. Backend Architecture Overview

```text
                    USER
                      │
                      ▼
            React Server Component
                      │
                      ▼
               Server Action
                      │
              Input Validation
                      │
                      ▼
             Feature Service Layer
                      │
          ┌───────────┴────────────┐
          ▼                        ▼
   Repository Layer          AI Agent Layer
          │                        │
          ▼                        ▼
    Supabase DB              Claude API
                              Vision APIs
                              OCR APIs
          │                        │
          └───────────┬────────────┘
                      ▼
             Typed Response Object
                      │
                      ▼
               React Component
```

Every request should follow this flow.

---

# 53. Server Actions

Server Actions are the primary backend entry point.

Responsibilities

* Authentication
* Validation
* Calling Services
* Returning Typed Results
* Error Handling

Server Actions must **never**

* contain SQL
* contain AI prompts
* contain business rules

Those belong elsewhere.

---

## Example Flow

```text
User clicks

↓

Server Action

↓

Validation

↓

Carbon Service

↓

Carbon Repository

↓

Supabase

↓

Return Result
```

---

# 54. Service Layer

The Service Layer contains all business logic.

Examples

```text
AuthenticationService

CarbonService

EcoForestService

ChallengeService

RewardService

OrganizationService

NotificationService

AnalyticsService

VisionService

AssistantService

ReportService
```

Every service should expose a clean API.

Example

```text
calculateCarbon()

generateRecommendations()

growForest()

awardPoints()

redeemReward()
```

---

# 55. Repository Pattern

Repositories isolate all external communication.

Responsibilities

* Database
* Storage
* External APIs
* Search
* Cache

Example

```text
UserRepository

CarbonRepository

ForestRepository

ChallengeRepository

OrganizationRepository

RewardRepository

ReportRepository
```

Repositories should never know about React.

---

# 56. AI Orchestration Layer

EcoNexus treats AI as an independent subsystem.

The AI Orchestrator coordinates requests between multiple AI providers.

```text
User Request

↓

AI Orchestrator

↓

Determine Task

↓

Select Agent

↓

Execute AI

↓

Validate Response

↓

Return Structured Result
```

Future AI providers should be replaceable without changing application logic.

---

# 57. AI Agent Architecture

Each AI capability is implemented as an independent agent.

## Carbon Agent

Responsibilities

* Estimate emissions
* Analyze lifestyle
* Calculate trends
* Predict improvements

---

## Sustainability Assistant

Responsibilities

* Chat
* Explain
* Recommend
* Guide
* Answer sustainability questions

---

## Vision Agent

Responsibilities

* Receipt OCR
* Waste Classification
* Product Recognition
* Image Analysis

---

## Recommendation Agent

Responsibilities

* Personalized advice
* Eco tips
* Challenge suggestions
* Product alternatives

---

## Report Agent

Responsibilities

* Monthly Reports
* PDF Generation
* Insights
* Trend Summaries

---

## Analytics Agent

Responsibilities

* Organization Analytics
* Participation
* Carbon Trends
* KPI Generation

---

# 58. AI Request Flow

```text
User Upload

↓

Vision Agent

↓

Extract Data

↓

Carbon Agent

↓

Update Carbon Blueprint

↓

Reward Service

↓

Green Points

↓

EcoForest Service

↓

Forest Growth

↓

Dashboard Refresh
```

This event chain should remain automatic.

---

# 59. Database Communication

All database communication must follow:

```text
Server Action

↓

Service

↓

Repository

↓

Supabase

↓

Typed Result

↓

Service

↓

Server Action

↓

Client
```

Direct database access from UI components is prohibited.

---

# 60. Storage Strategy

Supabase Storage should contain:

```text
receipts/

waste/

products/

avatars/

reports/

organizations/

earth/

challenge-images/
```

Every upload should generate a secure URL.

Files should never be publicly writable.

---

# 61. Event-Driven Architecture

Major application events should trigger automated workflows.

Examples

Receipt Uploaded

↓

Vision Analysis

↓

Carbon Updated

↓

Green Points

↓

EcoForest Updated

↓

Achievements Checked

↓

Notification Sent

↓

Analytics Updated

---

Challenge Completed

↓

Points Awarded

↓

Carbon Updated

↓

Leaderboard Updated

↓

Forest Updated

↓

Badge Awarded

---

# 62. Background Jobs

Heavy operations should execute asynchronously.

Examples

* OCR
* AI Reports
* PDF Generation
* Email Sending
* Analytics
* Forest Simulation
* Batch Calculations

Users should receive progress feedback while processing continues.

---

# 63. Caching Strategy

Cache only data that improves performance without risking stale critical information.

Recommended cache targets:

* AQI data
* Weather data
* Public statistics
* Carbon benchmarks
* Dashboard summaries

Do **not** cache:

* Authentication
* User permissions
* Financial rewards
* Sensitive profile data

---

# 64. Realtime Architecture

Supabase Realtime should power:

* Green Point updates
* Notifications
* Challenge progress
* Community feed
* Leaderboards
* Organization dashboards

Realtime events should be lightweight and typed.

---

# 65. Error Handling Strategy

Every backend operation returns a standardized response.

```text
Success

↓

Data

↓

Message

↓

Metadata
```

or

```text
Failure

↓

Error Code

↓

Human-readable Message

↓

Recovery Suggestion
```

Never expose raw database errors to the client.

---

# 66. Logging & Monitoring

The backend should log:

* Authentication events
* AI failures
* Upload failures
* Database errors
* API latency
* Background job failures
* Security events

Logs should support debugging without exposing sensitive user information.

---

# 67. Security Architecture

Mandatory protections:

* HTTPS only
* Row-Level Security (Supabase)
* Input validation
* Output sanitization
* Rate limiting (future)
* File type validation
* File size limits
* Signed upload URLs
* Environment variable isolation
* CSRF protection where applicable

No API key should ever be exposed to the client.

---

# 68. External Integrations

Supported integrations include:

* Claude API
* GPT Vision
* Google Cloud Vision
* Roboflow
* OpenWeather
* WAQI
* Mapbox
* Resend
* Supabase Auth
* Supabase Storage
* Supabase Realtime

Each integration should be wrapped in its own adapter service to allow future replacement.

---

# 69. Dependency Rules

Allowed flow:

```text
UI

↓

Server Action

↓

Service

↓

Repository

↓

External System
```

Forbidden:

```text
UI

↓

Database
```

```text
React Component

↓

Claude API
```

```text
Repository

↓

React Component
```

These rules are mandatory.

---

# 70. AI Coding Agent Instructions

When implementing the backend:

* Always begin with Server Actions.
* Place business logic in Services.
* Place database operations in Repositories.
* Keep AI prompts inside dedicated AI modules.
* Return typed responses only.
* Validate every external input.
* Handle every failure gracefully.
* Never duplicate service logic.
* Never hardcode secrets.
* Keep integrations modular and replaceable.

---

# 71. Acceptance Criteria

The backend architecture is considered complete when:

* Every request flows through the defined layers.
* Business logic is isolated from presentation.
* AI services are modular.
* Repositories abstract all external systems.
* Background tasks are asynchronous.
* Realtime updates function reliably.
* Security standards are enforced.
* Error handling is consistent.
* New services can be added without modifying unrelated modules.

---

# End of Part 4

**Part 5** will complete `02-structure.md` with:

* State Management Architecture
* Component Communication
* Dependency Injection Strategy
* Testing Architecture
* CI/CD Structure
* Performance Optimization Strategy
* Scalability Roadmap
* AI Coding Rules (Final)
* Architecture Validation Checklist
* Definition of Done for the entire codebase

This final part will formally lock the architecture that all future implementation must follow.
---

# 72. State Management Architecture

EcoNexus follows a **Server-First State Management Strategy**.

The application should avoid unnecessary client-side state and always prefer server-rendered data where possible.

Priority Order:

1. React Server Components
2. Server Actions
3. URL State
4. Zustand (Minimal Global State)
5. Local Component State

Global state should only be used when data is shared across unrelated components.

---

## Server State

Server state includes:

* User Profile
* Carbon Blueprint
* Dashboard Data
* Challenges
* Rewards
* Reports
* Organizations
* AI Conversations
* EcoForest State

This data should be fetched from the server.

Never duplicate server state inside Zustand.

---

## Client State

Client state should only manage:

* Modal Visibility
* Sidebar Collapse
* Theme
* Search Filters
* Selected Tabs
* Form Progress
* Temporary UI Interactions

---

## Zustand Stores

Recommended stores:

```text
stores/

user-store.ts

theme-store.ts

notification-store.ts

preferences-store.ts
```

Avoid creating dozens of global stores.

---

# 73. Component Communication

Communication hierarchy:

```text
Page

↓

Feature Layout

↓

Feature Components

↓

Shared Components
```

Rules:

* Parent → Child via Props
* Shared Data → Server Components
* Global UI → Zustand
* Feature Logic → Services
* Database → Repository

Never use prop drilling beyond two levels.

If communication becomes complex, refactor.

---

# 74. Dependency Injection Strategy

Every service should depend on interfaces instead of concrete implementations.

Example:

```text
CarbonService

↓

ICarbonRepository

↓

SupabaseCarbonRepository
```

Benefits:

* Easier testing
* Easier provider replacement
* Cleaner architecture
* Better AI-generated code

---

# 75. Error Handling Architecture

Every operation should return a standard response structure.

Success

```text
{
success,
data,
message,
metadata
}
```

Failure

```text
{
success,
errorCode,
message,
details,
recovery
}
```

Never throw raw database or API errors directly to the UI.

Every user-facing error should be understandable and actionable.

---

# 76. Validation Strategy

Validation occurs at multiple layers.

Layer 1

Client

Basic UX validation.

Layer 2

Server Action

Security validation.

Layer 3

Service

Business rules.

Layer 4

Database

Constraints.

Use Zod schemas for request validation.

Every API input must be validated.

---

# 77. Testing Architecture

Testing is mandatory for critical flows.

Project structure:

```text
tests/

unit/

integration/

e2e/

fixtures/

mocks/
```

Critical tests:

* Login
* Registration
* Carbon Calculation
* AI Assistant
* Receipt Upload
* Waste Upload
* Challenge Completion
* EcoForest Growth
* Report Generation

Future:

* Visual Regression
* Accessibility Tests
* Performance Tests

---

# 78. Performance Optimization Strategy

Performance is a product feature.

Targets:

Landing Page

* 60 FPS Earth Animation
* Zero Layout Shift
* Lazy-loaded Sections
* Image Preloading
* GPU Acceleration

Dashboard

* Streaming Rendering
* Suspense Boundaries
* Dynamic Imports
* Optimistic Updates

AI

* Background Processing
* Progressive Responses
* Cached Suggestions

General

* Code Splitting
* Font Optimization
* Bundle Analysis
* Tree Shaking
* Image Optimization

---

# 79. Continuous Integration / Continuous Deployment

Every push should trigger:

```text
Developer

↓

GitHub

↓

Lint

↓

Type Check

↓

Tests

↓

Build

↓

Preview Deployment

↓

Review

↓

Production Deployment
```

Deployment platform:

Vercel

Version control:

GitHub

Production deployments should occur only after passing all checks.

---

# 80. Environment Variables

Required environment variables include:

```text
NEXT_PUBLIC_SUPABASE_URL

NEXT_PUBLIC_SUPABASE_ANON_KEY

SUPABASE_SERVICE_ROLE_KEY

CLAUDE_API_KEY

OPENAI_API_KEY

GOOGLE_VISION_API_KEY

ROBOFLOW_API_KEY

MAPBOX_API_KEY

WAQI_API_KEY

OPENWEATHER_API_KEY

RESEND_API_KEY
```

Rules:

* Never expose secret keys to the client.
* Use `NEXT_PUBLIC_` only for values safe to expose.
* Keep production and development environments separate.

---

# 81. Scalability Strategy

EcoNexus should scale without major architectural changes.

Future growth includes:

* Native Android/iOS apps
* Enterprise dashboards
* Multi-region deployment
* AI model switching
* Carbon offset marketplace
* Government integrations
* IoT devices
* Wearables
* Smart home systems
* Public APIs
* Third-party plugins

The architecture should support these additions with minimal disruption.

---

# 82. Accessibility & Internationalization

Accessibility Requirements:

* Keyboard Navigation
* Screen Reader Support
* Focus Indicators
* Reduced Motion Mode
* Semantic HTML
* Color Contrast Compliance

Internationalization (Future):

* Language packs
* Localized dates
* Localized units
* Regional carbon benchmarks
* RTL support

---

# 83. Architecture Validation Checklist

Before implementation begins, verify:

Architecture

* Feature-based
* Modular
* Scalable

Frontend

* Responsive
* Accessible
* Componentized

Backend

* Server Actions
* Services
* Repositories

Database

* Row-Level Security
* Indexed
* Typed

AI

* Modular Agents
* Prompt Isolation
* Provider Abstraction

Performance

* Lazy Loading
* Optimized Images
* Streaming

Deployment

* Production Ready
* Environment Variables
* CI/CD Configured

Documentation

* Updated
* Versioned
* Consistent

---

# 84. AI Coding Agent Rules (Final)

Every AI coding agent contributing to EcoNexus must follow these mandatory rules:

## Required

* Read all documents in `/docs` before writing code.
* Treat the documentation as the authoritative specification.
* Build features incrementally.
* Preserve architectural boundaries.
* Write production-quality TypeScript.
* Use Server Components whenever possible.
* Use Server Actions for mutations.
* Validate all inputs.
* Keep features self-contained.
* Reuse shared components.

## Forbidden

* Do not invent new architecture.
* Do not replace approved technologies.
* Do not remove features without instruction.
* Do not hardcode secrets.
* Do not place business logic inside UI.
* Do not bypass repositories.
* Do not duplicate services.
* Do not ignore accessibility.
* Do not create placeholder implementations presented as complete.

When uncertain, prefer asking for clarification rather than making assumptions.

---

# 85. Definition of Done (Architecture)

The EcoNexus architecture is considered complete when:

* Every feature follows the documented folder structure.
* Routing is modular and role-aware.
* Business logic is isolated.
* Data access is centralized.
* AI integrations are provider-agnostic.
* Shared components are reusable.
* State management follows the documented strategy.
* Performance targets are achievable.
* Security practices are enforced.
* Documentation and implementation remain synchronized.

---

# 86. Transition to `03-memory.md`

With `02-structure.md` complete, the project now has a defined architectural foundation.

The next document, **`03-memory.md`**, is not user memory—it is **project memory**.

Its purpose is to ensure that any AI coding agent (Claude Code, Antigravity, Cursor, Windsurf, GitHub Copilot, etc.) consistently remembers the project's vision, design language, architecture, implementation priorities, and non-negotiable rules throughout development.

`03-memory.md` will include:

* Project Identity
* Core Vision
* Non-Negotiable Design Rules
* Apple-inspired UI/UX Principles
* Earth Animation Rules
* Living EcoForest Rules
* Carbon Blueprint Rules
* AI Assistant Behavior
* Coding Standards
* Animation Standards
* Performance Targets
* Accessibility Rules
* Future Vision
* Permanent AI Instructions

This document should be loaded by AI coding agents before any implementation work begins.

---

# End of `02-structure.md`

**Status:** Complete
**Version:** 1.0.0
**Next Document:** `03-memory.md`

This architecture document defines the official structure, backend design, routing, engineering principles, and implementation constraints for the EcoNexus platform. All future development must conform to this specification unless the documentation is intentionally revised.
