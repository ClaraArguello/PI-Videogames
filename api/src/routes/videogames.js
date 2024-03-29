const { Router } = require('express');
const { getVideogamesSearch, getVideogamesDb, returnApiVideogames, getVideogamesApi } = require('../Controllers/controllers');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const controllers = require('../Controllers/controllers')
const {Videogame, Genre } = require('../db')


const router = Router();

router.get('/', async (req,res) => {
    const {name} = req.query;
    let dbVg = await getVideogamesDb();
    let apiVg = await returnApiVideogames();
    try {
        if(name){
            const vgName = await getVideogamesSearch(name);
            res.status(200).send(vgName);
        }else{
            res.status(200).send([...apiVg,...dbVg]);
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
})

router.get('/:id', async (req,res) =>{
    const { id } = req.params;
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

    if(!name || !description || platforms.length <= 0 || genres.length <= 0){
        return res.status(400).send('Mandatory parameters must be completed');
    }
    
    var vgDb = await Videogame.findOne({
        where: {name: name}
    })

    if(vgDb){
        return res.status(409).send('Already exists')
    }

    var api = await getVideogamesSearch(name);
    if(api.length > 0){
        var vgApi = api.find(vg => vg.name.toLowerCase() === name.toLowerCase())
        if(vgApi){
            return res.status(409).send('Already exists')
        }
        
    }
    
    try {
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
    } catch (error) {
        res.status
    }

    router.delete('/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const vg = await Videogame.findByPk(id);
            await vg.destroy();
            res.send(200);
        } catch (error) {
            res.status(404).json({ error: error.message})
        }
    })
    
})

module.exports = router;