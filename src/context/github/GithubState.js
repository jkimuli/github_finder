import React,{useReducer} from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import  { SEARCH_USERS,
          CLEAR_USERS,          
          SET_LOADING,         
          GET_REPOS,
          GET_USER
 } from '../types';

 const GithubState = props => {
     const initialState = {
         users:[],
         user:{},
         repos:[],
         loading:false
     }

     const [state, dispatch] = useReducer(GithubReducer,initialState);

     // Search Users

     const searchUsers = async text => {
        // search for user entered into the search box
    
        setLoading()
    
        try{
          const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
                  
          dispatch({
              type:SEARCH_USERS,
              payload:res.data.items
          })
          
         }catch(err){
           console.log(err)
         } 
    
    }

  //Get a single Github User

  const getUser = async username => {

    setLoading()

    try{
      const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      
      dispatch({
          type: GET_USER,
          payload:res.data
      })
      
     }catch(err){
       console.log(err)
     } 

    }
    
    //get the repos for a single user

  const getUserRepos = async username => {
    
    setLoading()

    try{
      const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      
      dispatch({
          type: GET_REPOS,
          payload:res.data
      })
      

     }catch(err){
       console.log(err)
     } 

  } 

    // Set Loading 
    
    const setLoading = () => dispatch({type:SET_LOADING})

    // Clear Users

    const clearUsers = () => {
        
        dispatch({
            type:CLEAR_USERS
        })
    }

     return <GithubContext.Provider value= {{
          users:state.users,
          user:state.user,
          loading:state.loading,
          repos:state.repos,
          searchUsers,
          clearUsers,
          getUser,
          getUserRepos
     }}>
         {props.children}
     </GithubContext.Provider>
 }

 export default GithubState
