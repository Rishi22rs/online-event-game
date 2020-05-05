import React from 'react'
import {Link} from 'react-router-dom'

const Home=()=>{
    return(
        <div>
            <h1>Guess the branding</h1>
            <Link to='/Question'>
                <button>Start</button>
            </Link>
        </div>
    )
}

export default Home