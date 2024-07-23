const express = require('express');
const { login, signup, addProduct, getAllProducts } = require('../controllers/userController');
const userRouter = express.Router();

userRouter.post('/login',login);
userRouter.post('/signup',signup);
userRouter.get('/products',getAllProducts);
userRouter.post('/products/:id',addProduct);

module.exports = userRouter;