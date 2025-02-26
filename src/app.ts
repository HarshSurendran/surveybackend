import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

// Middleware
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

// Routes
import apiRoutes from './routes'
app.use('/api', apiRoutes)

export default app
