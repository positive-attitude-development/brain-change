import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

const Nav = (props) => (
  <div className="nav">
    <Link to="/home">
      <h2 className="nav-title">Brain Change</h2>
    </Link>
    <div className="nav-right">
      <Link className="nav-link" to="/home">
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {props.admin.id ? 'Home' : 'Login / Register'}
      </Link>
      {/* Show the link to the info page and the logout button if the  is logged in */}
      {props.admin.id && (
        <>
          {/* <Link className="nav-link" to="/info">
            Info Page</Link> */}
           <Link className="nav-link" to="/myparticipants">
            My Participants</Link>
          <Link className="nav-link" to="/profile">
            Profile</Link>
          <Link className="nav-link" to="/admins">
            Admins</Link>
          <Link className="nav-link" to="/all-records">
            All Participants</Link>
          <Link className="nav-link" to="/quiz">
            Quiz</Link>
         
          <LogOutButton className="nav-link"/>
        </>
      )}
      {/* Always show this link since the about page is not protected */}
      <Link className="nav-link" to="/about">
        About
      </Link>
    </div>
  </div>
);

const mapStateToProps = state => ({
  admin: state.admin,
});

export default connect(mapStateToProps)(Nav);
