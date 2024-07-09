import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger';
import { DbConnect } from './db'

import users from "./routes/users";
import tattooers from './routes/tattoer'

const app = new Hono()
await DbConnect()

app.use(logger());

app.get('/api', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api', tattooers)
app.route('/api', users)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
