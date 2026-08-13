1. Frontend Architecture Overview
1.1 Introduction

The EcoNexus frontend is responsible for delivering the complete user-facing experience of the sustainability platform.

The frontend architecture is designed around:

High performance
Component reusability
Scalable development
Interactive visualization
Premium user experience

The frontend must support:

User Interface

↓

Interactive Experience

↓

AI Communication

↓

Real-Time Data

↓

Environmental Visualization
1.2 Frontend Technology Stack

EcoNexus frontend uses a modern React-based architecture.

Core technologies:

Framework:

Next.js


Language:

TypeScript


Styling:

Tailwind CSS


Component System:

shadcn/ui


Animation:

Framer Motion

GSAP


3D Rendering:

Three.js

React Three Fiber


Data Visualization:

Recharts
1.3 Frontend Architecture Philosophy

The frontend follows a modular architecture.

Instead of building pages independently, the system is divided into reusable layers.

Architecture:

Application Layer

        ↓

Page Layer

        ↓

Feature Components

        ↓

UI Components

        ↓

Utility Layer
1.4 Frontend Design Goals

The implementation must achieve:

Performance

Requirements:

Fast Loading

Smooth Animations

Optimized Assets

Efficient Rendering
Scalability

The architecture should support:

New Features

Additional Dashboards

Mobile Expansion

AI Modules

Enterprise Features
Maintainability

Code should provide:

Clear Structure

Reusable Components

Strong Typing

Documentation
2. Next.js Application Architecture
2.1 Framework Selection

EcoNexus uses Next.js because it provides:

Server-side rendering
Static generation
API integration support
Performance optimization
Production scalability
2.2 Rendering Strategy

EcoNexus uses a hybrid rendering model.

Architecture:

Static Pages

+

Server Components

+

Client Components

+

Dynamic Data Fetching

Usage:

Static Content

Examples:

Landing Page

About Section

Documentation Pages
Dynamic Content

Examples:

User Dashboard

Carbon Data

AI Conversations

Challenges
2.3 Application Router Structure

EcoNexus follows the Next.js App Router architecture.

Structure:

app/

│
├── layout.tsx

├── page.tsx

│
├── dashboard/

│     └── page.tsx

│
├── carbon/

│     └── page.tsx

│
├── coach/

│     └── page.tsx

│
├── challenges/

│     └── page.tsx

│
└── organization/

      └── page.tsx
2.4 Route Architecture

Main application routes:

Route	Purpose
/	Landing experience
/login	Authentication
/dashboard	User dashboard
/carbon	Carbon Blueprint
/coach	AI Eco Coach
/challenges	Sustainability challenges
/ecosystem	Living Earth experience
/organization	Organization dashboard
/admin	Administration
3. Frontend Folder Architecture
3.1 Complete Structure

Recommended structure:

src/

│
├── app/

│
├── components/

│
├── features/

│
├── hooks/

│
├── services/

│
├── stores/

│
├── types/

│
├── utils/

│
├── constants/

│
├── styles/

│
└── assets/
3.2 Folder Responsibilities
app/

Purpose:

Application routing and layouts.

Contains:

Pages

Layouts

Metadata

Route Loading

Error Handling
components/

Purpose:

Reusable UI elements.

Example:

Button

Card

Modal

Navbar

GlassPanel
features/

Purpose:

Business-specific modules.

Example:

carbon/

coach/

challenges/

ecosystem/

organization/
hooks/

Purpose:

Reusable React logic.

Examples:

useAuth()

useCarbon()

useEarthAnimation()

useAIChat()
services/

Purpose:

External communication.

Contains:

API Clients

Supabase Functions

AI Services

External APIs
stores/

Purpose:

Global state management.

Example:

userStore

themeStore

ecosystemStore
types/

Purpose:

TypeScript definitions.

Example:

User.ts

Carbon.ts

Challenge.ts

Organization.ts
utils/

Purpose:

Helper functions.

Example:

formatCarbon()

calculateImpact()

validateInput()
4. Component Architecture
4.1 Overview

EcoNexus follows atomic component design principles.

Hierarchy:

Pages

↓

Feature Components

↓

Shared Components

↓

Primitive UI Components
4.2 Component Categories
UI Components

Small reusable elements.

Examples:

Button

Input

Card

Badge

Dialog
Feature Components

Business functionality.

Examples:

CarbonScoreCard

