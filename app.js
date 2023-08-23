import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth_routes.js'
import studentRoutes from './routes/student_routes.js'

const app = express()


app.use(cors())

app.use(express.json())

app.get('/', (req, res) => res.send({info: 'Start Pagerequest'}))

app.use('/', authRoutes)

app.use('/students', studentRoutes)

export default app