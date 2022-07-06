
const initialState = {
    allVideogames:[],
    videogames: [],
    genres: [],
    detail:{},
    platforms:[],
    currentPage:1,
    unsorted:[],
}

function rootReducer (state = initialState, action){
    switch(action.type){
        case 'GET_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload,
                allVideogames: [...action.payload],
                unsorted: [...action.payload]
            }
        case 'GET_VIDEOGAME_NAME':
            return{
                ...state,
                videogames: action.payload
            }
        case 'GET_GENRES':
            return{
                ...state,
                genres: action.payload
            }
        case 'GET_DETAILS':
            return{
                ...state,
                detail: action.payload
            }
        case 'GET_PLATFORMS':
            return{
                ...state,
                platforms: action.payload
            }
        case 'CLEAR_DETAIL':
            return{
                ...state,
                detail: {}
            }
        case 'CURRENT_PAGE':
            return{
                ...state,
                currentPage: action.payload
            }
        case 'FILTER_VIDEOGAME':
            const videogameFilter = action.payload === 'created'? 
                state.allVideogames.filter(vg => vg.id.toString().includes('-')):
            action.payload === 'api'?
                state.allVideogames.filter(vg => !vg.id.toString().includes('-')):
            state.allVideogames;
            return{
                ...state,
                videogames: videogameFilter,
                unsorted:[...videogameFilter]
            }
        case 'FILTER_GENRE':
            const genreFilter = action.payload !== 'all'?
                state.allVideogames.filter(vg => vg.genres.includes(action.payload))
            :state.allVideogames;
            return{
                ...state,
                videogames: genreFilter,
                unsorted:[...genreFilter]
            }
        case 'SORT':
            const sorted = action.payload === 'a-z'? 
                state.videogames.sort(function (a, b) {
                if (a.name < b.name) {
                  return -1;
                }
                if (a.name > b.name) {
                  return 1;
                }
                return 0;
              }):action.payload === 'z-a'?
              state.videogames.sort(function (a, b) {
                if (a.name > b.name) {
                  return -1;
                }
                if (a.name < b.name) {
                  return 1;
                }
                return 0;
              }):
              action.payload === 'r1-10'?
                state.videogames.sort((a, b) => a.rating - b.rating):
              action.payload === 'r10-1'?
              state.videogames.sort((a, b) => b.rating - a.rating):state.unsorted
            return{
                ...state,
                videogames: [...sorted],
            }
        default:
            return state;
    }
}

export default rootReducer;