AIRecommendation

ChallengeCard

ImpactGraph
Experience Components

Complex interactive elements.

Examples:

EarthScene

ParticleSystem

ImpactVisualization
4.3 Component Naming Convention

Rules:

PascalCase

Meaningful Names

Single Responsibility

Examples:

Correct:

CarbonImpactCard

AIChatPanel

EarthRenderer

Incorrect:

Card1

ComponentNew

TestBox
4.4 Component Development Pattern

Each component should contain:

Component File

↓

Type Definitions

↓

Styles

↓

Logic

↓

Documentation

Example:

CarbonCard/

├── index.tsx

├── types.ts

├── styles.ts

└── README.md
5. Development Environment Setup
5.1 Required Tools

Install:

Node.js

npm / pnpm

Git

VS Code

Chrome DevTools

Recommended VS Code extensions:

ESLint

Prettier

Tailwind CSS IntelliSense

TypeScript Tools
5.2 Project Initialization

Create application:

npx create-next-app econexus

Configuration:

TypeScript:

YES


Tailwind:

YES


App Router:

YES


ESLint:

YES
5.3 Development Scripts

package.json:

dev

↓

Development Server


build

↓

Production Build


start

↓

Production Server


lint

↓

Code Quality Check
5.4 Environment Configuration

Environment file:

.env.local

Variables:

NEXT_PUBLIC_SUPABASE_URL

NEXT_PUBLIC_SUPABASE_KEY

AI_API_KEY

MAP_API_KEY

Security rule:

Never expose private keys
inside frontend code.
6. Frontend Development Standards
6.1 TypeScript Rules

Mandatory:

Strict Mode Enabled

Explicit Types

No Any Usage

Interface Definitions
6.2 Code Style Rules

Follow:

Readable Code

Small Functions

Reusable Components

Clear Naming
6.3 Documentation Requirement

Every major feature requires:

Component Documentation

Usage Example

Props Description

Dependencies
Part 1 Completion Criteria

Before moving to Part 2:

✓ Next.js architecture defined

✓ Folder structure established

✓ Component system designed

✓ Development environment prepared

✓ Coding standards defined
End of Part 1

End of Part 1
7. Design System Architecture
7.1 Overview

The EcoNexus design system defines the visual language used throughout the entire application.

The design system ensures consistency across:

Landing experience
User dashboard
AI interfaces
Carbon analytics
Organization platform
Interactive Earth ecosystem

The design philosophy combines:

Apple Inspired Minimalism

+

Premium Glassmorphism

+

Dark Environmental Theme

+

Interactive Motion Design
7.2 Design System Goals

The interface must communicate:

Trust

Through:

Clean Layout

Professional Typography

Consistent Components
Intelligence

Through:

AI Visual Language

Dynamic Data

Smart Interactions
Sustainability

Through:

Natural Motion

Earth Inspired Elements

Environmental Visual Identity
8. Color System Architecture
8.1 Primary Theme

EcoNexus uses a dark premium theme.

Base:

Deep Space Background

+

Glass Surfaces

+

Environmental Accent Colors
8.2 Color Token Structure

Colors are defined as design tokens.

Example:

colors/

├── background

├── surface

├── glass

├── primary

├── secondary

├── success

└── warning
8.3 Background System

Primary background:

Purpose:

Main Application Canvas

Characteristics:

Dark
Minimal
Space-inspired

Secondary backgrounds:

Used for:

Cards

Panels

Modals

Dashboard Sections
8.4 Glassmorphism System

Glass surfaces are a core EcoNexus visual identity.

Architecture:

Background Layer

↓

Blur Layer

↓

Transparent Surface

↓

Border Highlight

↓

Content Layer
8.5 Glass Component Specification

Example:

GlassCard

Properties:

- Transparency
- Blur
- Border
- Shadow
- Hover Effect

Usage:

Carbon Score Card

AI Recommendation Panel

Earth Information Window

Organization Analytics
8.6 Typography System
8.6.1 Font Philosophy

Typography should feel:

Modern

Premium

Readable

Technical
8.6.2 Typography Hierarchy
Hero Heading

Usage:

Landing page.

Characteristics:

Large Scale

Strong Weight

Minimal Text
Section Heading

Usage:

Dashboard sections.

Body Text

Usage:

Descriptions and explanations.

Data Typography

Usage:

Metrics:

