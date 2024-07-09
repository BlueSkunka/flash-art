import { Hono } from "hono";
import { Flash } from "../models/flash";
import StatusCode from "../enums/statusCode";
import { validator } from "hono/validator";
import { isValidObjectId } from "mongoose";
import { identifer } from "../middlewares/identifier";

const api = new Hono().basePath('/flashes')

// Gestion des flashs

// Récupération de tous les flash sans réservation 
api.get('', async (c) => {
    try {
        const flashes = await Flash.find({ user: { $exists: false, $eq: null } });

        return c.json(flashes, StatusCode.OK)
    } catch (error: unknown) {
        console.error(error);

        return c.newResponse("An internal error has occured", StatusCode.INTERNAL_SERVER_ERROR);
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
            return c.newResponse("Form is invalid", StatusCode.BAD_REQUEST);
        }

        try {
            new Date(body.flashDate);
        } catch (error: unknown) {
            return c.newResponse("Date format is invalid", StatusCode.BAD_REQUEST)
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

            return c.newResponse('AN internal servor error occured', StatusCode.INTERNAL_SERVER_ERROR)
        }
    }
)

api.get('/:id', identifer(), async (c) => {
    const id = c.req.param('id')
    try {
        if (!isValidObjectId(id)) {
            return c.newResponse('Identifier is not valid', StatusCode.BAD_REQUEST)
        }

        const flash = await Flash.findOne({ "_id": id })

        if (null == flash) {
            return c.newResponse('Flash not found', StatusCode.BAD_REQUEST)
        }

        return c.json(flash, StatusCode.OK)
    } catch (error: unknown) {
        console.error(error);

        return c.newResponse('An internal server error has occured', StatusCode.INTERNAL_SERVER_ERROR)
    }
})

api.put('/:id',
    identifer(),
    validator('json', (body, c) => {
        if (undefined === body.place ||
            undefined === body.flashDate ||
            undefined === body.tattooer ||
            undefined === body.name ||
            undefined === body.description ||
            undefined === body.price
        ) {
            return c.newResponse("Form is invalid", StatusCode.BAD_REQUEST);
        }

        try {
            new Date(body.flashDate);
        } catch (error: unknown) {
            return c.newResponse("Date format is invalid", StatusCode.BAD_REQUEST)
        }

        return body
    }),
    async (c) => {
        const body = c.req.valid('json');
        const id = c.req.param('id');

        try {
            if (!isValidObjectId(id)) {
                return c.newResponse('Identifier is not valid', StatusCode.BAD_REQUEST)
            }

            const flash = await Flash.findOneAndUpdate({ id }, { ...body })

            if (null === flash) {
                return c.newResponse('Flash not found', StatusCode.BAD_REQUEST)
            }

            return c.json(flash, StatusCode.OK)
        } catch (error: unknown) {
            console.error(error);

            return c.newResponse('An internal server error has occured', StatusCode.INTERNAL_SERVER_ERROR);
        }
    }
)

api.delete('/:id', identifer(), async (c) => {
    const id = c.req.param('id')
    try {
        if (!isValidObjectId(id)) {
            return c.newResponse('Identifier is not valid', StatusCode.BAD_REQUEST)
        }

        const result = await Flash.deleteOne({ id })
        const { deletedCount } = result;

        if (deletedCount) {
            return c.newResponse(null, StatusCode.NO_CONTENT);
        }

        return c.newResponse("Flash not found", StatusCode.BAD_REQUEST);
    } catch (error: unknown) {
        console.error(error);

        return c.newResponse('An internal error occured', StatusCode.INTERNAL_SERVER_ERROR);
    }
})

export default api