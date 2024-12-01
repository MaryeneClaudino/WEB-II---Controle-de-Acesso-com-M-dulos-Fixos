import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

async function pageGestaoUsuario(req, res) {
    const role = req.session.user.role;

    let users;

    if (role == 'SuperUsuário') {
        users = await prisma.user.findMany({
            where: {
                OR: [
                    {
                        role: 'Administrador'
                    },
                    {
                        role: 'Usuário'
                    }
                ]
            },
        });
    } else if (role == 'Administrador') {
        users = await prisma.user.findMany({
            where: {
                role: 'Usuário'
            },
        });
    }

    res.render('gestao-usuario', { users });
}

function pageAddUser(req, res) {
    const data = {
        title: "Novo Usuário",
        role: req.session.user.role
    }
    res.render('users-formulario', { data });
}

async function addUser(req, res) {
    const dataUser = req.body;

    dataUser.password = bcrypt.hashSync(process.env.HASH_SECRET + dataUser.password, 10);

    const user = await prisma.user.create({
        data: {
            name: dataUser.name,
            email: dataUser.email,
            password: dataUser.password,
            role: dataUser.role
        },
    });

    if (user.role == 'Administrador') {
        await prisma.userPermission.create({
            data: {
                userId: user.id,
                moduleId: 1
            }
        });
    }

    res.redirect("/gestaoUsuario");
}

async function pageChangePermission(req, res) {
    const id = req.params.id;

    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(id),
        }
    });

    const dataPermissions = await prisma.userPermission.findMany({
        where: {
            userId: parseInt(id),
        }
    });

    let permissions = [];

    for (let module of dataPermissions) {
        permissions.push(module.moduleId);
    }

    let data = {
        user: user,
        permissions: permissions
    }

    res.render('change-permission', { data });
}

async function changePermission(req, res) {
    const id = req.params.id;
    const dataUser = req.body;

    const deletePermissions = await prisma.userPermission.deleteMany({
        where: {
            userId: parseInt(id),
        },
    })

    if (dataUser.permissions != undefined && dataUser.permissions != null) {
        if (dataUser.permissions.includes("2") && dataUser.permissions.includes("3") && dataUser.permissions.includes("4")) {
            await prisma.userPermission.create({
                data: {
                    userId: parseInt(id),
                    moduleId: 1
                }
            });
        } else {
            for (let permission of dataUser.permissions) {
                await prisma.userPermission.create({
                    data: {
                        userId: parseInt(id),
                        moduleId: parseInt(permission)
                    }
                });
            }
        }
    }

    res.redirect("/gestaoUsuario");
}

async function deleteUser(req, res) {
    const id = req.params.id;

    const deletePermissions = await prisma.userPermission.deleteMany({
        where: {
            userId: parseInt(id),
        },
    })

    const deleteLog = await prisma.log.deleteMany({
        where: {
            userId: parseInt(id),
        },
    })

    const deleteUser = await prisma.user.delete({
        where: {
            id: parseInt(id),
        },
    })

    res.send(200).end();
}

export {
    pageGestaoUsuario,
    pageAddUser,
    addUser,
    pageChangePermission,
    changePermission,
    deleteUser
};