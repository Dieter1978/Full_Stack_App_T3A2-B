import express from 'express'
import cors from 'cors'
import yearRoutes from './routes/year_routes.js'
import classRoutes from'./routes/class_routes.js'


const app = express()


app.use(cors())

app.use(express.json())

app.get('/', (req, res) => res.send({info: 'Start Pagerequest'}))

app.use('/year',yearRoutes)
app.use('/class',classRoutes)

export default app