import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import component
// import NavBar from './components/navbar/header';
import Body from './components/body/body';
import Login from './components/auth/login/login';
import Register from './components/auth/register/register';
import NotFound from './components/notfound/notfound';
import Profile from './components/profile/profile';
import addTrip from './components/add-trip/addTrip';
import listtripOfDriver from './components/listTripOfDriver/listTripDriver'
// import Detail2 from './components/detail_body/detail2';
import '../src/App.css';
class App extends Component {
  render() {
    return (
      <div className="container-fluid" style={{ padding: 0 }}>
        <Router>
          <Switch>
            <Route path="/" exact component={Body} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route path="/user" exact component={Profile}/>
            <Route path="/add-trip" exact component={addTrip} />
            <Route path="/listTripDriver" exact component={listtripOfDriver}/>
            <Route path="/" component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
