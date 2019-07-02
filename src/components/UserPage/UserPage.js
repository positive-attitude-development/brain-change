import React, {Component} from 'react';
import {connect} from 'react-redux';

class UserPage extends Component{

  render(){
	if(this.props.admin.level === 1){
		this.props.history.push('/info')
	}else if(this.props.admin.level === 2){
		this.props.history.push('/profile')
	}else if(this.props.admin.level === 3){
		this.props.history.push('/myparticipants')
	}else if(this.props.admin.level >= 4){
		this.props.history.push('/all-records')
	}
    return(
      <div>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  admin: state.admin,
});

export default connect(mapStateToProps)(UserPage);
