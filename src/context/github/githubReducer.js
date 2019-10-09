import  { SEARCH_USERS,
    CLEAR_USERS,
    SET_ALERT,
    SET_LOADING,
    REMOVE_ALERT,
    GET_REPOS,
    GET_USER
} from '../types';


const GithubReducer = (state,action) => {

    switch(action.type){
        case SEARCH_USERS:
            return {
                ...state, users:action.payload,
                loading:false
            }
        case SET_LOADING:
            return {
                ...state,
                loading:true
            }
        case CLEAR_USERS:
            return {
                ...state,
                users:[]
            } 
                   
        default:
            return {
                ...state
            }    
    }
}

export default GithubReducer