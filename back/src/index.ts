import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import {DbConnect} from './db'

const app = new Hono()
await DbConnect()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
