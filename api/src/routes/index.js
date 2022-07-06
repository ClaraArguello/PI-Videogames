const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames',require('./videogames'));
router.use('/genres',require('./genres'));
router.use('/platforms', require('./platforms'))

module.exports = router;
