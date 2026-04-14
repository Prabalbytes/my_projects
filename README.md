
# Portfolio Backend

REST API for the PrabalBytes portfolio website. Handles contact form submissions, saves messages to MongoDB, and sends email notifications via Resend.

---

## Tech Stack

- **Runtime** — Node.js
- **Framework** — Express.js
- **Database** — MongoDB Atlas (Mongoose)
- **Email** — Resend API
- **Hosting** — Render (free tier)

---

## Project Structure

```
backend/
├── models/
│   └── message.js      # MongoDB schema for contact messages
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
  "message": "Message sent successfully"
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

## Environment Variables

Create a `.env` file in the root folder:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
MY_EMAIL=your@gmail.com
```

| Variable | Description |
|----------|-------------|
| `PORT` | Port the server runs on |
| `MONGO_URI` | MongoDB Atlas connection string |
| `RESEND_API_KEY` | API key from resend.com |
| `MY_EMAIL` | Your email where you receive notifications |

> **Resend API Key** — Sign up at [resend.com](https://resend.com) → API Keys → Create API Key.

---

## Local Setup

```bash
# 1. Clone the repo
git clone https://github.com/Prabalbytes/my_projects.git
cd my_projects

# 2. Install dependencies
npm install

# 3. Create .env file and fill in your values
# (see Environment Variables section above)

# 4. Start the development server
node server.js
```

Server runs at `http://localhost:5000`

---

## Deployment (Render)

1. Push code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repo
4. Set these in Render dashboard:

```
Build Command:   npm install
Start Command:   node server.js
```

5. Add all environment variables in Render's Environment tab
6. Deploy — Render gives you a live URL

> **Note:** Render free tier spins down after inactivity — first request may take 50+ seconds.

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
Resend API — sends 2 emails:
   ├── Notification email → admin (you)
   └── Thank you email   → client (form submitter)
      ↓
Return 200 success
```

---

## Why Resend instead of Nodemailer?

Render's free tier blocks outgoing SMTP connections on port 465 (Gmail). Resend uses HTTPS instead, which works perfectly on Render's free tier.

---

## .gitignore

Make sure your `.env` is never pushed to GitHub:

```
node_modules/
.env
```

---

## Frontend

The frontend (React + Vite) is in a separate repo.
- **Live:** [my-projects-frontend-two.vercel.app](https://my-projects-frontend-two.vercel.app)
- **Repo:** [github.com/Prabalbytes/my_projects_frontend-](https://github.com/Prabalbytes/my_projects_frontend-)

---

## Author

**Prabal Das**
- Email: prabaldas421@gmail.com
- GitHub: [github.com/Prabalbytes](https://github.com/Prabalbytes)
- LinkedIn: [linkedin.com/in/prabal-das-a89604296](https://www.linkedin.com/in/prabal-das-a89604296/)
```
