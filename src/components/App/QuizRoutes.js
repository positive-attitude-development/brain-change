import React, { Component } from 'react'

import { Route } from 'react-router-dom';

import EliminationInstructions1 from '../QuizViews/Elimination1/EliminationInstructions1'
import EliminationInstructions2 from '../QuizViews/Elimination2/EliminationInstructions2'
import EliminationInstructions3 from '../QuizViews/Elimination3/EliminationInstructions3'
import EliminationInstructions4 from '../QuizViews/Elimination4/EliminationInstructions4'
import EliminationInstructions5 from '../QuizViews/Elimination5/EliminationInstructions5'

import Elimination1 from '../QuizViews/Elimination1/Elimination1'
import Elimination2 from '../QuizViews/Elimination2/Elimination2'
import Elimination3 from '../QuizViews/Elimination3/Elimination3'
import Elimination4 from '../QuizViews/Elimination4/Elimination4'
import Elimination5 from '../QuizViews/Elimination5/Elimination5'

import BeliefInstructions1 from '../QuizViews/QuizViewBeliefs1/BeliefInstructions1';
import BeliefInstructions2 from '../QuizViews/QuizViewBeliefs2/BeliefInstructions2';

import QuizViewBeliefs1 from '../QuizViews/QuizViewBeliefs1/QuizViewBeliefs1';
import QuizViewBeliefs2 from '../QuizViews/QuizViewBeliefs2/QuizViewBeliefs2';

import OrderValues from '../QuizViews/OrderValues/OrderValues';
import OrderValuesInstructions from '../QuizViews/OrderValues/OrderValuesInstructions';

import PickViolators from '../QuizViews/PickViolators/PickViolators';
import ViolatorsInstructions from '../QuizViews/PickViolators/ViolatorsInstructions';

import OrderViolators from '../QuizViews/OrderViolators/OrderViolators';
import OrderViolatorsInstructions from '../QuizViews/OrderViolators/OrderViolatorsInstructions'; 

import RankPercents from '../QuizViews/RankPercents/RankPercents'; 
import RankInstructions from '../QuizViews/RankPercents/RankInstructions'; 





export class QuizRoutes extends Component {
    render() {
        return (

        <div>
            <div className="ElimInstructions">
                    <Route
                    exact path="/ElimInstructions1"
                    component={EliminationInstructions1}
                    />
                    <Route
                    exact path="/ElimInstructions2"
                    component={EliminationInstructions2}
                    />
                    <Route
                    exact path="/ElimInstructions3"
                    component={EliminationInstructions3}
                    />
                    <Route
                    exact path="/ElimInstructions4"
                    component={EliminationInstructions4}
                    />
                    <Route
                    exact path="/ElimInstructions5"
                    component={EliminationInstructions5}
                    />
            </div>

            <div className="Elim">
                    <Route
                    exact path="/Elim1"
                    component={Elimination1}
                    />
                    <Route
                    exact path="/Elim2"
                    component={Elimination2}
                    />
                    <Route
                    exact path="/Elim3"
                    component={Elimination3}
                    />
                    <Route
                    exact path="/Elim4"
                    component={Elimination4}
                    />
                    <Route
                    exact path="/Elim5"
                    component={Elimination5}
                    />


            </div>

            <div className="Beliefs">
                     <Route
                    exact path="/BeliefInstruct1"
                    component={BeliefInstructions1}
                    />

                    <Route
                    exact path="/BeliefInstruct2"
                    component={BeliefInstructions2}
                    />

                    <Route
                    exact path="/Belief1"
                    component={QuizViewBeliefs1}
                    />

                    <Route
                    exact path="/Belief2"
                    component={QuizViewBeliefs2}
                    />
                
                </div>

                <div className="Values">
                     
                    <Route
                    exact path="/OrderValues"
                    component={OrderValues}
                    />

                    <Route
                    exact path="/OrderValuesInstructions"
                    component={OrderValuesInstructions}
                    />

                    <Route
                    exact path="/PickViolators"
                    component={PickViolators}
                    />

                    <Route
                    exact path="/ViolatorsInstructions"
                    component={ViolatorsInstructions}
                    />

                    <Route
                    exact path="/OrderViolators"
                    component={OrderViolators}
                    />

                    <Route
                    exact path="/OrderViolatorsInstructions"
                    component={OrderViolatorsInstructions}
                    />
                    
                    <Route
                    exact path="/RankPercents"
                    component={RankPercents}
                    />

                    <Route 
                    exact path="/RankInstructions"
                    component={RankInstructions}
                    />
                
                </div>
        </div> 
        )
    }
}

export default QuizRoutes
