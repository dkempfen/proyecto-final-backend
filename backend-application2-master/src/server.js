import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    if (process.env.NODE_ENV !== 'test') {
      console.log('🌐 Conectando a la base de datos...');
      await connectDB();
    }

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log(`🔍 Entorno: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ No se pudo iniciar el servidor:', error.message);
    process.exit(1);
  }
};

startServer();
