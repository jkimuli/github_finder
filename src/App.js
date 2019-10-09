import React,{useState,Fragment} from 'react';
import axios from 'axios';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import Search from './components/users/Search';
import About from './components/pages/About';
import User from './components/users/User';

const App =() => {

  const [users,setUsers] = useState([]);
  const [user,setUser] = useState({});
  const [repos,setRepos] = useState([])
  const [loading,setLoading]=useState(false);
  const [alert,setAlertMessage] = useState(null);
  

  const searchUsers = async text => {
    // search for user entered into the search box

    setLoading(true)

    try{
      const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      
      setUsers(res.data.items)
      setLoading(false)
      
     }catch(err){
       console.log(err)
     } 

  }

  //Get a single Github User

  const getUser = async username => {

    setLoading(true)

    try{
      const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      
      setUser(res.data)
      setLoading(false)
      
     }catch(err){
       console.log(err)
     } 

  }  

  //get the repos for a single user

  const getUserRepos = async username => {
    
    setLoading(true)

    try{
      const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      
      setRepos(res.data)
      setLoading(false)
      
     }catch(err){
       console.log(err)
     } 

  }  

  const clearUsers = () => {
    setUsers([])
    setLoading(false)
  }

  // show alerts atop page

  const setAlert = (message,level) => {

    setAlertMessage({message,level})
    setTimeout( () => setAlertMessage(null), 3000)
  }


  
return (
      <Router>
      <div className='App'>
        <Navbar />

        <Switch>
          <div className='container'>
            <Route exact path='/' render={props=> (
                  <Fragment>
                  <Alert alert={alert}/>
                  <Search searchUsers={searchUsers} 
                      clearUsers={clearUsers} 
                      showClear={users.length > 0 ? true : false} 
                      setAlert={setAlert} />
                  <Users loading={loading} users={users}/> 
                  </Fragment>
            )}/>

            <Route path='/about' component={About}/>
            <Route exact path='/user/:login' render={props => (
              <User {...props} 
                    getUser={getUser}
                    user={user} 
                    repos={repos}
                    getUserRepos={getUserRepos}
                    loading={loading}
                    />
            )}/>

          </div>
        </Switch>

        

      </div>
      </Router>
    );
  }

export default App;
