import express from "express";
import morgan from "morgan";
import helmet from "helmet";
const cors = require('cors');
const fileUpload = require('express-fileupload');

// Routes
import languagesRoutes from "./routes/languages.routes";
import userRoutes from "./routes/user.routes";
import achievementRoutes from "./routes/achievement.routes";
import roleRoutes from "./routes/roles.routes";
import authRoutes from "./routes/auth.routes";
import countryRoutes from "./routes/country.routes";
import cityRoutes from "./routes/city.routes";
import citiesGalleryRoutes from "./routes/citiesgallery.routes";
//import articleRoutes from "./routes/article.routes";
import articlesGalleryRoutes from "./routes/articlesgallery.routes";
import universityRoutes from "./routes/university.routes";
import facultyRoutes from "./routes/faculty.routes";
import subjectRoutes from "./routes/subject.routes";

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
app.use("/api/achievement", achievementRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/country", countryRoutes);
app.use("/api/city", cityRoutes);
app.use("/api/citiesgallery", citiesGalleryRoutes);
//app.use("/api/article", articleRoutes);
app.use("/api/articlesgallery", articlesGalleryRoutes);
app.use("/api/university", universityRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/subject", subjectRoutes);

export default app;