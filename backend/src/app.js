import express from "express";
import morgan from "morgan";
const cors = require('cors')
// Routes
import languagesRoutes from "./routes/languages.routes";
import userRoutes from "./routes/user.routes";

const app = express();

// Settings
app.set("port", 4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors())

// Routes
app.use("/api/languages", languagesRoutes);
app.use("/api/user", userRoutes);

export default  app;