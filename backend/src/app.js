import express from "express";
import morgan from "morgan";
import helmet from "helmet";
const cors = require('cors');
const fileUpload = require('express-fileupload');

// Routes
import languagesRoutes from "./routes/languages.routes";
import userRoutes from "./routes/user.routes";
import roleRoutes from "./routes/roles.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

// Settings
app.set("port", 4000);

// Middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//Fileupload
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    createParentPath: true
}));

// Routes
app.use("/api/languages", languagesRoutes);
app.use("/api/user", userRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/auth", authRoutes);

export default app;