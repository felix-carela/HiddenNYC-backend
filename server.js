import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import './db/connection.js'

import postRouter from './routes/events.js'
import userRouter from './routes/users.js'

const PORT = process.env.PORT || 3001

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/post/', postRouter)
app.use('/api/user/', userRouter)

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
})
