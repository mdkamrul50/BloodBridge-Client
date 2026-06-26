# 🩸 BloodBridge - Blood Donation Management Platform

> *Connecting donors, recipients, and volunteers to save lives through technology.*

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8-green)](https://www.mongodb.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-%23635bff)](https://stripe.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-%2338bdf8)](https://tailwindcss.com/)
[![Better Auth](https://img.shields.io/badge/Better_Auth-1.x-orange)](https://better-auth.com)

**Live Website** → [https://bloodbridge-client-dun.vercel.app]((https://blood-bridge-client-dun.vercel.app))  

---

## 📖 Purpose

BloodBridge is a full‑stack blood donation platform designed to streamline the process of finding blood donors, managing donation requests, and supporting the community through financial contributions. The platform serves three primary roles:

- **Donors** – Register, create blood requests, track their donation history, and respond to urgent needs.
- **Volunteers** – Oversee all active requests, update request statuses, and coordinate between donors and recipients.
- **Admins** – Manage users, monitor platform statistics, handle funding, and ensure smooth operation.

Every feature is built with a focus on simplicity, security, and real‑time interaction, making life‑saving connections faster than ever.

---

## ✨ Key Features

### 🔐 Authentication & Authorization
- Secure email/password login and registration via **Better Auth**.
- Role‑based access control (Admin, Volunteer, Donor).
- Blocked users cannot create requests; admins can block/unblock and change roles.

### 🧑‍💼 Donor Dashboard
- View personal stats: blood group, total donations, eligibility.
- Recent donation requests with full CRUD operations.
- Status updates (pending → in‑progress → done / cancelled).
- Direct link to create new requests.

### 👥 Admin Panel
- **All Users** – View, search, block/unblock, promote to volunteer/admin.
- **All Requests** – Manage every donation request across the platform.
- **Funding Overview** – Real‑time total donations and donor count.
- **Charts** – Monthly blood requests bar chart, request status pie chart.

### 🙌 Volunteer Panel
- Monitor all requests, filter by status, and update statuses.
- Quick actions for assigning donors and verifying eligibility.
- Real‑time stats identical to admin dashboard.

### 💰 Funding with Stripe
- Donors can contribute funds via a secure **Stripe Checkout** session.
- Payment confirmation is handled through a dynamic success page.
- All donations are recorded in the database and instantly reflected in stats.

### 🔍 Public Blood Search
- Anyone (even without login) can search active (pending) blood requests by blood group, district, and upazila.
- Results displayed as elegant cards with location, date, time, and a “View Details” button.
- Details page is private – requires login; authenticated donors can accept a request, moving it to “in‑progress”.

### 📊 Dynamic Statistics
- Admin and volunteer dashboards show live counts of total donors, total funding, and blood requests.
- Stats update automatically when new users register, requests are created, or donations are made.

### 👤 Profile Management
- All users can view and edit their profile (name, avatar, blood group, district, upazila).
- Email is immutable; the form becomes editable only after clicking the “Edit” button.

### 🎨 Modern UI/UX
- Dark/light glassmorphism design with smooth animations.
- Fully responsive – optimized for desktop, tablet, and mobile.
- Floating blood cell decorations, animated top borders, and fade‑in effects.

---

## 🛠️ Tech Stack

| Category        | Technology                                      |
|-----------------|-------------------------------------------------|
| **Frontend**    | Next.js 15, React 19, Tailwind CSS, Lucide Icons, Recharts, react‑hot‑toast |
| **Backend**     | Express.js, MongoDB (via Mongoose), Stripe, Better Auth |
| **Database**    | MongoDB Atlas                                   |
| **Deployment**  | Vercel (frontend & backend)                     |
| **Version Control** | Git, GitHub                                   |

---

## 📦 NPM Packages Used

### Frontend (Next.js)
- `next` – React framework for server‑side rendering and static generation.
- `react` & `react-dom` – Core UI library.
- `tailwindcss` – Utility‑first CSS framework.
- `lucide-react` – Beautiful, consistent icon set.
- `recharts` – Responsive charts for admin/volunteer dashboards.
- `react-hot-toast` – Elegant toast notifications.
- `@stripe/react-stripe-js` & `@stripe/stripe-js` – Stripe integration.
- `mongodb` – Official MongoDB driver for serverless functions.
- `better-auth` – Authentication library with role support.
- `@better-auth/mongodb-adapter` – MongoDB adapter for Better Auth.

### Backend (Express)
- `express` – Web framework for Node.js.
- `cors` – Cross‑Origin Resource Sharing.
- `dotenv` – Environment variable management.
- `mongodb` – MongoDB driver.
- `stripe` – Stripe API for payment processing.
- `cookie-parser` – Cookie parsing for session handling.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js ≥ 18
- MongoDB Atlas cluster (or local MongoDB)
- Stripe account (test keys for development)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/bloodbridge.git
cd bloodbridge
