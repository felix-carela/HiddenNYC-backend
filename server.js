import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import './db/connection.js'

import eventsRouter from './routes/events.js'
import usersRouter from './routes/users.js'

const PORT = process.env.PORT

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/post/', eventsRouter)
app.use('/api/user/', usersRouter)

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
})
