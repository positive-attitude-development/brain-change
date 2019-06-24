import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import './QuizViewWelcome'

export class QuizViewWelcome extends Component {
    render() {
        return (

            // startQuiz() => {

            // }

            

            <div>
                <h1>Welcome,
                {this.props.reduxState} 
                </h1>

            <div className="table">
            <h2> Digital Brain Coach</h2>
                <div className="welcome-div">Our goal today is to help you identify your core values and key beliefs. 
                    Knowing these things will help you move forward in a positive direction. 
                    To do this, we will ask you to work through a series of choices. 
                    This exercise of choices will cause you to focus more as you go through
                    the process, but that is natural 
                </div>
                <Button
                color="primary"
                variant="contained"
                // onclick={this.startQuiz}
                >
                Start
                </Button>
            </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
  });

export default connect()(QuizViewWelcome)
