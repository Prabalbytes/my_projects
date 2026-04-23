import express    from "express";
import mongoose   from "mongoose";
import dotenv     from "dotenv";
import cors       from "cors";
import nodemailer from "nodemailer";
import Message    from "./models/message.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://my-projects-frontend-two.vercel.app"]
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ── Gmail transporter ─────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,   // prabalstudy6@gmail.com
    pass: process.env.EMAIL_PASS,   // your app password
  },
});

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // 1. Save to MongoDB
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    // 2. Send both emails at the same time
    await Promise.all([

      // Email to YOU
      transporter.sendMail({
        from:    process.env.EMAIL_USER,
        to:      process.env.MY_EMAIL,
        subject: `📬 New message from ${name}`,
        html: `
          <h2>New Portfolio Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      }),

      // Thank you email to CLIENT
      transporter.sendMail({
        from:    process.env.EMAIL_USER,
        to:      email,              // ← client's email from the form
        subject: `Hey ${name}, got your message! 👋`,
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;background:#f9f9f9;border-radius:12px">
            <h2 style="color:#1e293b">Hey ${name} 👋</h2>
            <p style="color:#475569;line-height:1.7">
              Thanks for reaching out! I've received your message and 
              will get back to you as soon as possible — usually within 
              24 hours.
            </p>
            <div style="background:#f1f5f9;border-left:4px solid #60a5fa;padding:16px;border-radius:6px;margin:20px 0">
              <p style="color:#64748b;font-size:14px;margin:0">
                <strong>Your message:</strong><br/>${message}
              </p>
            </div>
            <p style="color:#475569">Talk soon,<br/><strong>Prabal</strong></p>
            <p style="color:#94a3b8;font-size:12px;margin-top:24px">prabalstudy6@gmail.com</p>
          </div>
        `,
      }),

    ]);

    res.status(200).json({ success: true, message: "Message sent!" });

  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));