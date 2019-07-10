import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
class Nav extends Component{
	render(){
		
		let homeLink;
		let titleLink;
		//determine where main logo link will redirect to onClick and determine where admin's "home" page will be based on access level
		if (!this.props.admin.level){
			homeLink = <NavLink className="nav-link" activeClassName="activeNav" to="/quiz">Take Assessment</NavLink>
			titleLink = <NavLink to="/quiz" activeClassName="activeNav"><img className="logo" src="/headtree1.jpg" alt="brainchangelogo"/><h2 className="nav-title">Brain <br /> Change</h2></NavLink>
		}else if (this.props.admin.level === 1){
	    	homeLink = <NavLink className="nav-link" activeClassName="activeNav" to="/info">{this.props.admin.id ? 'Info' : 'Login / Register'}</NavLink>
			titleLink = <NavLink to="/info" activeClassName="activeNav"><img className="logo" src="/headtree1.jpg" alt="brainchangelogo"/><h2 className="nav-title">Brain <br /> Change</h2></NavLink>
	    }else if(this.props.admin.level === 2){
			homeLink = <NavLink className="nav-link" activeClassName="activeNav" to="/profile">{this.props.admin.id ? 'Profile' : 'Login / Register'}</NavLink>
			titleLink = <NavLink to="/profile" activeClassName="activeNav"><img className="logo" src="/headtree1.jpg" alt="brainchangelogo"/><h2 className="nav-title">Brain <br /> Change</h2></NavLink>
	    }else if(this.props.admin.level === 3){
			homeLink = <NavLink className="nav-link" activeClassName="activeNav" to="/myparticipants">{this.props.admin.id ? 'My Participants' : 'Login / Register'}</NavLink>
			titleLink = <NavLink to="/myparticipants" activeClassName="activeNav"><img className="logo" src="/headtree1.jpg" alt="brainchangelogo"/><h2 className="nav-title">Brain <br /> Change</h2></NavLink>
	    }else if(this.props.admin.level >= 4){
			homeLink = <NavLink className="nav-link" activeClassName="activeNav" to="/allparticipants">{this.props.admin.id ? 'All Participants' : 'Login / Register'}</NavLink>
			titleLink = <NavLink to="/allparticipants" activeClassName="activeNav"><img className="logo" src="/headtree1.jpg" alt="brainchangelogo"/><h2 className="nav-title">Brain <br /> Change</h2></NavLink>
	    }
		return(
			<div className="nav">
				{titleLink}				
			    <div className="nav-right">
				  {homeLink}
				  	{this.props.admin.id && this.props.admin.level >= 4 && (
			        <>
					  <NavLink className="nav-link" to="/dataview" activeClassName="activeNav">
			            Data View</NavLink>
					  <NavLink className="nav-link" to="/admins" activeClassName="activeNav">
			            Admins</NavLink>
					  <NavLink className="nav-link" to="/myparticipants" activeClassName="activeNav">
			            My Participants</NavLink>
					  
			        </>
			      )}

					{this.props.admin.id && this.props.admin.level >= 3 && (
			          <NavLink className="nav-link" activeClassName="activeNav" to="/profile">
			            Profile</NavLink>
			      )}

				  {this.props.admin.id && this.props.admin.level >= 1 &&(
			        <>
					  <NavLink className="nav-link" activeClassName="activeNav" to="/quiz">
			        	Take Assessment</NavLink>
						
			          <LogOutButton className="nav-link"/>
			        </>
			      )}

				  {!this.props.admin.id &&(
				  	  <NavLink className="nav-link" activeClassName="activeNav" to="/home">
			        	Admin Login / Register</NavLink>
			      )}

			    </div>
			  </div>
		)
	}
}


const mapStateToProps = state => ({
  admin: state.admin,
});

export default connect(mapStateToProps)(Nav);
