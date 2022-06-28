const { Router } = require('express');
const { getAllVideogames, getVideogamesSearch } = require('../Controllers/controllers');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const controllers = require('../Controllers/controllers')
const {Videogame, Genre } = require('../db')


const router = Router();

router.get('/', async (req,res) => {
    const {name} = req.query;
    let allVg = await getAllVideogames();
    try {
        if(name){
            const vgName = await getVideogamesSearch(name);
            res.status(200).send(vgName)
        }else{
            res.status(200).send(allVg);
        }
    } catch (error) {
        res.status(404).send(error);
    }
})

router.get('/:id', async (req,res) =>{
    const { id } = req.params;
    const videogame = await controllers.getVideogameById(id);
    try{
        return res.send(videogame);
    }catch(error){
        res.status(404).send(error);
    }

  
})


router.post('/', async(req,res) =>{
    let {
        name,
        description,
        released,
        rating,
        genres,
        platforms,
        createdInDb,
    } = req.body;

    let videogameCreated = await Videogame.create ({
        name,
        description,
        released,
        rating,
        createdInDb,
        platforms,
    });

    await genres.map(async (g)=> {
        let gen = await Genre.findAll({
            where: {name: g}
        })
        await videogameCreated.addGenres(gen)
    })

    res.status(200).send('Personaje creado');
})

module.exports = router;