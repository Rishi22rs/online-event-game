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

    const[go,setGo]=useState(false)

    const SendData=()=>{
        let formData=new FormData()
        formData.append('name',detail.name)
        formData.append('email',detail.email)
        formData.append('mobile',detail.mobile)
        formData.append('college',detail.college)
        axios.post('http://192.168.43.185/onlineevent/SendData.php',formData)
        .then(res=>{
            if(res.data.x=="0")setGo(true)
        })
    }
    if(go){
        localStorage.setItem("a",true)
        return <Redirect to={`/Question`} />
    }
    return(
        <div className="App">
            <h1>Guess the brand</h1>
            <button className="btn" onClick={SendData}>Start</button><br />
            <div style={{padding:50}}>
            <input className="input" type="text" placeholder="Name" onChange={(e)=>setDetail({
                name:e.target.value,
                email:detail.email,
                mobile:detail.mobile,
                college:detail.college
            })}/>
            <input className="input" style={{marginTop:10}} type="email" placeholder="Email" onChange={(e)=>setDetail({
                name:detail.name,
                email:e.target.value,
                mobile:detail.mobile,
                college:detail.college
            })}/>
            <input className="input" style={{marginTop:10}} type="number" placeholder="Mobile number" onChange={(e)=>setDetail({
                name:detail.name,
                email:detail.email,
                mobile:e.target.value,
                college:detail.college
            })}/>
            <input className="input" style={{marginTop:10}} type="text" placeholder="College" onChange={(e)=>setDetail({
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