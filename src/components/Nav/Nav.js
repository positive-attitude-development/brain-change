import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';



const Nav = (props) => (
  <div className="nav">
    <Link to="/myparticipants">
      <h2 className="nav-title">Brain Change</h2>
    </Link>
    <div className="nav-right">
      <Link className="nav-link" to="/home">
        {/* Show this link if they are logged in or not, but call it 'Home' if they are logged in, or 'Login / Register' if they are not */}
        {props.admin.id ? 'Home' : 'Login / Register'}
      </Link>

	  	{props.admin.id && props.admin.level >= 5 && (
        <>
		  <Link className="nav-link" to="/quiz">
            Quiz</Link>
		  <Link className="nav-link" to="/dataview">
            Data View</Link>
        </>
      )}

		{props.admin.id && props.admin.level >= 4 && (
        <>
          <Link className="nav-link" to="/admins">
            Admins</Link>
          <Link className="nav-link" to="/all-records">
            All Participants</Link>
        </>
      )}

		{props.admin.id && props.admin.level >= 3 && (
        <>
          <Link className="nav-link" to="/myparticipants">
            My Participants</Link>
        </>
      )}

      {props.admin.id && props.admin.level >= 2 &&(
        <>
		  <Link className="nav-link" to="/profile">
            Profile</Link>
        </>
      )}

	  {props.admin.id && props.admin.level >= 1 &&(
        <>
		  <Link className="nav-link" to="/about">
        	About</Link>
         
          <LogOutButton className="nav-link"/>

		   <Link className="nav-link" to="/quiz">
            Quiz</Link>
        </>
      )}

	  {props.admin.id && props.admin.level === 1 &&(
        <>
		  <Link className="nav-link" to="/info">
        	Info</Link>
        </>
      )}

    </div>
  </div>
);

const mapStateToProps = state => ({
  admin: state.admin,
});

export default connect(mapStateToProps)(Nav);
