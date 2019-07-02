import React, { Component } from 'react'
import { connect } from 'react-redux'; 
import {Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core'

import './SnapShot.css'

class SnapShot extends Component {


  
    componentDidMount() {
        let reducer = this.props.newValues;

        // let coreValues = reducer.orderCore
        // let vioValues = reducer.violator
    }

    render() {

        // let core = (this.props.core.map(coreValues=> {
        //                   return (coreValues)
        // }))

        return (
            <div className= "table">

                <h2>SnapShot</h2>
                {JSON.stringify(this.props.reduxState.newValuesReducer.core)}


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
                            <TableCell align="center" ></TableCell>
                            <TableCell align="center" ></TableCell>
                          </TableRow>
                          <TableRow>
                              <TableCell align="center" >{this.props.corePercents}</TableCell>
                              <TableCell align="center" >{this.props.violatorPercents}</TableCell>
                          </TableRow>
                        </TableBody>
                    </Table>

                    <Table>
                        <TableBody>
                          <TableRow> 
                              <TableCell align="center" >{this.props.beliefs.belief1} </TableCell>
                          </TableRow>
                          <TableRow>
                              <TableCell align="center" >{this.props.beliefs.belief2}</TableCell>
                          </TableRow>
                          <TableRow>
                              <TableCell align="center" >{this.props.beliefs.belief3} </TableCell>
                          </TableRow>

                        </TableBody>


                    </Table>
                </Paper>
                {/* <h2>{this.props.beliefs.belief1}</h2>
                <h2>{this.props.beliefs.belief2}</h2>
                <h2>{this.props.beliefs.belief3}</h2>
                <h3>{this.props.corePercents}</h3>
                <h3>{this.props.violatorPercents}</h3> */}

                <h2>{this.props.core}</h2>

    
               
            </div>
        )
    }
}


const mapStateToProps = (reduxState) => {
    return {
        reduxState,
        core : reduxState.newValuesReducer.core,
        violators :reduxState.newValuesReducer.violators,
        corePercents : reduxState.newValuesReducer.percents.valuesPercent,
        violatorPercents : reduxState.newValuesReducer.percents.violatorPercent,
        beliefs : reduxState.newValuesReducer.beliefs
    }
}
export default connect(mapStateToProps)(SnapShot);

