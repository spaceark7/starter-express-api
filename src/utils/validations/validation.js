import { ResponseError } from '../response-error.js'

const validate = async (schema, request) => {
  const result = await schema
    .validate(request, {
      abortEarly: false,
    })
    .catch((err) => {
      const { errors } = err
      const message = errors.map((i) => i).join(',')
      throw new ResponseError(400, message)
    })

  // if (result.errors.length > 0) {
  //   // const { details } = result.errors
  //   const message = result.errors.map((i) => i.message).join(',')
  //   throw new ResponseError(400, message)
  // } else {
  return result
}

export { validate }
