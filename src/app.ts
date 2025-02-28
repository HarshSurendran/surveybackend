import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import errorHandler from './middlewares/error.middleware'

dotenv.config()

const app = express();

app.use(express.json())
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(helmet())
app.use(morgan('dev'))


import apiRoutes from './routes'
app.use('/api', apiRoutes);

app.use(errorHandler as any )

export default app
