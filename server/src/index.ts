import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express, { Application } from 'express';
import mongoose from 'mongoose';
import { databaseConnect, serverConnect } from './modules/connections';
import devicesRouter from './routers/devices';
import ordersRouter from './routers/orders';
import usersRouter from './routers/users';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

// Initializing express
const app: Application = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Server middlewares
dotenv.config();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Server routers
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/devices', devicesRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);

// Establishing connections
await databaseConnect(mongoose);
serverConnect(app);