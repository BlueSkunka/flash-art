import { Hono } from "hono";
import { Flash } from "../models/flash";
import Response from "../enums/response";
import { validator } from "hono/validator";
import { isValidObjectId } from "mongoose";

const api = new Hono().basePath('/flashes')

// Gestion des flashs

// Récupération de tous les flash sans réservation 
api.get('', async (c) => {
    try {
        const flashes = await Flash.find({ user: { $exists: false, $eq: null } });

        return c.json(flashes, Response.OK)
    } catch (error: unknown) {
        console.error(error);

        return c.newResponse("An internal error has occured", Response.INTERNAL_SERVER_ERROR);
    }
})

api.post('',
    validator('json', (body, c) => {
        if (undefined === body.place ||
            undefined === body.flashDate ||
            undefined === body.tattooer ||
            undefined === body.name ||
            undefined === body.description ||
            undefined === body.price
        ) {
            return c.newResponse("Form is invalid", Response.BAD_REQUEST);
        }

        try {
            new Date(body.flashDate);
        } catch (error: unknown) {
            return c.newResponse("Date format is invalid", Response.BAD_REQUEST)
        }

        return body
    }),
    async (c) => {
        const body = c.req.valid('json');
        try {
            let flash = new Flash(body)
            flash = await flash.save()

            return c.json(flash)
        } catch (error: unknown) {
            console.error(error);

            return c.newResponse('AN internal servor error occured', Response.INTERNAL_SERVER_ERROR)
        }
    }
)

api.get('/:id', async (c) => {
    const id = c.req.param('id')
    try {
        if (!isValidObjectId(id)) {
            return c.newResponse('Identifier is not valid', Response.BAD_REQUEST)
        }

        const flash = await Flash.findOne({ "_id": id })

        if (null == flash) {
            return c.newResponse('Flash not found', Response.BAD_REQUEST)
        }

        return c.json(flash, Response.OK)
    } catch (error: unknown) {
        console.error(error);

        return c.newResponse('An internal server error has occured', Response.INTERNAL_SERVER_ERROR)
    }
})

api.put('/:id',
    validator('json', (body, c) => {
        if (undefined === body.place ||
            undefined === body.flashDate ||
            undefined === body.tattooer ||
            undefined === body.name ||
            undefined === body.description ||
            undefined === body.price
        ) {
            return c.newResponse("Form is invalid", Response.BAD_REQUEST);
        }

        try {
            new Date(body.flashDate);
        } catch (error: unknown) {
            return c.newResponse("Date format is invalid", Response.BAD_REQUEST)
        }

        return body
    }),
    async (c) => {
        const body = c.req.valid('json');
        const id = c.req.param('id');

        try {
            const flash = await Flash.findOneAndUpdate({ id }, { ...body })

            if (null === flash) {
                return c.newResponse('Flash not found', Response.BAD_REQUEST)
            }

            return c.json(flash, Response.OK)
        } catch (error: unknown) {
            console.error(error);

            return c.newResponse('An internal server error has occured', Response.INTERNAL_SERVER_ERROR);
        }
    }
)

api.delete('/:id', async (c) => {
    const id = c.req.param('id')
    try {
        if (!isValidObjectId(id)) {
            return c.newResponse('Identifier is not valid', Response.BAD_REQUEST)
        }

        const result = await Flash.deleteOne({ id })
        const { deletedCount } = result;

        if (deletedCount) {
            return c.newResponse(null, Response.NO_CONTENT);
        }

        return c.newResponse("Tattooer not found", Response.BAD_REQUEST);
    } catch (error: unknown) {
        console.error(error);

        return c.newResponse('An internal error occured', Response.INTERNAL_SERVER_ERROR);
    }
})

export default api