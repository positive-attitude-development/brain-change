import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminTable from './AdminTable'; 
import './Admin.css'

export class Admin extends Component {

    componentDidMount() {
    this.props.dispatch({ type: 'FETCH_ADMIN_CONTACT'});
    }

    render() {
        return (
            <div>
                <h2>Admins:</h2>
                {this.props.contactInfo[0] &&
                    <AdminTable history={this.props.history}/>
                }
            </div>
        )
    }
}

const mapRedux = redux => {
    return { contactInfo : redux.adminContactReducer}
}

export default connect(mapRedux)(Admin); 
