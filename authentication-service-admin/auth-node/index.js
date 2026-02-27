'use strict';

import dotenv from 'dotenv';
import { dbConnection } from './src/configs/db.js';
import { createApp } from './src/app.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await dbConnection();

    const app = createApp();

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
      console.log(`Health: http://localhost:${PORT}/api/v1/health`);
    });

  } catch (error) {
    console.error('Error iniciando servidor:', error.message);
    process.exit(1);
  }
};

startServer();