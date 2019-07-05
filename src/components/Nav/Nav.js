import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';


class Nav extends Component{
	render(){
				let homeLink;
		let titleLink;
		if (!this.props.admin.level){
			homeLink = <Link className="nav-link" to="/quiz">Take Assessment</Link>
			titleLink = <Link to="/quiz"><img className="logo" src="/headtree1.jpg" /><h2 className="nav-title">Brain <br /> Change</h2></Link>
		}else if (this.props.admin.level === 1){
	    	homeLink = <Link className="nav-link" to="/info">{this.props.admin.id ? 'Info' : 'Login / Register'}</Link>
			titleLink = <Link to="/info"><img className="logo" src="/headtree1.jpg" /><h2 className="nav-title">Brain <br /> Change</h2></Link>
	    }else if(this.props.admin.level === 2){
			homeLink = <Link className="nav-link" to="/profile">{this.props.admin.id ? 'Profile' : 'Login / Register'}</Link>
			titleLink = <Link to="/profile"><img className="logo" src="/headtree1.jpg" /><h2 className="nav-title">Brain <br /> Change</h2></Link>
	    }else if(this.props.admin.level === 3){
			homeLink = <Link className="nav-link" to="/myparticipants">{this.props.admin.id ? 'My Participants' : 'Login / Register'}</Link>
			titleLink = <Link to="/myparticipants"><img className="logo" src="/headtree1.jpg" /><h2 className="nav-title">Brain <br /> Change</h2></Link>
	    }else if(this.props.admin.level >= 4){
			homeLink = <Link className="nav-link" to="/allparticipants">{this.props.admin.id ? 'All Participants' : 'Login / Register'}</Link>
			titleLink = <Link to="/allparticipants"><img className="logo" src="/headtree1.jpg" /><h2 className="nav-title">Brain <br /> Change</h2></Link>
	    }
		return(
			<div className="nav">
				{titleLink}				
			    <div className="nav-right">
				  {homeLink}
				  	{this.props.admin.id && this.props.admin.level >= 4 && (
			        <>
					  <Link className="nav-link" to="/dataview">
			            Data View</Link>
					  <Link className="nav-link" to="/admins">
			            Admins</Link>
					  <Link className="nav-link" to="/myparticipants">
			            My Participants</Link>
					  
			        </>
			      )}

					{this.props.admin.id && this.props.admin.level >= 3 && (
			          <Link className="nav-link" to="/profile">
			            Profile</Link>
			      )}

				  {this.props.admin.id && this.props.admin.level >= 1 &&(
			        <>
					  <Link className="nav-link" to="/quiz">
			        	Take Assessment</Link>
						
			          <LogOutButton className="nav-link"/>
			        </>
			      )}

				  {!this.props.admin.id &&(
				  	  <Link className="nav-link" to="/home">
			        	Admin Login / Register</Link>
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
