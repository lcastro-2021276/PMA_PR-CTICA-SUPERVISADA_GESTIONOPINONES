'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { validateJWT } from '../middlewares/auth.middleware.js';

import authRoutes from './auth/auth.routes.js';
import userRoutes from './users/user.routes.js';
import postRoutes from './posts/post.routes.js';
import commentRoutes from './comments/comment.routes.js';

const BASE_PATH = '/api/v1';

export const createApp = () => {
  const app = express();

  // ===== Middlewares Globales =====
  app.use(express.json({ limit: '10mb' }));
  app.use(cors());
  app.use(helmet());
  app.use(morgan('dev'));

  // ===== Rutas Públicas =====
  app.use(`${BASE_PATH}/auth`, authRoutes);

  // ===== Rutas Protegidas =====
  app.use(`${BASE_PATH}/users`, validateJWT, userRoutes);
  app.use(`${BASE_PATH}/posts`, validateJWT, postRoutes);
  app.use(`${BASE_PATH}/comments`, validateJWT, commentRoutes);

  // ===== Health Check =====
  app.get(`${BASE_PATH}/health`, (req, res) => {
    res.status(200).json({
      status: 'Healthy',
      timestamp: new Date().toISOString(),
      service: 'Gestor de Opiniones API'
    });
  });

  // ===== Ruta no encontrada (404) =====
  app.use((req, res) => {
    res.status(404).json({
      message: 'Ruta no encontrada'
    });
  });

  // ===== Middleware Global de Errores =====
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error'
    });
  });

  return app;
};