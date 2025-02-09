import express from "express";
import cors from "cors";

import connectToDatabase from "./base/connection";
import userRoutes from "./modules/userModule/users.routes";
import authRoutes from "./modules/authModule/auth.routes";
import lyricRoutes from "./modules/lyricsModule/lyrics.routes";
import songs from "./modules/SongModule/song.routes"
import aiRoutes from "./utils/aiRoutes";

const app = express();

app.use(cors({
    origin: "http://35.181.154.194:5173",
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}))

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/lyrics", lyricRoutes);
app.use("/api/lyrics", aiRoutes);
app.use("/api/", songs);
app.use('/uploads', express.static('uploads'));

app.listen(8000, '0.0.0.0', async () => {
    console.log("Server running on port 8000");

    try {
        await connectToDatabase();
    } catch (error) {
        console.error("Failed to connect to the database:", error);
    }
});