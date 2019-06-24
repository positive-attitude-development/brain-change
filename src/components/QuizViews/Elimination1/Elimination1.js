import React, { Component } from 'react';
import { connect } from 'react-redux';

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
