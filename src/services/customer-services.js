import { prismaClient } from '../config/database.js'
import { ResponseError } from '../utils/response-error.js'
import { validate } from '../utils/validations/validation.js'

import {
  addCustomerValidationSchema,
  updateCustomerValidationSchema,
} from '../utils/validations/customer-validation.js'

const addCustomer = async (request) => {
  const newCustomer = await validate(addCustomerValidationSchema, request)

  const isCustomerExist = await prismaClient.customer.count({
    where: {
      name: {
        equals: newCustomer.name,
      },
    },
  })

  if (isCustomerExist) {
    throw new ResponseError(400, 'Customer already exist')
  }

  const result = await prismaClient.customer.create({
    data: {
      name: newCustomer.name,
      phone_number: newCustomer.phone_number,
      email: newCustomer.email,
      attention: newCustomer.attention,
      address: {
        create: {
          street: newCustomer?.address?.street
            ? newCustomer?.address?.street
            : '',
          city: newCustomer?.address?.city ? newCustomer?.address?.city : '',
          province: newCustomer?.address?.province
            ? newCustomer?.address?.province
            : '',
          postal_code: newCustomer?.address?.postal_code
            ? newCustomer?.address?.postal_code
            : '',
        },
      },
    },

    select: {
      id: true,
      name: true,
      address: true,
      attention: true,
      phone_number: true,
      email: true,
      createdAt: true,
    },
  })

  if (!result) {
    throw new ResponseError(500, 'Failed to add customer')
  }

  return result
}

const getCustomers = async () => {
  const result = await prismaClient.customer.findMany({
    select: {
      id: true,
      name: true,
      address: {
        select: {
          city: true,
        },
      },
      attention: true,
      phone_number: true,
      email: true,
      createdAt: true,
    },
  })

  if (!result) {
    throw new ResponseError(500, 'Failed to get customers')
  }

  return result
}

const getCustomerById = async (id) => {
  const result = await prismaClient.customer.findUnique({
    where: {
      id: parseInt(id),
    },

    select: {
      id: true,
      name: true,
      address: true,
      phone_number: true,

      attention: true,

      email: true,
      createdAt: true,
    },
  })

  if (!result) {
    throw new ResponseError(404, 'Customer not found')
  }

  return result
}

const updateCustomer = async (id, request) => {
  const newCustomer = await validate(updateCustomerValidationSchema, request)

  const isCustomerExist = await prismaClient.customer.count({
    where: {
      name: {
        equals: newCustomer.name,
      },

      id: {
        not: parseInt(id),
      },
    },
  })

  if (isCustomerExist) {
    throw new ResponseError(400, 'Customer already exist')
  }

  const result = await prismaClient.customer.update({
    where: {
      id: parseInt(id),
    },

    data: {
      name: newCustomer.name,
      phone_number: newCustomer.phone_number,
      email: newCustomer.email,

      attention: newCustomer.attention,

      address: {
        update: {
          street: newCustomer?.address?.street
            ? newCustomer?.address?.street
            : '',
          city: newCustomer?.address?.city ? newCustomer?.address?.city : '',
          province: newCustomer?.address?.province
            ? newCustomer?.address?.province
            : '',
          postal_code: newCustomer?.address?.postal_code
            ? newCustomer?.address?.postal_code
            : '',
        },
      },
    },

    select: {
      id: true,
      name: true,
      address: true,
      phone_number: true,
      email: true,

      attention: true,
      updatedAt: true,
    },
  })

  if (!result) {
    throw new ResponseError(500, 'Failed to update customer')
  }

  return result
}

export default {
  addCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
}
