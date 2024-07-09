import { Hono } from 'hono'
import { User } from '../models/user'
import { validator } from "hono/validator";
import { sign } from 'hono/jwt'
import { myEnv } from "../../conf";
import bcrypt from 'bcrypt'
import { isValidObjectId } from "mongoose";
import { guard } from "../middlewares/guard";
import Role from "../enums/role";
import { identifer } from '../middlewares/identifier';

const api = new Hono().basePath('/users');

api.get('',
    guard(Role.ADMIN),
    async (c) => {
        try {
            const users = await User.find({})

            return c.json(users)
        } catch (error: any) {
            return c.json(error._message, 400)
        }
    })

api.get('/:id',
    guard(Role.ADMIN),
    identifer(),
    async (c) => {
        const _id = c.req.param('id')

        if (isValidObjectId(_id)) {
            const user = await User.findOne({ _id })
            return c.json(user)
        }
        return c.json({ msg: 'ObjectId malformed' }, 400)
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
            return c.text('Bad Request', 400)
        }

        return body
    }),
    async (c) => {
        const body = c.req.valid('json')
        try {
            const email = body.email
            const currentUser = await User.findOne({ email })

            if (currentUser !== null) {
                return c.text("User already exist !", 400)
            }

            let user = new User(body)
            user.password = bcrypt.hashSync(user.password, 10)
            user.role = Role.USER
            user.inscriptionDate = new Date()

            user = await user.save()

            user.password = undefined

            return c.json(user)
        } catch (error: any) {
            return c.json(error._message, 400)
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
            return c.text('Bad Request', 400)
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

        const tryToUpdate = await User.findOneAndUpdate(q, updateQuery, { new: true })

        return c.json(tryToUpdate, 200)
    })

api.delete('/:id',
    guard(Role.ADMIN),
    identifer(),
    async (c) => {
        const _id = c.req.param('id')
        const tryToDelete = await User.deleteOne({ _id })
        const { deletedCount } = tryToDelete

        if (deletedCount) {
            return c.newResponse(null, 204)
        }

        return c.json({ msg: "not found" }, 404)

    })


api.post('/register',
    validator('json', (body, c) => {
        if (
            body.email === undefined ||
            body.password === undefined ||
            body.firstname === undefined ||
            body.lastname === undefined
        ) {
            return c.text('Bad Request', 400)
        }

        return body
    }),
    async (c) => {
        const body = c.req.valid('json')
        try {
            const email = body.email
            const currentUser = await User.findOne({ email })

            if (currentUser !== null) {
                return c.text("User already exist !", 400)
            }

            let user = new User(body)
            user.password = bcrypt.hashSync(user.password, 10)
            user.role = Role.USER
            user.inscriptionDate = new Date()

            user = await user.save()

            user.password = undefined

            return c.json(user)
        } catch (error: any) {
            return c.json(error._message, 400)
        }
    })

api.post('/login',
    validator('json', (body, c) => {
        if (body.email === undefined || body.password === undefined) {
            return c.text('Bad Request', 400)
        }

        return body
    }),
    async (c) => {
        const { email, password } = c.req.valid('json')
        const currentUser = await User.findOne({ email }, "password firstname lastname role email");

        if (!currentUser) {
            return c.text('Email or Password invalid', 401)
        }

        const match = bcrypt.compareSync(password, currentUser.password);

        if (!match) {
            return c.text('Email or Password invalid', 401)
        }

        const token = await sign({
            _id: currentUser._id
        },
            myEnv.JWT_CAT_SECRET
        );

        currentUser.password = undefined

        console.log(token)

        return c.json({
            token: token,
            user: currentUser
        }, 200)
    })

export default api