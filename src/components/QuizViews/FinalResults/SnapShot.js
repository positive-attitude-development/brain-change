import React, { Component } from 'react'
import { connect } from 'react-redux'; 
import {Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core'

import './SnapShot.css'

class SnapShot extends Component {

    
    render() {

        // {this.props.beliefs.belief1 == true ?
        // let violatorVal = this.props.values.violators.map( row => {
        //     return row.values
        // })

        // let coreVal = this.props.values.core.map( row => {
        //     return row.values
        // })
    
        return (
            <div className= "table">

                <h2>SnapShot</h2>
                
                {this.props.beliefs == true ?

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
                              <TableCell >{this.props.values.core.values[0]}</TableCell>
                              <TableCell >{this.props.values.violators.values[0]}</TableCell>
                          </TableRow>
                          <TableRow> 
                              <TableCell >{this.props.values.core.values[1]}</TableCell>
                              <TableCell >{this.props.values.violators.values[1]}</TableCell>
                          </TableRow>
                          <TableRow> 
                              <TableCell >{this.props.values.core.values[2]}</TableCell>
                              <TableCell >{this.props.values.violators.values[2]}</TableCell>
                          </TableRow>
                          <TableRow> 
                              <TableCell >{this.props.values.core.values[3]}</TableCell>
                              <TableCell >{this.props.values.violators.values[3]}</TableCell>
                          </TableRow>
                          <TableRow> 
                              <TableCell >{this.props.values.core.values[4]}</TableCell>
                              <TableCell >{this.props.values.violators.values[4]}</TableCell>
                          </TableRow>
                          <TableRow> 
                              <TableCell >{this.props.values.core.values[5]}</TableCell>
                              <TableCell >{this.props.values.violators.values[5]}</TableCell>
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
              
              : <> </> }
                
                {JSON.stringify(this.props.newValuesReducer)}
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
        beliefs : reduxState.newValuesReducer.beliefs
    }
}
export default connect(mapStateToProps)(SnapShot);

