import React,{useEffect} from 'react'
import ReactGA from 'react-ga'
import {BrowserRouter as Router,Link,Switch,Route} from 'react-router-dom'
import Home from './Components/Home'
import QuestionSlider from './Components/QuestionSlider'
import ShowScore from './Components/ShowScore'
import "./App.css"

const trackingId = "UA-165840903-1"

function App() {

  useEffect(()=>{
    ReactGA.initialize(trackingId)

    ReactGA.pageview(window.location.pathname + window.location.search)
  },[])

  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home}/>
      </Switch>
      <Switch>
        <Route path='/Question' component={QuestionSlider}/>
      </Switch>
      <Switch>
        <Route path='/ShowScore' component={ShowScore}/>
      </Switch>
    </Router>
  );
}

export default App;
