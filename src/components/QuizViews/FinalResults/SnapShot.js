import React, { Component } from 'react'
import { connect } from 'react-redux'; 
import {Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core'
import './SnapShot.css'

class SnapShot extends Component {
    
    render() {

        let snap = this.props.snapshot[0];

        return (
            <div>
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
            </div>
        )
      }
    }

const mapStateToProps = (reduxState) => {
    return {
        snapshot: reduxState.snapshotReducer
    }
}
export default connect(mapStateToProps)(SnapShot);

