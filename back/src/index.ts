import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { DbConnect } from './db'

import login from './routes/users'
import tattooers from './routes/tattoer'

const app = new Hono()
await DbConnect()

app.get('/api', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api', login)
app.route('/api', tattooers)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
