'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { dbConnection } from './config/db.js';
import { validateJWT } from './middlewares/auth.middleware.js';
import authRoutes from './auth/auth.routes.js';
import userRoutes from './users/user.routes.js';
import postRoutes from './posts/post.routes.js';
import commentRoutes from './comments/comment.routes.js';

dotenv.config();

const BASE_PATH = '/api/v1';

export const initServer = async () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  try {
    await dbConnection();

    // Middlewares globales
    app.use(express.json({ limit: '10mb' }));
    app.use(cors());
    app.use(helmet());
    app.use(morgan('dev'));

    // Rutas públicas
    app.use(`${BASE_PATH}/auth`, authRoutes);

    // Rutas protegidas
    app.use(`${BASE_PATH}/users`, validateJWT, userRoutes);
    app.use(`${BASE_PATH}/posts`, validateJWT, postRoutes);
    app.use(`${BASE_PATH}/comments`, validateJWT, commentRoutes);

    // Health check (útil para defensa)
    app.get(`${BASE_PATH}/health`, (req, res) => {
      res.status(200).json({
        status: 'Healthy',
        timestamp: new Date().toISOString(),
        service: 'Gestor de Opiniones API'
      });
    });

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
      console.log(`Health: http://localhost:${PORT}${BASE_PATH}/health`);
    });

  } catch (error) {
    console.error('Error iniciando servidor:', error.message);
    process.exit(1);
  }
};

initServer();