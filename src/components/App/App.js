import React, {Component} from 'react';
import {HashRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import Nav from '../Nav/Nav';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import Profile from '../Profile/Profile';
import QuizRoutes from './QuizRoutes';
import MyParticipants from '../MyParticipants/MyParticipants';
import Admin from '../Admin/Admin'; 
import IndividualParticipant from '../IndividualParticipant/IndividualParticipant';
import AllRecords from '../AllRecords/AllRecords';
import DataView from '../DataView/DataView';
import './App.css';

import QuizViewWelcome from '../QuizViews/QuizViewWelcome/QuizViewWelcome';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_ADMIN', history: this.props.history});
  };//end componentDidMount

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>

            <Redirect exact from="/" to="/home" />

            <ProtectedRoute
              exact path="/home"
              component={UserPage}/>

            <ProtectedRoute
              exact path="/allparticipants"
              component={AllRecords}/>

            <ProtectedRoute
              exact path="/info"
              component={InfoPage}/>

            <ProtectedRoute
              exact path="/profile"
              component={Profile}/>

            <ProtectedRoute
              exact path="/admins"
              component={Admin}/>

            <ProtectedRoute
              exact path="/myparticipants"
              component={MyParticipants}/>

            <ProtectedRoute
              exact path="/individualparticipant/:id"
              component={IndividualParticipant}/>

            <ProtectedRoute
              exact path="/dataview"
              component={DataView}/>

           <Route
              exact path="/quiz"
              component={QuizViewWelcome}/>

            <Route
              exact path="/quiz/:url"
              component={QuizViewWelcome}/>

          </Switch>
          <QuizRoutes />
        </div>
      </Router>
  )}
}
const mapStateToProps = state => ({
  admin: state.admin,
});

export default connect(mapStateToProps)(App);
