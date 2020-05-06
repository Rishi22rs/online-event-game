import React,{useState, useEffect} from 'react'
import ReactHowler from 'react-howler'
import {Prompt,Redirect, Link} from 'react-router-dom'

const QuestionSlider=({match})=>{

	const [play,setPlay]=useState(false)
	const [songIndex,setSongIndex]=useState(0)
	const [displayTimer,setDisplayTimer]=useState(20)
	const [interval,setIntrvl]=useState()
	const [input,setInput]=useState('')
	const [score,setScore]=useState(0)
	const [correct,setCorrect]=useState('')
	const [last,setLast]=useState(true)
	const [scoreBtn,setScoreBtn]=useState(false)
	const [startBtn,setStartBtn]=useState(true)
	const [showPrompt,setShowPrompt]=useState(true)
	const [timerLength,setTimerLength]=useState(window.innerWidth)
	const [listOfSongs,setListOfSongs]=useState([])
	const [disableSubmit,setDisableSubmit]=useState(false)
	const [showCorrect,setShowCorrect]=useState(false)
	let timerBarStyle={
		display: 'block',
		height: '50px',
		background: '#E75998',
		borderRadius: '20px',
		width: timerLength
	}
	var timerId
	const songList=[{
			songURL:"https://appointmentt.000webhostapp.com/approved/cse1/20th%20century%20fox.mp4",
			songAns:"20th century studio"
		},
		{
			songURL:"https://appointmentt.000webhostapp.com/approved/cse1/got.mp4",
			songAns:"Game of thrones"
		},
		{
			songURL:"https://appointmentt.000webhostapp.com/approved/cse1/intel.mp4",
			songAns:"Intel"
		},
		{
			songURL:"https://appointmentt.000webhostapp.com/approved/cse1/mario.mp4",
			songAns:"mario"
		},
		{
			songURL:"https://appointmentt.000webhostapp.com/approved/cse1/netfix.mp4",
			songAns:"netflix"
		},
		{
			songURL:"https://appointmentt.000webhostapp.com/approved/cse1/Nokia.mp4",
			songAns:"nokia"
		},
		{
			songURL:"https://appointmentt.000webhostapp.com/approved/cse1/tom%20and%20jerry.mp4",
			songAns:"tom and jerry"
		},
		{
			songURL:"https://appointmentt.000webhostapp.com/approved/cse1/windows%20xp.mp4",
			songAns:"windows xp"
		},
		{
			songURL:"https://appointmentt.000webhostapp.com/approved/cse1/Universal%20Studios.mp4",
			songAns:"universal studios"
		},
		{
			songURL:"https://appointmentt.000webhostapp.com/approved/cse1/Stranger%20things.mp4",
			songAns:"stranger things"
		},
		{
			songURL:"https://appointmentt.000webhostapp.com/approved/cse1/Disney.mp4",
			songAns:"disney"
		},
		{
			songURL:"https://appointmentt.000webhostapp.com/approved/cse1/blackberry.mp4",
			songAns:"blackberry"
		},
		{
			songURL:"https://appointmentt.000webhostapp.com/approved/cse1/sony%20ericsson.mp4",
			songAns:"sony ericsson"
		},
		{
			songURL:"https://appointmentt.000webhostapp.com/approved/cse1/airtel.mp4",
			songAns:"airtel"
		},
		{
			songURL:"https://appointmentt.000webhostapp.com/approved/cse1/mcdonald.mp4",
			songAns:"mcdonalds"
		},
		{
			songURL:"https://appointmentt.000webhostapp.com/approved/cse1/idea.mp4",
			songAns:"idea"
		}]
		
	const getRandom=(arr, n)=> {
		var result = new Array(n),
			len = arr.length,
			taken = new Array(len);
		if (n > len)
			throw new RangeError("getRandom: more elements taken than available");
		while (n--) {
			var x = Math.floor(Math.random() * len);
			result[n] = arr[x in taken ? taken[x] : x];
			taken[x] = --len in taken ? taken[len] : len;
		}
		return result;
	}
	const NextAudio=()=>{
		setShowCorrect(false)
		setDisableSubmit(false)
		setTimerLength(window.innerWidth)
		setStartBtn(true)
		setInput('')	
		setCorrect('')
		setPlay(false)
		clearInterval(interval)
		setDisplayTimer(20)
		setLast(true)
		setSongIndex(songIndex=>songIndex+1)
	}

	const onUnload = e => {
		e.preventDefault();
		e.returnValue = '';
	 }

	const StartGame=()=>{
		setLast(true)
		setStartBtn(false)
		timerId=setInterval(StartTimer,1000)
		setIntrvl(timerId)
		setPlay(true)
	}
	const StartTimer=()=>{
		setDisplayTimer(prevTime=>prevTime-1)
		setTimerLength(time=>time-window.innerWidth/15)
		setPlay(true)
	}

	const StopGame=()=>{
		clearInterval(interval)
		setPlay(false)
	}

	const CheckCorrectAns=()=>{
		setDisableSubmit(true)
		if(songIndex===listOfSongs.length-1){
			setStartBtn(false)
			setLast(true)
		}
		else setLast(false)
		if(!input.toLowerCase().localeCompare(listOfSongs[songIndex].songAns.toLowerCase())){
			setScore(score+1)
			setCorrect('Correct')
		}else{
			setCorrect('Incorrect')
		}
		setShowCorrect(true)
		localStorage.setItem('score',score)
		if(songIndex===listOfSongs.length-1){
			setScoreBtn(true)
			setShowPrompt(false)
		}
	}
	useEffect(()=>{
		const listSongs=getRandom(songList,10)
		setListOfSongs(listSongs)
	},[])
	useEffect(()=>{
		window.addEventListener("beforeunload",onUnload)
		if(displayTimer==0){
			StopGame()
			CheckCorrectAns()
			if(songIndex==listOfSongs.length-1){
				setShowPrompt(false)
				setScoreBtn(true)
			}
		}
	},[displayTimer])
	if(listOfSongs.length===0)
		return(<div>loading</div>)
	else{
	return(
		<div>
			<Prompt
				when={showPrompt}
				message='You have not completed the game, you have to start again.'
		/>
			<ReactHowler
				src={listOfSongs[songIndex].songURL}
				playing={play}
			/>
			<div className="timerBarContainer">
				<span style={timerBarStyle}></span>
			</div>
			<h1 className="text">Audio {songIndex+1}/{listOfSongs.length}</h1>
			<h3 className="text">Your Score: {score}</h3>
			<h1 className="text">{displayTimer}</h1>
			{showCorrect?<p style={{float:"left",margin:'10px',color:"white",marginTop:'4%'}}>{listOfSongs[songIndex].songAns}<span style={{color:"#949EC4"}}> it is</span></p>:<></>}
			<p style={{float:"right",margin:'10px',color:"white",marginTop:'4%'}}>{input.length}/{listOfSongs[songIndex].songAns.length}</p>
			<input disabled={displayTimer===0?true:false} className="inputi" type='text' placeholder='your answer' onChange={e=>setInput(e.target.value)} value={input}/><br />
			{startBtn&&last?<button className="btn" style={{fontSize:'20px',padding:'20px',float:'left',marginTop:'40px'}} onClick={StartGame}>Start audio</button>:
			<button disabled={disableSubmit} className="btn" style={{fontSize:'20px',padding:'20px',float:'left',marginTop:'40px'}} onClick={CheckCorrectAns}>Submit</button>}
			{!last?
			<button className="btn" style={{fontSize:'20px',padding:'20px',float:'right',marginTop:'40px'}} onClick={NextAudio}>Next</button>:
			<></>}
			<h2 className="text">{correct}</h2>
			{scoreBtn?
			<button className="btn" style={{fontSize:'20px',padding:'20px',marginLeft:'25%'}}><Link style={{textDecoration:'none',color:'white'}} to={`/ShowScore`}>Go to score page</Link></button>:
			<></>
			}
		</div>
	)}
}

export default QuestionSlider