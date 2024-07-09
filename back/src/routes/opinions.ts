import { Hono } from "hono";
import { isValidObjectId } from "mongoose";
import StatusCode from "../enums/statusCode";
import { Opinion } from "../models/opinion";
import { validator } from "hono/validator";
import { identifer } from "../middlewares/identifier";

const api = new Hono().basePath('/opinions')

// Gestion des opinions

// Récupérations de tous les opinions d'un tattoeur 
api.get('/tattooer/:id', identifer(), async (c) => {
    const id = c.req.param('id')
    try {
        if (!isValidObjectId(id)) {
            return c.newResponse('Invalid identifier', StatusCode.BAD_REQUEST)
        }

        const opinions = await Opinion.find({ tattooer: { "_id": id } })
        return c.json(opinions);
    } catch (error: unknown) {
        console.error(error);

        return c.newResponse('An internal server error has occured', StatusCode.INTERNAL_SERVER_ERROR)
    }
})

// Récupérations de tous les opinions d'un utilisateur 
api.get('/user/:id', identifer(), async (c) => {
    const id = c.req.param('id')
    try {
        if (!isValidObjectId(id)) {
            return c.newResponse('Invalid identifier', StatusCode.BAD_REQUEST)
        }

        const opinions = await Opinion.find({ user: { "_id": id } })
        return c.json(opinions);
    } catch (error: unknown) {
        console.error(error);

        return c.newResponse('An internal server error has occured', StatusCode.INTERNAL_SERVER_ERROR)
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
            return c.newResponse('Form is invalid', StatusCode.BAD_REQUEST)
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

            return c.newResponse('An internal server error has occured', StatusCode.INTERNAL_SERVER_ERROR)
        }
    }
)

// Modifier un commentaire 
api.put('/:id',
    identifer(),
    validator('json', (body, c) => {
        if (undefined === body.user ||
            undefined === body.tattooer ||
            undefined === body.flash ||
            undefined === body.rate
        ) {
            return c.newResponse('Form is invalid', StatusCode.BAD_REQUEST)
        }

        return body
    }),
    async (c) => {
        const body = c.req.valid('json')
        const id = c.req.param('id')
        try {
            if (!isValidObjectId(id)) {
                return c.newResponse('Identifier is not valid', StatusCode.BAD_REQUEST)
            }

            const opinion = await Opinion.findOneAndUpdate({ id }, { ...body })

            if (null === opinion) {
                return c.newResponse('Opinion not found', StatusCode.BAD_REQUEST)
            }

            return c.json(opinion)
        } catch (error: unknown) {
            console.error(error);

            return c.newResponse('An internal server error has occured', StatusCode.INTERNAL_SERVER_ERROR);
        }
    }
)

// Supprimer un commentaire 
api.delete('/:id', identifer(), async (c) => {
    const id = c.req.param('id')
    try {
        if (!isValidObjectId(id)) {
            return c.newResponse('Identifier is not valid', StatusCode.BAD_REQUEST)
        }

        const result = await Opinion.deleteOne({ id })
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