Carbon Score

Impact Value

Statistics
8.7 Spacing System

EcoNexus uses consistent spacing tokens.

Example:

xs

sm

md

lg

xl

2xl

3xl

Purpose:

Maintain:

Alignment
Visual rhythm
Professional layouts
9. Component Design System
9.1 Base Components

The foundation uses reusable UI components.

Examples:

Button

Card

Badge

Input

Dialog

Dropdown

Tabs
9.2 Button System

Button variants:

Primary

Secondary

Glass

Danger

Outline

Primary button example:

Used for:

Get Started

Create Account

Start Challenge
9.3 Card System

Card types:

Glass Card

Analytics Card

Feature Card

AI Card

Challenge Card

Card structure:

Header

↓

Content

↓

Action
9.4 Data Visualization Components

Used for:

Carbon analytics
Impact tracking
Organization reports

Components:

Line Chart

Bar Chart

Progress Ring

Impact Graph

Technology:

Recharts
10. Animation Design System
10.1 Motion Philosophy

Animations should feel:

Natural

Smooth

Purposeful

Premium

Avoid:

Unnecessary Movement

Distracting Effects

Heavy Animations
10.2 Animation Categories
Micro Interactions

Examples:

Button Hover

Card Lift

Icon Animation
Page Transitions

Examples:

Route Changes

Loading States

Section Reveal
Environmental Motion

Examples:

Earth Rotation

Particles

Atmosphere Movement
10.3 Animation Libraries

Used:

Framer Motion

+

GSAP

+

Three.js Animation Loop
10.4 Motion Guidelines

Every animation must have:

Purpose

↓

Trigger

↓

Duration

↓

Smooth Transition

Example:

Carbon improvement:

Carbon Reduced

↓

Earth Brightness Improves

↓

User Understands Impact
11. Responsive Design Architecture
11.1 Overview

EcoNexus supports:

Desktop

Laptop

Tablet

Mobile
11.2 Responsive Strategy

Approach:

Desktop First

↓

Adaptive Scaling

↓

Mobile Optimization
11.3 Breakpoint System

Example:

Mobile

< 640px


Tablet

640px - 1024px


Desktop

> 1024px
11.4 Mobile Adaptation

Changes:

Desktop:

Sidebar

Large Charts

Multi Column Layout

Mobile:

Bottom Navigation

Stacked Cards

Simplified Visualization
11.5 Three.js Responsive Handling

The Earth experience requires:

Dynamic Canvas Size

↓

Adaptive Camera

↓

Reduced Effects On Mobile
12. Accessibility Standards
12.1 Accessibility Goals

EcoNexus must support:

Keyboard navigation
Screen readers
Clear contrast
Reduced motion preferences
12.2 Accessibility Rules

Implement:

Semantic HTML

ARIA Labels

Keyboard Controls

Focus Management
12.3 Reduced Motion Support

Users with motion sensitivity receive:

Reduced Animation Mode

↓

Simplified Transitions

↓

Static Alternatives
13. Theme Architecture
13.1 Theme Provider

Global theme management:

Theme Provider

↓

Application

↓

Components
13.2 Theme Tokens

Stored centrally:

Colors

Spacing

Typography

Animation Values
13.3 Future Theme Expansion

Possible future support:

Light Sustainability Mode

↓

High Contrast Mode

↓

Organization Branding Themes
Part 2 Completion Criteria

Before moving to Part 3:

✓ Design tokens defined

✓ Glassmorphism system created

✓ Typography hierarchy established

✓ Component styling rules defined

✓ Responsive strategy completed

✓ Accessibility standards included
End of Part 2

End of Part 2
14. Interactive Earth Experience Architecture
14.1 Overview

The Living Ecosystem is one of the most important frontend experiences in EcoNexus.

It transforms sustainability data into an interactive planetary visualization.

The objective is to create the feeling that:

User Actions

↓

Environmental Impact

↓

Digital Earth Evolution
14.2 Interactive Earth Technology Stack

The visualization layer uses:

Three.js

+

React Three Fiber

+

WebGL

+

GSAP

+

Framer Motion
14.3 Rendering Architecture

The rendering pipeline:

React Component

↓

Canvas Container

↓

Three.js Scene

↓

WebGL Renderer

↓

GPU Processing

↓

Rendered Earth Experience
15. React Three Fiber Architecture
15.1 Why React Three Fiber

