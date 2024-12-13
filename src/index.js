import express from "express";
import connectToDatabase from "./base/connection";

const app = express();

app.use(express.json());

app.listen(8080, async () => {
    console.log("Server running on port 8080");
  
     await connectToDatabase();
  });
  