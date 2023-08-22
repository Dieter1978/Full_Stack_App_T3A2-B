import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth_routes.js'

const app = express()


app.use(cors())

app.use(express.json())

app.get('/', (req, res) => res.send({info: 'Start Pagerequest'}))

app.use('/users', authRoutes)

export default app