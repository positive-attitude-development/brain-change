import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button, TextField, Card, CardContent} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

const styles = {
	root: {

  },
  card: {
    width: '600px',
    margin: '30px auto',
    textAlign: 'center',
  },
	menu: {
    marginTop: '5px',
    marginLeft: '5px',
    width: '150px',
  },
  buttonArea: {
    marginTop: '30px',
    marginBottom: '30px',
  }
}

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  demoClick = () => {
    this.setState({
      username: 'lylewildes',
      password: 'password'
    })
  }

  login = event => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
        history: this.props.history
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => event => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    const {classes} = this.props;

    return (
      <Card raised className={classes.card}>
        <CardContent>
        {/* error block */}
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}

        {/* login form */}
        <form onSubmit={this.login}>
          <h2 onClick={this.demoClick}>Admin Login</h2>
          <div>
            <TextField
              required
              label="Username"
              className={classes.menu}
              value={this.state.username}
              onChange={this.handleInputChangeFor('username')} />
          </div>
          <div>
            <TextField
              required
              type="password"
              label="Password"
              className={classes.menu}
              value={this.state.password}
              onChange={this.handleInputChangeFor('password')} />
          </div>
          <div className={classes.buttonArea}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              type="submit" >
              Log In
            </Button>
          </div>
        </form>

        
          <button
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_REGISTER_MODE'})}}
          >
            Register
          </button>

        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
});

export default withStyles(styles)(connect(mapStateToProps)(LoginPage));
