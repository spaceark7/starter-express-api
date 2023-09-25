import express from 'express'
import { logger } from '../utils/logger.js'
import { publicRouter } from '../route/public-router.js'
import { errorHandlerMiddleware } from '../middleware/error-handler-middleware.js'
import { protectedRoute } from '../route/router.js'
import compression from 'compression'
import cors from 'cors'
const app = express()
const PORT = process.env.PORT || 5000

app.use(compression())
app.use(cors())
app.use(express.json())
app.use(publicRouter)
app.use(protectedRoute)
app.use(errorHandlerMiddleware)

app.get('/', (req, res) => {
  res.send(`Server is running on port ${PORT}`)
})

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`)
})
