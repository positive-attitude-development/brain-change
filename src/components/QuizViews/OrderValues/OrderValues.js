import React, { Component } from 'react'
import { Link} from 'react-router-dom'; 
import {  Button, Grid, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import StatusBar from '../StatusBar'; 
import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import './OrderValues.css';

const SortableItem = sortableElement(({value}) => <li className="listVals">{value.values}</li>);

const SortableContainer = sortableContainer(({children}) => {
    return <ul className="fiveVals">{children}</ul>;
});

export class OrderValues1 extends Component {

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
        this.props.dispatch({type: 'SET_NEW_VALUES', name: 'orderCore', payload: idArray})
        this.props.history.push('/ViolatorsInstructions')
    }

    render() {
        const {items} = this.state;
        return (
            <div>
                <StatusBar status={this.state.statusBar} />
                <h2 className="instOrder">Rank your 5 core values in order of importance</h2>
                <Grid container justify="center">
                    {/* <DragDrop values={this.state.items} /> */}
                        <Paper className="paperDrag">
                            <SortableContainer onSortEnd={this.onSortEnd}>
                                {items.map((value, index) => (
                                    <SortableItem key={`item-${index}`} index={index} value={value} />
                                ))}
                            </SortableContainer>
                        </Paper>
                </Grid>   
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={this.handleNext}
                        >
                        Next
                    </Button> 
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

