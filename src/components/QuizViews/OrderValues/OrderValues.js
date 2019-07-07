import React, { Component } from 'react'
import {  Button, Grid, Paper, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import StatusBar from '../StatusBar'; 
import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import './OrderValues.css';

const SortableItem = sortableElement(({value}) => <li className="listVals">{value.values}</li>);

const SortableContainer = sortableContainer(({children}) => {
    return <ul className="fiveVals">{children}</ul>;
});

class OrderValues1 extends Component {

    state = {
        items: [],
        statusBar : 64
    }

    // Show 5 core values on page load
    componentDidMount() {
        let reducer = this.props.newValues;
        let round1 = reducer.round1;
        let round2 = reducer.round2;
        let round3 = reducer.round3;
        let round4 = reducer.round4;
        let round5 = reducer.round5;
        let fiveArrays = round1.concat(round2, round3, round4, round5);
        let newArray = this.props.values.filter((value) => {
            
            for (let newValue of fiveArrays) {
                if (newValue === value.id) {
                    return false;
                }
            }
            return true;
        });
        this.setState({
            items: newArray,
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

    // Drag the values in any order
    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({items}) => ({
            items: arrayMove(items, oldIndex, newIndex),
        }));
    };


    // Add the core values to reducer and route to next page
    handleNext = () => {
        let idArray = this.state.items.map(value => {
            return value.id
        })

        let next = new Date(); 
            let sec = next.getSeconds();
            let min = next.getMinutes(); 
            let hour = next.getHours(); 

            let nextTime = ((min * 60 ) + (hour * 360) + sec)
            let orderTime = nextTime - this.state.time 

        this.props.dispatch({type: 'SET_NEW_VALUES', name: 'orderCore', payload: idArray})
        this.props.dispatch({type: 'SET_NEW_TIME', name: 'orderCoreTime', payload: orderTime });
        this.props.history.push('/ViolatorsInstructions')
    }

    render() {
        const {items} = this.state;
        return (
            <div>
                <Grid container justify="center" className="statusBar">
                    <StatusBar status={this.state.statusBar} />
                </Grid>      

                <Paper className="paper">
                    <Typography variant="h5">Rank your 5 core values in order of importance</Typography>
                        <SortableContainer onSortEnd={this.onSortEnd}>
                            {items.map((value, index) => (
                                <SortableItem key={`item-${index}`} index={index} value={value} />
                            ))}
                        </SortableContainer>
                    
                    <div className="button">
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={this.handleNext}
                            >
                            Next
                        </Button> 
                    </div>
                </Paper>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        values: reduxState.valuesReducer,
        newValues: reduxState.newValuesReducer
    }
}

export default connect(mapStateToProps)(OrderValues1);

