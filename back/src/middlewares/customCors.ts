import {createMiddleware} from 'hono/factory'

const customCors = createMiddleware(async (c, next) => {
    await next();

    console.log(c.req.method)

    if (c.req.method === "OPTIONS") {
        c.header("Access-Control-Allow-Origin", "*")
        c.header("Access-Control-Allow-Credentials", "1")
        c.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS")
        c.header("Access-Control-Allow-Headers", "DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type")
        c.header("Access-Control-Max-Age", "1728000")
        c.header("Content-Type", "text/plain charset=UTF-8")
        c.header("Content-Length", "0")
        c.status(204)

        c.res = new Response()
    }

    if (["POST", "GET"].includes(c.req.method)) {
        c.header("Access-Control-Allow-Origin", "*")
        c.header("Access-Control-Allow-Credentials", "1")
        c.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        c.header("Access-Control-Allow-Headers", "DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type")
    }
})

export {customCors}