import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import './QuizViewWelcome.css';

class QuizViewWelcome extends Component {

    componentDidMount() {
        this.props.dispatch({type: 'VERIFY_URL', payload: this.props.match.params.url})
    }

    registerAndStartQuiz = event => {
        console.log('register and start');
        this.props.history.push('/ElimInstructions1');
    }

    startQuiz = event => {
        console.log('start the quiz');
        this.props.history.push('/ElimInstructions1');
    }

    render() {
        return (      
            <div className="grid">
                {this.props.url.id && (
                    <div>
                        <h1>Welcome, {this.props.url.first_name}</h1>
                        <div className="table">
                            <h2> Digital Brain Coach</h2>
                            <div className="welcome-div">
                                Our goal today is to help you identify your core values and key beliefs. Knowing these things will help you move forward in a positive direction. To do this, we will ask you to work through a series of choices. This exercise of choices will cause you to focus more as you go through the process, but that is natural.
                            </div>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={this.startQuiz}
                                >
                                Start
                            </Button>
                        </div>
                    </div>
                )}
                {!this.props.url.id &&
                    <div>
                        <h1>Welcome!</h1>
                        <p>Please register before taking the quiz</p>
                        <Button 
                            color="primary"
                            variant="contained"
                            onClick={this.registerAndStartQuiz}
                            >
                            Start
                        </Button>
                    </div>
                }
            </div>
        )
    }
}

const mapRedux = redux => {
    return {url: redux.urlReducer}
};

export default connect(mapRedux)(QuizViewWelcome);
