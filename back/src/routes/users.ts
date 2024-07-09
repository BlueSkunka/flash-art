import {Hono} from 'hono'
import {User} from '../models/user'
import {validator} from "hono/validator";
import {sign} from 'hono/jwt'
import {myEnv} from "../../conf";
import bcrypt from 'bcrypt'
import {isValidObjectId} from "mongoose";
import {customCors} from "../middlewares/customCors";

const api = new Hono().basePath('/users');

api.get('',
    customCors,
    async (c) => {
    try {
        const users = await User.find({})

        return c.json(users)
    } catch (error: any) {
        return c.json(error._message, 400)
    }
})

api.get('/:id',
    customCors,
    async (c) => {
    const _id = c.req.param('id')

    if (isValidObjectId(_id)) {
        const user = await User.findOne({_id})
        return c.json(user)
    }
    return c.json({msg: 'ObjectId malformed'}, 400)
})

api.post('',
    customCors,
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
            const currentUser = await User.findOne({email})

            if (currentUser !== null) {
                return c.text("User already exist !", 400)
            }

            let user = new User(body)
            user.password = bcrypt.hashSync(user.password, 10)
            user.role = "user"
            user.inscriptionDate = new Date()

            user = await user.save()

            user.password = undefined

            return c.json(user)
        } catch (error: any) {
            return c.json(error._message, 400)
        }
    })

api.put('/:id',
    customCors,
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

        const tryToUpdate = await User.findOneAndUpdate(q, updateQuery, {new: true})

        return c.json(tryToUpdate, 200)
    })

api.delete('/:id',
    customCors,
    async (c) => {
    const _id = c.req.param('id')
    const tryToDelete = await User.deleteOne({_id})
    const {deletedCount} = tryToDelete

    if (deletedCount) {
        return c.newResponse(null, 204)
    }

    return c.json({msg: "not found"}, 404)

})


api.post('/register',
    customCors,
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
            const currentUser = await User.findOne({email})

            if (currentUser !== null) {
                return c.text("User already exist !", 400)
            }

            let user = new User(body)
            user.password = bcrypt.hashSync(user.password, 10)
            user.role = "user"
            user.inscriptionDate = new Date()

            user = await user.save()

            user.password = undefined

            return c.json(user)
        } catch (error: any) {
            return c.json(error._message, 400)
        }
    })

api.post('/login',
    customCors,
    validator('json', (body, c) => {
        if (body.email === undefined || body.password === undefined) {
            return c.text('Bad Request', 400)
        }

        return body
    }),
    async (c) => {
        const {email, password} = c.req.valid('json')

        const currentUser = await User.findOne({email})
        if (!currentUser) {
            return c.text('Email or Password invalid', 401)
        }

        const match = bcrypt.compareSync(password, currentUser.password);

        if (!match) {
            return c.text('Email or Password invalid', 401)
        }

        const token = await sign({
                _id: currentUser._id,
                firstname: currentUser.firstname,
                lastname: currentUser.lastname,
                role: currentUser.role,
                inscriptionDate: currentUser.inscriptionDate,
            },
            myEnv.JWT_CAT_SECRET
        );

        return c.json({token: token}, 200)
    })

export default api