const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const controllers = require('../Controllers/controllers')
const axios = require('axios');


const router = Router();

router.get('/', async (req,res) =>{
    try {
        const genres = await controllers.getGenres();
        res.json(genres);
    } catch (error) {
        res.status(404).json(error)
    }
})
















module.exports = router;