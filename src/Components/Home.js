import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Modal from 'react-modal'

Modal.setAppElement('#root')
const Home=()=>{
    // const [detail,setDetail]=useState({
    //     name:'',
    //     email:'',
    //     mobile:'',
    //     college:'' 
    // })
    // const [error,setError]=useState(0)
    const [showModal,setShowModal]=useState(true)

    // const[go,setGo]=useState(false)

    // const CheckUser=()=>{
    //     if(detail.name!==''&&detail.email!==''&&detail.mobile!==''&&detail.college!==''){
    //         let formData=new FormData()
    //         formData.append('email',detail.email)
    //         axios.post('https://appointmentt.000webhostapp.com/online%20event/CheckingEmail.php',formData)
    //         .then(res=>{
    //             if(res.data.user!=='exist')SendData()
    //             else setError(2)
    //         })
    //     }else{
    //         setError(1)
    //     }
    // }

    // const SendData=()=>{
    //     if(detail.name!==''&&detail.email!==''&&detail.mobile!==''&&detail.college!==''){
    //         let formData=new FormData()
    //         formData.append('name',detail.name)
    //         formData.append('email',detail.email)
    //         formData.append('mobile',detail.mobile)
    //         formData.append('college',detail.college)
    //         axios.post('https://appointmentt.000webhostapp.com/online%20event/SendData.php',formData)
    //         .then(res=>{
    //             if(res.data.uid==detail.email)setGo(true)
    //         })
    //     }else 
    //         setError(1)
    // }
    // if(go){
    //     localStorage.setItem("email",detail.email)
    //     return <Redirect to={`/Question`} />
    // }
    return(
        <>
        <div className="App">
            <Modal 
                isOpen={showModal}
                style={{
                    content:{
                        backgroundColor:'#252C4A',
                        backgroundImage: "linear-gradient(to right, #252C4A, white)",
                        color:'#949EC4',
                    }
                }}
            >
				<h2 style={{color:'white',textDecoration: 'underline'}}>Instructions</h2>
				<p style={{color:'white'}}>1)	A time limit of 20 seconds will be given in which the participants<span><br /></span> will have to listen to an audio and enter their responses in the text box.</p>
                <p style={{color:'white'}}>2)	The participants will have to manually play the audio by clicking on<span><br /></span> the option present at the left side of the screen.</p>
                <p style={{color:'white'}}>3)	The participants have to submit their responses according to the<span><br /></span> character limit that is mentioned at the top right corner of the text box.</p>
                <p style={{color:'white'}}>4)	The inputs entered aren’t case sensitive.</p>
                <button className='btn' onClick={()=>setShowModal(false)} style={{fontSize:20,float:'right',padding:25,zIndex:10}}>Okay</button>
			</Modal>
            <h1>Audio Mage</h1>
            <Link to={`/Question`}><button className="btn" style={{fontSize:20,zIndex:10}}>Start</button></Link><br />
            {/* {error===1?<p style={{textAlign:'center',color:'red'}}>*Fill all the fields</p>:<></>}
            {error===2?<p style={{textAlign:'center',color:'red'}}>*User already given the quiz</p>:<></>} */}
            {/* <div style={{padding:7}}>
            <input className="inputi" type="text" placeholder="Name" onChange={(e)=>setDetail({
                name:e.target.value,
                email:detail.email,
                mobile:detail.mobile,
                college:detail.college
            })}/>
            <input className="inputi" style={{marginTop:10}} type="email" placeholder="Email" onChange={(e)=>setDetail({
                name:detail.name,
                email:e.target.value,
                mobile:detail.mobile,
                college:detail.college
            })}/>
            <input className="inputi" style={{marginTop:10}} type="number" placeholder="Mobile number" onChange={(e)=>setDetail({
                name:detail.name,
                email:detail.email,
                mobile:e.target.value,
                college:detail.college
            })}/>
            <input className="inputi" style={{marginTop:10}} type="text" placeholder="College" onChange={(e)=>setDetail({
                name:detail.name,
                email:detail.email,
                mobile:detail.mobile,
                college:e.target.value
            })}/>
            </div> */}
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

export default Home