import { Hono } from "hono";
import { DbConnect } from "./db";
import bcrypt from 'bcrypt'
import Role from "./enums/role";
import mongoose from "mongoose";
import { User } from "./models/user";
import { Tattooer } from "./models/tattooer";
import { Flash } from "./models/flash";

const { ObjectId } = mongoose.Types;

const app = new Hono()
await DbConnect()

const pwd = bcrypt.hashSync('password', 10)

const admins = [
    {
        _id: '000000209e1b9a723c7b2da9',
        email: 'admin@admin.com',
        password: pwd,
        lastname: 'Rome',
        firstname: 'Mathis',
        role: Role.ADMIN,
        inscriptionDate: new Date()
    }
]

const users = [
    {
        _id: '000000209e1b9a723c7b2daa',
        email: 'alice@smith.com',
        password: pwd,
        lastname: 'Smith',
        firstname: 'Alice',
        role: Role.USER,
        inscriptionDate: new Date()
    },
    {
        _id: '000000209e1b9a723c7b2dab',
        email: 'bob@brown.com',
        password: pwd,
        lastname: 'Brown',
        firstname: 'Bob',
        role: Role.USER,
        inscriptionDate: new Date()
    },
    {
        _id: '000000209e1b9a723c7b2dac',
        email: 'carol@davis.com',
        password: pwd,
        lastname: 'Davis',
        firstname: 'Carol',
        role: Role.USER,
        inscriptionDate: new Date()
    }
];

const tattooers_id = [
    '000000209e1b9a723c7b2dad',
    '000000209e1b9a723c7b2dae',
    '000000209e1b9a723c7b2daf',
    '000000209e1b9a723c7b2db0',
    '000000209e1b9a723c7b2db1',
    '000000209e1b9a723c7b2db2',
    '000000209e1b9a723c7b2db3',
    '000000209e1b9a723c7b2db4',
    '000000209e1b9a723c7b2db5',
    '000000209e1b9a723c7b2db6',
    '000000209e1b9a723c7b2dad',
    '000000209e1b9a723c7b2dae',
    '000000209e1b9a723c7b2daf',
    '000000209e1b9a723c7b2db0',
    '000000209e1b9a723c7b2db1',
    '000000209e1b9a723c7b2db2',
    '000000209e1b9a723c7b2db3',
    '000000209e1b9a723c7b2db4',
    '000000209e1b9a723c7b2db5',
    '000000209e1b9a723c7b2db6'
]

