import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'

dotenv.config()

const app = express();
console.log(process.env.CLIENT_URL)

app.use(express.json())
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(helmet())
app.use(morgan('dev'))


import apiRoutes from './routes'
app.use('/api', apiRoutes)

export default app
