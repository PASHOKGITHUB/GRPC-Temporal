import express from 'express';
import bodyParser from 'body-parser';
import orderRoutes from './routes/orderRoutes';

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', orderRoutes);

export default app;
