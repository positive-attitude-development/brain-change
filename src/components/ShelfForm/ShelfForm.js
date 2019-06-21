import React, { Component } from 'react'
import { connect } from 'react-redux'


export class ShelfForm extends Component {

    state = {
        description: '',
        url: ''
    }

    handleChangeForDescription = (event) => {
        this.setState({
            description: event.target.value
        })
        console.log(event.target.value);
        
    }

    handleChangeForURL = (event) => {
        this.setState({
            url: event.target.value
        })
        console.log(event.target.value);
    }

    handleSubmit = () => {
        this.props.dispatch({type: `POST_ITEM`, payload: {description: this.state.description, url: this.state.url}})
    }

    render() {
        console.log(this.state);
        
        return (
            <div>
                <form>
                <input onChange = {this.handleChangeForDescription} placeholder= "Description of Item"></input>
                <input onChange = {this.handleChangeForURL} placeholder= "URL of Image"></input>
                <button onClick= {this.handleSubmit}>ADD</button>
                </form>
            </div>
        )
    }
}

const mapRedux = reduxState => ({
    reduxState
});


export default connect(mapRedux)(ShelfForm)
