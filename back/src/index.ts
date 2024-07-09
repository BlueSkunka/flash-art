import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import {DbConnect} from './db'
import users from "./routes/users";
import {cors} from "hono/cors";
import {customCors} from "./middlewares/customCors";

const app = new Hono()
await DbConnect()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api', users)

app.use(customCors)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