const tattooers = [
    {
        _id: '000000209e1b9a723c7b2dad',
        email: 'alice@example.com',
        password: pwd,
        lastname: 'Smith',
        firstname: 'Alice',
        role: Role.TATTOOER,
        inscriptionDate: new Date(),
        surname: 'Ali',
        place: 'Wonderland Tattoo',
        links: [
            {
                name: 'Instagram',
                url: 'https://www.instagram.com/alice'
            }
        ],
        styles: [
            { name: 'Realism' },
            { name: 'Blackwork' },
        ],
        description: 'Specializes in realism and blackwork styles.',
        location: {
            type: 'Point',
            coordinates: [2.3522, 48.8566] // Paris, France
        }
    },
    {
        _id: '000000209e1b9a723c7b2dae',
        email: 'bob@example.com',
        password: pwd,
        lastname: 'Brown',
        firstname: 'Bob',
        role: Role.TATTOOER,
        inscriptionDate: new Date(),
        surname: 'Bobby',
        place: 'Urban Ink',
        links: [
            {
                name: 'Facebook',
                url: 'https://www.facebook.com/bob'
            }
        ],
        styles: [
            { name: 'Old School' },
            { name: 'Neo Traditional' },
        ],
        description: 'Expert in old school and neo traditional designs.',
        location: {
            type: 'Point',
            coordinates: [5.3698, 43.2965] // Marseille, France
        }
    },
    {
        _id: '000000209e1b9a723c7b2daf',
        email: 'carol@example.com',
        password: pwd,
        lastname: 'Davis',
        firstname: 'Carol',
        role: Role.TATTOOER,
        inscriptionDate: new Date(),
        surname: 'Caz',
        place: 'Modern Tattoo',
        links: [
            {
                name: 'Twitter',
                url: 'https://www.twitter.com/carol'
            }
        ],
        styles: [
            { name: 'Watercolor' },
            { name: 'Geometric' },
        ],
        description: 'Loves creating watercolor and geometric tattoos.',
        location: {
            type: 'Point',
            coordinates: [4.8357, 45.7640] // Lyon, France
        }
    },
    {
        _id: '000000209e1b9a723c7b2db0',
        email: 'dave@example.com',
        password: pwd,
        lastname: 'Evans',
        firstname: 'Dave',
        role: Role.TATTOOER,
        inscriptionDate: new Date(),
        surname: 'Davy',
        place: 'Inked Up',
        links: [
            {
                name: 'LinkedIn',
                url: 'https://www.linkedin.com/in/dave'
            }
        ],
        styles: [
            { name: 'Minimalist' },
            { name: 'Linework' },
        ],
        description: 'Focuses on minimalist and linework tattoos.',
        location: {
            type: 'Point',
            coordinates: [1.4442, 43.6047] // Toulouse, France
        }
    },
    {
        _id: '000000209e1b9a723c7b2db1',
        email: 'eve@example.com',
        password: pwd,
        lastname: 'Fisher',
        firstname: 'Eve',
        role: Role.TATTOOER,
        inscriptionDate: new Date(),
        surname: 'Evie',
        place: 'Tattoo Studio',
        links: [
            {
                name: 'Instagram',
                url: 'https://www.instagram.com/eve'
            }
        ],
        styles: [
            { name: 'Dotwork' },
            { name: 'Tribal' },
        ],
        description: 'Skilled in dotwork and tribal styles.',
        location: {
            type: 'Point',
            coordinates: [7.2620, 43.7102] // Nice, France
        }
    },
    {
        _id: '000000209e1b9a723c7b2db2',
        email: 'frank@example.com',
        password: pwd,
        lastname: 'Green',
        firstname: 'Frank',
        role: Role.TATTOOER,
        inscriptionDate: new Date(),
        surname: 'Franky',
        place: 'Art Tattoo',
        links: [
            {
                name: 'Facebook',
                url: 'https://www.facebook.com/frank'
            }
        ],
        styles: [
            { name: 'Surrealism' },
            { name: 'Abstract' },
        ],
        description: 'Passionate about surrealism and abstract tattoos.',
        location: {
            type: 'Point',
            coordinates: [-1.5536, 47.2184] // Nantes, France
        }
    },
    {
        _id: '000000209e1b9a723c7b2db3',
        email: 'grace@example.com',
        password: pwd,
        lastname: 'Harris',
        firstname: 'Grace',
        role: Role.TATTOOER,
        inscriptionDate: new Date(),
        surname: 'Gracie',
        place: 'Tattoo Haven',
        links: [
            {
                name: 'Twitter',
                url: 'https://www.twitter.com/grace'
            }
        ],
        styles: [
            { name: 'New School' },
            { name: 'Illustrative' },
        ],
        description: 'Specializes in new school and illustrative styles.',
        location: {
            type: 'Point',
            coordinates: [7.7521, 48.5734] // Strasbourg, France
        }
    },
    {
        _id: '000000209e1b9a723c7b2db4',
        email: 'henry@example.com',
        password: pwd,
        lastname: 'Ivy',
        firstname: 'Henry',
        role: Role.TATTOOER,
        inscriptionDate: new Date(),
        surname: 'Hank',
        place: 'Skin Art',
        links: [
            {
                name: 'LinkedIn',
                url: 'https://www.linkedin.com/in/henry'
            }
        ],
        styles: [
            { name: 'Portrait' },
            { name: 'Biomechanical' },
        ],
        description: 'Expert in portrait and biomechanical tattoos.',
        location: {
            type: 'Point',
            coordinates: [3.8772, 43.6119] // Montpellier, France
        }
    },
    {
        _id: '000000209e1b9a723c7b2db5',
        email: 'isabel@example.com',
        password: pwd,
        lastname: 'Jackson',
        firstname: 'Isabel',
        role: Role.TATTOOER,
        inscriptionDate: new Date(),
        surname: 'Izzy',
        place: 'Tattoo World',
        links: [
            {
                name: 'Instagram',
                url: 'https://www.instagram.com/isabel'
            }
        ],
        styles: [
            { name: 'Color' },
            { name: 'Black & Grey' },
        ],
        description: 'Specializes in color and black & grey tattoos.',
        location: {
            type: 'Point',
            coordinates: [-0.5792, 44.8378] // Bordeaux, France
        }
    },
    {
        _id: '000000209e1b9a723c7b2db6',
        email: 'jack@example.com',
        password: pwd,
        lastname: 'King',
        firstname: 'Jack',
        role: Role.TATTOOER,
        inscriptionDate: new Date(),
        surname: 'Jacky',
        place: 'Ink Masters',
        links: [
            {
                name: 'Facebook',
                url: 'https://www.facebook.com/jack'
            }
        ],
        styles: [
            { name: 'Lettering' },
            { name: 'Cover-Up' },
        ],
        description: 'Known for lettering and cover-up tattoos.',
        location: {
            type: 'Point',
            coordinates: [3.0573, 50.6292] // Lille, France
        }
    }
];


