import React,{useState} from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'

const Home=()=>{
    const [detail,setDetail]=useState({
        name:'',
        email:'',
        mobile:'',
        college:'' 
    })
    const [error,setError]=useState(0)

    const[go,setGo]=useState(false)

    const CheckUser=()=>{
        if(detail.name!==''&&detail.email!==''&&detail.mobile!==''&&detail.college!==''){
            let formData=new FormData()
            formData.append('email',detail.email)
            axios.post('https://appointmentt.000webhostapp.com/online%20event/CheckingEmail.php',formData)
            .then(res=>{
                if(res.data.user!=='exist')SendData()
                else setError(2)
            })
        }else{
            setError(1)
        }
    }

    const SendData=()=>{
        if(detail.name!==''&&detail.email!==''&&detail.mobile!==''&&detail.college!==''){
            let formData=new FormData()
            formData.append('name',detail.name)
            formData.append('email',detail.email)
            formData.append('mobile',detail.mobile)
            formData.append('college',detail.college)
            axios.post('https://appointmentt.000webhostapp.com/online%20event/SendData.php',formData)
            .then(res=>{
                if(res.data.uid==detail.email)setGo(true)
            })
        }else 
            setError(1)
    }
    if(go){
        localStorage.setItem("email",detail.email)
        return <Redirect to={`/Question`} />
    }
    return(
        <div className="App">
            <h1>Guess the brand</h1>
            <button className="btn" onClick={CheckUser}>Start</button><br />
            {error===1?<p style={{textAlign:'center',color:'red'}}>*Fill all the fields</p>:<></>}
            {error===2?<p style={{textAlign:'center',color:'red'}}>*User already given the quiz</p>:<></>}
            <div style={{padding:7}}>
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
            </div>
        </div>
    )
}

export default Home