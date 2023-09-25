import customerServices from '../services/customer-services.js'

const addCustomer = async (req, res, next) => {
  try {
    const customer = await customerServices.addCustomer(req.body)
    res.status(201).json({
      status: 'success',
      message: 'Customer added successfully',
      data: customer,
    })
  } catch (error) {
    next(error)
  }
}

const getCustomers = async (req, res, next) => {
  try {
    const customers = await customerServices.getCustomers()
    res.status(200).json({
      status: 'success',
      message: 'Customers fetched successfully',
      data: {
        total: customers.length,
        customers,
      },
    })
  } catch (error) {
    next(error)
  }
}

const getCustomerById = async (req, res, next) => {
  try {
    const customer = await customerServices.getCustomerById(req.params.id)
    res.status(200).json({
      status: 'success',
      message: 'Customer fetched successfully',
      data: customer,
    })
  } catch (error) {
    next(error)
  }
}

const updateCustomer = async (req, res, next) => {
  try {
    const customer = await customerServices.updateCustomer(
      req.params.id,
      req.body
    )
    res.status(200).json({
      status: 'success',
      message: 'Customer updated successfully',
      data: customer,
    })
  } catch (error) {
    next(error)
  }
}

export default {
  addCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
}
