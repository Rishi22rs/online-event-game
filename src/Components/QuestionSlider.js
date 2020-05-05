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
	const [last,setLast]=useState(false)
	const [scoreBtn,setScoreBtn]=useState(false)
	const [startBtn,setStartBtn]=useState(true)
	const [showPrompt,setShowPrompt]=useState(true)

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
		setStartBtn(true)
		setInput('')	
		setCorrect('')
		setPlay(false)
		clearInterval(interval)
		setDisplayTimer(15)
		if(songIndex==songList.length-2)setLast(true)
		setSongIndex(songIndex=>songIndex+1)
	}

	const onUnload = e => {
		e.preventDefault();
		e.returnValue = '';
	 }

	const StartGame=()=>{
		setStartBtn(false)
		timerId=setInterval(StartTimer,1000)
		setIntrvl(timerId)
		setPlay(true)
	}
	const StartTimer=()=>{
		setDisplayTimer(prevTime=>prevTime-1)
		setPlay(true)
	}

	const StopGame=()=>{
		clearInterval(interval)
		setPlay(false)
	}

	const CheckCorrectAns=()=>{
		console.log(input.toLowerCase(),songAns[songIndex].toLowerCase())
		if(!input.toLowerCase().localeCompare(songAns[songIndex].toLowerCase())){
			setScore(prevScore=>prevScore+1)
			setCorrect('Correct')
		}else{
			setCorrect('Incorrect')
		}
	}

	const ShowSongImage=()=>{

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
	},[displayTimer,songIndex,last])

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
			<h1>Audio no. {songIndex+1}</h1>
			<h3>Your Score: {score}</h3>
			<h1>{displayTimer}</h1>
			<input type='text' placeholder='your answer' onChange={e=>setInput(e.target.value)} value={input}/><br />
			{startBtn?<button onClick={StartGame}>Start audio</button>:<></>}
			{!last?
			<button onClick={NextAudio}>Next</button>:
			<></>}
			<h1>{correct}</h1>
			{scoreBtn?
			<button><Link to={`/ShowScore/${score}`}>Go to score page</Link></button>:
			<></>
			}
		</div>
	)
}

export default QuestionSlider