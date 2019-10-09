import React,{Component,Fragment} from 'react';
import axios from 'axios';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import Search from './components/users/Search';
import About from './components/pages/About';
import User from './components/users/User';

class App extends Component {

  state = {
    users:[],
    user:{},
    repos:[],
    loading:false,
    alert:null
  }  

  searchUsers = async text => {
    // search for user entered into the search box

    this.setState({
      loading:true
    })

    try{
      const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      this.setState({
        users:res.data.items,
        loading:false
      })
     }catch(err){
       console.log(err)
     } 

  }

  //Get a single Github User

  getUser = async username => {

    this.setState({
      loading:true
    })

    try{
      const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      this.setState({
        user:res.data,
        loading:false
      })
     }catch(err){
       console.log(err)
     } 

  }  

  //get the repos for a single user

  getUserRepos = async username => {

    this.setState({
      loading:true
    })

    try{
      const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      this.setState({
        repos:res.data,
        loading:false
      })
     }catch(err){
       console.log(err)
     } 

  }  

  clearUsers = () => {
    this.setState({users:[],loading:false})
  }

  // show alerts atop page

  setAlert = (message,level) => {
    this.setState({
      alert:{message,level}
    })

    setTimeout( ()=> this.setState({
      alert:null
    }),3000)
  }


  render(){
    return (
      <Router>
      <div className='App'>
        <Navbar />

        <Switch>
          <div className='container'>
            <Route exact path='/' render={props=> (
                  <Fragment>
                  <Alert alert={this.state.alert}/>
                  <Search searchUsers={this.searchUsers} 
                      clearUsers={this.clearUsers} 
                      showClear={this.state.users.length > 0 ? true : false} 
                      setAlert={this.setAlert} />
                  <Users loading={this.state.loading} users={this.state.users}/> 
                  </Fragment>
            )}/>

            <Route path='/about' component={About}/>
            <Route exact path='/user/:login' render={props => (
              <User {...props} 
                    getUser={this.getUser}
                    user={this.state.user} 
                    repos={this.state.repos}
                    getUserRepos={this.getUserRepos}
                    loading={this.state.loading}
                    />
            )}/>

          </div>
        </Switch>

        

      </div>
      </Router>
    );
  }
  
}

export default App;
