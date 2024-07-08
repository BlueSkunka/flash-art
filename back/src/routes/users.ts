import {Hono} from 'hono'
import {User} from '../models/user'
import {validator} from "hono/validator";
import {sign} from 'hono/jwt'
import {myEnv} from "../../conf";
import bcrypt from 'bcrypt'

const api = new Hono().basePath('/users');

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
            const currentUser = await User.findOne({email})

            if (currentUser !== null) {
                return c.text("User already exist !", 400)
            }

            const newUser = new User(body)
            newUser.password = bcrypt.hashSync(newUser.password, 10)
            newUser.role = "user"
            newUser.inscriptionDate = new Date()
            const saveNewUser = await newUser.save()

            saveNewUser.password = undefined

            return c.json(saveNewUser)
        } catch (error: unknown) {
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

        return c.json({token: token})
    })

export default api