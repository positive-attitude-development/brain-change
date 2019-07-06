import React, { Component } from 'react'
import { connect } from 'react-redux'; 
import {Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core'

import './SnapShot.css'

class SnapShot extends Component {


    state = {
        snapshot: ""
    }

componentDidMount() {
    // this.props.dispatch({type:'FETCH_PARTICIPANTS'})
    this.props.dispatch({type:'FETCH_SNAPSHOT', payload: this.props.id})
    console.log(this.props.id)

    // this.setState({
    //     snapshot: this.props.snapshotReducer
    // })
}

    
    render() {
        // let snapshot = this.state.snapshotReducer;
        let snap = this.props.snapshot[0];
        console.log(snap)
        console.log(this.props.snapshotReducer)
     
        return (
            <div className= "table">

                <h2>SnapShot</h2>
                
                {snap ?

                 <Paper >
                    <Table>
                        <TableHead>
                          <TableRow className="header">
                            <TableCell align="center" > Core Values </TableCell>
                            <TableCell align="center" > Violator Values </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow> 
                              <TableCell align="center" >{snap.core_values[0]}</TableCell>
                              <TableCell align="center">{snap.violator_values[0]}</TableCell>
                          </TableRow>
                          <TableRow> 
                             <TableCell align="center">{snap.core_values[1]}</TableCell>
                              <TableCell align="center">{snap.violator_values[1]}</TableCell>
                          </TableRow>
                          <TableRow> 
                              <TableCell align="center">{snap.core_values[2]}</TableCell>
                              <TableCell align="center">{snap.violator_values[2]}</TableCell>
                          </TableRow>
                          <TableRow> 
                              <TableCell align="center">{snap.core_values[3]}</TableCell>
                              <TableCell align="center">{snap.violator_values[3]}</TableCell>
                          </TableRow>
                          <TableRow> 
                              <TableCell align="center">{snap.core_values[4]}</TableCell>
                              <TableCell align="center">{snap.violator_values[4]}</TableCell>
                          </TableRow>
                          <TableRow> 
                              <TableCell align="center">{snap.core_values[5]}</TableCell>
                              <TableCell align="center">{snap.violator_values[5]}</TableCell>
                          </TableRow>
                          <TableRow>
                              <TableCell align="center" >{snap.percent_core}</TableCell>
                              <TableCell align="center" >{snap.percent_violators}</TableCell>
                          </TableRow>
                        </TableBody>
                    </Table>

                    <Table>
                        <TableBody>
                          <TableRow> 
                              <TableCell align="center" >{snap.beliefs[0]} </TableCell>
                          </TableRow>
                          <TableRow>
                              <TableCell align="center" >{snap.beliefs[1]}</TableCell>
                          </TableRow>
                          <TableRow>
                              <TableCell align="center" >{snap.beliefs[2]} </TableCell>
                          </TableRow>

                        </TableBody>
                    </Table>
                </Paper> 
              
              : <> </> }
                
                {JSON.stringify(this.props.snapshotReducer)}
            </div>
        )
      }
    }

const mapStateToProps = (reduxState) => {
    return {
        reduxState,
        values : reduxState.newValuesReducer.percents,
        core: reduxState.newValuesReducer.orderCore,
        violators :reduxState.newValuesReducer.violators,
        corePercents : reduxState.newValuesReducer.percents.valuesPercent,
        violatorPercents : reduxState.newValuesReducer.percents.violatorPercent,
        beliefs : reduxState.newValuesReducer.beliefs,

        id : reduxState.urlReducer.participant_id,
        snapshot: reduxState.snapshotReducer
    }
}
export default connect(mapStateToProps)(SnapShot);

