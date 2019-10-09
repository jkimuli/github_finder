import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Search extends Component {
    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers:PropTypes.func.isRequired,
        showClear:PropTypes.bool.isRequired,
        setAlert:PropTypes.func.isRequired,
    }

    state = {
        text:''
    }

    handleChangeText = (e) => {
        this.setState({
            text: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault()

        if(this.state.text === ''){
            this.props.setAlert('Please enter a search term','light')
        }else{
            this.props.searchUsers(this.state.text)
            this.setState({
                text:''
            }) // reset search text
        }
        
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit} className="form">
                    <input type='text' name='text' placeholder='Search Users...' value={this.state.text} onChange={this.handleChangeText}/>
                    <input type='submit' value='Search' className='btn btn-dark btn-block'/>
                </form>
                {/* show clear button only if users are displayed in the users component*/}

                {this.props.showClear && <button className='btn btn-light btn-block' onClick={this.props.clearUsers}>Clear</button>}

            </div>
        )
    }
}
