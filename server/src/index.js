const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const productRoutes = require('./modules/product/routes/productRoutes');
const userRoutes = require('./modules/user/routes/userRoutes');
const ProductController = require('./modules/product/controllers/productController');
const UserController = require('./modules/user/controllers/userController');


const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true, 
})); 
app.use(express.json()); 


app.use(express.urlencoded({ extended: true }));


app.use('/api/product', productRoutes);
app.use('/api/user', userRoutes);

const MONGODB_URI = process.env.MONGODB_URI ;

mongoose.connect(MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// ProductController.seedProducts();
// UserController.seedUser();
