# Codeworks Academy — Nakuru Regional Hub
## Partner School & Web Development Education Management Platform

A multi-role school and coding education delivery portal built for managing coding tutors deployed across partner secondary schools in Nakuru County, Kenya. Built in alignment with the Kenyan Competency-Based Curriculum (CBC) framework with a dedicated focus on **Web Development** (HTML5, modern CSS layouts, and JavaScript DOM scripting).

---

## Architecture & Technical Overview

The application is structured as a production-quality single-page application using modern React and TypeScript best practices:

- **Component Design System**: Reusable, accessible UI components in `src/components/ui/` (`Button`, `DataTable`, `Dialog`, `StatCard`, `ChartCard`, `Badge`, `FormField`, `Select`, `Input`, `Textarea`, etc.) styled with a custom Forest Green design palette (`#174C3C`).
- **Feature-Driven Architecture**: Separation by domain boundaries (`src/features/admin/`, `src/features/tutor/`, `src/features/student/`), keeping business logic cohesive and decoupled.
- **Role-Based Navigation & Access**: Dedicated workspaces for **Admin**, **Tutor**, and **Student** roles with distinct navigation hierarchies, protected views, and context-aware headers.
- **Strict Typing**: Comprehensive domain interfaces in `src/types/index.ts` covering schools, tutors, students, lesson schedules, lesson reports, rubrics, submissions, and code reviews.
- **State Management & Data Persistence**: Centralized application context (`src/context/AppContext.tsx`) managing relational state with automatic browser `localStorage` persistence and quick persona toggling for testing.
- **Backend-Agnostic Service Layer**: Abstracted asynchronous API client (`src/services/apiClient.ts`) designed for seamless drop-in connection to a backend API (Express, NestJS, Django, or FastAPI) with PostgreSQL.

---

## Partner Schools & Curriculum Scope

The platform is localized for **Nakuru County, Kenya** under the **Kenyan CBC (Competency-Based Curriculum)**:

- **Partner Secondary Schools**:
  - **Nakuru High School** (Lanet Road, Nakuru) — 24 enrolled students
  - **Moi High School Kabarak** (Nakuru-Eldama Ravine Highway) — 18 enrolled students
  - **Menengai High School** (Kenyatta Avenue, Nakuru) — 16 enrolled students
  - **Greensteds International School** (Marula Lane, Nakuru) — 14 enrolled students
- **Education Level**: Junior Secondary (Grade 7–9) and Senior Secondary (Grade 10–12).
- **Academic Term**: Term 3 2026 (CBC Academic Calendar).
- **Curriculum Focus**: **Web Development**:
  - HTML5 semantic markup & accessibility standards
  - Responsive layout engineering (CSS Grid & Flexbox)
  - JavaScript DOM manipulation, event dispatching, and dynamic UI updates
  - Hands-on practical milestone projects (e.g., *Nakuru County Eco-Tourism Guide*, *Menengai Agri-Trade Web Directory*)

---

## User Roles & Key Capabilities

### 1. Admin Workspace (`Faith Muthoni`)
- **Executive Operations Dashboard**: Cross-school metrics, weekly lesson volume, tutor ratings, and urgent conflict alerts.
- **Faculty Management**: Tutor directory, school assignments, contact records, and instructor onboarding modal.
- **Partner School Directory**: Campus lab capacity tracking, principal/ICT coordinator contacts, and new school registration.
- **Student Roster**: Filterable roster across Nakuru schools and CBC grades, attendance indicators, and enrollment workflows.
- **Master Timetable & Scheduling**: Weekly session calendar with automated conflict prevention (detects tutor or school double-bookings).
- **Academic Performance & Competency**: County-wide averages across coding proficiency, problem solving, code quality, and collaboration.
- **Post-Lesson Compliance Reports**: Review and approval workflow for tutor field reports with CSV data export.

### 2. Tutor Workspace (`Dennis Kiprono`)
- **Instructor Dashboard**: Upcoming teaching sessions, pending student code submissions, and class feedback summary.
- **Assigned School Hubs**: Details on assigned institutions, lab venues (e.g., *Lanet Computer Lab 2*), and student counts.
- **Class Schedules**: Personal teaching timetable with session launch shortcuts.
- **Post-Lesson Field Reports**: Comprehensive reporting modal capturing topics covered, CBC competencies, attendance registers, and student formative ratings.
- **Code Review & Grading Workbench**: Side-by-side source code inspector with syntax formatting, 4-pillar rubric criteria scoring (25 points each = 100 max), qualitative feedback, and revision requests.
- **Institutional Ratings**: Verified feedback from school administrations and students.

