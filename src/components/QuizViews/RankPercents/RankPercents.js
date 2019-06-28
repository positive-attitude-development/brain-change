import React, { Component } from 'react'

import { connect } from 'react-redux';
import StatusBar from '../StatusBar'; 
import {withStyles} from '@material-ui/core/styles';

import Slider from '@material-ui/lab/Slider';
import { Paper, Button, Table, TableCell, TableHead, TableRow, TableBody, TextField, Typography } from '@material-ui/core'

import './RankPercents.css'

const styles = {
        root: {
            color: '#52af77',
            height: 8,
        },
        thumb: {
            height: "24px",
            width: "24px",
            backgroundColor: '#fff',
            border: '2px solid currentColor',
            marginTop: "-8px",
            marginLeft: "-12px",
            '&:focus,&:hover,&$active': {
            boxShadow: 'inherit',
            },
        },
        active: {},
        valueLabel: {
            left: 'calc(-50% + 4px)',
        },
        track: {
            height: 8,
            borderRadius: 4,
        },
        rail: {
            height: 8,
            borderRadius: 20,
        }
    }

class RankPercents extends Component {

    state = {
        statusBar : 95,
        valuesPercent: 50,
        violatorPercent: 50,
        violators: [],
        core: []
        
    }

    componentDidMount = () => {
        const violators = this.props.violators
        const core = this.props.core

        let violatorsArray = this.props.values.filter((value) =>{
            for (let newValue of violators) {
                if(newValue === value.id) {
                    return true; 
                }
            }
            return false; 
        })

        let coreArray = this.props.values.filter((value) =>{
            for (let newValue of core) {
                if(newValue === value.id) {
                    return true; 
                }
            }
            return false; 
        })

        this.setState({
                violators : violatorsArray,
                core: coreArray
        })

        let now = new Date();
        let sec = now.getSeconds();
        let min = now.getMinutes();
        let hour = now.getHours(); 

        let totalTime =((min * 60 ) + (hour * 360) + sec)

        this.setState({
            time: totalTime
        })
    }

    handleNext = (event) => {
        event.preventDefault(); 

        let next = new Date(); 
            let sec = next.getSeconds();
            let min = next.getMinutes(); 
            let hour = next.getHours(); 

            let nextTime = ((min * 60 ) + (hour * 360) + sec)
            let percentTime = nextTime - this.state.time 

        this.props.dispatch({type: 'SET_NEW_VALUES', name: 'percents', payload: this.state});
        this.props.dispatch({type: 'SET_NEW_TIME', name: 'percentTime', payload: percentTime });
        this.props.history.push('FinalResults'); 
    }


    handleChange = propertyName => (e, value) => {
        e.preventDefault();
        this.setState({
                [propertyName]: value,
                valuesPercent: (100 - value)
        })

        console.log(this.state);
    }


    render() {
        console.log(this.state);
        const {classes} = this.props;
        const { violatorPercent } = this.state
       

        return (
            <div>
                
                <StatusBar status={this.state.statusBar} />
                
                <div className = "grid">

                <div className = "core">
                    
                    <h3> Core Values </h3>
                    <ul >
                        {this.state.core.map(value => {
                            return <li key={value.id}
                                        value={value.id}>{value.values}</li>
                        })}
                    </ul>
                </div>
                    
                <div className = "violators">
                        <h3> Core Violators </h3>
                        <ul>
                        {this.state.violators.map(value => {
                            return <li key={value.id}
                                        value={value.id}>{value.values}</li>
                        })}
                    </ul>
                </div>
                {/* : } */}
                {/* <Paper>
                    <Table className={classes.table}>
                        <TableHead>
                        <TableRow>
                            <TableCell align="center">Core Values </TableCell>
                            <TableCell align="center">Violater Values</TableCell>
                        </TableRow>
                        </TableHead>
                        {this.state.core === true ?
                        
                        <TableBody>
                            {this.state.map(rows => {
                               return( <TableRow >
                                <TableCell align="center">{rows.core.values}</TableCell>
                                <TableCell align="center">{rows.violators.values}</TableCell>
                                </TableRow>
                               )
                            }
                            )}
                        </TableBody>
                        : <TableBody>
                            </TableBody>
                        }
                    </Table>
                </Paper> */}
                {/* // className={classes.root} */}
            </div>
                <div className= {classes.root}>
                    <Typography className= "slider" gutterBottom align="center"> Percent</Typography>
                        <Slider onChange={this.handleChange('violatorPercent')} 
                                value={violatorPercent}
                                // valueLabelDisplay="auto" 
                                // aria-label="Percents" 
                                defaultValue={50} />
              
                </div>

            <div className = "percents">
                <h2>How do you live each day ?</h2>

                <h3 className="corePercents"> Core Values {this.state.valuesPercent} % </h3>
               
                <h3 className="violatorPercents">Violator Values {this.state.violatorPercent} % </h3>

            </div>

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
        values: reduxState.valuesReducer,
        core: reduxState.newValuesReducer.orderCore,
        violators :reduxState.newValuesReducer.violators
        }   
    }
export default withStyles(styles)(connect(mapState)(RankPercents))

