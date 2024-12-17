import express from "express";
import connectToDatabase from "./base/connection";
import userRoutes from "./modules/userModule/users.routes";
import authRoutes from "./modules/authModule/auth.routes";

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.listen(8080, async () => {
    console.log("Server running on port 8080");
  
     await connectToDatabase();
  });
  