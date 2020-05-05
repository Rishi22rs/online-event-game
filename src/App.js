import React from 'react';
import {BrowserRouter as Router,Link,Switch,Route} from 'react-router-dom'
import Home from './Components/Home'
import QuestionSlider from './Components/QuestionSlider'
import ShowScore from './Components/ShowScore'
import "./App.css"

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home}/>
      </Switch>
      <Switch>
        <Route path='/Question' component={QuestionSlider}/>
      </Switch>
      <Switch>
        <Route path='/ShowScore/:score' component={ShowScore}/>
      </Switch>
    </Router>
  );
}

export default App;
