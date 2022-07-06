const { Router } = require('express');
const controllers = require('../Controllers/controllers')
// const {Videogame, Genre } = require('../db')


const router = Router();

router.get('/',async (req,res) => {
    try {
        res.status(200).json(await controllers.getPlatforms());
    } catch (error) {
        res.status(404).json({error: error.message});
    }
});

module.exports = router;