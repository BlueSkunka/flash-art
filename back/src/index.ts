import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { DbConnect } from './db'
import {myEnv} from "../conf";
import { jwt } from 'hono/jwt'
import {bearerAuth} from "hono/bearer-auth";
import {verify} from "hono/jwt";

import users from "./routes/users";
import tattooers from './routes/tattoer'

const app = new Hono()
await DbConnect()

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
