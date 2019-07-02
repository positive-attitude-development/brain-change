import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import QuizViewWelcomeForm from './QuizViewWelcomeForm';
import './QuizViewWelcome.css';

class QuizViewWelcome extends Component {

    componentDidMount() {
        this.props.dispatch({type: 'VERIFY_URL', payload: this.props.match.params.url})
    }

    startQuiz = event => {
        console.log('start the quiz');
        this.props.history.push('/ElimInstructions1');
    }

    render() {
        return (      
            <div>
                <h1>Digital Brain Coach</h1>
                <p>Our goal today is to help you identify your core values and key beliefs. Knowing these things will help you move forward in a positive direction. To do this, we will ask you to work through a series of choices. This exercise of choices will cause you to focus more as you go through the process, but that is natural.</p>
                
                {this.props.url.id ? (
                    <div>
                        <h3>Welcome, {this.props.url.first_name}</h3>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={this.startQuiz}
                        >
                        Start the Assessment
                        </Button>
                    </div>
                ) : (
                    <div>
                        <h3>Registration</h3>
                        <p>Please take a moment to let us know a little about you. Starred fields are required before starting the assessment.</p>
                        <QuizViewWelcomeForm history={this.props.history} />
                    </div>
                )}
                
            </div>
        )
    }
}

const mapRedux = redux => {
    return {url: redux.urlReducer}
};

export default connect(mapRedux)(QuizViewWelcome);
