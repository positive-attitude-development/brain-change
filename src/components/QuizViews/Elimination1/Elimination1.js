
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link} from 'react-router-dom'; 
import {  Button } from '@material-ui/core';

export class Elimination1 extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_VALUES'});
    }

    render() {
        return (
            <div>

                <ul>
                    {this.props.reduxState.valuesReducer.map(value => {
                        return <li>{value.values}</li>
                    })}
                </ul>

                


                <Link to="/ElimInstructions2"> 
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

export default connect(mapStateToProps)(Elimination1);
