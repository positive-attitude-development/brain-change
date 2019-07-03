import React, { Component } from 'react'
import {  Button, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import Banner from '../Banner/Banner';
import SnapShot from './SnapShot'; 
import StatusBar from '../StatusBar'; 




class FinalResults extends Component {

    state = {
        statusBar : 100,
        results: {
            dates: '',
            percent_core: 0,
            percent_violators: 0,
            participantId: 0,
            belief1: '',
            belief2: '',
            belief3: '',
            challenged1: false,
            challenged2: false,
            challenged3: false,
            type1: '',
            type2: '',
            type3: '',
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

        // Combine all eliminated values into one array
        let reducer = this.props.newValues;
        let round1 = reducer.round1;
        let round2 = reducer.round2;
        let round3 = reducer.round3;
        let round4 = reducer.round4;
        let round5 = reducer.round5;
        let allElimValues = round1.concat(round2, round3, round4, round5);
        
        // Get percentage of core values and violator values
        let percents = reducer.percents
    
        // Get all 3 beliefs
        let beliefs = reducer.beliefs;

        // Get type of belief
        let testedBelief = reducer.testedBelief;

        // Show which belief is challenged
        let challenged;
        if(testedBelief.testedBelief === beliefs.belief1) {
            challenged = 'challenged1';
        } else if (testedBelief.testedBelief === beliefs.belief2) {
            challenged = 'challenged2';
        } else if (testedBelief.testedBelief === beliefs.belief3) {
            challenged = 'challenged3';
        }
        
        // Show challenged belief with a type
        let type;
        if (testedBelief.testedBelief === beliefs.belief1) {
            type = 'type1';
        } else if (testedBelief.testedBelief === beliefs.belief2) {
            type = 'type2';
        } else if (testedBelief.testedBelief === beliefs.belief3) {
            type = 'type3';
        }

        // Get 5 core values
        let coreValues = reducer.orderCore

        // Get 5 violator values
        let violatorValues = reducer.orderViolators;

        // Get today's dates
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
        today = mm + '-' + dd + '-' + yyyy;

        this.setState({
            results: {
                ...this.state.results,
                dates: today,
                belief1: beliefs.belief1,
                belief2: beliefs.belief2,
                belief3: beliefs.belief3,
                percent_core: percents.valuesPercent,
                percent_violators: percents.violatorPercent,
                participantId: this.props.url.participant_id,
                [challenged]: true,                
                [type]: testedBelief.typeOfBelief,
                coreValue1: coreValues[0],
                coreValue2: coreValues[1],
                coreValue3: coreValues[2],
                coreValue4: coreValues[3],
                coreValue5: coreValues[4],
                ranks1: 1,
                ranks2: 2,
                ranks3: 3,
                ranks4: 4,
                ranks5: 5,
                elim1: allElimValues[0],
                elim2: allElimValues[1],
                elim3: allElimValues[2],
                elim4: allElimValues[3],
                elim5: allElimValues[4],
                elim6: allElimValues[5],
                elim7: allElimValues[6],
                elim8: allElimValues[7],
                elim9: allElimValues[8],
                elim10: allElimValues[9],
                elim11: allElimValues[10],
                elim12: allElimValues[11],
                elim13: allElimValues[12],
                elim14: allElimValues[13],
                elim15: allElimValues[14],
                elim16: allElimValues[15],
                elim17: allElimValues[16],
                elim18: allElimValues[17],
                elim19: allElimValues[18],
                elim20: allElimValues[19],
                elim21: allElimValues[20],
                elim22: allElimValues[21],
                elim23: allElimValues[22],
                elim24: allElimValues[23],
                elim25: allElimValues[24],
                elim26: allElimValues[25],
                elim27: allElimValues[26],
                elim28: allElimValues[27],
                elim29: allElimValues[28],
                elim30: allElimValues[29],
                elim31: allElimValues[30],
                elim32: allElimValues[31],
                elim33: allElimValues[32],
                order1: 1,
                order2: 2,
                order3: 3,
                order4: 4,
                order5: 5,
                order6: 6,
                order7: 7,
                order8: 8,
                order9: 9,
                order10: 10,
                order11: 11,
                order12: 12,
                order13: 13,
                order14: 14,
                order15: 15,
                order16: 16,
                order17: 17,
                order18: 18,
                order19: 19,
                order20: 20,
                order21: 21,
                order22: 22,
                order23: 23,
                order24: 24,
                order25: 25,
                order26: 26,
                order27: 27,
                order28: 28,
                order29: 29,
                order30: 30,
                order31: 31,
                order32: 32,
                order33: 33,
                eliminationRound1: 1,
                eliminationRound2: 2,
                eliminationRound3: 3,
                eliminationRound4: 4,
                eliminationRound5: 5,
                eliminationRound6: 6,
                eliminationRound7: 7,
                eliminationRound8: 8,
                eliminationRound9: 9,
                eliminationRound10: 10,
                eliminationRound11: 11,
                time1: reducer.round1Time,
                time2: reducer.round2Time,
                time3: reducer.belief1Time,
                time4: reducer.round3Time,
                time5: reducer.round4Time,
                time6: reducer.belief2Time,
                time7: reducer.round5Time,
                time8: reducer.orderCoreTime,
                time9: reducer.pickViolatorTime,
                time10: reducer.orderViolatorTime,
                time11: reducer.percentTime,
                violator1: violatorValues[0],
                violator2: violatorValues[1],
                violator3: violatorValues[2],
                violator4: violatorValues[3],
                violator5: violatorValues[4],
                orderViolator1: 1,
                orderViolator2: 2,
                orderViolator3: 3,
                orderViolator4: 4,
                orderViolator5: 5,
            }
        })
    }

    handleSubmit = () => {
        this.props.dispatch({type: 'ADD_RESULTS', payload: this.state.results })
    }

    render() {
        return (
            <div>
                <div className="banner">
                    <Banner />
                </div>
                <Grid container justify="center">
                    <StatusBar status={this.state.statusBar} />
                </Grid>

                <SnapShot Values = {this.props.reduxState} /> 
                
  
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
        newValues: reduxState.newValuesReducer,
        url: reduxState.urlReducer,

    }
}

export default connect(mapStateToProps)(FinalResults);

