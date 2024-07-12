import { Hono } from 'hono'
import { User } from '../models/user'
import { validator } from "hono/validator";
import { sign } from 'hono/jwt'
import { myEnv } from "../../conf";
import bcrypt from 'bcrypt'
import { guard } from "../middlewares/guard";
import Role from "../enums/role";
import { identifer } from '../middlewares/identifier';
import StatusCode from "../enums/statusCode";

const api = new Hono().basePath('/users');

api.get('',
    guard(Role.ADMIN),
    async (c) => {
        try {
            const users = await User.find({})

            return c.json(users, StatusCode.OK)
        } catch (error: any) {
            console.error(error);

            return c.json(error._message, StatusCode.INTERNAL_SERVER_ERROR)
        }
    })

api.get('/:id',
    guard(Role.ADMIN),
    identifer(),
    async (c) => {
        const _id = c.req.param('id')

        try {
            const user = await User.findOne({ _id })
            return c.json(user)
        } catch (error: unknown) {
            console.error(error);

            return c.json("An internal server error has occured", StatusCode.INTERNAL_SERVER_ERROR)
        }
    })

api.post('',
    guard(Role.ADMIN),
    validator('json', (body, c) => {
        if (
            body.email === undefined ||
            body.password === undefined ||
            body.firstname === undefined ||
            body.lastname === undefined
        ) {
            return c.text('Form is invalid', StatusCode.BAD_REQUEST)
        }

        return body
    }),
    async (c) => {
        const body = c.req.valid('json')
        try {
            const email = body.email
            const currentUser = await User.findOne({ email })

            if (currentUser !== null) {
                return c.text("User already exist !", StatusCode.CONFLICT)
            }

            let user = new User(body)
            user.password = bcrypt.hashSync(user.password, 10)
            user.role = Role.USER
            user.inscriptionDate = new Date()

            user = await user.save()

            user.password = undefined

            return c.json(user, StatusCode.CREATED)
        } catch (error: any) {
            console.error(error);

            return c.json("An internal server error has occured", StatusCode.INTERNAL_SERVER_ERROR)
        }
    })

api.put('/:id',
    guard(Role.ADMIN),
    identifer(),
    validator('json', (body, c) => {
        if (
            body.email === undefined ||
            body.password === undefined ||
            body.firstname === undefined ||
            body.lastname === undefined
        ) {
            return c.text('Bad Request', StatusCode.BAD_REQUEST)
        }

        return body
    }),
    async (c) => {
        const body = c.req.valid('json')
        const _id = c.req.param('id')

        const q = {
            _id
        }

        if (body.password !== undefined && body.password.length === 0) {
            body.password = undefined
        } else {
            body.password = bcrypt.hashSync(body.password, 10)
        }

        const updateQuery = {
            ...body
        }

        try {
            const tryToUpdate = await User.findOneAndUpdate(q, updateQuery, { new: true })

            return c.json(tryToUpdate, StatusCode.OK)
        } catch (error: unknown) {
            console.error(error);

            return c.newResponse('An internal server error has occured', StatusCode.INTERNAL_SERVER_ERROR)
        }

    })

api.delete('/:id',
    guard(Role.ADMIN),
    identifer(),
    async (c) => {
        const _id = c.req.param('id')

        try {
            const tryToDelete = await User.deleteOne({ _id })
            const { deletedCount } = tryToDelete

            if (deletedCount) {
                return c.newResponse(null, StatusCode.NO_CONTENT)
            }
        } catch (error: unknown) {
            console.error(error);

            return c.newResponse('An internal server error has occured', StatusCode.INTERNAL_SERVER_ERROR)
        }

        return c.json("User not found", StatusCode.NOT_FOUND)

    })


api.post('/register',
    validator('json', (body, c) => {
        if (
            body.email === undefined ||
            body.password === undefined ||
            body.firstname === undefined ||
            body.lastname === undefined
        ) {
            return c.text('Form is invalid', StatusCode.BAD_REQUEST)
        }

        return body
    }),
    async (c) => {
        const body = c.req.valid('json')
        try {
            const email = body.email
            const currentUser = await User.findOne({ email })

            if (currentUser !== null) {
                return c.text("User already exist !", StatusCode.CONFLICT)
            }

            let user = new User(body)
            user.password = bcrypt.hashSync(user.password, 10)
            user.role = Role.USER
            user.inscriptionDate = new Date()

            user = await user.save()

            user.password = undefined

            return c.json(user, StatusCode.CREATED)
        } catch (error: any) {
            console.log(error)
            return c.json(error._message, StatusCode.INTERNAL_SERVER_ERROR)
        }
    })

api.post('/login',
    validator('json', (body, c) => {
        if (body.email === undefined || body.password === undefined) {
            return c.text('Form is invalid', StatusCode.BAD_REQUEST)
        }

        return body
    }),
    async (c) => {
        const { email, password } = c.req.valid('json')
        try {
            const currentUser = await User.findOne({ email }, "password firstname lastname role email");

            if (!currentUser) {
                return c.text('Email or Password invalid', StatusCode.UNAUTHORIZED)
            }

            const match = bcrypt.compareSync(password, currentUser.password);

            if (!match) {
                return c.text('Email or Password invalid', StatusCode.UNAUTHORIZED)
            }

            const token = await sign({
                _id: currentUser._id
            },
                myEnv.JWT_CAT_SECRET
            );

            currentUser.password = undefined

            return c.json({
                token: token,
                user: currentUser
            }, StatusCode.OK)
        } catch (error: unknown) {
            console.log(error)
            return c.json("An internal server error has occured", StatusCode.INTERNAL_SERVER_ERROR)
        }
    })

export default api