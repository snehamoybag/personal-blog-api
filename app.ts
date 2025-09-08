import express, { urlencoded, json } from "express";
import cors from "cors";
import errorRequestHandler from "./middlewares/error-request-handler.middleware";
import requeset404Handler from "./middlewares/404-request-handler.middleware";
import * as routes from "./routes";

const app = express();

// CORS
app.use(cors());

// PARSERS
app.use(urlencoded({ extended: true }));
app.use(json());

// ROUTES
app.use("/", routes.index);
app.use("/signup", routes.signup);
app.use("/login", routes.login);

// ERROR HANDLER MIDDLEWARE
app.use(errorRequestHandler);

// 404 HANDLER
app.use(requeset404Handler);

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "localhost";

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
