
import express from 'express';
/// import authRoutes from './routes/auth';
import userRoutes from './routes/users';
// import orderRoutes from './routes/orders';
// import { verifyToken } from './middleware/auth';
import 'dotenv/config';
import { AppDataSource } from "./data-source"


const app = express();
const port = 3000;

// Create database connection
AppDataSource.initialize().then(() => {
  console.log("Connected to the database");

  app.use(express.json());
  app.get('/ping', (req, res) => res.send('pong'));
  
  // Add routes
  // app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);

  // Protected routes
  // app.use(verifyToken);
  // app.use('/api/orders', orderRoutes);

  // Start server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(error => console.log("Error: ", error));
