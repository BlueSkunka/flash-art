import {Hono} from 'hono';
import {validator} from "hono/validator";
import {isValidObjectId} from 'mongoose';
import {Tattooer} from '../models/tattooer';
import {sign} from 'hono/jwt'
import {myEnv} from "../../conf";
import bcrypt from 'bcrypt'
import StatusCode from '../enums/statusCode';
import Role from '../enums/role';
import { identifer } from '../middlewares/identifier';


const api = new Hono().basePath('/tattooers');

// Gestion des tattoueurs

// Récupération de tous les tattoueurs 
api.get('', async (c) => {
    try {
        const tattoers = await Tattooer.find({});

        return c.json(tattoers, StatusCode.OK);
    } catch (error: unknown) {
        console.error(error);

        return c.newResponse("An internal error has occurred", StatusCode.INTERNAL_SERVER_ERROR);
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
            return c.newResponse('Form is invalid', StatusCode.BAD_REQUEST)
        }

        return body
    }),
    async (c) => {
        const body = c.req.valid('json');
        try {
            const email = body.email;
            const existingUser = await Tattooer.findOne({ email });

            if (null !== existingUser) {
                return c.newResponse('Tattoer already exist !', StatusCode.CONFLICT);
            }

            const tattoer = new Tattooer(body);
            tattoer.password = bcrypt.hashSync(tattoer.password, 10);
            tattoer.role = Role.TATTOOER;
            tattoer.inscriptionDate = new Date();

            const saveTattooer = await tattoer.save();
            saveTattooer.password = undefined;

            return c.json(saveTattooer, 201);
        } catch (error: unknown) {
            console.log(error)
            return c.newResponse("An internal error has occurred", StatusCode.INTERNAL_SERVER_ERROR);
        }
    }
)

// Login du tattoueur
api.post('/login',
    validator('json', (body, c) => {
        if (body.email === undefined || body.password === undefined) {
            return c.newResponse('Bad Request', StatusCode.BAD_REQUEST)
        }

        return body
    }),
    async (c) => {
        const { email, password } = c.req.valid('json')

        const tattoer = await Tattooer.findOne({ email })

        if (!tattoer) {
            return c.text('Email or Password invalid', StatusCode.UNAUTHORIZED)
        }

        const match = bcrypt.compareSync(password, tattoer.password);

        if (!match) {
            return c.text('Email or Password invalid', StatusCode.UNAUTHORIZED)
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
api.put('/:id', identifer(), async (c) => {
    const body = await c.req.json();
    const id = c.req.param('id');

    try {
        if (!isValidObjectId(id)) {
            return c.newResponse("Identifier is not valid", StatusCode.INTERNAL_SERVER_ERROR);
        }

        const tattoer = await Tattooer.findOneAndUpdate({ id }, { ...body }, { new: false });

        if (null === tattoer) {
            return c.newResponse('Tattoer not found', StatusCode.BAD_REQUEST);
        }

        return c.json(tattoer, 200);
    } catch (error: unknown) {
        console.error(error);

        return c.newResponse('An internal error occured', StatusCode.INTERNAL_SERVER_ERROR);
    }
})

// Voir le profil d'un tattoueur
api.get('/:id', identifer(), async (c) => {
    const id = c.req.param('id');
    try {
        if (!isValidObjectId(id)) {
            return c.newResponse("Identifier is not valid", StatusCode.BAD_REQUEST)
        }

        const tattooer = await Tattooer.findOne({ id })

        if (null === tattooer) {
            return c.newResponse('Tattooer not found', StatusCode.BAD_REQUEST);
        }

        return c.json(tattooer, StatusCode.OK)
    } catch (error: unknown) {
        console.error(error);

        return c.newResponse('An internal error occured', StatusCode.INTERNAL_SERVER_ERROR);
    }
})

// Supprimer tattoueur
api.delete('/:id', identifer(), async (c) => {
    const id = c.req.param('id')
    try {
        if (!isValidObjectId(id)) {
            return c.newResponse("Identifier is not valid", StatusCode.BAD_REQUEST)
        }

        const tattoer = await Tattooer.deleteOne({ id });
        const { deletedCount } = tattoer;

        if (deletedCount) {
            return c.newResponse(null, StatusCode.NO_CONTENT);
        }

        return c.newResponse("Tattooer not found", StatusCode.BAD_REQUEST);
    } catch (error: unknown) {
        console.error(error);

        return c.newResponse('An internal error occured', StatusCode.INTERNAL_SERVER_ERROR);
    }
})

export default api;