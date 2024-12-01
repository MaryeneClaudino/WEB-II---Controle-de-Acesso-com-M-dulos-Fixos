import express, { query } from 'express';
import { dir } from './dirroot.js';
import path from 'path';

import session from 'express-session';

import bcrypt from 'bcrypt';

import dotenv from 'dotenv';
const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === 'development') {
    console.log("Running in development mode");
    dotenv.config({ path: '.env.development' });
} else if (NODE_ENV === 'production') {
    console.log("Running in production mode");
    dotenv.config({ path: '.env.production' });
}

console.log({
    ENV: process.env.NODE_ENV,
    APP_SECRET: process.env.APP_SECRET,
    HASH_SECRET: process.env.HASH_SECRET,
})

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
})

const app = express();
const pathViews = path.join(dir, '/views');
app.set('view engine', 'ejs');
app.set('views', pathViews);

app.use(express.static('uploads')); // torna a pasta de uploads estatica
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use(session({
    secret: process.env.APP_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.get('/healthcheck', (req, res) => {
    res.send('OK');
});

app.get('/', (req, res) => res.redirect('/home'));

app.get('/home', (req, res) => {
    res.render('home', { user: req.session.user });
});

import usersRouter from './routes/users-routes.js';
app.use('/users', usersRouter);

import authRouter from './routes/auth-routes.js';
app.use('/auth', authRouter);

import moduleFinanceiroRouter from './routes/module-financeiro-routes.js';
app.use('/financeiro', moduleFinanceiroRouter);

import moduleRelatoriosRouter from './routes/module-relatorios-routes.js';
app.use('/relatorios', moduleRelatoriosRouter);

import moduleProdutosRouter from './routes/module-produtos-routes.js';
app.use('/produtos', moduleProdutosRouter);

import modulePerfilRouter from './routes/module-perfil-routes.js';
app.use('/perfil', modulePerfilRouter);

import gestaoUsuarioRouter from './routes/gestao-usuario-routes.js';
app.use('/gestaoUsuario', gestaoUsuarioRouter);

import accessDeniedRouter from './routes/access-denied-routes.js';
app.use('/access-denied', accessDeniedRouter);

const user = await prisma.user.findMany({
    where: {
        role: 'SuperUsuário',
    },
});

if (user.length <= 0) {
    await prisma.module.createMany({
        data: [
            { name: 'todos' },
            { name: 'financeiro' },
            { name: 'relatorios' },
            { name: 'produtos' },
        ],
    });

    await prisma.user.create({
        data: {
            id: 1,
            name: 'admin',
            email: 'admin@gmail.com',
            role: 'SuperUsuário',
            password: bcrypt.hashSync(process.env.HASH_SECRET + "admin", 10)
        }

    });

    await prisma.userPermission.create({
        data: {
            userId: 1,
            moduleId: 1
        }
    });
}

// SALVAR TODAS AS ROTAS QUE O USUARIO ESTA ACESSANDO NA SESSAO
app.use((req, res, next) => {
    req.session.routes = req.session.routes ?? [];
    req.session.routes.push(req.url);
    next();
});

// meu MIDDLEWARE
app.use((req, res, next) => {
    if (NODE_ENV == 'production') return next();
    console.log('Middleware');
    console.log({
        url: req.url,
        method: req.method,
        body: req.body,
        query: req.query,
        sessionId: req.sessionID,
        session: req.session,
    })
    next();
});

app.listen(3000, () => console.log("Server iniciou na porta 3000"));