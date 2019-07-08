import React, { Component } from 'react'
import {  Button, Grid, Paper, Typography } from '@material-ui/core';
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
        let now = new Date();
        let sec = now.getSeconds();
        let min = now.getMinutes();
        let hour = now.getHours(); 

        let totalTime =((min * 60 ) + (hour * 360) + sec)

        this.setState({
            time: totalTime
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
        let next = new Date(); 
            let sec = next.getSeconds();
            let min = next.getMinutes(); 
            let hour = next.getHours(); 

            let nextTime = ((min * 60 ) + (hour * 360) + sec)
            let orderViolatorTime = nextTime - this.state.time 

        console.log(idArray); 
        this.props.dispatch({type: 'SET_NEW_VALUES', name: 'orderViolators', payload: idArray})
        this.props.dispatch({type: 'SET_NEW_TIME', name: 'orderViolatorTime', payload: orderViolatorTime });

        this.props.history.push('/RankInstructions')
    }


    render() {
        // const {items} = this.state.items; 
        return (
            <div>
                <Grid container justify="center" className="statusBar">
                    <StatusBar status={this.state.statusBar} />
                </Grid> 
                <h2 className="inst">Rank your 5 violator values in order</h2>     
                <Paper className = "paper">    
                    <div className="background">
                        <SortableContainer onSortEnd={this.onSortEnd}>
                            {this.state.items.map((value, index) => (
                                <SortableItem key={`item-${index}`} index={index} value={value} className="sortableItem"/>
                            ))}
                        </SortableContainer>
                    </div>    
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
        violators :reduxState.newValuesReducer.violators
    }
}
export default connect(mapStateToProps)(OrderViolators);

