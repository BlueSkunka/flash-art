import { Hono } from 'hono';
import { validator } from "hono/validator";
import { isValidObjectId } from 'mongoose';
import { Tattooer } from '../models/tattooer';
import { sign } from 'hono/jwt'
import { myEnv } from "../../conf";
import bcrypt from 'bcrypt'
import Response from '../enums/response';


const api = new Hono().basePath('/tattooers');

// Gestion des tattoueurs

// Récupération de tous les tattoueurs 
api.get('', async (c) => {
    try {
        const tattoers = await Tattooer.find({}, {}, { "populate": "tattoers" });

        return c.json(tattoers, Response.OK);
    } catch (error: unknown) {
        return c.newResponse("An internal error has occurred", Response.INTERNAL_SERVER_ERROR);
    }
})

// Inscription du tattoueur
api.post('/register',
    validator('json', (body, c) => {
        if (
            body.email === undefined ||
            body.password === undefined ||
            body.firstname === undefined ||
            body.lastname === undefined ||
            body.surname === undefined ||
            body.place === undefined
        ) {
            return c.newResponse('Form is invalid', Response.BAD_REQUEST)
        }

        return body
    }),
    async (c) => {
        const body = c.req.valid('json');
        try {
            const email = body.email;
            const existingUser = await Tattooer.findOne({ email });

            if (null !== null) {
                return c.newResponse('Tattoer already exist !', Response.BAD_REQUEST);
            }

            const tattoer = new Tattooer(body);
            tattoer.password = bcrypt.hashSync(tattoer.password, 10);
            tattoer.role = Role.TATTOER;
            tattoer.inscriptionDate = new Date();

            const saveTattooer = await tattoer.save();
            saveTattooer.password = undefined;

            return c.json(saveTattooer);
        } catch (error: unknown) {
            return c.newResponse("An internal error has occurred", Response.INTERNAL_SERVER_ERROR);
        }
    }
)

// Login du tattoueur
api.post('/login',
    validator('json', (body, c) => {
        if (body.email === undefined || body.password === undefined) {
            return c.newResponse('Bad Request', Response.BAD_REQUEST)
        }

        return body
    }),
    async (c) => {
        const { email, password } = c.req.valid('json')

        const tattoer = await Tattooer.findOne({ email })

        if (!tattoer) {
            return c.text('Email or Password invalid', Response.UNAUTHORIZED)
        }

        const match = bcrypt.compareSync(password, tattoer.password);

        if (!match) {
            return c.text('Email or Password invalid', Response.UNAUTHORIZED)
        }

        const token = await sign({
            _id: tattoer._id,
            firstname: tattoer.firstname,
            lastname: tattoer.lastname,
            role: tattoer.role,
            inscriptionDate: tattoer.inscriptionDate,
        },
            myEnv.JWT_CAT_SECRET
        );

        return c.json({ token: token })
    }
)

// Mise à jour du profil tattoueur
api.put('/:id', async (c) => {
    const body = await c.req.json();
    const id = c.req.param('id');

    try {
        if (!isValidObjectId(id)) {
            return c.newResponse("Identifier is not valid", Response.INTERNAL_SERVER_ERROR);
        }

        const tattoer = await Tattooer.findOneAndUpdate({ id }, { ...body }, { new: false });

        if (null === tattoer) {
            return c.newResponse('Tattoer not found', Response.BAD_REQUEST);
        }

        return c.json(tattoer, 200);
    } catch (error: unknown) {
        return c.newResponse('An internal error occured', Response.INTERNAL_SERVER_ERROR);
    }
})

// Voir le profil d'un tattoueur
api.get('/:id', async (c) => {
    const id = c.req.param('id');
    try {
        if (!isValidObjectId(id)) {
            return c.newResponse("Identifier is not valid", Response.BAD_REQUEST)
        }

        const tattooer = await Tattooer.findOne({ id })

        if (null === tattooer) {
            return c.newResponse('Tattooer not found', Response.BAD_REQUEST);
        }

        return c.json(tattooer, Response.OK)
    } catch (error: unknown) {
        return c.newResponse('An internal error occured', Response.INTERNAL_SERVER_ERROR);
    }
})

// Supprimer tattoueur
api.delete('/:id', async (c) => {
    const id = c.req.param('id')
    try {
        if (!isValidObjectId(id)) {
            return c.newResponse("Identifier is not valid", Response.BAD_REQUEST)
        }

        const tattoer = await Tattooer.deleteOne({ id });
        const { deletedCount } = tattoer;

        if (deletedCount) {
            return c.newResponse(null, Response.NO_CONTENT);
        }

        return c.newResponse("Tattooer not found", Response.BAD_REQUEST);
    } catch (error: unknown) {

    }
})

export default api;