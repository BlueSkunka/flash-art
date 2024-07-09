import {serve} from '@hono/node-server'
import {Hono} from 'hono'
import {DbConnect} from './db'
import {customCors} from "./middlewares/customCors";
import {logger} from 'hono/logger';
import users from "./routes/users";
import tattooers from './routes/tattoer'
import {cors} from "hono/cors";
import flashes from './routes/flashs';

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

//app.use(customCors)


const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
