import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, MenuItem, TextField} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

const styles = {
	root: {

	},
	menu: {
        marginTop: '5px',
        marginLeft: '5px',
        width: '150px',
    },
    menuXL: {
        marginTop: '5px',
        marginLeft: '5px',
        width: '250px',
    },
}

class QuizViewWelcomeForm extends Component {

    state = {
        admin_id: 1,
        first_name: '',
        last_name: '',
        category_id: '',
        age: '',
        gender: '',
        state: '',
        email_address: '',
        phone_number: ''
    };

    handleInputChange = propertyName => event => {
        this.setState({
            [propertyName]: event.target.value,
        })
    }

    submitRegistration = event => {
        event.preventDefault();
        if (this.state.first_name && this.state.last_name && this.state.state) {
            this.props.dispatch({type: 'SELF_REG_PARTICIPANT', payload: this.state});
            this.props.history.push('/ElimInstructions1')
        } else {
            alert('Cannot register --- some required fields were left blank')
        }
    }

    render() {
        const {classes} = this.props;

        return (
            <div id="registrationForm">
                <TextField
                    required
                    className={classes.menu}
                    label="First Name"
                    value={this.state.first_name}
                    onChange={this.handleInputChange('first_name')} >
                </TextField>
                <TextField
                    required
                    className={classes.menu}
                    label="Last Name"
                    value={this.state.last_name}
                    onChange={this.handleInputChange('last_name')} >
                </TextField>
                <TextField
                    type="number"
                    className={classes.menu}
                    // style={{width:150}}
                    label="Age"
                    value={this.state.age}
                    onChange={this.handleInputChange('age')} >
                </TextField>
                <TextField
                    required
                    select
                    label="Gender"
                    className={classes.menu}
                    value={this.state.gender}
                    onChange={this.handleInputChange('gender')} > 
                        <MenuItem value="M">Male</MenuItem>
                        <MenuItem value="F">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                        <MenuItem value="Prefer Not to Say">Prefer Not to Say</MenuItem>
                </TextField>
                <TextField
                    required
                    select
                    label="State"
                    className={classes.menu}
                    value={this.state.state}
                    onChange={this.handleInputChange('state')} >
                    {this.props.stateNames.map(stateName => {
                        return (
                            <MenuItem key={stateName.abbr} value={stateName.abbr}>{stateName.full}</MenuItem>
                        )
                    })}
                </TextField>
                <TextField
                    label="Email Address"
                    className={classes.menu}
                    style={{width:200}}
                    value={this.state.email_address}
                    onChange={this.handleInputChange('email_address')} >
                </TextField>
                <TextField
                    label="Phone Number"
                    className={classes.menu}
                    style={{width:200}}
                    value={this.state.phone_number}
                    onChange={this.handleInputChange('phone_number')} >
                </TextField>
                <TextField
                    select
                    required
                    className={classes.menuXL}
                    style={{width:320}}
                    label="Which best describes you?"
                    value={this.state.category_id}
                    onChange={this.handleInputChange('category_id')} >
                    <MenuItem value={2}>General Public</MenuItem>
                    <MenuItem value={3}>Student</MenuItem>
                    <MenuItem value={4}>Other</MenuItem>
                </TextField>
                <div id="buttonArea">
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={this.submitRegistration} >
                        Register and Start
                    </Button>
                </div>
            </div>
        )
    }
}

const mapRedux = redux => {
    return {stateNames: redux.stateNames}
}

export default withStyles(styles)(connect(mapRedux)(QuizViewWelcomeForm));