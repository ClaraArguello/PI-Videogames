const { Router } = require('express');
const { getAllVideogames, getVideogamesSearch, getVideogamesDb } = require('../Controllers/controllers');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const controllers = require('../Controllers/controllers')
const {Videogame, Genre } = require('../db')


const router = Router();

router.get('/', async (req,res) => {
    const {name} = req.query;
    let dbVg = await getVideogamesDb();
    let allVg = await getAllVideogames();
    try {
        if(name){
            const vgName = await getVideogamesSearch(name);
            res.status(200).send(vgName)
        }else{
            res.status(200).send([...allVg,...dbVg]);
        }
    } catch (error) {
        res.status(404).send(error);
    }
})

router.get('/:id', async (req,res) =>{
    const { id } = req.params;
    // const videogame = await controllers.getVideogameById(id);
    try{
        if(id.includes('-')){
            return res.send(await Videogame.findByPk(id, {include: Genre}))
        }else{
            return res.send(await controllers.getVideogameById(id));
        }
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
    } = req.body;
    
    // if(!name || !description || platforms.length === 0|| genres.length === 0){
    //     res.status(400).send("Couldn't create videogame");
    // }

    let videogameCreated = await Videogame.create({
        name,
        description,
        released,
        rating,
        platforms,
    });
    
    await genres.map(async (g)=> {
        let gen = await Genre.findAll({
            where: {name: g}
        })
        await videogameCreated.addGenres(gen)
    })


    res.status(200).send('Videogame created successfully');
})

module.exports = router;