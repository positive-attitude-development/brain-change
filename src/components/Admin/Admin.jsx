import React, { Component } from 'react';
import { connect } from 'react-redux';

import AdminTable from './AdminTable'; 
import './Admin.css'



export class Admin extends Component {

componentDidMount() {
    this.props.dispatch({ type: 'FETCH_ADMIN_CONTACT'})

}


    render() {
        return (


            <div>
                {/* <AdminTable  contactInfo = {this.props.contactinfo}/> */}
            {JSON.stringify(this.props.contactinfo)}

            </div>
        )
    }
}


const mapRedux = reduxState => {
    return { 
        contactinfo : reduxState.adminContactReducer 
     }
    }

export default connect(mapRedux)(Admin); 
