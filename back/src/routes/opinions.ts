import { Hono } from "hono";
import { isValidObjectId } from "mongoose";
import Response from "../enums/response";
import { Opinion } from "../models/opinion";
import { validator } from "hono/validator";

const api = new Hono().basePath('/opinions')

// Gestion des opinions

// Récupérations de tous les opinions d'un tattoeur 
api.get('/tattooer/:id', async (c) => {
    const id = c.req.param('id')
    try {
        if (!isValidObjectId(id)) {
            return c.newResponse('Invalid identifier', Response.BAD_REQUEST)
        }

        const opinions = await Opinion.find({ tattooer: { "_id": id } })
        return c.json(opinions);
    } catch (error: unknown) {
        console.error(error);

        return c.newResponse('An internal server error has occured', Response.INTERNAL_SERVER_ERROR)
    }
})

// Récupérations de tous les opinions d'un utilisateur 
api.get('/user/:id', async (c) => {
    const id = c.req.param('id')
    try {
        if (!isValidObjectId(id)) {
            return c.newResponse('Invalid identifier', Response.BAD_REQUEST)
        }

        const opinions = await Opinion.find({ user: { "_id": id } })
        return c.json(opinions);
    } catch (error: unknown) {
        console.error(error);

        return c.newResponse('An internal server error has occured', Response.INTERNAL_SERVER_ERROR)
    }
})

// Créer un nouvelle opinion
api.post('',
    validator('json', (body, c) => {
        if (undefined === body.user ||
            undefined === body.tattooer ||
            undefined === body.flash ||
            undefined === body.rate
        ) {
            return c.newResponse('Form is invalid', Response.BAD_REQUEST)
        }

        return body
    }),
    async (c) => {
        const body = c.req.valid('json');
        try {
            let opinion = new Opinion(body)
            opinion.createdAt = new Date()
            opinion = await opinion.save()

            return c.json(opinion)
        } catch (error: unknown) {
            console.error(error);

            return c.newResponse('An internal server error has occured', Response.INTERNAL_SERVER_ERROR)
        }
    }
)

// Modifier un commentaire 
api.put('/:id',
    validator('json', (body, c) => {
        if (undefined === body.user ||
            undefined === body.tattooer ||
            undefined === body.flash ||
            undefined === body.rate
        ) {
            return c.newResponse('Form is invalid', Response.BAD_REQUEST)
        }

        return body
    }),
    async (c) => {
        const body = c.req.valid('json')
        const id = c.req.param('id')
        try {
            if (!isValidObjectId(id)) {
                return c.newResponse('Identifier is not valid', Response.BAD_REQUEST)
            }

            const opinion = await Opinion.findOneAndUpdate({ id }, { ...body })

            if (null === opinion) {
                return c.newResponse('Opinion not found', Response.BAD_REQUEST)
            }

            return c.json(opinion)
        } catch (error: unknown) {
            console.error(error);

            return c.newResponse('An internal server error has occured', Response.INTERNAL_SERVER_ERROR);
        }
    }
)

// Supprimer un commentaire 
api.delete('/:id', async (c) => {
    const id = c.req.param('id')
    try {
        if (!isValidObjectId(id)) {
            return c.newResponse('Identifier is not valid', Response.BAD_REQUEST)
        }

        const result = await Opinion.deleteOne({ id })
        const { deletedCount } = result;

        if (deletedCount) {
            return c.newResponse(null, Response.NO_CONTENT);
        }

        return c.newResponse("Opinion not found", Response.BAD_REQUEST);
    } catch (error: unknown) {
        console.error(error);

        return c.newResponse('An internal error occured', Response.INTERNAL_SERVER_ERROR);
    }
})


export default api