import express from "express";
import cors from "cors";
import analyzeAPIHandler from "./analyze-api.js";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/analyze-api", analyzeAPIHandler);

app.listen(5000, () => {});
