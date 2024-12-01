import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt';

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

async function getUsers(req, res) {
    const users = await prisma.user.findMany({
        include: {
            permissions: {
                include: {
                    module: true
                }
            }
        }
    });

    const data = {
        users
    }

    res.render('users-listagem', { data });
}

export {
    getUsers
};