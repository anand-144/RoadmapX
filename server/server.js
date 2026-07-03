import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';


import authRoutes from './routes/authRoute.js'
import categoryRoutes from "./routes/categoryRoutes.js";
import roadmapRoutes from "./routes/roadmapRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import bookmarkRoutes from "./routes/bookmarkRoutes.js";


dotenv.config();

connectDB();

const app = express();


app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/roadmaps", roadmapRoutes);
app.use("/api/user", userRoutes);
app.use("/api/bookmarks", bookmarkRoutes);

app.get("/", (req,res) => {
    res.send("Roadmap maker api running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});