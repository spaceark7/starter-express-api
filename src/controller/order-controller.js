import orderServices from '../services/order-services.js'
// TODO 1: Create calculation login in order-services.js
const addOrder = async (req, res, next) => {
  try {
    const order = await orderServices.addOrder(req.body, req.user)
    res.status(201).json({
      status: 'success',
      message: 'Order added successfully',
      data: order,
    })
  } catch (error) {
    next(error)
  }
}

const GetOrders = async (req, res, next) => {
  try {
    const orders = await orderServices.getAllOrders(req.user)
    res.status(200).json({
      status: 'success',
      message: 'Orders fetched successfully',
      data: {
        total: orders.length,
        orders,
      },
    })
  } catch (error) {
    next(error)
  }
}

const GetOrderById = async (req, res, next) => {
  try {
    const order = await orderServices.getOrderById(req.user, req.params.id)
    res.status(200).json({
      status: 'success',
      message: 'Order fetched successfully',
      data: order,
    })
  } catch (error) {
    next(error)
  }
}

const UpdateOrder = async (req, res, next) => {
  try {
    const order = await orderServices.updateOrder(
      req.user,
      req.params.id,
      req.body
    )
    res.status(200).json({
      status: 'success',
      message: 'Order updated successfully',
      data: order,
    })
  } catch (error) {
    next(error)
  }
}

const DeleteOrder = async (req, res, next) => {
  try {
    const order = await orderServices.DeleteOrder(req.params.id)
    res.status(200).json({
      status: 'success',
      message: 'Order deleted successfully',
      data: order,
    })
  } catch (error) {
    next(error)
  }
}

export default {
  addOrder,
  GetOrders,
  GetOrderById,
  UpdateOrder,
  DeleteOrder,
}
