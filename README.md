# CODE-A-NOVA
## Hackathon Registration & Team Management Platform

[![Node.js Version](https://img.shields.io/badge/Node.js-v22+-green.svg)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/React-v18-blue.svg)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-v4-lightgrey.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v8-brightgreen.svg)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v3-38bdf8.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-black.svg)](LICENSE)

---

## 1. Project Overview

**Code-a-Nova** is a modern, production-grade hackathon registration and team management web application engineered on the **MERN** stack. Designed with a restrained, editorial developer visual language, it delivers a seamless end-to-end journey for student innovators: from public track exploration, cryptographically secure account verification, and multi-section team registration to printable participant passes and live status tracking.

The platform prioritizes real functional correctness, strict input validation, data persistence in MongoDB, non-blocking email delivery via Nodemailer, and comprehensive defensive security.

---

## 2. Key Features

- **Editorial Public Experience:**
  - Modern, responsive landing page with custom branding, track highlights, interactive roadmap timeline, prizes breakdown, and collapsible FAQ.
  - In-depth About & Scoring Rubric page aligned with official 100-mark evaluation criteria.
  - Validated, rate-limited Contact page with MongoDB inquiry persistence.

- **Authentication & Security:**
  - Salted password hashing with `bcryptjs` (never stored or logged in plaintext).
  - Cryptographically secure 6-digit OTP generation (`crypto.randomInt`).
  - Hashed OTP storage in MongoDB with automatic **10-minute expiration**.
  - Single-use OTP enforcement (purged from database upon successful verification).
  - Resend cooldown protection (60s timer) and IP-based rate limiting via `express-rate-limit`.
  - JWT authentication with secure HTTP-only cookies and Bearer fallback.
  - Defensive HTTP headers configured via `helmet` and strict CORS allowlisting.

- **Participant Dashboard & Team Management:**
  - Dynamic participant dashboard with empty states, loading skeletons, and real-time status badges.
  - Multi-section registration wizard with validation on blur and submit:
    - **Section 1: Leader Information:** 10-digit Indian mobile validation, searchable Indian colleges + custom institution support, degree/branch/year.
    - **Section 2: Project Submission:** Domain/track selection (AI/ML, Web Dev, IoT, Cyber Security, Blockchain), title (min 5 chars), PPT slides link, prototype/repository URL, optional demo video.
    - **Section 3: Dynamic Team Configuration:** 1 to 5 members (including leader). Additional member slots are generated and removed dynamically while preserving entered data. Duplicate email checks across all team members and leader.
    - **Section 4: Comprehensive Review:** Summary review card prior to persistent submission.
  - Unique human-readable Registration ID generation (e.g. `CAN-2026-AB73K`).
  - Duplicate registration prevention (enforced via unique MongoDB indexing and business logic).
  - Printable official Participant Pass with `@media print` optimization.
  - Submission link updates (PPT, prototype, demo video) via modal dialog.
  - Editable participant profile settings.

- **Automated Email Integration (Nodemailer):**
  - **OTP Verification Email:** Branded HTML email dispatched upon registration or resend with 10-minute expiry notice.
  - **Registration Confirmation Email:** Complete receipt including Registration ID, project name, track, team leader, and team members roster.
  - **Resilient Delivery:** Database saves are never rolled back if SMTP credentials are missing or fail; email status is tracked independently (`pending`, `sent`, `failed`).

- **Production Extensions (Admin Console):**
  - Administrative overview dashboard at `/admin`.
  - Aggregate statistics: Total project entries, total participants, track breakdown.
  - Searchable and paginated registrations data grid.
  - One-click **Export to CSV** feature generating formatted participant spreadsheets.

---

## 3. Technology Stack

| Layer | Technology | Responsibility |
|---|---|---|
| **Frontend Framework** | React.js (v18) + Vite | High-performance reactive user interface |
| **Styling** | Tailwind CSS | Custom restrained design system |
| **Routing** | React Router DOM (v6) | Client-side routing with Public & Protected guards |
| **HTTP Client** | Axios | API communication with interceptors |
| **Icons** | Lucide React | Clean, scalable interface icons |
| **Notifications** | React Hot Toast | Accessible feedback toasts |
| **Backend Runtime** | Node.js (v22+) | Server runtime environment |
| **API Framework** | Express.js (v4) | RESTful modular micro-service API |
| **Database** | MongoDB (v8) | Document database persistence |
| **ODM** | Mongoose (v8) | Schemas, validations, and indexes |
| **Authentication** | JSON Web Tokens (JWT) | Stateless session tokens |
| **Password Security**| bcryptjs | Salted password hashing |
| **Email Service** | Nodemailer | Transactional OTP and confirmation emails |
| **Validation** | express-validator | Request body schema validation |
| **Security** | Helmet + CORS + Rate Limit | Defensive headers and abuse mitigation |

---

## 4. Visual Design System

The application strictly implements the design guidelines in Section 3 of the PRD:

- **Color Palette:**
  - **Primary Brand:** `#17243A` (Dark Navy)
  - **Primary Hover:** `#243653`
  - **Background:** `#F7F7F4` (Warm Neutral)
  - **Surface:** `#FFFFFF`
  - **Text Primary:** `#20242B`
  - **Text Secondary:** `#6B7280`
  - **Border:** `#E5E7EB`
  - **Accent:** `#D6A64F` (Warm Gold)
  - **Success:** `#21845B`
  - **Error:** `#C44545`
- **Shapes:**
  - Rectangular buttons with **4–6px border radius** (`rounded-[5px]`).
  - Inputs: **4–6px border radius**.
  - Cards: **6–8px border radius**.
  - Modal dialogs: **8px border radius**.
  - **Strict rule:** No pill-shaped buttons, no fully rounded CTA buttons, no generic AI glowing robot graphics.
- **Typography:** Inter for high legibility and Manrope for display headings.

---

## 5. System Architecture

```
Code-a-nova/
├── client/                     # Frontend Single Page Application (React + Vite)
│   ├── public/                 # Static assets & SVG monogram logo
│   ├── src/
│   │   ├── assets/             # Images & static graphics
│   │   ├── components/
│   │   │   ├── common/         # Button, Input, Select, Card, Badge, Modal, Skeleton
│   │   │   └── layout/         # Navbar, Footer, Sidebar, PublicLayout, DashboardLayout
│   │   ├── context/            # AuthContext (central state provider)
│   │   ├── hooks/              # useAuth custom hook
│   │   ├── pages/              # Home, About, Contact, Login, Signup, VerifyOtp,
│   │   │                       # Dashboard, Registration, RegistrationSuccess,
│   │   │                       # MyRegistration, Profile, AdminDashboard, NotFound
│   │   ├── routes/             # AppRoutes, ProtectedRoute, PublicRoute
│   │   ├── services/           # Axios service layer (api, auth, registration, user, contact)
│   │   ├── styles/             # index.css with Tailwind & print media queries
│   │   └── utils/              # constants (Tracks, Colleges, Courses, Stages)
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── server/                     # Backend REST API (Express + MongoDB)
│   ├── src/
│   │   ├── config/             # environment.js, database.js, mail.js
│   │   ├── controllers/        # auth, user, hackathon, contact, admin controllers
│   │   ├── middleware/         # auth (JWT), validate, rateLimit, error middleware
│   │   ├── models/             # User, HackathonRegistration, ContactMessage, EventConfig
│   │   ├── routes/             # auth, user, hackathon, contact, admin routes
│   │   ├── services/           # auth, email, otp, registration business services
│   │   ├── utils/              # apiResponse, generateOtp, generateRegistrationId, emailTemplates
│   │   ├── validators/         # express-validator schemas for all inputs
│   │   ├── app.js              # Express app configuration & middleware pipeline
│   │   └── server.js           # HTTP listener & database connection entrypoint
│   ├── scripts/
│   │   └── test-api.js         # Automated 26-step end-to-end integration test suite
│   ├── .env.example
│   └── package.json
│
├── package.json                # Root package with monorepo orchestration scripts
└── README.md
```

---

## 6. Installation & Local Setup

### Prerequisites

- **Node.js**: v20 or v22 LTS ([Download](https://nodejs.org/))
- **MongoDB**: Local MongoDB Server v7/v8 or MongoDB Atlas connection string
- **Git**

### Step 1: Clone Repository

```bash
git clone https://github.com/your-username/code-a-nova.git
cd code-a-nova
```

### Step 2: Install All Dependencies

```bash
# Installs root, server, and client dependencies simultaneously
npm run install-all
```

### Step 3: Backend Environment Configuration

Navigate to the `server/` directory and configure `.env`:

```bash
cp server/.env.example server/.env
```

Edit `server/.env` with your settings:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/code_a_nova
JWT_SECRET=your_super_secret_jwt_key_at_least_32_characters
JWT_EXPIRES_IN=7d
COOKIE_SECRET=your_super_secret_cookie_key
CLIENT_URL=http://localhost:5173

# Optional: Nodemailer SMTP Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_FROM="Code-a-Nova" <noreply@codeanova.org>

# In development, mock fallback prints OTPs and confirmation emails to the server console
EMAIL_MOCK_FALLBACK=true
```

### Step 4: Run the Full Application

In the root folder, launch both servers concurrently:

```bash
npm run dev
```

- **Frontend:** `http://localhost:5173`
- **Backend API:** `http://localhost:5000`
- **Health Check:** `http://localhost:5000/api/health`

---

## 7. Automated Testing Suite

The repository includes a comprehensive 26-step automated integration test suite (`server/scripts/test-api.js`) that verifies all PRD requirements against a live server and database.

Run the test suite:

```bash
node server/scripts/test-api.js
```

### Test Coverage Highlights:

```
====================================================
  TEST RESULTS: 26 PASSED, 0 FAILED
====================================================
✓ Health check returns 200 & healthy
✓ Public event configuration retrieval
✓ Contact form validation & MongoDB persistence
✓ Signup input validation (rejects short names / weak passwords)
✓ User creation with hashed passwords & hashed 10-minute expiring OTP
✓ Rejection of login attempts on unverified accounts (403)
✓ Incorrect OTP rejection (400)
✓ Valid OTP verification, single-use OTP purging & account activation
✓ Verified user login & JWT token issuance in secure HTTP-only cookies
✓ Authenticated session retrieval via /api/auth/me
✓ Profile updates (college, degree, mobile number)
✓ Solo hackathon registration & unique reference ID generation (CAN-2026-XXXXX)
✓ Duplicate registration rejection (409 Conflict)
✓ Retrieval of own registration details
✓ Updating submission deliverables (PPT, prototype repo)
✓ Dynamic team registration with 3 members
✓ Duplicate team member email detection and rejection
✓ Administrative statistics aggregation
✓ Search and track filtering on registrations grid
✓ One-click CSV export generation
```

---

## 8. REST API Documentation

Base URL: `/api`

### 8.1 Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| `POST` | `/api/auth/signup` | Registers unverified user & dispatches 6-digit OTP | No |
| `POST` | `/api/auth/verify-otp` | Validates OTP & marks email verified | No |
| `POST` | `/api/auth/resend-otp` | Generates fresh OTP (with 60s cooldown) | No |
| `POST` | `/api/auth/login` | Authenticates verified user & issues session | No |
| `POST` | `/api/auth/logout` | Clears authentication cookies | No |
| `GET` | `/api/auth/me` | Returns current authenticated user | Yes |

### 8.2 Participant Profile Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| `GET` | `/api/user/me` | Retrieves user profile data | Yes |
| `PUT` | `/api/user/update` | Updates permitted profile fields | Yes |

### 8.3 Hackathon Registration Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| `GET` | `/api/hackathon/config` | Retrieves public competition dates & tracks | No |
| `POST` | `/api/hackathon/register` | Submits hackathon entry (solo or team) | Yes |
| `GET` | `/api/hackathon/my-entry` | Retrieves user's submitted registration | Yes |
| `PUT` | `/api/hackathon/my-entry` | Updates project title and submission links | Yes |
| `DELETE`| `/api/hackathon/:id` | Deletes entry (authorized owner or admin) | Yes |

### 8.4 Contact & Admin Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| `GET` | `/api/contact/info` | Retrieves configured organizer email | No |
| `POST` | `/api/contact` | Submits contact inquiry to MongoDB | No |
| `GET` | `/api/admin/stats` | Aggregated analytics & domain breakdowns | Admin |
| `GET` | `/api/admin/registrations`| Filterable, paginated registrations list | Admin |
| `GET` | `/api/admin/export-csv` | Generates full CSV spreadsheet of submissions| Admin |

---

## 9. Database Models

### 9.1 User Model (`User.js`)
```javascript
{
  fullName: { type: String, required: true, minlength: 3 },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true, select: false },
  isEmailVerified: { type: Boolean, default: false },
  otpHash: { type: String, select: false },
  otpExpiresAt: { type: Date, select: false },
  otpLastSentAt: { type: Date },
  college: { type: String, default: '' },
  course: { type: String, default: '' },
  branch: { type: String, default: '' },
  year: { type: String, default: '' },
  mobileNumber: { type: String, default: '' },
  role: { type: String, enum: ['participant', 'admin'], default: 'participant' }
}
```

### 9.2 Hackathon Registration Model (`HackathonRegistration.js`)
```javascript
{
  registrationId: { type: String, required: true, unique: true, uppercase: true },
  userId: { type: ObjectId, ref: 'User', required: true, unique: true },
  participantName: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  mobileNumber: { type: String, required: true },
  collegeName: { type: String, required: true },
  course: { type: String, required: true },
  branch: { type: String, required: true },
  yearOfStudy: { type: String, required: true },
  domain: { type: String, required: true },
  projectName: { type: String, required: true, minlength: 5 },
  pptLink: { type: String, required: true },
  prototypeLink: { type: String, required: true },
  demoVideoLink: { type: String, default: '' },
  teamSize: { type: Number, required: true, min: 1, max: 5 },
  teamMembers: [
    { name: { type: String, required: true }, email: { type: String, required: true } }
  ],
  status: { type: String, enum: ['submitted', 'under_review', 'shortlisted', 'rejected'], default: 'submitted' },
  emailStatus: { type: String, enum: ['pending', 'sent', 'failed'], default: 'pending' },
  submittedAt: { type: Date, default: Date.now }
}
```

---

## 10. Deployment Guide

### Frontend Deployment (Vercel)

1. Connect your repository to Vercel.
2. Select Framework: **Vite**.
3. Root Directory: `client`.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Add Environment Variable:
   ```
   VITE_API_URL=https://your-backend-domain.onrender.com/api
   ```

### Backend Deployment (Render)

1. Create a new Web Service on Render connecting your repository.
2. Root Directory: `server`.
3. Environment: `Node`.
4. Build Command: `npm install`.
5. Start Command: `node src/server.js`.
6. Configure Environment Variables:
   ```
   PORT=5000
   NODE_ENV=production
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/code_a_nova?retryWrites=true&w=majority
   JWT_SECRET=your_production_secure_jwt_secret
   COOKIE_SECRET=your_production_secure_cookie_secret
   CLIENT_URL=https://your-frontend-app.vercel.app
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=codeanovaofficial@gmail.com
   EMAIL_PASS=your-gmail-app-password
   EMAIL_FROM="Code-a-Nova" <codeanovaofficial@gmail.com>
   ```

---

## 11. Demonstration Script (3–5 Minutes)

1. **Landing Page Tour (0:00 - 0:45):**
   - Showcase editorial hero, typography, brand colors (`#17243A`, `#D6A64F`).
   - Tour competition tracks, interactive timeline, and prizes overview.
2. **Signup & Verification (0:45 - 1:30):**
   - Fill out the signup form with live client and server validation.
   - Show OTP generation, 10-minute expiry countdown, and 6-digit individual input auto-focus.
   - Enter correct OTP and observe immediate account activation.
3. **Sign In & Dashboard (1:30 - 2:15):**
   - Log in using verified credentials.
   - Inspect participant dashboard empty state with prominent registration call-to-action.
4. **Hackathon Registration (2:15 - 3:30):**
   - Step 1: Confirm leader info and mobile number.
   - Step 2: Select track (AI/ML) and provide valid PPT/prototype URLs.
   - Step 3: Switch team size between 1 (solo) and 3. Observe dynamic member rows and duplicate email detection.
   - Step 4: Review summary and submit.
5. **Confirmation & Printable Pass (3:30 - 4:15):**
   - View Registration Success screen with generated `CAN-2026-XXXXX` ID.
   - Inspect My Registration view and trigger printable pass.
   - Demonstrate updating submission links via modal dialog.
6. **Admin Console & Sign Out (4:15 - 4:45):**
   - Access `/admin` to view registration metrics, track breakdowns, and export CSV.
   - Log out cleanly to end the session.

---

## 12. License

This project is licensed under the MIT License.
Copyright &copy; 2026-2027 Code-a-Nova Platform.

