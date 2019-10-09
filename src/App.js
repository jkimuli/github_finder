import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';
import './App.css';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';
import User from './components/users/User';

const App = () => {  
  
return (
      <GithubState>
      <AlertState>
      <Router>
      <div className='App'>
        <Navbar />
        <div className='container'>
            <Switch>
              
              <Route exact path='/' component={Home}/>
              <Route path='/about' component={About}/>
              <Route exact path='/user/:login' render={props => (
                <User {...props} />
              )}/>
              <Route component={NotFound} />
            
            </Switch>
        </div>            

      </div>
      </Router>
      </AlertState>
      </GithubState>
    );
  }

export default App;
