import React, { Component } from 'react'
import { connect } from 'react-redux'

export class TotalItems extends Component {

componentDidMount() {
    this.props.dispatch({type: 'FETCH_ITEMS'});
}

    render() {
        return (
            <div>
                <ul>
                    {this.props.reduxState.totalItemsReducer.map((total, i) => {
                        return <li key={i}>{total.username} added {total.total_items} items</li>
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

export default connect(mapStateToProps)(TotalItems);

