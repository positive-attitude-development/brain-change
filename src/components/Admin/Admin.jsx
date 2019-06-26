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
                {this.props.contactinfo[0] &&
                <AdminTable  contactInfo = {this.props.contactinfo}     
                             search = {this.props.search || ""} />
                }
            </div>
        )
    }
}


const mapRedux = reduxState => {
    return { 
        contactinfo : reduxState.adminContactReducer,
        search: reduxState.searchTermReducer
     }
    }

export default connect(mapRedux)(Admin); 
