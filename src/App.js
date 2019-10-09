import React,{useState,Fragment} from 'react';
import axios from 'axios';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import GithubState from './context/github/GithubState';
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

  

  // show alerts atop page

  const setAlert = (message,level) => {

    setAlertMessage({message,level})
    setTimeout( () => setAlertMessage(null), 3000)
  }


  
return (
      <GithubState>
      <Router>
      <div className='App'>
        <Navbar />

        <Switch>
          <div className='container'>
            <Route exact path='/' render={props=> (
                  <Fragment>
                  <Alert alert={alert}/>
                  <Search                         
                      showClear={users.length > 0 ? true : false} 
                      setAlert={setAlert} />
                  <Users /> 
                  </Fragment>
            )}/>

            <Route path='/about' component={About}/>
            <Route exact path='/user/:login' render={props => (
              <User {...props} 
                    
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
      </GithubState>
    );
  }

export default App;
