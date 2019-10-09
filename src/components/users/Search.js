import React,{useState,useContext} from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext'

const Search = (props) => {
    
    const [text, setText ] = useState('')
    const githubContext = useContext(GithubContext)    

    const handleChangeText = e => {
        setText(e.target.value)
    }

    const onSubmit = e => {
        e.preventDefault()

        if(text === ''){
            props.setAlert('Please enter a search term','light')
        }else{
            githubContext.searchUsers(text)
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

            {props.showClear && <button className='btn btn-light btn-block' onClick={props.clearUsers}>Clear</button>}

        </div>
    )
    
}

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers:PropTypes.func.isRequired,
    showClear:PropTypes.bool.isRequired,
    setAlert:PropTypes.func.isRequired,
}

export default Search
