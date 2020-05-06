import React,{useEffect} from 'react'
import axios from 'axios'

const ShowScore=()=>{

	const UpdateScore=()=>{
        let formData=new FormData()
        formData.append('email',localStorage.getItem('email'))
        formData.append('score',parseInt(localStorage.getItem('score'))+1)
        axios.post('https://appointmentt.000webhostapp.com/online%20event/UpdateScore.php',formData)
	}
	
	const score=parseInt(localStorage.getItem('score'))+1

	useEffect(()=>{
		UpdateScore()
	},[])
	return(
		<div>
			<h1 className="text" style={{borderBottom:'2px solid white',paddingBottom:20}}>Final score</h1>
			<h2 className="text" style={{color:'white'}}>{score}/10</h2>
			<p className="text" style={{fontSize:30}}>Well played</p>
			<p className="text" style={{color:'white'}}>Go back to the main page <a style={{color:'#E75998'}} href="https://www.aaruushdomains.com">here</a></p>
		</div>
	)
}

export default ShowScore