import userController from '../controller/user-controller.js'
import express from 'express'
import { authMiddleware } from '../middleware/auth-middleware.js'
import companyController from '../controller/company-controller.js'
import productController from '../controller/product-controller.js'
import customerController from '../controller/customer-controller.js'
import orderController from '../controller/order-controller.js'
import imageUploadController from '../controller/image-upload-controller.js'

const protectedRoute = new express.Router()

protectedRoute.use(authMiddleware)

// @desc    Get user profile
// @route   GET /api/users
// @access  Protected
protectedRoute.get('/api/users', userController.getUser)

// @desc    Update user profile
// @route   PUT /api/users
// @access  Protected
protectedRoute.put('/api/users', userController.updateUser)

// @desc    Change user password
// @route   PUT /api/users/change-password
// @access  Protected
protectedRoute.put('/api/users/change-password', userController.changePassword)

// @desc    Add company
// @route   POST /api/company
// @access  Protected

protectedRoute.post('/api/company', companyController.addCompanyProfile)

// @desc    Get company
// @route   GET /api/company
// @access  Protected
protectedRoute.get('/api/company', companyController.getCompanyProfile)

// @desc    Update company
// @route   PUT /api/company
// @access  Protected

protectedRoute.put('/api/company', companyController.updateCompanyProfile)

// @desc    Add bank account
// @route   POST /api/bank-accounts
// @access  Protected

protectedRoute.post('/api/bank-accounts', companyController.addBankAccount)

// @desc    Get bank account
// @route   GET /api/bank-accounts
// @access  Protected

protectedRoute.get('/api/bank-accounts/:id', companyController.getBankAccount)

// @desc    Get bank all bank account
// @route   GET /api/bank-accounts
// @access  Protected

protectedRoute.get('/api/bank-accounts', companyController.getBankAccounts)

// @desc    Update bank account
// @route   PUT /api/bank-accounts
// @access  Protected

protectedRoute.put(
  '/api/bank-accounts/:id',
  companyController.updateBankAccount
)

// @desc    Add Product
// @route   POST /api/products
// @access  Protected

protectedRoute.post('/api/products', productController.addProduct)

// @desc    Add Multiple Product
// @route   POST /api/products/batch
// @access  Protected

protectedRoute.post('/api/products/batch', productController.addManyProducts)

// @desc    Get Products
// @route   GET /api/products
// @access  Protected
protectedRoute.get('/api/products', productController.getProducts)

// @desc    Get Product By Id
// @route   GET /api/products
// @access  Protected

protectedRoute.get('/api/products/:id', productController.getProductById)

// @desc    Update Product
// @route   PUT /api/products
// @access  Protected

protectedRoute.put('/api/products/:id', productController.updateProduct)

// @desc    Delete Product
// @route   DELETE /api/products
// @access  Protected

protectedRoute.delete('/api/products/:id', productController.deleteProduct)

// @desc    Get Customers
// @route   GET /api/customers
// @access  Protected
protectedRoute.get('/api/customers', customerController.getCustomers)

// @desc    Get Customer By Id
// @route   GET /api/customers
// @access  Protected

protectedRoute.get('/api/customers/:id', customerController.getCustomerById)

// @desc    Add Customer
// @route   POST /api/customers
// @access  Protected

protectedRoute.post('/api/customers', customerController.addCustomer)

// @desc    Update Customer
// @route   PUT /api/customers
// @access  Protected

protectedRoute.put('/api/customers/:id', customerController.updateCustomer)

// @desc    Add Order @spaceark7
// @route   POST /api/orders
// @access  Protected

protectedRoute.post('/api/orders', orderController.addOrder)

// @desc    Get all orders @spaceark7
// @route   GET /api/orders
// @access  Protected

protectedRoute.get('/api/orders', orderController.GetOrders)

// @desc    Get order by id @spaceark7
// @route   GET /api/orders/:id
// @access  Protected

protectedRoute.get('/api/orders/:id', orderController.GetOrderById)

// @desc    Update order by id @spaceark7
// @route   PUT /api/orders/:id
// @access  Protected

protectedRoute.put('/api/orders/:id', orderController.UpdateOrder)

// @desc    Upload image to ImageKit
// @route   POST /api/auth-imagekit
// @access  Protected

protectedRoute.post('/api/auth-imagekit', imageUploadController.AuthImageUpload)

export { protectedRoute }
