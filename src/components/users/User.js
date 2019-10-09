import React, { useEffect,Fragment,useContext } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';
import GithubContext from '../../context/github/githubContext'

const User = ({match}) =>  {  
    
    const githubContext = useContext(GithubContext)
    const {user,getUser,getUserRepos,loading,repos} = githubContext

    useEffect(()=> {
            getUser(match.params.login);
            getUserRepos(match.params.login);

            //eslint-disable-next-line
        },[]
    )

    const {name,location,avatar_url,html_url,
               blog,login,bio,followers,following,
               hireable,company,public_repos,public_gists} = user        
        
    if(loading){
        return (
            <Spinner/>
        )
    }else{
        return(
            <Fragment>
                <Link to='/' className='btn btn-light'>Back to Search</Link>
                Hireable:{' '}
                {hireable ? <i className='fa fa-check text-success'></i> :
                    <i className='fa fa-times-circle text-danger'></i>
                }

                    <div className='card grid-2' >
                        <div className='all-center'>
                          <img src={avatar_url} className='round-img' alt='' style={{width:'60px'}}></img>
                          <h1>{name}</h1>
                          <p>Location:{location}</p>
                        </div>

                        <div>
                            { bio && <Fragment>
                              <h3>Bio</h3>
                              <p>{bio}</p>
                            </Fragment>}

                            <a href={html_url} className='btn btn-dark my-1'>Visit Github Profile</a>

                            {login && <Fragment>
                                <p>Username:{login}</p>
                            </Fragment>}

                            {company && <Fragment>
                                <p>Company:{company}</p>
                            </Fragment>}

                            {blog && <Fragment>
                                <p>Website:{blog}</p>
                            </Fragment>}
                        </div>
                    </div>

                    <div className='card text-center'>
                        <div className='badge badge-primary'>
                            Followers:{followers}
                        </div>
                        <div className='badge badge-success'>
                            Following:{following}
                        </div>
                        <div className='badge badge-danger'>
                            Public Repos:{public_repos}
                        </div>
                        <div className='badge badge-dark'>
                            Public Gists:{public_gists}
                        </div>
                    </div>

                    <Repos repos={repos} />  

                </Fragment>
            )
        }                    
        
    
}

User.propTypes = {
    loading:PropTypes.bool.isRequired,
    user:PropTypes.object.isRequired,
    getUser:PropTypes.func.isRequired,
    getUserRepos:PropTypes.func.isRequired,
    repos:PropTypes.array.isRequired,
}

export default User
