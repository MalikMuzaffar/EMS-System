import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import multer from "multer";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import achievementRoutes from "./routes/achievementRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import { markAbsentsJob } from "./utils/attendanceCron.js";
import { ApiResponsemiddleware } from "./middlewares/apiResponsemiddlewares.js";

const app = express();

// CORS
app.use(cors({ origin: "*" }));

// Connect MongoDB
connectDB();

// JSON Parser
app.use(express.json());

// Response Middleware
app.use(ApiResponsemiddleware);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/documents", documentRoutes);

// Start cron job
markAbsentsJob();

// Multer limits
const upload = multer({ limits: { fileSize: 100 * 1024 * 1024 } }); // 100MB

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

