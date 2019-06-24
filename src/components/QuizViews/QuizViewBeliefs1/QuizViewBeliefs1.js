import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import './QuizViewBeliefs1.css'

export class QuizView1 extends Component {
    render() {
        return (

           

            

            <div>
           
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
  });

export default connect()(QuizViewBeliefs1)
