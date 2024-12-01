import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

async function pageModulePerfil(req, res) {
    const id = req.session.user.id;

    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(id),
        },
    });

    res.render('module-perfil', { user });
}

async function changePhoto(req, res) {
    const fileName = req.file.filename;
    const id = req.session.user.id;

    const updateUser = await prisma.user.update({
        where: {
            id: parseInt(id),
        },
        data: {
            imageId: fileName
        },
    })

    res.redirect("/users");
}

export {
    pageModulePerfil,
    changePhoto
};