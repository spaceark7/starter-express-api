import productServices from '../services/product-services.js'

const getProducts = async (req, res, next) => {
  try {
    const products = await productServices.getProducts()
    res.status(200).json({
      status: 'success',
      message: 'Products fetched successfully',
      data: {
        total: products.length,
        products: products,
      },
    })
  } catch (error) {
    next(error)
  }
}

const getProductById = async (req, res, next) => {
  try {
    const product = await productServices.getProductById(req.params.id)
    res.status(200).json({
      status: 'success',
      message: 'Product fetched successfully',
      data: product,
    })
  } catch (error) {
    next(error)
  }
}

const addProduct = async (req, res, next) => {
  try {
    const product = await productServices.addProduct(req.body)
    res.status(201).json({
      status: 'success',
      message: 'Product added successfully',
      data: product,
    })
  } catch (error) {
    next(error)
  }
}

const addManyProducts = async (req, res, next) => {
  try {
    const products = await productServices.addProducts(req.body)
    res.status(201).json({
      status: 'success',
      message: 'Batch Products added successfully',
      data: products,
    })
  } catch (error) {
    next(error)
  }
}

const updateProduct = async (req, res, next) => {
  try {
    const product = await productServices.updateProduct(req.params.id, req.body)
    res.status(200).json({
      status: 'success',
      message: 'Product updated successfully',
      data: product,
    })
  } catch (error) {
    next(error)
  }
}

const deleteProduct = async (req, res, next) => {
  try {
    const product = await productServices.deleteProduct(req.params.id)
    res.status(200).json({
      status: 'success',
      message: 'Product deleted successfully',
      data: product,
    })
  } catch (error) {
    next(error)
  }
}

export default {
  getProducts,
  getProductById,
  addProduct,
  addManyProducts,
  updateProduct,
  deleteProduct,
}
