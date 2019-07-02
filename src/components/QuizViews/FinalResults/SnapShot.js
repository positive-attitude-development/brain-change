import React, { Component } from 'react'
import { connect } from 'react-redux'; 


class SnapShot extends Component {

    render() {

        let core = (this.props.core.map(coreValues=> {
                          return (coreValues)
        }))

        return (
            <div>

                <h2>SnapShot</h2>
                {JSON.stringify(this.props.reduxState.newValuesReducer)}



                <h2>{this.props.beliefs.belief1}</h2>
                <h2>{this.props.beliefs.belief2}</h2>
                <h2>{this.props.beliefs.belief3}</h2>

            {this.props.core === true ? 
                <h2>{core}</h2>
                :
             <> </>
            }
                {/* { this.props.beliefs === true ?
                <h3>{beliefsRow}</h3>
                (this.props.beliefs.belief1.map(beliefRow => {
                    return <h4>{beliefRow}</h4>
                    }
                ))

                : <> </>
                } */}
            </div>
        )
    }
}


const mapStateToProps = (reduxState) => {
    return {
        reduxState,
        core : reduxState.newValuesReducer.orderCore,
        violators :reduxState.newValuesReducer.violators,
        corePercents : reduxState.newValuesReducer.percents.valuesPercent,
        violatorPercents : reduxState.newValuesReducer.percents.violatorPercent,
        beliefs : reduxState.newValuesReducer.beliefs
    }
}
export default connect(mapStateToProps)(SnapShot);

