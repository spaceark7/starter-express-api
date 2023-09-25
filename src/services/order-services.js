import { prismaClient } from '../config/database.js'
import { ResponseError } from '../utils/response-error.js'
import { validate } from '../utils/validations/validation.js'
import { addOrderValidationSchema } from '../utils/validations/order-validation.js'

const addOrder = async (request, user) => {
  const newOrder = await validate(addOrderValidationSchema, request)

  const result = await prismaClient.order.create({
    data: {
      user: {
        connect: {
          id: user.id,
        },
      },
      customer: {
        connect: {
          id: newOrder.customer,
        },
      },
      order_product: {
        createMany: {
          data: newOrder.order_product,
        },
      },

      order_detail: {
        create: {
          notes: newOrder.order_detail.notes,
          customer_attention: newOrder.order_detail.customer_attention,
          down_payment: newOrder.order_detail.down_payment,
          discount_amount: newOrder.order_detail.discount_amount,
          total_amount: newOrder.order_detail.total_amount,
          bank_accounts: {
            connect: newOrder.order_detail.bank_accounts,
          },
        },
      },
      status: newOrder.status,
      valid_until: newOrder.order_detail.valid_until
        ? newOrder.order_detail.valid_until
        : null,
    },

    select: {
      id: true,
      user: {
        select: {
          name: true,
        },
      },

      customer: {
        select: {
          name: true,
        },
      },
      order_product: {
        select: {
          product_name: true,
          price: true,
          qty: true,
          discount: true,
          amount: true,
        },
      },
      order_detail: {
        select: {
          notes: true,
          customer_attention: true,
          down_payment: true,
          discount_amount: true,
          total_amount: true,
          bank_accounts: {
            select: {
              bank_name: true,
              account_number: true,
              account_name: true,
            },
          },
        },
      },
      status: true,
      createdAt: true,
    },
  })

  if (!result) {
    throw new ResponseError(500, 'Failed to add order')
  }

  return result
}

const getAllOrders = async (user) => {
  const result = await prismaClient.order.findMany({
    where: {
      user_id: user.id,
    },
    select: {
      id: true,
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      customer: {
        select: {
          id: true,
          name: true,
          attention: true,
        },
      },
      order_detail: {
        select: {
          notes: true,
          bank_accounts: {
            select: {
              bank_name: true,
              account_number: true,
              account_name: true,
            },
          },
          customer_attention: true,
          down_payment: true,
          discount_amount: true,
          total_amount: true,
        },
      },
      order_product: {
        select: {
          product_name: true,
          price: true,
          qty: true,
          unit: true,
          discount: true,
          amount: true,
        },
      },
      status: true,
      valid_until: true,
      createdAt: true,
    },

    // include: {
    //   customer: {
    //     select: {
    //       name: true,
    //       attention: true,
    //     },
    //   },
    //   order_detail: {
    //     select: {
    //       discount_amount: true,
    //       down_payment: true,
    //       total_amount: true,
    //     },
    //   },
    // },
  })

  console.log('thus', result)

  if (!result) {
    throw new ResponseError(500, 'Failed to get all orders')
  }

  return result
}

const getOrderById = async (user, order_id) => {
  const result = await prismaClient.order.findFirst({
    where: {
      AND: [
        {
          id: parseInt(order_id),
        },
        {
          user_id: user.id,
        },
      ],
    },
    select: {
      id: true,
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      customer: {
        select: {
          id: true,
          name: true,
          attention: true,
        },
      },
      order_detail: {
        select: {
          notes: true,
          bank_accounts: {
            select: {
              bank_name: true,
              account_number: true,
              account_name: true,
            },
          },
          customer_attention: true,
          down_payment: true,
          discount_amount: true,
          total_amount: true,
        },
      },
      order_product: {
        select: {
          product_name: true,
          price: true,
          qty: true,
          unit: true,
          discount: true,
          amount: true,
        },
      },
      status: true,
      valid_until: true,
      createdAt: true,
    },
  })

  if (!result) {
    throw new ResponseError(500, 'Order not found')
  }

  return result
}

const updateOrder = async (user, order_id, request) => {
  const updatedOrder = await validate(addOrderValidationSchema, request)

  const isOrderExist = await prismaClient.order.findFirst({
    where: {
      AND: [
        {
          id: parseInt(order_id),
        },
        {
          user_id: user.id,
        },
      ],
    },
    select: {
      id: true,
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      customer: {
        select: {
          id: true,
          name: true,
          attention: true,
        },
      },
      order_detail: {
        select: {
          notes: true,
          bank_accounts: {
            select: {
              bank_name: true,
              account_number: true,
              account_name: true,
            },
          },
          customer_attention: true,
          down_payment: true,
          discount_amount: true,
          total_amount: true,
        },
      },
      order_product: {
        select: {
          product_name: true,
          price: true,
          qty: true,
          unit: true,
          discount: true,
          amount: true,
        },
      },
      status: true,
      valid_until: true,
      updatedAt: true,
    },
  })

  if (!isOrderExist) {
    throw new ResponseError(500, 'Order not found')
  }

  const result = await prismaClient.order.update({
    where: {
      id: parseInt(order_id),
    },
    data: {
      status: updatedOrder.status,
      valid_until: updatedOrder.order_detail.valid_until
        ? updatedOrder.order_detail.valid_until
        : null,
      updatedAt: new Date().toISOString(),
      customer_id: updatedOrder.customer,

      order_product: {
        deleteMany: {
          order_id: parseInt(order_id),
        },
        createMany: {
          data: updatedOrder.order_product,
        },
      },

      order_detail: {
        update: {
          where: {
            order_id: parseInt(order_id),
          },

          data: {
            notes: updatedOrder.order_detail.notes,
            customer_attention: updatedOrder.order_detail.customer_attention,
            down_payment: updatedOrder.order_detail.down_payment,
            discount_amount: updatedOrder.order_detail.discount_amount,
            total_amount: updatedOrder.order_detail.total_amount,
            bank_accounts: {
              set: [],
              connect: updatedOrder.order_detail.bank_accounts,
            },
          },
        },
      },
    },
    select: {
      id: true,
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      customer: {
        select: {
          id: true,
          name: true,
          attention: true,
        },
      },
      order_detail: {
        select: {
          notes: true,
          bank_accounts: {
            select: {
              bank_name: true,
              account_number: true,
              account_name: true,
            },
          },
          customer_attention: true,
          down_payment: true,
          discount_amount: true,
          total_amount: true,
        },
      },
      order_product: {
        select: {
          product_name: true,
          price: true,
          qty: true,
          unit: true,
          discount: true,
          amount: true,
        },
      },
      status: true,
      valid_until: true,
      updatedAt: true,
    },
  })

  if (!result) {
    throw new ResponseError(500, 'Failed to update order')
  }

  return result
}

export default {
  addOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
}
