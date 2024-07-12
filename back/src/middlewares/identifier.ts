import { createMiddleware } from "hono/factory";
import { isValidObjectId } from "mongoose";
import StatusCode from "../enums/statusCode";

const identifer = (idName: string = 'id') => createMiddleware(async (c, next) => {
    const id = c.req.param(idName)
    console.log(id);

    try {
        if (!isValidObjectId(id)) {
            await next();

            c.res = new Response("Identifier is not valid", { status: StatusCode.BAD_REQUEST })

            return c.res
        }

        await next()
    } catch (err: any) {
        console.error("Une erreur est survenue dans le middleware: Identifier");
    }
})

export { identifer } 