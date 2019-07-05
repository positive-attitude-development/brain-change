import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, MenuItem, TextField} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

const styles = {
	root: {

	},
	menu: {
		margin: 'auto',
		marginLeft: '5px',
		width: '120px',
	},
    text: {
		margin: '10px',
		width: '120px',
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
        const classes = this.props;
        console.log(this.state);
        return (
            <div>
                <div id="registrationForm">
                    <div>
                    <TextField
                        required className={classes.text}
                        margin="normal"
                        label="First Name"
                        value={this.state.first_name}
                        onChange={this.handleInputChange('first_name')} >
                    </TextField>
                    <TextField
                        required className={classes.text}
                        margin="normal"
                        label="Last Name"
                        value={this.state.last_name}
                        onChange={this.handleInputChange('last_name')} >
                    </TextField>
                    <TextField
                        type="number" className={classes.text}
                        margin="normal"
                        label="Age"
                        style={{width:100}}
                        value={this.state.age}
                        onChange={this.handleInputChange('age')} >
                    </TextField>
                </div>
                    {/* <TextField
                        margin="normal"
                        label="Gender"
                        value={this.state.gender}
                        onChange={this.handleInputChange('gender')} >
                    </TextField> */}
                <div>
                    <TextField label="Gender:" 
                               select margin="normal" 
                               onChange={this.handleInputChange('gender')} 
                               value={this.state.gender} 
                               className={classes.menu}
                               style={{width:170}}>
							<MenuItem value="M">Male</MenuItem>
							<MenuItem value="F">Female</MenuItem>
							<MenuItem value="Other">Other</MenuItem>
							<MenuItem value="Prefer Not to Say">Prefer Not to Say</MenuItem></TextField>
                    <TextField
                        required
                        select
                        style={{width:100}}
                        className={classes.menu}
                        margin="normal"
                        label="State"
                        value={this.state.state}
                        onChange={this.handleInputChange('state')} >
                        {this.props.stateNames.map((stateName, i) => {
                            return (
                                <MenuItem key={i} value={stateName.abbr}>{stateName.full}</MenuItem>
                            )
                        })}
                    </TextField>
                    <TextField
                        select className={classes.text}
                        margin="normal"
                        style={{width:300}}
                        label="Which best describes you?"
                        value={this.state.category_id}
                        onChange={this.handleInputChange('category_id')} >
                        <MenuItem value=""><em>Select Category</em></MenuItem>
                        <MenuItem value={2}>General Public</MenuItem>
                        <MenuItem value={3}>Student</MenuItem>
                        <MenuItem value={4}>Other</MenuItem>
                    </TextField>
                </div>
                    <TextField
                        margin="normal" className={classes.text}
                        label="Email Address"
                        value={this.state.email_address}
                        onChange={this.handleInputChange('email_address')} >
                    </TextField>
                    <TextField
                        margin="normal" className={classes.text}
                        label="Phone Number"
                        value={this.state.phone_number}
                        onChange={this.handleInputChange('phone_number')} >
                    </TextField>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.submitRegistration}
                    >
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