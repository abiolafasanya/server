import express, { json, urlencoded } from 'express';
import path from 'path';
import envVars from './config/environment.js';
// import upload from './api/utils/uploads.js';
import corsOrigin from './config/allowedOrigin.js';
import Database from './config/database.js';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import authRoute from './api/routers/authRoute.js';
import assignment from './api/routers/assignmentRoute.js';
import submission from './api/routers/submissionRoute.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();

config();
Database();

// middlewares
app.use(json());
app.use(cors());
app.use(cookieParser());
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);
app.use(urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '../public')));

// routes
app.use('/auth', authRoute);
app.use('/submit', submission);
app.use('/assignment', assignment);

app.set('port', envVars.port || 4000);

app.listen(app.get('port'), () => {
  console.log(`Server running on port http://localhost:${app.get('port')}`);
});
