import React, { Component } from 'react'
import { Link} from 'react-router-dom'; 
import { connect } from 'react-redux';
import StatusBar from '../StatusBar'; 
import {withStyles} from '@material-ui/core/styles';

import { Paper, Button, Table, TableCell, TableHead, TableRow, TableBody, TextField } from '@material-ui/core'

import './RankPercents.css'

const styles = {

    root : {
        table: {
            minWidth: 150,
          },



    }
}

// const rows = [
//     {"value", "violater"},
//     {"value", "violater"},
//     {"value", "violater"},
//     {"value", "violater"},
//     {"value", "violater"},
//   ];




export class RankPercents extends Component {

    state = {
        statusBar : 95,
        valuesPercent: "",
        violatorPercent: ""
    }



    handleNext = (event) => {
        event.preventDefault(); 
        this.props.history.push('FinalResults'); 
    }


    handleChange = propertyName => (event) => {
        event.preventDefault();
        this.setState({
                [propertyName]: event.target.value
        })
        console.log(this.state);
    }


    render() {
        const classes = this.props
        return (
            <div className= {classes.root}>

                <StatusBar status={this.state.statusBar} />

                <Paper>
                    <Table className={classes.table}>
                        <TableHead>
                        <TableRow>
                            <TableCell align="center">Core Values </TableCell>
                            <TableCell align="center">Violater Values</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {/* {rows.map(row => ( */}
                            <TableRow >
                            <TableCell align="center">{}</TableCell>
                            <TableCell align="center">{}</TableCell>
                            
                            </TableRow>
                        {/* ))} */}
                        </TableBody>
                    </Table>
                </Paper>

                    <TextField
                        id="Value"
                        // className={clsx(classes.margin, classes.textField)}
                        variant="outlined"
                        label="Core Percent"
                        value={this.state.valuesPercent}
                        onChange={this.handleChange("value")}
                    />

                    <TextField
                        id="Value"
                        // className={clsx(classes.margin, classes.textField)}
                        variant="outlined"
                        label="Violator Percent"
                        value={this.state.violatorPercent}
                        onChange={this.handleChange("violator")}
                    />  

                <div>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick= {this.handleNext}
                        >
                        Next
                    </Button> 
                </div>
                
            </div>
        )
    }
}

const mapState = reduxState => {
    return {
        reduxState
        }   
    }
export default withStyles(styles)(connect(mapState)(RankPercents))

