import React, { Component } from 'react'
import { Link} from 'react-router-dom'; 
import {  Button, Grid, Paper } from '@material-ui/core';

import { connect } from 'react-redux';
import StatusBar from '../StatusBar'; 
import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import './OrderViolators.css'


const SortableItem = sortableElement(({value}) => <li className="listVals">{value.values}</li>);

const SortableContainer = sortableContainer(({children}) => {
    return <ul className="fiveVals">{children}</ul>;
});  

class OrderViolators extends Component {

    state = {
        items: [],
        statusBar : 84
    }

    componentDidMount() {

        const violators = this.props.violators

        let newArray = this.props.values.filter((value) =>{
            for (let newValue of violators) {
                if(newValue === value.id) {
                    return true; 
                }
            }
            return false; 
        })

        this.setState({
            items: newArray 
        })

        console.log(this.state)
    }

    //Drag the values in any order
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
        console.log(idArray); 
        this.props.dispatch({type: 'SET_NEW_VALUES', name: 'orderViolators', payload: idArray})

        this.props.history.push('/RankInstructions')
    }


    render() {
        const {items} = this.state.items; 
        console.log(this.state)
        return (
            <div>
                   
                <StatusBar status={this.state.statusBar} />
                <h2 className="violOrder">Rank your 5 violator values in order</h2>

                <Grid container justify="center">
                    {/* <DragDrop values={this.state.items} /> */}
                        <Paper className="paperDrag">
                            <SortableContainer onSortEnd={this.onSortEnd}>
                                {this.state.items.map((value, index) => (
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
        violators :reduxState.newValuesReducer.violators
    }
}
export default connect(mapStateToProps)(OrderViolators);

