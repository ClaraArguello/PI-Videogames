require("dotenv").config();
const { Videogame, Genre } = require("../db");
const axios = require("axios");

const { API_KEY } = process.env;

let videogameModel = {

  videogames: [], 
  genres:[],
  allPlatforms:[],

  getVideogamesApi: async function () {
    try {
      let videogamesArray = [];
      let url = `https://api.rawg.io/api/games?key=${API_KEY}`;
      for (let i = 0; i < 5; i++) {
        var response = (await axios.get(url)).data;
        response.results.map((vg) => {
          videogamesArray.push({
            name: vg.name,
            id: vg.id,
            image: vg.background_image,
            released: vg.released,
            rating: vg.rating,
            platforms: vg.platforms.map((p) => {
              if(!videogameModel.allPlatforms.includes(p.platform.name)){
                videogameModel.allPlatforms.push(p.platform.name)
              }
              return p.platform.name;
            }),
            genres: vg.genres.map((g) => {
              return g.name;
            }),
          });
        });
        url = response.next;
      }
      videogameModel.videogames = [...videogamesArray];
    } catch (error) {
      return error.message;
    }
  },

  getVideogamesDb: async function () {
    try {
      const videogameDb = await Videogame.findAll({
        include: Genre,
      });
      const videogameJSON = videogameDb.map((vg) => vg.toJSON());

      const videogame = videogameJSON.map((v) => {
        return {
          name: v.name,
          image: v.background_image,
          description: v.description,
          id: v.id,
          released: v.released,
          rating: v.rating,
          platforms: v.platforms.map((p) => {
            return p;
          }),
          genres: v.genres.map((g) => {
            return g.name;
          }),
        };
      });
      return videogame;
    } catch (error) {
      return error.message;
    }
  },

  returnApiVideogames: async function () {
    return videogameModel.videogames;
  },

  getVideogamesSearch: async function (name) {
    try {
      const response = (
        await axios.get(
          `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
        )
      ).data.results;
      if (response.length === 0) {
        return [];
      } else {
        return response.map((vg) => {
          return {
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
        description: videogame.description_raw,
        id: videogame.id,
        released: videogame.released,
        rating: videogame.rating,
        platforms: videogame.platforms.map((p) => {
          return p.platform.name;
        }),
        genres: videogame.genres.map(g =>{
          return g.name;
        })
      };
  
    } catch (error) {
      return error.message;
    }
  },

  getGenres: async function () {
    try {
      const response = (
        await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
      ).data.results;

      const arrayGenre = response.map((g) => {
        return {
          id: g.id,
          name: g.name,
        };
      });

      for (let i = 0; i < arrayGenre.length; i++) {
        await Genre.findOrCreate({
          where: {name: arrayGenre[i].name},
        });
      }
      return arrayGenre;
   
    } catch (error) {
      return error.message;
    }
  },

  getPlatforms: async function (){
    return videogameModel.allPlatforms;
  },

};

module.exports = videogameModel;
