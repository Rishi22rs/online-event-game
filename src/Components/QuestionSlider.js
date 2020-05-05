import React,{useState, useEffect} from 'react'
import ReactHowler from 'react-howler'
import {Prompt,Redirect, Link} from 'react-router-dom'

const QuestionSlider=()=>{

	const [play,setPlay]=useState(false)
	const [songIndex,setSongIndex]=useState(0)
	const [displayTimer,setDisplayTimer]=useState(15)
	const [interval,setIntrvl]=useState()
	const [input,setInput]=useState('')
	const [score,setScore]=useState(0)
	const [correct,setCorrect]=useState('')
	const [last,setLast]=useState(true)
	const [scoreBtn,setScoreBtn]=useState(false)
	const [startBtn,setStartBtn]=useState(true)
	const [showPrompt,setShowPrompt]=useState(true)
	const [timerLength,setTimerLength]=useState(window.innerWidth)
	let timerBarStyle={
		display: 'block',
		height: '50px',
		background: '#E75998',
		borderRadius: '20px',
		width: timerLength
	}

	var timerId
	const songList=[
		"https://appointmentt.000webhostapp.com/approved/cse1/20th%20century%20fox.mp4",
		"https://appointmentt.000webhostapp.com/approved/cse1/got.mp4",
		"https://appointmentt.000webhostapp.com/approved/cse1/intel.mp4",
		"https://appointmentt.000webhostapp.com/approved/cse1/mario.mp4",
		"https://appointmentt.000webhostapp.com/approved/cse1/netfix.mp4",
		"https://appointmentt.000webhostapp.com/approved/cse1/Nokia.mp4",
		"https://appointmentt.000webhostapp.com/approved/cse1/tom%20and%20jerry.mp4",
		"https://appointmentt.000webhostapp.com/approved/cse1/windows%20xp.mp4"
	]
	const songAns=[
		"20th century studio",
		"Game of thrones",
		"intel",
		"mario",
		"netflix",
		"Nokia",
		"tom and jerry",
		"windows xp"
	]

	const NextAudio=()=>{
		setTimerLength(window.innerWidth)
		setStartBtn(true)
		setInput('')	
		setCorrect('')
		setPlay(false)
		clearInterval(interval)
		setDisplayTimer(15)
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
		if(songIndex===songList.length-1)setLast(false)
		else setLast(false)
		if(!input.toLowerCase().localeCompare(songAns[songIndex].toLowerCase())){
			setScore(score+1)
			setCorrect('Correct')
		}else{
			setCorrect('Incorrect')
		}
	}

	useEffect(()=>{
		window.addEventListener("beforeunload",onUnload)
		if(displayTimer==0){
			StopGame()
			CheckCorrectAns()
			if(songIndex==songList.length-1){
				setShowPrompt(false)
				setScoreBtn(true)
			}
		}
	},[displayTimer])

	return(
		<div>
			<Prompt
				when={showPrompt}
				message='You have not completed the game, you have to start again.'
		/>
			<ReactHowler
				src={songList[songIndex]}
				playing={play}
			/>
			<div className="timerBarContainer">
				<span style={timerBarStyle}></span>
			</div>
			<h1 className="text">Audio {songIndex+1}/{songList.length}</h1>
			<h3 className="text">Your Score: {score}</h3>
			<h1 className="text">{displayTimer}</h1>
			<p style={{float:"right",margin:'10px',color:'white'}}>{input.length}/{songAns[songIndex].length}</p>
			<input disabled={displayTimer===0?true:false} className="input" type='text' placeholder='your answer' onChange={e=>setInput(e.target.value)} value={input}/><br />
			{startBtn&&last?<button className="btn" style={{fontSize:'20px',padding:'20px',float:'left',marginTop:'40px'}} onClick={StartGame}>Start audio</button>:
			<button className="btn" style={{fontSize:'20px',padding:'20px',float:'left',marginTop:'40px'}} onClick={CheckCorrectAns}>Submit</button>}
			{!last?
			<button className="btn" style={{fontSize:'20px',padding:'20px',float:'right',marginTop:'40px'}} onClick={NextAudio}>Next</button>:
			<></>}
			<h1 className="text">{correct}</h1>
			{scoreBtn?
			<button className="btn"><Link to={`/ShowScore/${score}`}>Go to score page</Link></button>:
			<></>
			}
		</div>
	)
}

export default QuestionSlider