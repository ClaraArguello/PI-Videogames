const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const controllers = require('../Controllers/controllers')
const axios = require('axios');
const {Genre} = require('../db')


const router = Router();

router.get('/', async (req,res) =>{
    try {
        const genres = await Genre.findAll();
        res.json(genres.map(g => g.toJSON()));
    } catch (error) {
        res.status(404).json(error)
    }
})
















module.exports = router;