React Three Fiber allows Three.js scenes to be managed using React principles.

Benefits:

Component Based 3D Development

Reusable 3D Components

React State Integration

Cleaner Scene Management
15.2 Earth Component Structure

Recommended structure:

components/

└── ecosystem/

    ├── EarthScene.tsx

    ├── EarthModel.tsx

    ├── Atmosphere.tsx

    ├── Clouds.tsx

    ├── Particles.tsx

    ├── ImpactPoints.tsx

    └── CameraController.tsx
15.3 Earth Scene Component

Responsibilities:

Create Scene

Initialize Camera

Load Objects

Manage Lighting

Control Animation

Example architecture:

EarthScene

│

├── EarthModel

│

├── Atmosphere

│

├── Clouds

│

├── Particles

│

└── ImpactMarkers
16. Three.js Scene Architecture
16.1 Scene Layers

The Earth visualization consists of multiple layers.

Space Background

↓

Stars Layer

↓

Atmosphere Layer

↓

Cloud Layer

↓

Earth Surface

↓

Impact Visualization

↓

UI Overlay
16.2 Earth Surface Layer

The planet consists of:

Sphere Geometry

+

Earth Texture

+

Normal Map

+

Specular Map

Purpose:

Create realistic planetary appearance.

16.3 Texture Management

Required assets:

Day Texture

Night Texture

Cloud Texture

Normal Map

Height Map

Optimization:

Compressed Textures

↓

Optimized Resolution

↓

Lazy Loading
17. Atmosphere Rendering System
17.1 Purpose

The atmosphere creates the premium visual identity of the Earth.

Implementation:

Outer Sphere

+

Transparent Shader

+

Glow Effect

Visual effect:

Earth Surface

↓

Atmospheric Glow

↓

Space Environment
17.2 Shader Architecture

The atmosphere uses:

Vertex Shader

+

Fragment Shader

Shader responsibilities:

Vertex Shader:

Geometry Position

Scale Transformation

Fragment Shader:

Color Calculation

Transparency

Glow Intensity
18. Cloud Rendering System
18.1 Purpose

Cloud layers increase realism.

Architecture:

Cloud Texture

↓

Transparent Sphere

↓

Slow Rotation

Animation:

Earth Rotation

+

Cloud Independent Movement
19. Particle System Architecture
19.1 Purpose

Particles represent:

Sustainability activity
Environmental improvement
Global actions

Examples:

Tree Plantation Points

Renewable Energy Regions

Community Activities
19.2 Particle Pipeline
Impact Data

↓

Particle Generator

↓

GPU Buffer

↓

Rendered Particles
19.3 Particle Optimization

Techniques:

Instanced Rendering

Buffer Geometry

Limited Particle Count

GPU Processing
20. Camera Control System
20.1 Camera Objectives

The camera should provide:

Cinematic Experience

Smooth Movement

Interactive Exploration
20.2 Camera States
Landing State
Wide Earth View

Slow Rotation

Minimal Movement
Interaction State
Zoom

Region Focus

Data Exploration
Dashboard State
Compact Visualization

Reduced Effects
20.3 Camera Animation

Technology:

GSAP Camera Timeline

Example:

User Selects Region

↓

Camera Moves

↓

Region Highlights

↓

Information Panel Appears
21. Earth Data Integration
21.1 Data Flow

The visualization connects with application data.

Architecture:

Database

↓

API Layer

↓

Frontend State

↓

Earth Visualization
21.2 Impact Visualization Logic

Example:

Carbon reduction:

User Reduces Carbon

↓

Impact Score Updated

↓

Earth Data Changes

↓

Visualization Refreshes
21.3 State Management

Earth state includes:

Rotation Speed

Impact Level

Active Regions

Particle Data

Camera Position
22. Canvas Rendering Architecture
22.1 Canvas Component

The main rendering container:

<Canvas>

    Scene

    Camera

    Lights

    Objects

</Canvas>
22.2 Rendering Loop

Three.js continuously updates:

Frame Request

↓

Calculate Changes

↓

Update Scene

↓

Render Frame
22.3 Frame Optimization

Avoid:

Unnecessary Re-renders

Heavy Calculations

Large State Updates

Use:

Memoization

GPU Processing

Efficient Hooks
23. Performance Engineering
23.1 Performance Goals

Targets:

Desktop:

60 FPS


Laptop:

