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
	const [disableInput,setDisableInput]=useState(false)

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
			songAns:"20th century fox",
			imgURL:"https://www.indiantelevision.com/sites/default/files/images/tv-images/2018/07/26/21st%20Century%20Fox.jpg"
		},
		{
			songURL:"https://appointmentt.000webhostapp.com/approved/cse1/got.mp4",
			songAns:"Game of thrones",
			imgURL:"https://consequenceofsound.net/wp-content/uploads/2017/02/gameofthrones-event-2017.jpg?quality=80"
		},
		{
			songURL:"https://appointmentt.000webhostapp.com/approved/cse1/intel.mp4",
			songAns:"Intel",
			imgURL:"data:image/png;base64,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"
		},
		{
			songURL:"https://appointmentt.000webhostapp.com/approved/cse1/mario.mp4",
			songAns:"mario",
			imgURL:"https://www.eteknix.com/wp-content/uploads/2015/01/mario-800x800.jpg"
		},
		{
			songURL:"https://appointmentt.000webhostapp.com/approved/cse1/netfix.mp4",
			songAns:"netflix",
			imgURL:"https://www.ispreview.co.uk/wp-content/uploads/2_netflix_uk.gif"
		},
		{
			songURL:"https://appointmentt.000webhostapp.com/approved/cse1/Nokia.mp4",
			songAns:"nokia",
			imgURL:"data:image/png;base64,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"
		},
		{
			songURL:"https://appointmentt.000webhostapp.com/approved/cse1/tom%20and%20jerry.mp4",
			songAns:"tom and jerry",
			imgURL:"https://i.pinimg.com/originals/29/24/6d/29246da13f137eaa7c11a87d65795be3.jpg"
		},
		{
			songURL:"https://appointmentt.000webhostapp.com/approved/cse1/windows%20xp.mp4",
			songAns:"windows xp",
			imgURL:"https://i7.pngguru.com/preview/942/483/786/windows-xp-microsoft-windows-clip-art-windows-7-microsoft-corporation-windows-xp-logo.jpg"
		},
		{
			songURL:"https://appointmentt.000webhostapp.com/approved/cse1/Universal%20Studios.mp4",
			songAns:"universal studios",
			imgURL:"https://img.travelawaits.com/filter:centercrop/quill/c/6/c/9/7/4/c6c974bd544beda3584a6600e4b81776d96f6ef0.jpg?w=800&h=800"
		},
		{
			songURL:"https://appointmentt.000webhostapp.com/approved/cse1/Stranger%20things.mp4",
			songAns:"stranger things",
			imgURL:"https://i.pinimg.com/originals/98/32/42/983242227380a2825c80fdb2b939488e.jpg"
		},
		{
			songURL:"https://appointmentt.000webhostapp.com/approved/cse1/Disney.mp4",
			songAns:"disney",
			imgURL:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSwWyW1lQlaefGJPSWMRZhVQ7TFIEwi-OEcq5gmCPBg1USAWTo_&usqp=CAU"
		},
		{
			songURL:"https://appointmentt.000webhostapp.com/approved/cse1/blackberry.mp4",
			songAns:"blackberry",
			imgURL:"data:image/png;base64,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"
		},
		{
			songURL:"https://appointmentt.000webhostapp.com/approved/cse1/sony%20ericsson.mp4",
			songAns:"sony ericsson",
			imgURL:"data:image/jpeg;base64,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"
		},
		{
			songURL:"https://appointmentt.000webhostapp.com/approved/cse1/airtel.mp4",
			songAns:"airtel",
			imgURL:"data:image/png;base64,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"
		},
		{
			songURL:"https://appointmentt.000webhostapp.com/approved/cse1/mcdonald.mp4",
			songAns:"mcdonalds",
			imgURL:"https://p7.hiclipart.com/preview/676/74/342/fast-food-mcdonald-s-logo-golden-arches-restaurant-mcdonalds.jpg"
		},
		{
			songURL:"https://appointmentt.000webhostapp.com/approved/cse1/idea.mp4",
			songAns:"idea",
			imgURL:"https://c7.uihere.com/files/537/745/215/4g-idea-cellular-3g-jio-2g-others.jpg"
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
		setDisableInput(false)
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
		setTimerLength(time=>time-window.innerWidth/20)
		setPlay(true)
	}

	const StopGame=()=>{
		setDisableInput(true)
		clearInterval(interval)
		setPlay(false)
	}

	const CheckCorrectAns=()=>{
		setDisableInput(true)
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
		if(input==='')setDisableSubmit(true)
		else setDisableSubmit(false)
		//window.addEventListener("beforeunload",onUnload)
		if(displayTimer==0){
			setLast(false)
			StopGame()
			if(!disableSubmit)
				CheckCorrectAns()
			if(songIndex==listOfSongs.length-1){
				setShowPrompt(false)
				setDisableSubmit(true)
				setScoreBtn(true)
			}
		}
	},[displayTimer])
	if(listOfSongs.length===0)
		return(<div>loading</div>)
	else{
	return(
		<>
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
			{!disableInput?<h1 className="text">{displayTimer}</h1>:<img src={listOfSongs[songIndex].imgURL} alt={listOfSongs[songIndex].songAns} height={100} width={100}/>}
			{showCorrect?<p style={{float:"left",margin:'10px',color:"white",marginTop:'4%'}}>{listOfSongs[songIndex].songAns}<span style={{color:"#949EC4"}}> it is</span></p>:<></>}
			<p style={{float:"right",margin:'10px',color:"white",marginTop:'4%'}}>Characters {input.length}/{listOfSongs[songIndex].songAns.length}</p>
			<input disabled={disableInput} className="inputi" style={{fontWeight:"bold"}} type='text' placeholder='your answer' onChange={e=>setInput(e.target.value)} value={input}/><br />
			{startBtn&&last?<button className="btn" style={{fontSize:'20px',padding:'20px',float:'left',marginTop:'40px'}} onClick={StartGame}>Start audio</button>:
			<button disabled={disableSubmit} className="btn" style={{fontSize:'20px',padding:'20px',float:'left',marginTop:'40px'}} onClick={CheckCorrectAns}>Submit</button>}
			{!last?
			<button className="btn" style={{fontSize:'20px',padding:'20px',float:'right',marginTop:'40px'}} onClick={NextAudio}>Next</button>:
			<></>}
			<h2 className="text">{correct}</h2>
			{scoreBtn?
			<button className="btn" style={{fontSize:'20px',padding:'20px',marginLeft:'25%'}}><Link style={{textDecoration:'none',color:'white'}} to={`/ShowScore/${score}`}>Go to score page</Link></button>:
			<>
			</>
			}
		</div>
		<div class='ripple-background' style={{zIndex:-100,position:'absolute'}}>
            <div class='circle xxlarge shade1'></div>
            <div class='circle xlarge shade2'></div>
            <div class='circle large shade3'></div>
            <div class='circle mediun shade4'></div>
            <div class='circle small shade5'></div>
        </div>
		</>
	)}
}

export default QuestionSlider