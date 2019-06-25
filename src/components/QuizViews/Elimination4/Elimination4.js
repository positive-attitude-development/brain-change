import React, { Component } from 'react'
import { Link} from 'react-router-dom'; 
import {  Button } from '@material-ui/core';
import { connect } from 'react-redux';

export class Elimination4 extends Component {
    render() {
        return (
            <div>
                

                <Link to="/BeliefInstruct2">   
                    <Button
                        color="primary"
                        variant="contained"
                        >
                        Next
                    </Button> 
                </Link>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        reduxState
    }
}
export default connect(mapStateToProps)(Elimination4);