### 3. Student Workspace (`Kevin Ochieng`)
- **Student Learning Dashboard**: Progress tracking across Web Development modules, attendance rate, and instructor feedback.
- **Class Timetable**: Schedule of upcoming coding sessions and lab locations at their school.
- **Milestone Project Submissions**: Assignment briefs, rubric breakdown, and code submission editor with live preview links.
- **Instructor Code Reviews**: Rubric score cards, tutor commendations, targeted improvement suggestions, and inspected code with inline annotations.
- **Academic Profile**: Enrolled course details, CBC grade, and guardian contact records.

---

## Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | React 19 (`react`, `react-dom`) |
| **Language** | TypeScript (Strict Mode) |
| **Build Tool** | Vite 8 |
| **Routing** | React Router 7 (`react-router-dom`) |
| **Styling** | Tailwind CSS with customized typography & tokens |
| **Icons** | Lucide React |
| **Visualizations** | Recharts (Area charts, Bar charts, Radar competency charts) |
| **Forms & Validation** | React Hook Form & Zod |

---

## Directory Structure

```text
src/
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx            # Main shell with responsive sidebar and topbar
│   │   ├── Sidebar.tsx             # Role-specific navigation links
│   │   ├── Topbar.tsx              # Quick actions, notifications, and profile menu
│   │   └── NotificationPanel.tsx   # Dropdown notification center
│   └── ui/
│       ├── Avatar.tsx              # Accessible avatar with fallback initials
│       ├── Badge.tsx               # Semantic color badges and status chips
│       ├── Button.tsx              # Button with variants, loading spinners, and icons
│       ├── ChartCard.tsx           # Accessible Recharts container
│       ├── ConfirmDialog.tsx       # Action confirmation modal
│       ├── DataTable.tsx           # Responsive table with interactive rows
│       ├── Dialog.tsx              # Accessible modal with keyboard trap
│       ├── EmptyState.tsx          # Zero-data state placeholder
│       ├── FilterBar.tsx           # Multi-criteria filter container
│       ├── FormField.tsx           # Form input wrapper with labels and hints
│       ├── Input.tsx               # Styled input with prefix/suffix icons
│       ├── LoadingSkeleton.tsx     # Skeleton pulses for loading states
│       ├── PageHeader.tsx          # Standardized header with title and actions
│       ├── Pagination.tsx          # Numerical pagination controls
│       ├── SearchBar.tsx           # Search input with clear trigger
│       ├── Select.tsx              # Form select dropdown
│       ├── StatCard.tsx            # KPI metric cards with trend indicators
│       └── Textarea.tsx            # Multiline text input
├── context/
│   └── AppContext.tsx              # Application state store & role switching
├── features/
│   ├── admin/                      # Admin workspace feature modules
│   ├── tutor/                      # Tutor workspace feature modules
│   └── student/                    # Student workspace feature modules
├── lib/
│   └── utils.ts                    # Utility functions (cn class merger, date formatting)
├── mocks/
│   └── data.ts                     # Localized relational seed dataset
├── routes/
│   └── index.tsx                   # Centralized application routing table
├── services/
│   └── apiClient.ts                # Asynchronous API service layer
├── types/
│   └── index.ts                    # Strict TypeScript domain interfaces
├── App.tsx                         # Root app component
├── index.css                       # Design tokens and theme styling
└── main.tsx                        # React application entry point
```

---

## Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher

### Installation & Execution

1. Navigate to the project directory:
   ```bash
   cd "New folder"
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. Run production build and type checking:
   ```bash
   npm run build
   ```

---

## Test Accounts

Testing between roles can be done via the user profile dropdown in the top-right navigation bar:

| Role | Name | Email | Organization / School |
| :--- | :--- | :--- | :--- |
| **Admin** | **Faith Muthoni** | `faith.muthoni@codeworks.co.ke` | Codeworks Kenya (Nakuru Regional Hub) |
| **Tutor** | **Dennis Kiprono** | `dennis.kiprono@codeworks.co.ke` | Codeworks Faculty (Lead Web Development Tutor) |
| **Student** | **Kevin Ochieng** | `kevin.ochieng@nakuruhigh.ac.ke` | Nakuru High School (Grade 10 Senior Secondary) |
