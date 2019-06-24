import React from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';

// this could also be written with destructuring parameters as:
// const UserPage = ({ admin }) => (
// and then instead of `props.admin.username` you could use `admin.username`
const UserPage = (props) => (
  <div>
    <h1 id="welcome">
      Welcome, { props.admin.username }!
    </h1>
    <p>Your ID is: {props.admin.id}</p>
    <LogOutButton className="log-in" />
  </div>
);

const mapStateToProps = state => ({
  admin: state.admin,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
