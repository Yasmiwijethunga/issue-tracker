# Issue Tracker

A full-stack issue tracking and bug management system built with modern web technologies. Create, manage, and track issues with an intuitive UI, powerful filtering, and real-time updates.

## 🎯 Features

- ✅ **User Authentication**: Secure registration and login with JWT tokens
- ✅ **Issue Management**: Create, read, update, and delete issues
- ✅ **Search & Filter**: Search by title, filter by status and priority
- ✅ **Pagination**: Browse large issue lists with smart pagination controls
- ✅ **Status Tracking**: Open, In Progress, Resolved, Closed statuses
- ✅ **Priority Levels**: Low, Medium, High priority classification
- ✅ **Responsive Design**: Dark glassmorphic UI, mobile-friendly
- ✅ **Protected Routes**: Authentication-based access control
- ✅ **Real-time Validation**: Form validation with instant feedback
- ✅ **Confirmation Modals**: Safe deletion and status change confirmations

## 🏗️ Tech Stack

### Frontend
- **Framework**: React 19.2.4 with Vite 8.0.4
- **Language**: TypeScript 6.0.2 (strict mode)
- **State Management**: Redux Toolkit 2.11.2
- **UI Components**: Material-UI 9.0.0
- **Routing**: React Router DOM 7.14.1
- **HTTP Client**: Axios 1.7.7

### Backend
- **Runtime**: Node.js with Express 5.2.1
- **Database**: MongoDB with Mongoose 9.4.1
- **Authentication**: JWT 9.0.3
- **Password Hashing**: bcryptjs 3.0.3
- **Environment**: Dotenv

### Deployment
- **Frontend**: Vercel (SPA routing configured)
- **Backend**: Railway
- **Database**: MongoDB Atlas

## 📋 Project Structure

```
Issue Tracker/
├── client/                          # Frontend (React + Vite)
│   ├── src/
│   │   ├── app/                    # Redux store and hooks
│   │   ├── components/             # Reusable React components
│   │   │   ├── Pagination.tsx      # Pagination controls
│   │   │   ├── IssueCard.tsx       # Issue display card
│   │   │   ├── IssueForm.tsx       # Create/edit form
│   │   │   ├── FilterBar.tsx       # Filter controls
│   │   │   ├── Navbar.tsx          # Navigation
│   │   │   └── ...
│   │   ├── features/               # Feature-specific state
│   │   │   ├── auth/               # Authentication
│   │   │   └── issues/             # Issue management
│   │   ├── pages/                  # Page components
│   │   │   ├── Dashboard.tsx       # Main issue list
│   │   │   ├── IssueDetails.tsx    # Single issue view
│   │   │   ├── Login.tsx           # Login page
│   │   │   └── Register.tsx        # Registration page
│   │   ├── types/                  # TypeScript interfaces
│   │   └── utils/                  # Helper functions
│   ├── package.json
│   └── vite.config.ts
│
└── server/                          # Backend (Node.js + Express)
    ├── models/                      # Mongoose schemas
    │   ├── User.js
    │   └── Issue.js
    ├── controllers/                 # Route handlers
    │   ├── authController.js
    │   └── issueController.js
    ├── routes/                      # API routes
    │   ├── authRoutes.js
    │   └── issueRoutes.js
    ├── middleware/                  # Express middleware
    │   └── authMiddleware.js
    ├── config/                      # Database config
    │   └── db.js
    ├── server.js                    # Entry point
    ├── package.json
    └── .env                         # Environment variables

```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm 9+
- MongoDB Atlas account (for database)
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd "Issue Tracker"
```

2. **Install backend dependencies**
```bash
cd server
npm install
```

3. **Install frontend dependencies**
```bash
cd ../client
npm install
```

### 🔧 Environment Setup

#### Backend (.env file)

Create `.env` file in the `server/` directory:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority

# JWT
JWT_SECRET=your_jwt_secret_key_here_min_32_characters
JWT_EXPIRE=30d
```

#### Frontend (.env.local file)

Create `.env.local` file in the `client/` directory:

