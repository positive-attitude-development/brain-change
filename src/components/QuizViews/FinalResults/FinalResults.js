import React, { Component } from 'react'
import { Link} from 'react-router-dom'; 
import {  Button } from '@material-ui/core';
import { connect } from 'react-redux';

export class FinalResults extends Component {
    render() {
        return (
            <div>
                

                FINISHED !!
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        reduxState
    }
}
export default connect(mapStateToProps)(FinalResults);

