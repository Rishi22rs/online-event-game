import React,{useEffect} from 'react'
import axios from 'axios'

const ShowScore=({match})=>{

	// const UpdateScore=()=>{
    //     let formData=new FormData()
    //     formData.append('email',localStorage.getItem('email'))
    //     formData.append('score',parseInt(localStorage.getItem('score'))+1)
    //     axios.post('https://appointmentt.000webhostapp.com/online%20event/UpdateScore.php',formData)
	// }
	

	// useEffect(()=>{
	// 	UpdateScore()
	// },[])
	return(
		<>
		<div>
			<h1 className="text" style={{borderBottom:'2px solid white',paddingBottom:20}}>Final score</h1>
			<h2 className="text" style={{color:'white'}}>{match.params.score}/10</h2>
			<p className="text" style={{fontSize:30}}>Well played</p>
			<p className="text">Check out my game first indie game for android devices.</p>
			<p className="text"><a style={{color:'white'}} href="https://play.google.com/store/apps/details?id=com.UnderratedGames.HowLong">Just click here</a></p>
		</div>
		<div class='ripple-background' style={{zIndex:-100,position:'absolute'}}>
            <div class='circle xxlarge shade1'></div>
            <div class='circle xlarge shade2'></div>
            <div class='circle large shade3'></div>
            <div class='circle mediun shade4'></div>
            <div class='circle small shade5'></div>
        </div>
		</>
	)
}

export default ShowScore