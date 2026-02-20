import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

// Route Imports
import dashboardRoutes from './routes/dashboardRoutes';
import productRoutes from './routes/productRoutes';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import expenseRoutes from './routes/expenseRoutes';

// Configurations
dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ROUTES
app.use('/dashboard', dashboardRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/expenses', expenseRoutes);

// SERVER
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
