import express from 'express';
import orderRoutes from './routes/orderRoutes';

const app = express();
app.use(express.json());

// Routes
app.use('/api', orderRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`REST API server is running on http://localhost:${PORT}`);
});
