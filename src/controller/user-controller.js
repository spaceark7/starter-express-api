import userServices from '../services/user-services.js'

const register = async (req, res, next) => {
  try {
    const user = await userServices.register(req.body)
    res.status(200).json({
      status: 'success',
      message: 'User registered successfully',
      data: user,
    })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const user = await userServices.login(req.body)
    res.status(200).json({
      status: 'success',
      message: 'User logged in successfully',
      token: user,
    })
  } catch (error) {
    next(error)
  }
}

const getUser = async (req, res, next) => {
  try {
    const user = await userServices.getUser(req.user)
    res.status(200).json({
      status: 'success',
      message: 'User detail fetched successfully',
      data: user,
    })
  } catch (error) {
    next(error)
  }
}

const updateUser = async (req, res, next) => {
  try {
    const user = await userServices.updateUser(req.user, req.body)
    res.status(200).json({
      status: 'success',
      message: 'User detail updated successfully',
      data: user,
    })
  } catch (error) {
    next(error)
  }
}

const changePassword = async (req, res, next) => {
  try {
    const result = await userServices.changeUserPassword(req.user, req.body)
    res.status(200).json({
      status: 'success',
      message: 'User password updated successfully',
    })
  } catch (error) {
    next(error)
  }
}

export default {
  register,
  login,
  getUser,
  updateUser,
  changePassword,
}
