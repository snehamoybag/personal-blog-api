import express, { urlencoded, json } from "express";
import cors from "cors";

const app = express();

// CORS
app.use(cors());

// parsers
app.use(urlencoded({ extended: true }));
app.use(json());

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "localhost";

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
