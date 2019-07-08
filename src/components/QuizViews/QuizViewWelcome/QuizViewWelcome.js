import React, { Component } from 'react';
import { Button, Paper, Card, CardContent } from '@material-ui/core';
import { connect } from 'react-redux';
import QuizViewWelcomeForm from './QuizViewWelcomeForm';
import './QuizViewWelcome.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class QuizViewWelcome extends Component {

    componentDidMount() {
        this.props.dispatch({type: 'VERIFY_URL', payload: this.props.match.params.url})
    } //end componentDidMount

    startQuiz = event => {
        console.log('start the quiz');
        this.props.history.push('/ElimInstructions1');
    } //end startQuiz

    demoClick = () => {
        this.props.history.push('/quiz/v0L8l8RXSzqi');
    }

    render() {
        console.log('this.props.match.params:', this.props.match.params)
        return (      
            <div>
                <Card raised className="introCard">
                    <CardContent>
                        <CopyToClipboard text={`http://localhost:3000/#/quiz/v0L8l8RXSzqi`}>
							<h2 onClick={this.demoClick}>Digital Brain Coach</h2>
						</CopyToClipboard>
                        

                        <p id="introPar">Our goal today is to help you identify your core values and key beliefs. To do this, we will ask you to work through a series of choices. These choices might become more difficult as you go through the exercise, but knowing these things will help you move forward in a positive direction.</p>

                        {this.props.url.id ? (
                            <div>
                                <h3>Welcome, {this.props.url.first_name}!</h3>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    size="large"
                                    onClick={this.startQuiz} >
                                    Start the Assessment
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <h3>Registration</h3>
                                <p>Please take a moment to let us know a little about you.</p>
                                <h5>(*Required fields)</h5>
                                <QuizViewWelcomeForm history={this.props.history} />
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        )
    }
}

const mapRedux = redux => {
    return {url: redux.urlReducer}
};

export default connect(mapRedux)(QuizViewWelcome);
