import cors from '@fastify/cors'
import 'dotenv/config'
import fastify from 'fastify'
import { authRoutes } from './routes/auth'
import { memoriesRoutes } from './routes/memories'


const app = fastify()
app.register(cors, {
    origin: true
})
app.register(memoriesRoutes)
app.register(authRoutes)


app.listen({
    port: 3333
}).then(() => {
    console.log('Server running')
})