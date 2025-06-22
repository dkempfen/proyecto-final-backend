import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport'
import './config/passport.config.js'
import userRoutes from './routes/users.routes.js'
import productRoutes from './routes/products.routes.js'
import cartRoutes from './routes/carts.routes.js'
import sessionRoutes from './routes/sessions.routes.js'
import mocksRoutes from './routes/mocks.router.js'
import { swaggerSpecs, swaggerUi } from './config/swagger.js';
import adoptionRouter from './routes/adoption.router.js';

dotenv.config();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize())


app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/carts', cartRoutes)
app.use('/api/sessions', sessionRoutes)
app.use('/api/mocks', mocksRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use('/api/adoptions', adoptionRouter);

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <title>Conecta Bien - API</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: #fff;
        }
        .card {
          background: rgba(255, 255, 255, 0.1);
          padding: 2rem;
          border-radius: 12px;
          text-align: center;
          backdrop-filter: blur(10px);
        }
        .card h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }
        .card p {
          font-size: 1.1rem;
        }
        .card a {
          display: inline-block;
          margin-top: 1rem;
          padding: 0.5rem 1rem;
          color: #fff;
          text-decoration: none;
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 6px;
        }
        .card a:hover {
          background-color: rgba(255, 255, 255, 0.3);
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>👋 Bienvenido a la API de Conecta Bien</h1>
        <p>La API está en línea y funcionando correctamente 🎉</p>
        <a href="/api-docs">📄 Ver documentación</a>
      </div>
    </body>
    </html>
  `);
});



export default app;

