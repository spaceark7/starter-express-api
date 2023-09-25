import {
  addManyProductsValidationSchema,
  addProductValidationSchema,
  updateProductValidationSchema,
} from '../utils/validations/product-validation.js'

import { prismaClient } from '../config/database.js'
import { ResponseError } from '../utils/response-error.js'
import { validate } from '../utils/validations/validation.js'

const addProduct = async (request) => {
  const { name, specification, price, unit } = await validate(
    addProductValidationSchema,
    request
  )

  const isProductExist = await prismaClient.product.count({
    where: {
      name: {
        equals: name,
      },
    },
  })

  if (isProductExist) {
    throw new ResponseError(400, 'Product already exist')
  }

  const result = await prismaClient.product.create({
    data: {
      name: name,
      spesification: specification,
      price: price,
      unit: unit,
    },

    select: {
      id: true,
      name: true,
      spesification: true,
      price: true,
      unit: true,
      createdAt: true,
    },
  })

  if (!result) {
    throw new ResponseError(500, 'Failed to add product')
  }

  return result
}

const addProducts = async (request) => {
  const products = await validate(addManyProductsValidationSchema, request)

  const result = await prismaClient.product.createMany({
    data: products.map((product) => ({
      name: product.name,
      spesification: product.specification,
      price: product.price,
      unit: product.unit,
    })),
    skipDuplicates: true,
  })

  console.log(result)

  if (result.count === 0) {
    throw new ResponseError(500, 'Failed to add product/Product already exist')
  }

  return result
}

const getProducts = async () => {
  const result = await prismaClient.product.findMany({
    select: {
      id: true,
      name: true,
      spesification: true,
      price: true,
      unit: true,
      createdAt: true,
    },
  })

  if (!result) {
    throw new ResponseError(500, 'Failed to get products')
  }

  return result
}

const getProductById = async (id) => {
  const result = await prismaClient.product.findUnique({
    where: {
      id: parseInt(id),
    },

    select: {
      id: true,
      name: true,
      spesification: true,
      price: true,
      unit: true,
      createdAt: true,
    },
  })

  if (!result) {
    throw new ResponseError(500, 'Failed to get product. Product is not exist')
  }

  return result
}

const updateProduct = async (id, request) => {
  const { name, specification, price, unit } = await validate(
    updateProductValidationSchema,
    request
  )

  const isProductExist = await prismaClient.product.count({
    where: {
      id: parseInt(id),
    },
  })

  if (isProductExist === 0) {
    throw new ResponseError(400, 'Product not found')
  }

  const result = await prismaClient.product.update({
    where: {
      id: parseInt(id),
    },

    data: {
      name: name ? name : isProductExist.name,
      spesification: specification
        ? specification
        : isProductExist.specification,
      price: price ? price : isProductExist.price,
      unit: unit ? unit : isProductExist.unit,
    },

    select: {
      id: true,
      name: true,
      spesification: true,
      price: true,
      unit: true,
      updatedAt: true,
    },
  })

  if (!result) {
    throw new ResponseError(500, 'Failed to update product')
  }

  return result
}

const deleteProduct = async (id) => {
  const result = await prismaClient.product.delete({
    where: {
      id: parseInt(id),
    },
  })

  if (!result) {
    throw new ResponseError(500, 'Failed to delete product')
  }

  return result
}

export default {
  addProduct,
  addProducts,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
}
