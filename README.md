# Notes API

A RESTful API for personal notes built wit Node.js, Express and MongoDB(Mongoose).
Users register, log in with JWT authentication and manage their own private notes.

## Features
- Register/login with hashed passwords (bcrypt) and JWT
- CRUD for notes, scoped to the logged-in user
- Tag filtering, full-text search, pagination
- Input validation, centralised error handling, rate limiting, security headers

## Tech stack
Node.js, Express 5, MongoDB, Mongoose, JWT, bcryptjs, express-validator, helmet, cors, morgan

## Getting started
1. `git clone https://github.com/Obinna32/notes_api`
2. `npm install`
3. Copy `.env.example` to `.env` and fill in the values
4. `npm run dev` (server would run on http://localhost:5000)

## Environment variables
| Name | Description |
| ---- | ----------- |
| PORT | Port the server listens on |
| MONGODB_URI | MongoDB connection string |
| JWT_SECRET | Secret used to sign tokens |
| JWT_EXPIRES_IN | Token lifetime |

## API reference
| Method | Endpoint Method | URL | AUTH REQUIRED | Usage |
| GET | Health check | http://127.0.0.1:4000/api/v1/health | No | Check if API is working |
| POST | Register | http://127.0.0.1:4000/api/v1/auth/register | No | Register a new user |
| POST | Login | http://127.0.0.1:4000/api/v1/auth/login | No | Login existing user |
| POST | getMe | http://127.0.0.1:4000/api/v1/auth/me | Yes | Get Logged in user info |
| POST | createNote | http://127.0.0.1:4000/api/v1/notes | Yes | Create New note |
| GET | getNotes | http://127.0.0.1:4000/api/v1/notes | Yes | Get all Notes |
| GET | getNote | http://127.0.0.1:4000/api/v1/notes/:id | Yes | Get a note by its id |
| PATCH | updateNote | http://127.0.0.1:4000/api/v1/notes/:id | Yes | Update Note from its id |
| DELETE | deleteNote | http://127.0.0.1:4000/api/v1/notes/:id | Yes | Delete a note |

## Author
Obinna Ekwealor, https://github.com/Obinna32