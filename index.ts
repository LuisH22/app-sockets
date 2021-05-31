import Servidor from "./classes/server";
import { router } from './routes/router';

import express from 'express';

import cors from 'cors';


const server = Servidor.instance;

// Parseo del request
server.app.use( express.urlencoded({ extended: true}));
server.app.use( express.json());

// // Cors 
// server.app.use(cors({origin: 'http://localhost:4200', credentials: true}))

// Routes 
server.app.use('/', router)


server.start(() => {
    console.log(`Servidor corriendo en el purto ${server.port}`);
});