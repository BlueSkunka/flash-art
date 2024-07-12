import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { DbConnect } from './db'
import { cors } from "hono/cors";
import { logger } from 'hono/logger';

import users from "./routes/users";
import tattooers from './routes/tattoer'
import flashes from './routes/flashs';
import opinions from './routes/opinions'
import styles from "./routes/styles";

const app = new Hono()
await DbConnect()

app.use('/api/*', cors())

app.use(logger());

app.get('/api', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api', tattooers)
app.route('/api', users)
app.route('/api', flashes)
app.route('/api', opinions)
app.route('/api', styles)

//app.use(customCors)


const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
