import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import resumeRoutes from "./routes/resumeRoutes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/resumes", resumeRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
