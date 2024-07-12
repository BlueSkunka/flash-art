import { Hono } from "hono";
import StatusCode from "../enums/statusCode";
import { Style } from "../models/style";
import { validator } from "hono/validator";
import { identifer } from "../middlewares/identifier";

const api = new Hono().basePath('/styles')

// Récupération des tous les styles
api.get('',
    async (c) => {
        try {
            let filter = {}

            if (c.req.query("name")) {
                filter = {
                    name: { $regex: c.req.query("name"), $options: 'i' }
                }
            }

            const styles = await Style.find(filter)

            return c.json(styles, StatusCode.OK)
        } catch (error: any) {
            return c.json(error._message, StatusCode.BAD_REQUEST)
        }
    })

// Créer un nouveau style
api.post('',
    validator('json', (body, c) => {
        if (undefined === body.name) {
            return c.newResponse('Form is invalid', StatusCode.BAD_REQUEST)
        }

        return body
    }),
    async (c) => {
        const body = c.req.valid('json');
        try {
            let style = new Style(body)
            style = await style.save()

            return c.json(style, StatusCode.CREATED)
        } catch (error: unknown) {
            console.error(error);

            return c.newResponse('An internal server error has occured', StatusCode.INTERNAL_SERVER_ERROR)
        }
    }
)

// Modifier un style
api.put('/:id',
    identifer(),
    validator('json', (body, c) => {
        if (undefined === body.name) {
            return c.newResponse('Form is invalid', StatusCode.BAD_REQUEST)
        }

        return body
    }),
    async (c) => {
        const body = c.req.valid('json')
        const id = c.req.param('id')
        try {
            const style = await Style.findOneAndUpdate({ id }, { ...body })

            if (null === style) {
                return c.newResponse('Opinion not found', StatusCode.BAD_REQUEST)
            }

            return c.json(style, StatusCode.OK)
        } catch (error: unknown) {
            console.error(error);

            return c.newResponse('An internal server error has occured', StatusCode.INTERNAL_SERVER_ERROR);
        }
    }
)

// Supprimer un style
api.delete('/:id', identifer(), async (c) => {
    const id = c.req.param('id')
    try {
        const result = await Style.deleteOne({ id })
        const { deletedCount } = result;

        if (deletedCount) {
            return c.newResponse(null, StatusCode.NO_CONTENT);
        }

        return c.newResponse("Opinion not found", StatusCode.BAD_REQUEST);
    } catch (error: unknown) {
        console.error(error);

        return c.newResponse('An internal error occured', StatusCode.INTERNAL_SERVER_ERROR);
    }
})


export default api