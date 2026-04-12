# Portfolio Backend

REST API for the PrabalBytes portfolio website. Handles contact form submissions, saves messages to MongoDB, and sends email notifications via Gmail.

---

## Tech Stack

- **Runtime** — Node.js
- **Framework** — Express.js
- **Database** — MongoDB Atlas (Mongoose)
- **Email** — Nodemailer (Gmail SMTP)
- **Hosting** — Render (free tier)

---

## Project Structure

```
backend/
├── models/
│   └── Message.js      # MongoDB schema for contact messages
├── server.js           # Express app, routes, email logic
├── .env                # Environment variables (never commit this)
├── .gitignore
└── package.json
```

---

## API Endpoints

### POST `/contact`
Receives form data, saves to MongoDB, and sends emails.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hey Prabal, I wanted to reach out..."
}
```

**Success Response `200`:**
```json
{
  "success": true,
  "message": "Message sent!"
}
```

**Error Response `400`:**
```json
{
  "error": "All fields are required"
}
```

**Error Response `500`:**
```json
{
  "error": "Something went wrong"
}
```

---

### GET `/messages`
Returns all submitted contact messages (admin use only).

**Response:**
```json
[
  {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hey Prabal...",
    "createdAt": "2026-04-10T08:00:00.000Z"
  }
]
```

---

## Environment Variables

Create a `.env` file in the `backend/` folder:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
EMAIL_USER=your@gmail.com
EMAIL_PASS=your_gmail_app_password
MY_EMAIL=your@gmail.com
```

| Variable | Description |
|----------|-------------|
| `PORT` | Port the server runs on |
| `MONGO_URI` | MongoDB Atlas connection string |
| `EMAIL_USER` | Gmail address used to send emails |
| `EMAIL_PASS` | Gmail App Password (not your real password) |
| `MY_EMAIL` | Your email where you receive notifications |

> **Gmail App Password** — Go to Google Account → Security → 2-Step Verification → App Passwords → generate one for "Mail".

---

## Local Setup

```bash
# 1. Clone the repo
git clone https://github.com/yourname/portfolio.git
cd portfolio/backend

# 2. Install dependencies
npm install

# 3. Create .env file and fill in your values
cp .env.example .env

# 4. Start the development server
npm run dev
```

Server runs at `http://localhost:5000`

---

## Deployment (Render)

1. Push code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repo
4. Set these in Render dashboard:

```
Root Directory:  backend
Build Command:   npm install
Start Command:   node server.js
```

5. Add all environment variables from `.env` in Render's dashboard
6. Deploy — Render gives you a live URL

---

## How It Works

```
User submits form
      ↓
POST /contact (Express)
      ↓
Validate fields
      ↓
Save to MongoDB (Message model)
      ↓
Promise.all() — sends 2 emails simultaneously:
   ├── Notification email → admin (you)
   └── Thank you email   → client (form submitter)
      ↓
Return 200 success
```

---

## .gitignore

Make sure your `.env` is never pushed to GitHub:

```
node_modules/
.env
```

---

## Frontend

The frontend (React + Vite) is in the `/frontend` folder of the same repo.
Live at: [prabalbytes.vercel.app](https://prabalbytes.vercel.app)

---

## Author

**Prabal Das**
- Email: prabaldas421@gmail.com
- GitHub: [github.com/yourname](https://github.com/yourname)
- LinkedIn: [linkedin.com/in/yourname](https://linkedin.com/in/yourname)