50+ FPS


Mobile:

45+ FPS
23.2 Optimization Techniques
Asset Optimization

Implement:

Compressed Textures

Reduced Polygon Count

Optimized Models
Rendering Optimization

Use:

Level Of Detail

Frustum Culling

Instancing
Loading Optimization

Implement:

Lazy Loading

Progressive Loading

Fallback Images
24. Mobile 3D Strategy

Mobile devices have limited GPU resources.

Adaptive system:

Detect Device

↓

Reduce Effects

↓

Lower Resolution

↓

Maintain Experience

Mobile reductions:

Lower Particle Count

Disable Heavy Shadows

Reduce Texture Resolution
25. Error Handling

Possible failures:

WebGL Unsupported

Texture Loading Failed

GPU Memory Limit

Network Failure

Fallback:

Static Earth Image

↓

Simplified Animation

↓

Basic User Experience
Part 3 Completion Criteria

Before moving to Part 4:

✓ Three.js architecture defined

✓ Earth component structure created

✓ Rendering pipeline documented

✓ Data integration planned

✓ Performance strategy completed

✓ Mobile optimization defined
End of Part 3

End of Part 3
26. Core Application Page Architecture
26.1 Overview

The EcoNexus frontend consists of multiple application experiences.

Each page is designed around a specific user journey.

The primary frontend experiences are:

Landing Experience

↓

Authentication

↓

Personal Dashboard

↓

Carbon Blueprint

↓

AI Eco Coach

↓

Challenge System

↓

Living Ecosystem

↓

Organization Dashboard
26.2 Page Architecture Principles

Every page must follow:

Clear Purpose

↓

Focused User Action

↓

Minimal Cognitive Load

↓

Premium Visual Experience
26.3 Page Composition Structure

Standard page layout:

Page Container

│

├── Header Section

│

├── Main Content

│

├── Interactive Components

│

└── Footer / Navigation
27. Landing Page Frontend Architecture
27.1 Overview

The landing page introduces EcoNexus and creates the first impression.

Primary goals:

Explain platform purpose
Demonstrate innovation
Encourage registration
Showcase Living Ecosystem
27.2 Landing Page Structure
Landing Page

│

├── Hero Section

│

├── Mission Section

│

├── Feature Showcase

│

├── Interactive Earth Preview

│

├── Impact Statistics

│

├── Organization Section

│

└── Call To Action
27.3 Hero Section Implementation
Purpose

The hero section is the primary visual experience.

Components:

HeroContainer

↓

EarthBackground

↓

HeroContent

↓

CTAButtons

Content:

Main Message

Supporting Text

Primary Action

Secondary Action
27.4 Hero Earth Integration

The Earth visualization acts as the visual centerpiece.

Architecture:

Hero Section

+

Three.js Canvas

+

Animated Earth

+

Particle Effects

Interaction:

User Scrolls

↓

Earth Responds

↓

Content Reveals
27.5 Feature Showcase

Features displayed:

AI Eco Coach

Carbon Blueprint

AI Verification

Challenges

Organization Impact

Component:

FeatureCard

Each card contains:

Icon

Title

Description

Animation
28. Authentication Frontend Architecture
28.1 Authentication Flow
Landing Page

↓

Login/Register

↓

Authentication Provider

↓

User Session

↓

Dashboard
28.2 Login Interface

Components:

LoginCard

InputField

PasswordField

OAuthButton

SubmitButton
28.3 Registration Flow

Steps:

Account Creation

↓

Profile Setup

↓

Lifestyle Preferences

↓

Carbon Profile Initialization
28.4 Authentication State Handling

Frontend states:

Loading

Authenticated

Unauthenticated

Error
29. User Dashboard Architecture
29.1 Overview

The dashboard is the central user control system.

Purpose:

Provide:

Personal impact overview
Sustainability progress
Recommendations
Quick actions
29.2 Dashboard Layout

Desktop:

Sidebar

+

Main Content

+

Analytics Panels

Mobile:

Bottom Navigation

+

Stacked Cards
29.3 Dashboard Components

Structure:

Dashboard

│

├── WelcomeSection

│

├── CarbonSummary

│

├── AIRecommendation

│

├── ChallengeProgress

│

├── ImpactGraph

│

└── EarthPreview
29.4 Carbon Summary Card

Displays:

Current Carbon Score

Reduction Percentage

