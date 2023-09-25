import { ResponseError } from '../utils/response-error.js'
import { ValidationError } from 'yup'

const errorHandlerMiddleware = (err, req, res, next) => {
  if (!err) {
    next()
    return
  }

  if (err instanceof ResponseError) {
    res
      .status(err.status)
      .json({
        errors: {
          status: false,
          message: err.message,
        },
      })
      .end()
  } else if (err instanceof ValidationError) {
    res
      .status(400)
      .json({
        errors: {
          status: false,
          message: err.message,
        },
      })
      .end()
  } else {
    res
      .status(500)
      .json({
        errors: {
          status: false,
          message: 'Internal server error',
        },
      })
      .end()
  }
}

export { errorHandlerMiddleware }
