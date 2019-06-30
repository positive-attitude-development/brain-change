import React, { Component } from 'react'
import { Link} from 'react-router-dom'; 
import {  Button } from '@material-ui/core';
import { connect } from 'react-redux';

import StatusBar from '../StatusBar'; 

export class FinalResults extends Component {

    state = {
        statusBar : 100,
        results: {
            dates: '',
            percent_core: 0,
            percent_violators: 0,
            belief1: '',
            belief2: '',
            belief3: '',
            challenged: false,
            type: '',
            coreValue1: 0,
            coreValue2: 0,
            coreValue3: 0,
            coreValue4: 0,
            coreValue5: 0,
            ranks1: 0,
            ranks2: 0,
            ranks3: 0,
            ranks4: 0,
            ranks5: 0,
            elim1: 0,
            elim2: 0,
            elim3: 0,
            elim4: 0,
            elim5: 0,
            elim6: 0,
            elim7: 0,
            elim8: 0,
            elim9: 0,
            elim10: 0,
            elim11: 0,
            elim12: 0,
            elim13: 0,
            elim14: 0,
            elim15: 0,
            elim16: 0,
            elim17: 0,
            elim18: 0,
            elim19: 0,
            elim20: 0,
            elim21: 0,
            elim22: 0,
            elim23: 0,
            elim24: 0,
            elim25: 0,
            elim26: 0,
            elim27: 0,
            elim28: 0,
            elim29: 0,
            elim30: 0,
            elim31: 0,
            elim32: 0,
            elim33: 0,
            order1: 0,
            order2: 0,
            order3: 0,
            order4: 0,
            order5: 0,
            order6: 0,
            order7: 0,
            order8: 0,
            order9: 0,
            order10: 0,
            order11: 0,
            order12: 0,
            order13: 0,
            order14: 0,
            order15: 0,
            order16: 0,
            order17: 0,
            order18: 0,
            order19: 0,
            order20: 0,
            order21: 0,
            order22: 0,
            order23: 0,
            order24: 0,
            order25: 0,
            order26: 0,
            order27: 0,
            order28: 0,
            order29: 0,
            order30: 0,
            order31: 0,
            order32: 0,
            order33: 0,
            eliminationRound1: 0,
            eliminationRound2: 0,
            eliminationRound3: 0,
            eliminationRound4: 0,
            eliminationRound5: 0,
            eliminationRound6: 0,
            eliminationRound7: 0,
            eliminationRound8: 0,
            eliminationRound9: 0,
            eliminationRound10: 0,
            eliminationRound11: 0,
            time1: '',
            time2: '',
            time3: '',
            time4: '',
            time5: '',
            time6: '',
            time7: '',
            time8: '',
            time9: '',
            time10: '',
            time11: '',
            violator1: 0,
            violator2: 0,
            violator3: 0,
            violator4: 0,
            violator5: 0,
            orderViolator1: 0,
            orderViolator2: 0,
            orderViolator3: 0,
            orderViolator4: 0,
            orderViolator5: 0,
            
        }
    }

    componentDidMount() {
        let reducer = this.props.newValues;
        let round1 = reducer.round1;
        let round2 = reducer.round2;
        let round3 = reducer.round3;
        let round4 = reducer.round4;
        let round5 = reducer.round5;
        let allElimValues = round1.concat(round2, round3, round4, round5);
        console.log('show all eliminated values', allElimValues);
        // for(let i = 0; i < allElimValues.length; i++) {
        //     allElimValues[i] = [allElimValues[i], i];
        //     return indexes;
        // }
        // console.log('show index:', indexes);
        
        let beliefs = reducer.beliefs;
        console.log('show beliefs', beliefs.belief1);


        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();
        if(dd < 10) {
            dd = '0' + dd;
        }
        if(mm < 10) {
            mm = '0' + mm;
        }
        today = mm + '/' + dd + '/' + yyyy;
        this.setState({
            results: {
                dates: today,
                belief1: beliefs.belief1,
                belief2: beliefs.belief2,
                belief3: beliefs.belief3,
            }
        })
    }

    handleSubmit = () => {
        this.props.dispatch({type: 'ADD_RESULTS', payload: this.state.results })
    }

    render() {
        return (
            <div>
                <StatusBar status={this.state.statusBar} />

                FINISHED !!
                <Button
                    color="primary"
                    variant="contained"
                    onClick={this.handleSubmit}
                    >
                    Submit
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

export default connect(mapStateToProps)(FinalResults);

