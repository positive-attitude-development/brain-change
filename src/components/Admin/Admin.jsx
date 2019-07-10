import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminTable from './AdminTable'; 
import {Card, CardContent} from '@material-ui/core';
import './Admin.css'

export class Admin extends Component {

    componentDidMount() {
    this.props.dispatch({ type: 'FETCH_ADMIN_CONTACT'});
    }

    render() {
        return (
            <Card raised className="card">
                <CardContent>
                    <h3>Admins:</h3>
                    {/* render admin table if information is in reducer */}
                    {this.props.contactInfo[0] &&
                        <AdminTable history={this.props.history}/>
                    }
                </CardContent>
            </Card>
        )
    }
}

const mapRedux = redux => {
    return { contactInfo : redux.adminContactReducer}
}

export default connect(mapRedux)(Admin); 
