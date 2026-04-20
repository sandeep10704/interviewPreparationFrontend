# 🏗️ InterviewAI — Frontend Architecture Documentation

> **Project**: AI-Powered Interview Preparation Platform  
> **Stack**: React 19 · Vite 8 · Redux Toolkit · Tailwind CSS v4 · Firebase Auth  
> **Deployment**: Vercel  
> **Last Updated**: April 2026

---

## Table of Contents

1. [High-Level Architecture Overview](#1-high-level-architecture-overview)
2. [Folder Structure](#2-folder-structure)
3. [Major Folders & Responsibilities](#3-major-folders--responsibilities)
4. [Routing Structure](#4-routing-structure)
5. [State Management Flow (Redux)](#5-state-management-flow-redux)
6. [API Communication](#6-api-communication)
7. [Authentication Handling](#7-authentication-handling)
8. [UI Architecture](#8-ui-architecture)
9. [Performance Optimizations](#9-performance-optimizations)
10. [Deployment Details](#10-deployment-details)

---

## 1. High-Level Architecture Overview

InterviewAI is a single-page application (SPA) built with **React 19** and **Vite 8** as the build tool. It provides AI-powered interview preparation across three domains: **HR Interview**, **Technical Interview**, and **Coding Challenges** — each with both normal (REST) and real-time (WebSocket) modes.

### Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                         BROWSER                                  │
│                                                                  │
│  ┌────────────┐   ┌──────────────┐   ┌────────────────────────┐  │
│  │  React     │   │  React       │   │  Redux Toolkit         │  │
│  │  Router v7 │──▶│  Components  │──▶│  Store                 │  │
│  │  (SPA)     │   │  (JSX)       │   │  (14 Slices)           │  │
│  └────────────┘   └──────┬───────┘   └───────────┬────────────┘  │
│                          │                       │               │
│                          │    ┌──────────────────┘               │
│                          │    │                                  │
│                    ┌─────▼────▼─────┐                            │
│                    │  Tailwind CSS  │                            │
│                    │  v4 (Styling)  │                            │
│                    └────────────────┘                            │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │                   SERVICE LAYER                            │  │
│  │                                                            │  │
│  │  ┌─────────────┐   ┌──────────────┐   ┌───────────────┐   │  │
│  │  │  Axios      │   │  WebSocket   │   │  Firebase     │   │  │
│  │  │  (REST)     │   │  (Real-time) │   │  Auth SDK     │   │  │
│  │  └──────┬──────┘   └──────┬───────┘   └───────┬───────┘   │  │
│  └─────────┼────────────────┼────────────────────┼───────────┘  │
│            │                │                    │               │
└────────────┼────────────────┼────────────────────┼───────────────┘
             │                │                    │
             ▼                ▼                    ▼
┌─────────────────┐  ┌────────────────┐  ┌──────────────────┐
│  Vercel Backend │  │ Render Backend │  │ Firebase Console │
│  (REST API)     │  │ (WS + REST)   │  │ (Auth Provider)  │
│                 │  │               │  │                  │
│  • /coding/*    │  │ • /hr/*       │  │ • Google OAuth   │
│  • /technical/* │  │ • /coding/ws  │  │ • Email/Pass     │
│  • /user        │  │ • /feedback/* │  │ • Token Mgmt     │
│  • /resume/     │  │               │  │                  │
└─────────────────┘  └────────────────┘  └──────────────────┘

             ┌─────────────────────────┐
             │     Sarvam AI API       │
             │  (Text-to-Speech)       │
             │  • /text-to-speech      │
             └─────────────────────────┘
```

### Data Flow Overview

```
┌──────────┐     dispatch()     ┌──────────────┐    async thunks     ┌──────────┐
│          │ ──────────────────▶│              │ ──────────────────▶ │          │
│   UI     │                    │  Redux Store │                     │  APIs    │
│ (React)  │ ◀──────────────── │  (14 slices) │ ◀────────────────── │ (Backend)│
│          │   useSelector()    │              │    fulfilled/       │          │
└──────────┘                    └──────────────┘    rejected         └──────────┘
```

---

## 2. Folder Structure

```
interviewPreparationFrontend/
│
├── public/                          # Static assets served as-is
│   ├── favicon.svg
│   ├── icons.svg
│   ├── loginImage.png
│   └── logo.png
│
├── src/
│   ├── assets/                      # Imported assets (bundled by Vite)
│   │   ├── hero.png
│   │   ├── neural_interviewer_clean.png
│   │   ├── neural_interviewer_host.png
│   │   ├── react.svg
│   │   └── vite.svg
│   │
│   ├── Components/                  # All UI components
│   │   ├── Common/                  # Reusable design-system components
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── TermsModal.jsx
│   │   │   ├── Typography.jsx
│   │   │   ├── VoiceFloatingPlayer.jsx
│   │   │   └── index.js            # Barrel export
│   │   │
│   │   ├── Header/
│   │   │   ├── HeaderLayout.jsx     # Sticky navigation bar
│   │   │   ├── Common/
│   │   │   │   └── NavLink.jsx      # Pill-style nav link
│   │   │   └── Components/          # (Reserved for future)
│   │   │
│   │   ├── Body/
│   │   │   ├── BodyLayout.jsx       # Outlet wrapper
│   │   │   ├── Common/
│   │   │   │   ├── PageHeader.jsx
│   │   │   │   ├── PracticeModal.jsx
│   │   │   │   └── index.js
│   │   │   │
│   │   │   ├── Home/
│   │   │   │   ├── HomeLayout.jsx
│   │   │   │   └── Components/
│   │   │   │       ├── HeroSection.jsx
│   │   │   │       ├── CapabilitiesSection.jsx
│   │   │   │       ├── WhyChooseUsSection.jsx
│   │   │   │       ├── ResumeAnalysisSection.jsx
│   │   │   │       ├── FeatureCard.jsx
│   │   │   │       ├── FloatingCard.jsx
│   │   │   │       ├── ValueCard.jsx
│   │   │   │       └── HealthCheck.jsx
│   │   │   │
│   │   │   ├── Hr/
│   │   │   │   ├── HrLayout.jsx
│   │   │   │   ├── Components/
│   │   │   │   │   ├── GenerateHrCard.jsx
│   │   │   │   │   ├── HrHero.jsx
│   │   │   │   │   └── HrSetCard.jsx
│   │   │   │   ├── QuestionForm/
│   │   │   │   ├── OneQuestionForm/
│   │   │   │   ├── RealtimeQuestionForm/
│   │   │   │   └── RealtimeOneQuestionForm/
│   │   │   │
│   │   │   ├── Technical/
│   │   │   │   ├── TechnicalLayout.jsx
│   │   │   │   ├── Components/
│   │   │   │   │   ├── GenerateCard.jsx
│   │   │   │   │   ├── TechnicalHero.jsx
│   │   │   │   │   ├── SetCard.jsx
│   │   │   │   │   └── QuestionItem.jsx
│   │   │   │   ├── QuestionForm/
│   │   │   │   ├── OneQuestionForm/
│   │   │   │   ├── RealtimeQuestionForm/
│   │   │   │   └── RealtimeOneQuestionForm/
│   │   │   │
│   │   │   ├── Coding/
│   │   │   │   ├── CodingLayout.jsx
│   │   │   │   ├── Components/
│   │   │   │   │   ├── AIHeroSection.jsx
│   │   │   │   │   ├── ChallengeSetSelector.jsx
│   │   │   │   │   ├── GenerationConfigModal.jsx
│   │   │   │   │   ├── GenerationStatusModal.jsx
│   │   │   │   │   ├── ModeCard.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── Normal/
│   │   │   │   │   ├── NormalLayout.jsx
│   │   │   │   │   └── Components/
│   │   │   │   ├── Realtime/
│   │   │   │   │   ├── RealtimeLayout.jsx
│   │   │   │   │   └── Components/
│   │   │   │   └── Playground/
│   │   │   │       ├── PlaygroundLayout.jsx
│   │   │   │       └── Components/
│   │   │   │
│   │   │   └── Profile/
│   │   │       ├── ProfileLayout.jsx
│   │   │       └── Components/
│   │   │           ├── ProfileHeader.jsx
│   │   │           ├── ProfileAvatar.jsx
│   │   │           ├── Interviews.jsx
│   │   │           ├── Preferences.jsx
│   │   │           ├── Progress.jsx
│   │   │           └── ResumeInfo.jsx
│   │   │
│   │   └── Footer/
│   │       ├── FooterLayout.jsx
│   │       ├── Common/
│   │       │   └── FooterLink.jsx
│   │       └── Components/          # (Reserved for future)
│   │
│   ├── Pages/                       # Auth pages (outside main layout)
│   │   ├── Login.jsx
│   │   └── Singup.jsx
│   │
│   ├── store/                       # Redux Toolkit state management
│   │   ├── index.js                 # Store configuration (14 reducers)
│   │   ├── authSlice.js             # Firebase auth (Google + Email)
│   │   ├── userSlice.js             # Backend user profile CRUD
│   │   ├── hrSlice.js               # HR interview (REST)
│   │   ├── technicalSlice.js        # Technical interview (REST)
│   │   ├── technicalWsSlice.js      # Technical interview (WebSocket)
│   │   ├── codingSlice.js           # Coding editor (local state)
│   │   ├── codingSetSlice.js        # Coding sets CRUD
│   │   ├── codingQuestionSlice.js   # Coding question generation
│   │   ├── codingExecutionSlice.js  # Code run/submit via REST
│   │   ├── codingRealtimeSlice.js   # AI code suggestions (REST)
│   │   ├── codingWSSlice.js         # Coding challenges (WebSocket)
│   │   ├── playgroundSlice.js       # Free code playground
│   │   ├── fileUploadSlice.js       # Resume upload
│   │   └── sarvamSlice.js           # Sarvam AI TTS (voice)
│   │
│   ├── theme/                       # Design tokens
│   │   └── palette.js               # Color palette constants
│   │
│   ├── main.jsx                     # Application entry point
│   ├── App.jsx                      # Default Vite app (unused in routing)
│   ├── App.css                      # Default Vite styles
│   ├── Router.jsx                   # React Router v7 configuration
│   ├── Layout.jsx                   # Root layout (auth guard + shell)
│   ├── firebase.js                  # Firebase SDK initialization
│   └── index.css                    # Global styles + Tailwind theme
│
├── .env                             # Environment variables (VITE_*)
├── index.html                       # HTML entry point
├── vite.config.js                   # Vite + React + Tailwind plugins
├── package.json                     # Dependencies & scripts
├── eslint.config.js                 # Linting configuration
└── .gitignore
```

---

## 3. Major Folders & Responsibilities

### 3.1 `Components/`

The core UI layer organized by **layout region** and **feature domain**.

| Subfolder       | Responsibility                                                                                                 |
|-----------------|----------------------------------------------------------------------------------------------------------------|
| `Common/`       | **Design system primitives** — `Button`, `Input`, `Card`, `Typography`, `Modal`, `Loading`, `VoiceFloatingPlayer`. Exported via barrel `index.js`. Used across the entire app. |
| `Header/`       | **Sticky navigation** — Logo, nav pill links (Home, HR Prep, Technical, Coding), user avatar, login/logout actions. |
| `Footer/`       | **Page footer** — Copyright, Privacy/Terms/Contact links, Terms modal integration.                              |
| `Body/`         | **Feature content area** — Contains all feature domains below.                                                  |
| `Body/Home/`    | **Landing page** — HeroSection, CapabilitiesSection, WhyChooseUsSection, ResumeAnalysisSection.                 |
| `Body/Hr/`      | **HR interview module** — Question set generation, single-question mode, real-time AI interview mode.           |
| `Body/Technical/`| **Technical interview module** — Same 4-mode structure as HR (QuestionForm, OneQuestion, Realtime, RealtimeOne).|
| `Body/Coding/`  | **Coding challenges** — Three sub-modes: Normal (static), Realtime (AI-assisted with WebSocket), Playground (free sandbox). Integrates Monaco Editor. |
| `Body/Profile/` | **User profile** — Avatar, interview history, preferences, resume info, progress tracking.                      |

### 3.2 `Pages/`

Standalone full-screen pages that render **outside** the main Header/Footer layout:

| File           | Role                                                                     |
|----------------|--------------------------------------------------------------------------|
| `Login.jsx`    | Email + Google sign-in form with validation. Dispatches `loginWithEmail` / `loginWithGoogle` thunks. |
| `Singup.jsx`   | Registration form with email/password, confirm password, and Terms & Conditions acceptance.         |

### 3.3 `store/` (Redux — State Management)

All application state lives in **14 Redux Toolkit slices**, each owning a specific domain. API calls are embedded as `createAsyncThunk` actions within the slices (no separate `services/` folder).

| Slice File                | Store Key          | Purpose                                        |
|---------------------------|--------------------|-------------------------------------------------|
| `authSlice.js`            | `auth`             | Firebase authentication (Google, Email, Signup, Logout). Persists user + token to `localStorage`/`sessionStorage`. |
| `userSlice.js`            | `user`             | Backend user profile (GET / PUT via REST).       |
| `hrSlice.js`              | `hr`               | HR question generation, answer submission, feedback retrieval via REST. |
| `technicalSlice.js`       | `technical`        | Technical sets CRUD, question generation, answer submission via REST. |
| `technicalWsSlice.js`     | `technicalWs`      | Technical interview WebSocket (connect, send, disconnect). Uses `CustomEvent` bridge. |
| `codingSlice.js`          | `coding`           | Local coding editor state (code, language, navigation). |
| `codingSetSlice.js`       | `codingSets`       | Coding sets CRUD, per-question code storage, run/submit (local). |
| `codingQuestionSlice.js`  | `codingQuestions`   | AI-powered coding question generation via REST.  |
| `codingExecutionSlice.js` | `codingExecution`   | Remote code execution (Run + Submit) via REST.   |
| `codingRealtimeSlice.js`  | `codingRealtime`    | AI code suggestions via REST.                    |
| `codingWSSlice.js`        | `codingWS`          | Coding WebSocket (connect, start, typing, suggest, run, disconnect). Auto-speaks AI responses via Sarvam. |
| `playgroundSlice.js`      | `playground`        | Free playground code execution via REST.         |
| `fileUploadSlice.js`      | `fileUpload`        | Resume file upload via REST (multipart/form-data).|
| `sarvamSlice.js`          | `sarvam`            | Sarvam AI Text-to-Speech integration. Returns base64 WAV audio. |

### 3.4 `theme/`

Contains `palette.js` — a JavaScript export of the color palette constants used as a reference for the Tailwind CSS theme configuration.

```
Key Colors:
├── Background:  #09121f (deep navy)
├── Card:        #0d2036 (dark blue)
├── Accent:      #32d0c8 (teal / cyan)
├── Text:        #e5eff8 (light blue-white)
├── Error:       #ef4444 (red)
└── Border:      #1e3250 (muted blue)
```

### 3.5 `firebase.js`

Firebase SDK initialization. Exports:
- `auth` — Firebase Auth instance
- `googleProvider` — `GoogleAuthProvider` instance

All configuration is loaded from `VITE_FIREBASE_*` environment variables.

---

## 4. Routing Structure

The app uses **React Router v7** with `createBrowserRouter` and `lazy()` imports for code splitting.

### Route Tree Diagram

```
/                              ─┐
│  Layout.jsx                   │  Auth guard + Header/Footer shell
│                               │
├── /                           │  BodyLayout (Outlet wrapper)
│   ├── (index)                 │  → HomeLayout
│   │                           │
│   ├── /profile                │  → ProfileLayout
│   │                           │
│   ├── /hr                     │  → HrLayout (Outlet)
│   │   ├── /:setId/question-form    → HrQuestionForm
│   │   ├── /:setId/one-question     → HrOneQuestion
│   │   ├── /:setId/realtime         → HrRealtime ★
│   │   └── /:setId/realtime-one     → HrRealtimeOne ★
│   │                           │
│   ├── /technical              │  → TechnicalLayout (Outlet)
│   │   ├── /:setId/question-form    → TechQuestionForm
│   │   ├── /:setId/one-question     → TechOneQuestion
│   │   ├── /:setId/realtime         → TechRealtime ★
│   │   └── /:setId/realtime-one     → TechRealtimeOne ★
│   │                           │
│   ├── /coding                 │  → CodingLayout
│   ├── /coding/normal/:setId   │  → NormalLayout
│   ├── /coding/realtime/:setId │  → RealtimeLayout ★
│   └── /coding/playground      │  → PlaygroundLayout ★
│                               │
├── /login                      │  → Login (full-screen, no shell)
└── /signup                     │  → Signup (full-screen, no shell)
                               ─┘

★ = Routes where Header/Footer are hidden (immersive experience)
```

### Route Protection Logic (`Layout.jsx`)

```
┌──────────────────────────────────────────────────┐
│                   Layout.jsx                      │
│                                                   │
│  1. Firebase onIdTokenChanged listener            │
│     → Auto-refreshes token + syncs Redux state    │
│                                                   │
│  2. Public Routes Check:                          │
│     ┌─────────────────────────────┐               │
│     │ /  │ /login │ /signup       │               │
│     │ /coding/playground          │               │
│     └─────────────────────────────┘               │
│     If NOT public AND NOT authenticated:          │
│     → Navigate to /login                          │
│                                                   │
│  3. Layout Visibility Check:                      │
│     If pathname includes:                         │
│     /login, /signup, /realtime,                   │
│     /realtime-one, /playground                    │
│     → Render <Outlet /> only (no Header/Footer)   │
│     Otherwise:                                    │
│     → Render Header + <Outlet /> + Footer         │
│                                                   │
│  4. Always renders:                               │
│     → VoiceFloatingPlayer (Sarvam TTS overlay)    │
└──────────────────────────────────────────────────┘
```

---

## 5. State Management Flow (Redux)

### 5.1 Store Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    Redux Store                            │
│                configureStore()                           │
│                                                          │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ AUTH & USER                                          │ │
│  │  ┌──────────────┐  ┌──────────────┐                 │ │
│  │  │ auth         │  │ user         │                 │ │
│  │  │ • user       │  │ • user       │                 │ │
│  │  │ • isAuth     │  │ • loading    │                 │ │
│  │  │ • loading    │  │ • updating   │                 │ │
│  │  │ • error      │  │ • error      │                 │ │
│  │  └──────────────┘  └──────────────┘                 │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ INTERVIEW MODULES                                    │ │
│  │  ┌──────────────┐  ┌──────────────┐                 │ │
│  │  │ hr           │  │ technical    │                 │ │
│  │  │ • selectedSet│  │ • sets       │                 │ │
│  │  │ • evaluation │  │ • selectedSet│                 │ │
│  │  │ • loading    │  │ • evaluation │                 │ │
│  │  │ • generating │  │ • loading    │                 │ │
│  │  │ • error      │  │ • generating │                 │ │
│  │  └──────────────┘  │ • error      │                 │ │
│  │                     └──────────────┘                 │ │
│  │  ┌──────────────┐                                   │ │
│  │  │ technicalWs  │  (WebSocket state)                │ │
│  │  │ • socket     │                                   │ │
│  │  │ • connected  │                                   │ │
│  │  │ • messages   │                                   │ │
│  │  └──────────────┘                                   │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ CODING MODULE                                        │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │ │
│  │  │ coding       │  │ codingSets   │  │ codingQ    │ │ │
│  │  │ • code       │  │ • data       │  │ • generating││ │
│  │  │ • language   │  │ • selectedSet│  │ • setId    │ │ │
│  │  │ • results    │  │ • codesByQ   │  │ • status   │ │ │
│  │  │ • currentIdx │  │ • currentIdx │  │ • error    │ │ │
│  │  └──────────────┘  └──────────────┘  └────────────┘ │ │
│  │                                                      │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │ │
│  │  │ codingExec   │  │ codingRT     │  │ codingWS   │ │ │
│  │  │ • runResult  │  │ • suggestion │  │ • connected│ │ │
│  │  │ • submitRes  │  │ • loading    │  │ • messages │ │ │
│  │  │ • runLoading │  │ • error      │  │ • hint     │ │ │
│  │  │ • submitLoad │  │              │  │ • testRes  │ │ │
│  │  └──────────────┘  └──────────────┘  └────────────┘ │ │
│  │                                                      │ │
│  │  ┌──────────────┐                                   │ │
│  │  │ playground   │                                   │ │
│  │  │ • result     │                                   │ │
│  │  │ • loading    │                                   │ │
│  │  └──────────────┘                                   │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ UTILITIES                                            │ │
│  │  ┌──────────────┐  ┌──────────────┐                 │ │
│  │  │ fileUpload   │  │ sarvam       │                 │ │
│  │  │ • data       │  │ • isPlaying  │                 │ │
│  │  │ • loading    │  │ • audioUrl   │                 │ │
│  │  │ • error      │  │ • text       │                 │ │
│  │  └──────────────┘  └──────────────┘                 │ │
│  └──────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

### 5.2 Redux Data Flow

The app follows the standard **Redux Toolkit** pattern with `createAsyncThunk` for side effects:

```
 USER ACTION                    ASYNC THUNK              REDUCER                 UI UPDATE
 ──────────                     ───────────              ───────                 ─────────

 Click "Generate              dispatch(                 .pending:               Loading
 Questions"                   generateTechnicalQ())     → generating: true      spinner
       │                           │                           │                  shows
       │                           │                           │
       │                           ▼                           │
       │                    Axios GET request                  │
       │                    to /technical/questions             │
       │                           │                           │
       │                     ┌─────┴──────┐                    │
       │                     │            │                    │
       │                  Success       Failure                │
       │                     │            │                    │
       │                     ▼            ▼                    │
       │               .fulfilled:   .rejected:                │
       │               → generating  → generating              │
       │                 = false       = false                 │
       │               → selectedSet → error                   │
       │                 = payload     = payload               │
       │                     │            │                    │
       │                     ▼            ▼                    │
       └──────────────── useSelector() re-renders ────────────┘
                         component with new state
```

### 5.3 Slice Communication Pattern

Some slices interact with each other through **thunk middleware**:

```
codingWSSlice (WebSocket message received)
      │
      ├── dispatch(addMessage({ role: "ai", text }))     → codingWSSlice
      ├── dispatch(stopVoice())                           → sarvamSlice
      └── dispatch(speakSarvam(cleanText))                → sarvamSlice
                                                             │
                                                             ▼
                                                    Sarvam API call
                                                    → base64 audio
                                                    → VoiceFloatingPlayer plays
```

---

## 6. API Communication

### 6.1 REST API Handling

All REST API calls are made using **Axios** within `createAsyncThunk` actions. There is no separate `services/` directory — API logic is co-located within each Redux slice.

#### API Endpoints Map

| Backend Service | Base URL | Endpoints |
|----------------|----------|-----------|
| **Vercel Backend** | `https://ai-interview-preparation-three.vercel.app` | `/technical/sets`, `/technical/questions`, `/technical/sets/:id`, `/technical/answers`, `/coding/sets`, `/coding/sets/:id`, `/coding/questions`, `/coding/run`, `/coding/submit`, `/coding/suggestions`, `/coding/playground`, `/user`, `/resume/` |
| **Render Backend** | `https://aiinterviewpreparation.onrender.com` | `/hr/questions`, `/hr/answers`, `/feedback/:sessionId` |
| **Sarvam AI** | `https://api.sarvam.ai` | `/text-to-speech` |

#### Authentication Header Pattern

Every authenticated API call follows this pattern:

```
 ┌────────────────────────────────────────────────────────────┐
 │  Token Retrieval Strategy (Cascading Fallback)             │
 │                                                            │
 │  1. state.auth.user.token       (Redux store — primary)    │
 │          │                                                 │
 │          ▼ (if null)                                       │
 │  2. sessionStorage["token"]     (Session — fallback)       │
 │          │                                                 │
 │          ▼ (if null)                                       │
 │  3. localStorage["user"].token  (Persistent — last resort) │
 │          │                                                 │
 │          ▼                                                 │
 │  4. auth.currentUser.getIdToken()  (Fresh from Firebase)   │
 │                                                            │
 │  → Used as: Authorization: Bearer <token>                  │
 └────────────────────────────────────────────────────────────┘
```

### 6.2 WebSocket Integration

The application uses **native WebSocket** for real-time features across two modules:

#### Technical Interview WebSocket (`technicalWsSlice.js`)

```
 ┌─────────────────────────────────────────────────────────────┐
 │  Technical WebSocket                                        │
 │                                                             │
 │  URL: ws://127.0.0.1:8000/technical/ws?token=<JWT>          │
 │                                                             │
 │  ┌──────────┐                        ┌──────────────────┐   │
 │  │ Frontend │  ── sendMessage() ───▶  │ Backend WS       │   │
 │  │          │     { technical_set_id, │ Server            │   │
 │  │          │       question_no,      │                   │   │
 │  │          │       answer }          │                   │   │
 │  │          │                         │                   │   │
 │  │          │  ◀── onmessage ──────── │                   │   │
 │  │          │     CustomEvent         │                   │   │
 │  │          │     "ws_message"        │                   │   │
 │  └──────────┘                        └──────────────────┘   │
 │                                                             │
 │  Note: Uses window.dispatchEvent(CustomEvent) bridge        │
 │        to propagate messages outside Redux                  │
 └─────────────────────────────────────────────────────────────┘
```

#### Coding WebSocket (`codingWSSlice.js`)

```
 ┌─────────────────────────────────────────────────────────────┐
 │  Coding WebSocket                                           │
 │                                                             │
 │  URL: wss://aiinterviewpreparation.onrender.com/            │
 │       coding/ws?token=<JWT>                                 │
 │                                                             │
 │  Message Types (Client → Server):                           │
 │  ┌─────────────────────────────────────────────────────┐    │
 │  │ { type: "start",   coding_set_id, question_no }     │    │
 │  │ { type: "typing",  coding_set_id, question_no, code}│    │
 │  │ { type: "suggest", coding_set_id, question_no, code}│    │
 │  │ { type: "run",     coding_set_id, question_no, code}│    │
 │  └─────────────────────────────────────────────────────┘    │
 │                                                             │
 │  Message Types (Server → Client):                           │
 │  ┌─────────────────────────────────────────────────────┐    │
 │  │ { type: "explanation", message: "..." }              │    │
 │  │ { type: "hint",  hint: "...", test_result: {...} }   │    │
 │  │ { type: "error", message: "..." }                    │    │
 │  └─────────────────────────────────────────────────────┘    │
 │                                                             │
 │  Auto Typing: Sends code every 5 minutes via setInterval    │
 │  Voice:       All AI messages auto-spoken via Sarvam TTS    │
 └─────────────────────────────────────────────────────────────┘
```

---

## 7. Authentication Handling

### 7.1 Firebase Auth Configuration

```
 ┌─────────────────────────────────────────────────────────────┐
 │                   firebase.js                                │
 │                                                              │
 │  initializeApp(firebaseConfig)                               │
 │       │                                                      │
 │       ├── getAuth(app)          → export const auth          │
 │       └── GoogleAuthProvider()  → export const googleProvider│
 │                                                              │
 │  Config loaded from:                                         │
 │  ├── VITE_FIREBASE_API_KEY                                   │
 │  ├── VITE_FIREBASE_AUTH_DOMAIN                               │
 │  ├── VITE_FIREBASE_PROJECT_ID                                │
 │  ├── VITE_FIREBASE_STORAGE_BUCKET                            │
 │  ├── VITE_FIREBASE_MESSAGING_SENDER_ID                       │
 │  ├── VITE_FIREBASE_APP_ID                                    │
 │  └── VITE_FIREBASE_MEASUREMENT_ID                            │
 └─────────────────────────────────────────────────────────────┘
```

### 7.2 Supported Auth Methods

| Method | Implementation | Redux Thunk |
|--------|---------------|-------------|
| **Email/Password Login** | `signInWithEmailAndPassword()` | `loginWithEmail` |
| **Google OAuth Login** | `signInWithPopup()` with `GoogleAuthProvider` | `loginWithGoogle` |
| **Email/Password Signup** | `createUserWithEmailAndPassword()` | `signup` |
| **Logout** | `signOut()` | `logout` |

### 7.3 Token Storage & Refresh Flow

```
 ┌─────────────────────────────────────────────────────────────────┐
 │                    Token Lifecycle                               │
 │                                                                 │
 │  LOGIN / SIGNUP                                                 │
 │  ──────────────                                                 │
 │  1. Firebase Auth returns User object                           │
 │  2. user.getIdToken() → JWT token                               │
 │  3. Serialized user stored:                                     │
 │     ├── Redux store → state.auth.user                           │
 │     ├── localStorage → "user" (JSON stringified)                │
 │     └── sessionStorage → "token" (raw JWT)                      │
 │                                                                 │
 │  AUTO-REFRESH (Layout.jsx)                                      │
 │  ─────────────────────────                                      │
 │  onIdTokenChanged(auth, callback)                               │
 │     │                                                           │
 │     ├── User exists → getIdToken() → dispatch(setUser())        │
 │     │   (Automatically refreshes expired tokens)                │
 │     │                                                           │
 │     └── User null → dispatch(setUser(null))                     │
 │         (Clears all stored data)                                │
 │                                                                 │
 │  LOGOUT                                                         │
 │  ──────                                                         │
 │  1. signOut(auth)                                               │
 │  2. Redux → user: null, isAuthenticated: false                  │
 │  3. localStorage.removeItem("user")                             │
 │  4. sessionStorage.removeItem("token")                          │
 └─────────────────────────────────────────────────────────────────┘
```

### 7.4 Route Protection

```
 ┌───────────────┐      ┌─────────────────┐      ┌───────────────┐
 │  User visits   │ ───▶ │  Layout.jsx      │ ───▶ │  Render page   │
 │  a route       │      │  checks auth     │      │  or redirect   │
 └───────────────┘      └─────────────────┘      └───────────────┘

 Public Routes (no auth required):
 ┌────────────────────────────────────┐
 │  /  •  /login  •  /signup          │
 │  /coding/playground                │
 └────────────────────────────────────┘

 All other routes:
 → If !user → <Navigate to="/login" replace />
```

---

## 8. UI Architecture

### 8.1 Tailwind CSS v4 Strategy

The project uses **Tailwind CSS v4** with the new `@theme` directive (post-config era):

```
 ┌──────────────────────────────────────────────────────┐
 │                   index.css                          │
 │                                                      │
 │  @import "tailwindcss";    ← Core import             │
 │                                                      │
 │  @theme {                  ← Design Tokens           │
 │    --color-background:  #09121f                      │
 │    --color-card:        #0d2036                      │
 │    --color-accent-main: #32d0c8                      │
 │    --color-text-main:   #e5eff8                      │
 │    --color-error:       #ef4444                      │
 │    ... (17 custom properties)                        │
 │                                                      │
 │    --font-sans:    "Plus Jakarta Sans"               │
 │    --font-heading: "Sora"                            │
 │    --font-mono:    ui-monospace, SFMono-Regular, ...  │
 │                                                      │
 │    --shadow-custom: ...                              │
 │  }                                                   │
 │                                                      │
 │  @layer base {             ← Global resets + styles  │
 │  @layer utilities {        ← Custom animations       │
 └──────────────────────────────────────────────────────┘
```

#### Usage Pattern in Components

Tailwind classes reference custom theme tokens directly:

```
 bg-background         → #09121f
 bg-card               → #0d2036
 text-text-main        → #e5eff8
 text-accent-main      → #32d0c8
 border-border-main    → #1e3250
 bg-accent-bg          → rgba(50, 208, 200, 0.16)
 text-error            → #ef4444
 font-sans             → "Plus Jakarta Sans"
```

### 8.2 Reusable Component Design

```
 ┌─────────────────────────────────────────────────────────────────┐
 │                 Components/Common/ (Design System)              │
 │                                                                 │
 │  ┌─────────────────────────────────────────────────────────┐    │
 │  │ Button.jsx                                               │    │
 │  │ ─────────                                                │    │
 │  │ Props: variant, size, isLoading, leftIcon, rightIcon     │    │
 │  │ Variants: primary │ secondary │ outline │ ghost │        │    │
 │  │           danger  │ google                               │    │
 │  │ Sizes:    sm │ md │ lg                                   │    │
 │  │ Features: Loading spinner, icon slots, scale animation   │    │
 │  └─────────────────────────────────────────────────────────┘    │
 │                                                                 │
 │  ┌─────────────────────────────────────────────────────────┐    │
 │  │ Input.jsx                                                │    │
 │  │ ─────────                                                │    │
 │  │ Props: label, error, leftIcon, rightIcon                 │    │
 │  │ Features: Focus ring, error state, icon slots            │    │
 │  └─────────────────────────────────────────────────────────┘    │
 │                                                                 │
 │  ┌─────────────────────────────────────────────────────────┐    │
 │  │ Typography.jsx                                           │    │
 │  │ ──────────────                                           │    │
 │  │ Props: variant, as (override tag)                        │    │
 │  │ Variants: h1 │ h2 │ h3 │ body │ bodySmall │ label │ error│   │
 │  │ Auto-selects HTML tag based on variant                   │    │
 │  └─────────────────────────────────────────────────────────┘    │
 │                                                                 │
 │  ┌─────────────────────────────────────────────────────────┐    │
 │  │ Card.jsx                                                 │    │
 │  │ ────────                                                 │    │
 │  │ Styled container: bg-card, border, rounded, shadow       │    │
 │  └─────────────────────────────────────────────────────────┘    │
 │                                                                 │
 │  ┌─────────────────────────────────────────────────────────┐    │
 │  │ Modal.jsx                                                │    │
 │  │ ─────────                                                │    │
 │  │ Uses React Portal (createPortal to document.body)        │    │
 │  │ Features: Backdrop blur, scroll lock, slide-up animation │    │
 │  └─────────────────────────────────────────────────────────┘    │
 │                                                                 │
 │  ┌─────────────────────────────────────────────────────────┐    │
 │  │ Loading.jsx                                              │    │
 │  │ ───────────                                              │    │
 │  │ Full-screen overlay with CSS neural-core animation       │    │
 │  │ Animated orbiting dots, pulse rings, bouncing bars       │    │
 │  │ No external animation library dependencies               │    │
 │  └─────────────────────────────────────────────────────────┘    │
 │                                                                 │
 │  ┌─────────────────────────────────────────────────────────┐    │
 │  │ VoiceFloatingPlayer.jsx                                  │    │
 │  │ ───────────────────────                                  │    │
 │  │ Fixed-position floating widget (bottom-right)            │    │
 │  │ Plays Sarvam TTS audio with typewriter subtitle effect   │    │
 │  │ Auto-hides when not playing                              │    │
 │  └─────────────────────────────────────────────────────────┘    │
 └─────────────────────────────────────────────────────────────────┘

 Barrel Export (index.js):
 ┌──────────────────────────────────────────────────┐
 │ export { Button, Typography, Input, Card,        │
 │          Loading, Modal, TermsModal }             │
 │                                                   │
 │ Usage: import { Button, Input } from '../Common'  │
 └──────────────────────────────────────────────────┘
```

### 8.3 Custom Animations

| Animation Class     | Effect                                      | Duration |
|---------------------|---------------------------------------------|----------|
| `animate-float`     | Gentle vertical bobbing                     | 3s loop  |
| `animate-slideUp`   | Slide up from 40px below with fade          | 0.6s     |
| `animate-fadeIn`    | Simple opacity fade                         | 0.8s     |
| `animate-pop`       | Scale from 0.8 to 1.0 with fade            | 0.4s     |
| `animate-fade-in`   | Slide up 10px + fade (Tailwind layer)       | 0.8s     |
| `animate-float-delayed` | Float with 2s delay                    | 6s loop  |

---

## 9. Performance Optimizations

### 9.1 Lazy Loading & Code Splitting

Every route-level component is loaded using React `lazy()` with a `Suspense` wrapper:

```
 ┌──────────────────────────────────────────────────────────────┐
 │                   Router.jsx                                 │
 │                                                              │
 │  const HomeLayout = lazy(() =>                               │
 │    import("./Components/Body/Home/HomeLayout")               │
 │  );                                                          │
 │                                                              │
 │  const suspenseWrapper = (element) => (                      │
 │    <Suspense fallback={<Loading />}>                         │
 │      {element}                                               │
 │    </Suspense>                                               │
 │  );                                                          │
 │                                                              │
 │  Lazy-loaded components (22 total):                          │
 │  ├── BodyLayout                                              │
 │  ├── HomeLayout                                              │
 │  ├── HrLayout                                                │
 │  ├── HrQuestionForm, HrOneQuestion                           │
 │  ├── HrRealtime, HrRealtimeOne                               │
 │  ├── TechnicalLayout                                         │
 │  ├── TechQuestionForm, TechOneQuestion                       │
 │  ├── TechRealtime, TechRealtimeOne                           │
 │  ├── CodingLayout                                            │
 │  ├── NormalLayout, RealtimeLayout, PlaygroundLayout           │
 │  ├── ProfileLayout                                           │
 │  ├── Login, Signup                                           │
 │  └── → Each generates a separate chunk at build time         │
 └──────────────────────────────────────────────────────────────┘
```

### 9.2 Bundle Optimization via Vite

```
 ┌──────────────────────────────────────────┐
 │             vite.config.js               │
 │                                          │
 │  plugins: [                              │
 │    react()        → React JSX transform  │
 │    tailwindcss()  → PostCSS at build     │
 │  ]                                       │
 │                                          │
 │  Vite provides:                          │
 │  • ESBuild for dev (fast HMR)            │
 │  • Rollup for prod (tree-shaking)        │
 │  • Automatic chunk splitting             │
 │  • CSS extraction & minification         │
 │  • Asset hashing for cache busting       │
 └──────────────────────────────────────────┘
```

### 9.3 Other Optimizations

| Optimization | Implementation |
|-------------|----------------|
| **Font Loading** | Google Fonts loaded via `@import url()` with `display=swap` for FOUT prevention |
| **Image Assets** | Static images served from `/public` (no bundling overhead); dynamic images in `/src/assets` (Vite-optimized) |
| **Selective Footer** | Footer hidden on `/coding/*` routes to maximize editor viewport |
| **Layout Stripping** | Full Header/Footer shell removed on immersive routes (realtime, playground) |
| **Monaco Editor** | Loaded via `@monaco-editor/react` package (lazy-loaded by React Router) |
| **WebSocket Connection** | Singleton pattern prevents duplicate connections |

---

## 10. Deployment Details

### 10.1 Vercel Setup

```
 ┌──────────────────────────────────────────────────────────────┐
 │                   Vercel Deployment                          │
 │                                                              │
 │  Framework Preset:  Vite                                     │
 │  Build Command:     vite build                               │
 │  Output Directory:  dist/                                    │
 │  Node Version:      18.x                                     │
 │                                                              │
 │  Build Pipeline:                                             │
 │  ┌────────────┐    ┌────────────────┐    ┌──────────────┐   │
 │  │ npm install │ ─▶ │ vite build     │ ─▶ │ Deploy dist/ │   │
 │  └────────────┘    └────────────────┘    └──────────────┘   │
 │                                                              │
 │  SPA Routing:                                                │
 │  Vercel auto-handles SPA routing for Vite projects.          │
 │  All routes fall back to index.html (client-side routing).   │
 └──────────────────────────────────────────────────────────────┘
```

### 10.2 Environment Variables

All environment variables use the `VITE_` prefix (required by Vite for client-side exposure):

| Variable | Purpose | Sensitivity |
|----------|---------|-------------|
| `VITE_FIREBASE_API_KEY` | Firebase project API key | Public (restricted by Firebase rules) |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth domain | Public |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project identifier | Public |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | Public |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | FCM sender ID | Public |
| `VITE_FIREBASE_APP_ID` | Firebase app ID | Public |
| `VITE_FIREBASE_MEASUREMENT_ID` | Google Analytics measurement ID | Public |
| `VITE_SARVAM_API_KEY` | Sarvam AI TTS API subscription key | **Sensitive** ⚠️ |

```
 ┌──────────────────────────────────────────────────────────────┐
 │  Environment Variable Flow                                   │
 │                                                              │
 │  .env (local dev)                                            │
 │    │                                                         │
 │    ▼                                                         │
 │  import.meta.env.VITE_*     (accessed at build time)         │
 │    │                                                         │
 │    ▼                                                         │
 │  Inlined into JavaScript    (at vite build)                  │
 │    │                                                         │
 │    ▼                                                         │
 │  Available in browser       (no server-side access)          │
 │                                                              │
 │  Vercel Dashboard:                                           │
 │  Settings → Environment Variables → Add all VITE_* keys      │
 │  (Set scope: Production / Preview / Development)             │
 └──────────────────────────────────────────────────────────────┘
```

> ⚠️ **Security Note**: The `VITE_SARVAM_API_KEY` is a sensitive API key exposed to the client-side. In production, this should ideally be proxied through a backend endpoint to avoid exposure.

### 10.3 Available Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `vite` | Start local dev server with HMR |
| `build` | `vite build` | Production build to `dist/` |
| `preview` | `vite preview` | Preview production build locally |
| `lint` | `eslint .` | Run ESLint checks |

---

## Dependencies Summary

### Production Dependencies

| Package | Version | Role |
|---------|---------|------|
| `react` | ^19.2.4 | UI library |
| `react-dom` | ^19.2.4 | DOM rendering |
| `react-router-dom` | ^7.14.0 | Client-side routing |
| `@reduxjs/toolkit` | ^2.11.2 | State management |
| `react-redux` | ^9.2.0 | React-Redux bindings |
| `redux-persist` | ^6.0.0 | State persistence (installed but not actively used in store config) |
| `axios` | ^1.14.0 | HTTP client |
| `firebase` | ^12.11.0 | Authentication SDK |
| `tailwindcss` | ^4.2.2 | Utility-first CSS framework |
| `@tailwindcss/vite` | ^4.2.2 | Tailwind CSS Vite plugin |
| `@monaco-editor/react` | ^4.7.0 | Code editor (Monaco) |
| `lucide-react` | ^1.8.0 | Icon library |
| `lottie-react` | ^2.4.1 | Lottie animations |

---

> **Document generated from source code analysis — no assumptions made.**  
> Every detail in this document is derived from actual files in the codebase.
