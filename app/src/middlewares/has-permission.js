import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
})

const hasPermission = async (req, res, next) => {
    const path = req.originalUrl.split('/')[1];

    let user = await prisma.user.findUnique({
        where: {
            email: req.session.user.email,
        },
        include: {
            permissions: {
                include: {
                    module: true
                }
            }
        }
    });

    let hasPermission = false;

    if (path == 'financeiro' || path == 'produtos' || path == 'relatorios') {
        for (let permission of user.permissions) {
            if (permission.module.name == path || permission.module.name == 'todos') {
                hasPermission = true;
                break;
            }
        }
    }

    if (path == 'gestaoUsuario' && (user.role == 'Administrador' || user.role == 'SuperUsuário')) {
        hasPermission = true;
    }

    if (path == 'users' || path == 'perfil' || path == 'auth') {
        hasPermission = true;
    }

    let log = "Rota acessada: '" + req.originalUrl + "' Teve seu acesso: ";
    log += hasPermission ? "Liberado" : "Negado";

    let saveLog = await prisma.log.create({
        data: {
            userId: user.id,
            description: log
        }
    });

    if (hasPermission) {
        next();
    } else {
        res.redirect('/access-denied?module=' + path);
    }
}

export { hasPermission };