Impact Level

Improvement Goal

Visualization:

Progress Ring

+

Metric Animation
29.5 AI Recommendation Panel

Purpose:

Display personalized suggestions.

Component:

AIRecommendationCard

Content:

Current Problem

AI Suggestion

Expected Impact

Action Button
30. Carbon Blueprint Frontend Architecture
30.1 Overview

Carbon Blueprint allows users to calculate and understand their environmental impact.

30.2 Carbon Page Structure
Carbon Blueprint

│

├── Input Form

│

├── Calculation Result

│

├── Impact Breakdown

│

├── Historical Data

│

└── Improvement Plan
30.3 Carbon Input System

Input categories:

Transportation

Energy

Food

Waste

Lifestyle

Components:

CarbonInputCard

Slider

Dropdown

SelectionButton
30.4 Carbon Result Visualization

Display:

Total Emission

Category Contribution

Comparison

Future Target

Charts:

Line Chart

Bar Chart

Donut Chart
30.5 AI Improvement Plan Interface

Flow:

Carbon Result

↓

AI Analysis

↓

Personal Plan

↓

User Actions
31. AI Eco Coach Frontend Architecture
31.1 Overview

The AI Eco Coach provides conversational sustainability assistance.

31.2 Chat Interface Structure
AI Coach Page

│

├── Conversation Area

│

├── Message Components

│

├── Input Box

│

└── Suggested Actions
31.3 Message Component

Types:

User Message

AI Response

Recommendation Card

Action Card
31.4 AI Interaction Flow
User Input

↓

Frontend Request

↓

AI Service

↓

Response Processing

↓

UI Update
31.5 AI Loading Experience

While processing:

Typing Animation

Loading Indicator

Progress Feedback
32. Challenge System Frontend Architecture
32.1 Overview

The challenge system creates engagement through sustainability actions.

32.2 Challenge Page Structure
Challenges

│

├── Active Challenges

│

├── Completed Challenges

│

├── Rewards

│

└── Leaderboard
32.3 Challenge Card

Displays:

Challenge Title

Difficulty

Reward Points

Progress

Action Button
32.4 Challenge Completion Flow
Select Challenge

↓

Complete Action

↓

Upload Evidence

↓

AI Verification

↓

Reward Display
33. Frontend Navigation Architecture
33.1 Desktop Navigation

Contains:

Dashboard

Carbon

Coach

Challenges

Ecosystem

Profile
33.2 Mobile Navigation

Optimized for:

Quick Access

Thumb Interaction

Reduced Complexity
33.3 Navigation State

Handles:

Active Route

Loading State

Permission Access

User Role
Part 4 Completion Criteria

Before moving to Part 5:

✓ Landing page architecture defined

✓ Dashboard structure completed

✓ Carbon UI planned

✓ AI Coach interface designed

✓ Challenge frontend architecture completed

✓ Navigation system defined
End of Part 4

End of Part 4
34. Frontend State Management Architecture
34.1 Overview

EcoNexus requires a structured state management system to handle:

User information
Sustainability data
AI interactions
Earth visualization state
Application preferences

The state architecture must avoid unnecessary complexity while supporting future scalability.

34.2 State Management Philosophy

The application follows a layered state approach.

Architecture:

Server State

↓

Global Application State

↓

Feature State

↓

Component Local State
34.3 State Categories
Server State

Data managed from backend systems.

Examples:

User Profile

Carbon Records

Challenges

Organization Data

AI History

Management:

API Layer

+

Data Fetching Hooks
Global Application State

Shared throughout the application.

Examples:

Authentication Status

Theme Preference

Navigation State

Earth Visualization Settings
Feature State

Specific to modules.

Examples:

Carbon Calculator Inputs

AI Chat Session

Challenge Progress
Component State

Temporary UI state.

Examples:

Modal Open

Form Input

Animation Status
35. Zustand Store Architecture
35.1 Store Selection

EcoNexus uses Zustand for lightweight global state management.

Advantages:

Simple API

Minimal Boilerplate

High Performance

React Integration
35.2 Store Structure

Recommended:

stores/

│

├── authStore.ts

├── userStore.ts

├── ecosystemStore.ts

├── themeStore.ts

└── challengeStore.ts
35.3 Authentication Store

Handles:

Current User

Session Status

Login State

Logout Actions

Example state:

User:

{

id,

name,

email,

role

}
35.4 Ecosystem Store