// Génération des flash
function getRandomFutureDate() {
    const today = new Date();
    const futureDate = new Date(today.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000); // Ajoute jusqu'à 30 jours
    return futureDate;
}

// Coordonnées de différentes villes françaises
const citiesCoordinates = {
    Paris: [2.3522, 48.8566],
    Marseille: [5.3698, 43.2965],
    Lyon: [4.8357, 45.7640],
    Toulouse: [1.4442, 43.6047],
    Nice: [7.2620, 43.7102],
    Nantes: [-1.5536, 47.2184],
    Strasbourg: [7.7521, 48.5734],
    Montpellier: [3.8772, 43.6119],
    Bordeaux: [-0.5792, 44.8378],
    Lille: [3.0573, 50.6292],
    Grenoble: [5.7245, 45.1885] // Coordonnées de Grenoble
};

// Noms originaux pour les événements de flash
const flashNames = [
    'Spring Ink Fest',
    'Summer Tattoo Madness',
    'Autumn Art Tattoo',
    'Winter Tattoo Wonderland',
    'Ink Masterclass',
    'Bold & Beautiful Tattoo',
    'Mystical Ink Experience',
    'Fantasy Tattoo Gala',
    'Dream Ink Affair',
    'Color Fusion Ink Fest',
    'Neo Traditional Ink Delight',
    'Minimalist Tattoo Showcase',
    'Abstract Tattoo Workshop',
    'Geometric Ink Extravaganza',
    'Watercolor Tattoo Splash',
    'Ethereal Ink Encounter',
    'Timeless Tattoo Artistry',
    'Vintage Tattoo Affair',
    'Futuristic Ink Fusion',
    'Tribal Tattoo Celebration'
];

// Générer les flashes
const flashes = Array.from({ length: 20 }, (_, index) => {
    const cityName = index % 2 === 0 ? 'Grenoble' : Object.keys(citiesCoordinates)[index % 10];
    const flashDate = getRandomFutureDate();
    const flashName = flashNames[index % flashNames.length];

    return {
        place: cityName,
        flashDate: flashDate,
        tattooer: tattooers_id[index],
        name: flashName,
        description: `Special event for tattoo lovers.`,
        price: Math.floor(Math.random() * 100) + 50, // Prix aléatoire entre 50 et 149
        location: {
            type: 'Point',
            coordinates: citiesCoordinates[cityName]
        }
    };
});

try {
    const resAdmin = await User.insertMany(admins)
    const resuser = await User.insertMany(users)
    const resTattoo = await Tattooer.insertMany(tattooers)
    const resflash = await Flash.insertMany(flashes)

    console.log(resAdmin, resuser, resTattoo, resflash)
} catch (error) {
    console.error(error);

}