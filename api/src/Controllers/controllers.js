require("dotenv").config();
const {Videogame, Genre } = require('../db')
const axios = require("axios");

const { API_KEY } = process.env;

let videogameModel= {
  getVideogamesApi: async function () {
    try {
      let videogamesArray = [];
      let url = `https://api.rawg.io/api/games?key=${API_KEY}`;
      for(let i = 0; i < 5; i++){
        var response = (
            await axios.get(url)
          ).data;
        response.results.map((vg) => {
            videogamesArray.push( {
              name: vg.name,
              id: vg.id,
              image: vg.background_image,
              released: vg.released,
              rating: vg.rating,
              platforms: vg.platforms.map((p) => {
                return p.platform.name;
              }),
              genres: vg.genres.map((g) => {
                return g.name;
              })
            })
          });
        url = response.next;
      }
      return videogamesArray;
    } catch (error) {
        return error.message;
    }
    
  },

  getVideogamesDb: async function(){
    try {
        return await Videogame.findAll({
            include:{
               model: Genre,
               attributes: ['name'],
               through:{
                    attributes: [],
               }
            }
        })
    } catch (error) {
        return error.message;
    }
  },

  getAllVideogames: async function(){
    const apiInfo = await videogameModel.getVideogamesApi();
    const dbInfo = await videogameModel.getVideogamesDb();
    const info = apiInfo.concat(dbInfo);
    return info;
  },

  getVideogamesSearch: async function (name) {
    try {
      const response = (
        await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)).data.results.splice(0, 15);
      if (response.length == 0) {
        throw new Error("No results found");
      } else {
        return response.map((vg) => {
          return {
            name: vg.name,
            id: vg.id,
            released: vg.released,
            rating: vg.rating,
            platforms: vg.platforms.map((p) => {
              return p.platform.name;
            }),
          };
        });
      }
    } catch (error) {
      return error.message;
    }
  },

  getVideogameById: async function (id) {
    try {
      const videogame = (
        await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
      ).data;

      return {
        name: videogame.name,
        image: videogame.background_image,
        description: videogame.description,
        id: videogame.id,
        released: videogame.released,
        rating: videogame.rating,
        platforms: videogame.platforms.map((p) => {
          return p.platform.name;
        }),
      };
    } catch (error) {
      return error.message;
    }
  },

  getGenres: async function(){
    const genreArray = [];
    try {
        const response = (await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results;
        response.map((g) => {
            genreArray.push(g.name);
            return {
                name: g.name,
                id: g.id,
            };
        });
        for (let i = 0; i < genreArray.length; i++) {
            await Genre.findOrCreate({
                where: {name: genreArray[i]}
            });
        }
        return genreArray;
        
    } catch (error) {
        return error.message;
    }
   },

   createVideogame: async function (videogame){
    try {
      await Videogame.create({
        name:videogame.name,
        description: videogame.description,
        release: videogame.release,
        rating:videogame.rating,
        image: videogame.image,
        genres: videogame.genres,
        createdInDb: videogame.createdInDb,
      })
    } catch (error) {
        return error.message;
    }
  },
  
};

module.exports = videogameModel;