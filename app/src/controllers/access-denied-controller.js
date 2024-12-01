function pageAccessDenied(req, res) {
    let module = req.query.module;
    switch (module) {
        case 'financeiro':
            module = 'Módulo Financeiro';
            break;
        case 'produtos':
            module = 'Módulo de Produtos';
            break;
        case 'relatorios':
            module = 'Módulo de Relatórios';
            break;
        case 'gestaoUsuario':
            module = 'Gestão de Usuários';
            break;
        case 'perfil':
            module = 'Módulo de Perfil';
            break;
    }
    res.render('access-denied', { module });
}

export {
    pageAccessDenied
};