```env
# API Endpoint
VITE_API_URL=http://localhost:5000/api
```

**Production (Vercel):**
```env
VITE_API_URL=https://your-backend-railway-url/api
```

## 💻 Development

### Running Locally

**Terminal 1 - Backend Server:**
```bash
cd server
npm run dev
```
Server will run on `http://localhost:5000`

**Terminal 2 - Frontend Dev Server:**
```bash
cd client
npm run dev
```
Frontend will run on `http://localhost:5175` (or next available port)

### Building for Production

**Frontend Build:**
```bash
cd client
npm run build
```
Output: `dist/` folder ready for Vercel

**Backend:**
No build step needed; runs directly with Node.js

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user, returns JWT | ❌ |

**Register Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepass123"
}
```

**Register Response:**
```json
{
  "message": "Registration successful"
}
```

**Login Request:**
```json
{
  "email": "john@example.com",
  "password": "securepass123"
}
```

**Login Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Issues

All issue endpoints require JWT token in header: `Authorization: Bearer <token>`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/issues` | Get all issues (paginated) |
| GET | `/api/issues/:id` | Get single issue |
| POST | `/api/issues` | Create new issue |
| PUT | `/api/issues/:id` | Update issue |
| DELETE | `/api/issues/:id` | Delete issue |

**Get Issues Query Parameters:**
```
GET /api/issues?page=1&limit=10&search=bug&status=Open&priority=High
```

**Response:**
```json
{
  "issues": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Login page not loading",
      "description": "The login page shows a blank screen",
      "status": "Open",
      "priority": "High",
      "severity": "Critical",
      "createdBy": "507f1f77bcf86cd799439012",
      "createdAt": "2026-04-22T10:30:00Z",
      "updatedAt": "2026-04-22T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 15,
    "page": 1,
    "limit": 10,
    "pages": 2
  }
}
```

**Create Issue Request:**
```json
{
  "title": "Database connection timeout",
  "description": "The app crashes when database is slow",
  "status": "Open",
  "priority": "High",
  "severity": "Critical"
}
```

**Update Issue Request:**
```json
{
  "status": "In Progress",
  "priority": "Medium"
}
```

## 📦 Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variable:
   - `VITE_API_URL`: Your Railway backend URL
4. Deploy automatically on push

**Vercel Configuration** (included in `vercel.json`):
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Backend (Railway)

1. Create new project on Railway.app
2. Connect GitHub repository
3. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
4. Deploy automatically

4. Get the Railway URL (e.g., `https://yourapp-prod.up.railway.app`)
5. Update frontend `VITE_API_URL` environment variable

##  Testing

### Frontend Tests
```bash
cd client
npm run test
```

### Backend Tests
```bash
cd server
npm test
```

### Build Verification
```bash
cd client
npm run build    # Verify TypeScript compilation
```

## Security Features

- ✅ JWT token-based authentication
- ✅ Bcrypt password hashing
- ✅ Protected API routes (middleware verification)
- ✅ CORS configuration
- ✅ Environment variables for secrets
- ✅ 401 Unauthorized handling with auto-logout
- ✅ Input validation on frontend and backend
- ✅ Ownership verification for issue operations

##  Available Scripts

### Frontend
```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build

```

### Backend
```bash
npm run dev       # Start server with nodemon (auto-reload)
npm start         # Start server (production)
npm test          # Run tests
```

### MongoDB Connection Error
- Verify `MONGODB_URI` in `.env`
- Ensure IP whitelist includes your current IP in MongoDB Atlas
- Check network connectivity

### CORS Errors
- Verify `VITE_API_URL` points to correct backend
- Check backend CORS configuration

### 401 Unauthorized
- Token may be expired; login again
- Check `Authorization` header format: `Bearer <token>`
- Verify JWT_SECRET matches in backend

## Type Definitions

Key TypeScript interfaces:

```typescript
interface Issue {
  _id?: string;
  title: string;
  description: string;
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  priority: "Low" | "Medium" | "High";
  severity?: string;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
}

interface PaginationData {
  total: number;
  page: number;
  limit: number;
  pages: number;
}






