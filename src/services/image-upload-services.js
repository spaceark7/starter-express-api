import { v4 as uuid } from 'uuid'
import crypto from 'crypto'

const privateKey = process.env.IMAGEKIT_PRIVATE_KEY

const uploadImage = (request) => {
  console.log('request', request)

  const token = request.token || uuid()
  const expire = request.expire || parseInt(Date.now() / 1000) + 2400
  const privateAPIKey = `${privateKey}`

  const signature = crypto
    .createHmac('sha1', privateAPIKey)
    .update(token + expire)
    .digest('hex')

  return {
    token,
    expire,
    signature,
  }
}

export default {
  uploadImage,
}