Controls Earth experience.

State:

Earth Rotation

Impact Level

Selected Region

Particle Data

Camera Mode
35.5 Theme Store

Controls:

Dark Mode

Animation Preference

Display Settings
36. API Integration Architecture
36.1 Overview

The frontend communicates with backend services through a centralized API layer.

Architecture:

React Component

↓

Custom Hook

↓

API Service

↓

Backend

↓

Database / AI Service
36.2 Service Layer Structure
services/

│

├── auth.service.ts

├── carbon.service.ts

├── ai.service.ts

├── challenge.service.ts

└── organization.service.ts
36.3 API Client Configuration

Central client handles:

Base URL

Authentication Headers

Error Handling

Request Formatting
36.4 Carbon API Integration

Flow:

User Input

↓

Carbon Service

↓

Calculation API

↓

Result Processing

↓

Visualization Update
36.5 AI API Integration

Flow:

User Message

↓

AI Service

↓

Prompt Processing

↓

AI Provider

↓

Response Display
36.6 External API Integration

EcoNexus integrates:

Weather API

AQI API

Map Services

Reward Services
37. Authentication Frontend Implementation
37.1 Authentication Architecture

System:

User

↓

Login Interface

↓

Authentication Provider

↓

Session Storage

↓

Protected Routes
37.2 Protected Route System

Protected pages:

Dashboard

Carbon

Coach

Challenges

Organization

Flow:

Page Request

↓

Check Session

↓

Authenticated?

↓

Allow Access

OR

Redirect Login
37.3 Role-Based Access Control

Supported roles:

Individual User

Organization

NGO

Administrator

Permission example:

Organization Dashboard

↓

Organization Role Required
38. Error Handling Architecture
38.1 Error Management Philosophy

Errors must provide:

Clear feedback
Recovery options
Debug information
38.2 Error Categories
Network Errors

Examples:

API Timeout

Connection Failure

Server Error
Application Errors

Examples:

Invalid Input

Calculation Failure

Authentication Failure
Rendering Errors

Examples:

Three.js Failure

Component Crash

Asset Loading Error
38.3 Error Components

Create:

ErrorBoundary

ErrorPage

ErrorToast

FallbackComponent
38.4 User-Friendly Error Messages

Avoid:

500 Internal Server Error

Instead:

"We couldn't load your sustainability data. Please try again."
39. Loading State Architecture
39.1 Loading Philosophy

Loading states should maintain user engagement.

39.2 Loading Components

Examples:

Skeleton Cards

Progress Indicators

Animated Loaders

Earth Loading Scene
39.3 Page Loading

During navigation:

Route Change

↓

Loading State

↓

Page Render
39.4 Three.js Loading

Process:

Load Assets

↓

Display Progress

↓

Initialize Scene

↓

Render Earth
40. Frontend Testing Strategy
40.1 Testing Overview

Frontend testing ensures reliability across:

Components
Pages
User interactions
Visual experiences
40.2 Testing Layers
Unit Testing

↓

Component Testing

↓

Integration Testing

↓

End-to-End Testing

↓

Performance Testing
40.3 Component Testing

Test:

Rendering

Props

Events

State Changes

Example:

CarbonCard

Input:

Carbon Value


Expected:

Correct Display
40.4 End-to-End Testing

User journeys:

Registration

↓

Profile Creation

↓

Carbon Calculation

↓

Challenge Completion

↓

AI Interaction
40.5 Performance Testing

Measure:

Page Load Speed

FPS

Bundle Size

Memory Usage
40.6 Browser Compatibility

Support:

Chrome

Edge

Firefox

Safari
41. Frontend Deployment Checklist

Before release:

✓ Build Successful

✓ Environment Variables Configured

✓ Performance Tested

✓ Security Checked

✓ Responsive Verified

✓ Accessibility Tested

✓ Production Deployment Completed
42. Frontend Implementation Completion Summary

The EcoNexus frontend architecture now defines:

✓ Next.js Structure

✓ Component Architecture

✓ Design System

✓ Three.js Experience

✓ Page Implementation

✓ State Management

✓ API Layer

✓ Authentication

✓ Error Handling

✓ Testing Strategy
Final Status

Frontend engineering foundation is ready for implementation.

Next development document:

16-backend-implementation.md
End of Part 5

End of Part 5

Status: ✅ Complete