import { createMiddleware } from 'hono/factory'
import { verify } from 'hono/jwt'
import { User } from "../models/user";
import StatusCode from "../enums/statusCode";

const guard = (role: string) => createMiddleware(async (c, next) => {

    const authorization = c.req.header("Authorization")

    const token = authorization?.replace("Bearer ", "")

    if (token) {
        const { header, payload } = verify(token)

        const _id = payload._id

        try {
            const user = await User.findOne({ _id })

            if (!user) {
                await next();

                c.res = new Response("Forbidden", { status: StatusCode.FORBIDDEN })

                return c.res
            } else {
                if (user.role !== role) {
                    await next();

                    c.res = new Response("Forbidden", { status: StatusCode.FORBIDDEN })

                    return c.res
                } else {
                    await next();
                }
            }
        } catch (e: any) {
            console.log("Une erreur est survenue");
        }
    } else {
        await next();

        c.res = new Response("Forbidden", { status: StatusCode.FORBIDDEN })

        return c.res
    }
})

export { guard }