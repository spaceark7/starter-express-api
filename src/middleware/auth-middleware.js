import jwt, { decode } from 'jsonwebtoken'
import { prismaClient } from '../config/database.js'

export const authMiddleware = async (req, res, next) => {
  const authrization = req.get('Authorization')

  if (!authrization) {
    res
      .status(401)
      .json({
        status: false,
        message: 'Unauthorized',
      })
      .end()
  } else {
    const token = authrization.split(' ')[1]

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        res
          .status(401)
          .json({
            status: false,
            message: 'Unauthorized',
          })
          .end()
      } else {
        const payload = jwt.decode(token)

        const user = await prismaClient.user.findUnique({
          where: {
            id: payload.id,
          },
        })

        if (!user) {
          res
            .status(401)
            .json({
              status: false,
              message: 'User not found',
            })
            .end()
        }

        req.user = decoded
        next()
      }
    })
  }
}
