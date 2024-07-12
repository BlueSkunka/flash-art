import { Hono } from "hono";
import { Flash } from "../models/flash";
import StatusCode from "../enums/statusCode";
import { validator } from "hono/validator";
import { identifer } from "../middlewares/identifier";

const api = new Hono().basePath('/flashes')

// Gestion des flashs

// Récupération de tous les flash sans réservation 
api.get('', async (c) => {
    const { long, lat, maxRange, tattooer, favourite, minDate, maxDate, minPrice, maxPrice, booked, user } = c.req.query()
    const styles = c.req.queries('style')

    try {
        const query = {}

        // Location
        if (undefined !== long && undefined !== lat && undefined !== maxRange) {
            query['location'] = {
                "$near": {
                    "$maxDistance": maxRange,
                    "$geometry": {
                        "type": "Point",
                        "coordinates": [long, lat]
                    }
                },
            }
        }

        // Tattoer
        if (undefined !== tattooer) {
            query["tattooer"] = tattooer
        }

        // Styles
        if (undefined !== styles) {
            query["styles"] = { name: { $regex: styles, $options: 'i' } }
            //     query["match"] = {
            //         $expr: {
            //             $gt: [{
            //                 $size: {
            //                     $reduce: {
            //                         input: styles,
            //                         initialValue: [],
            //                         in: {
            //                             $concatArrays: [
            //                                 "$$value",
            //                                 {
            //                                     $filter: {
            //                                         input: "$name",
            //                                         as: "name",
            //                                         cond: { $regexMatch: { input: "$$this", regex: "$$name" } }
            //                                     }
            //                                 }
            //                             ]
            //                         }
            //                     }
            //                 }
            //             }, 0]
            //         }
            //     }
        }

        // Favoris
        if (undefined !== favourite) {
            // Query for user favourite tattooers
        }

        // MinDate
        if (undefined !== minDate) {
            query["flashDate"] = { "$gte": new Date(minDate) }
        }

        // Max date
        if (undefined !== maxDate) {
            query["flashDate"] = { "$lte": new Date(maxDate) }
        }

        // Min price
        if (undefined !== minPrice) {
            query["price"] = { "$gte": minPrice }
        }

        // Max price
        if (undefined !== maxPrice) {
            query["price"] = { "$lte": maxPrice }
        }

        // booked
        if (undefined !== booked && JSON.parse(booked)) {
            query["user"] = { $exists: true, $ne: null }
        } else if (undefined !== user) {
            query["user"] = user
        } else {
            query["user"] = { $exists: false, $eq: null }
        }

        const flashes = await Flash.find(query).populate('tattooer', 'surname place').populate('user', 'lastname firstname')

        return c.json(flashes, StatusCode.OK)
    } catch (error: unknown) {
        console.error(error);

        return c.newResponse("An internal error has occured", StatusCode.INTERNAL_SERVER_ERROR);
    }
})

// Création d'un flash
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

            return c.json(flash, StatusCode.CREATED)
        } catch (error: unknown) {
            console.error(error);

            return c.newResponse('AN internal servor error occured', StatusCode.INTERNAL_SERVER_ERROR)
        }
    }
)

// Récupérer un flash
api.get('/:id', identifer(), async (c) => {
    const _id = c.req.param('id')
    try {
        const flash = await Flash.findOne({ _id }).populate('tattooer', 'surname place').populate('user', 'lastname firstname')

        if (null == flash) {
            return c.newResponse('Flash not found', StatusCode.NOT_FOUND)
        }

        return c.json(flash, StatusCode.OK)
    } catch (error: unknown) {
        console.error(error);

        return c.newResponse('An internal server error has occured', StatusCode.INTERNAL_SERVER_ERROR)
    }
})

// Modification d'un flash 
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
        const _id = c.req.param('id');

        try {
            const flash = await Flash.findOneAndUpdate({ _id }, { ...body }, { new: true })

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

// Suppression d'un flash
api.delete('/:id', identifer(), async (c) => {
    const _id = c.req.param('id')
    try {
        const result = await Flash.deleteOne({ _id })

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