import React, { Component } from 'react'
import { connect } from 'react-redux'

export class TotalItems extends Component {

componentDidMount() {
    this.props.dispatch({type: 'FETCH_ITEMS'});
}

    render() {
        return (
            <div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        reduxState
    }
}

export default connect(mapStateToProps)(TotalItems);

