import React from 'react'
import {Link} from 'react-router-dom'

const Home=()=>{
    return(
        <div className="App">
            <h1>Guess the brand</h1>
            <Link to='/Question'>
                <button className="btn">Start</button>
            </Link>
        </div>
    )
}

export default Home