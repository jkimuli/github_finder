import React,{useState,useContext} from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = (props) => {
    
    const [text, setText ] = useState('')
    const githubContext = useContext(GithubContext) 
    const {clearUsers,searchUsers,users} = githubContext 
    
    const alertContext = useContext(AlertContext) 

    const handleChangeText = e => {
        setText(e.target.value)
    }

    const onSubmit = e => {
        e.preventDefault()

        if(text === ''){
            alertContext.setAlert('Please enter a search term','light')
        }else{
            searchUsers(text)
            setText('') // reset search text
        }
        
    }
   
    return (

        <div>
            <form onSubmit={onSubmit} className="form">
                    <input type='text' name='text' placeholder='Search Users...' value={text} onChange={handleChangeText}/>
                    <input type='submit' value='Search' className='btn btn-dark btn-block'/>
            </form>
            {/* show clear button only if users are displayed in the users component*/}

            {users.length > 0 && <button className='btn btn-light btn-block' onClick={clearUsers}>Clear</button>}

        </div>
    )
    
}

export default Search
