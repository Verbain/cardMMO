import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Nav from './components/Nav'
import Home from './components/Home'
import Profile from './components/Profile'
import Login from './components/Login'

function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
          <Nav/>
          <div className="nav-space"></div>
          <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/profile" exact component={Profile}/>
              <Route path="/login" exact component={Login}/>
            </Switch>
        </header>
    </div>
    </Router>
  );
}

export default App;
