import express from "express";
import connectToDatabase from "./base/connection.js";
import userRoutes from "./routes/users.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.listen(8080, async () => {
    console.log("Server running on port 8080");
  
     await connectToDatabase();
  });
  