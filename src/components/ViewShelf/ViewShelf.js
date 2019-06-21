import React, {Component} from 'react';
import {connect} from 'react-redux';
import './ViewShelf.css';
import {Button, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';

class ViewShelf extends Component {

	componentDidMount() {
		this.props.dispatch({ type: 'FETCH_SHELF' })
	}

	deleteItem = (itemid) => {
		console.log('handleClick itemid:', itemid);
		this.props.dispatch({type: 'DELETE_ITEM', payload: itemid})
	}

	render(){
		let deleteDisplay;
		console.log('this.props.user', this.props.user)
		console.log('this.props.shelf', this.props.shelf);
		return(
			<div>
				<h2>Baconian Shelf!</h2>
				<p>Here all all the items people have added to the shelf:</p>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>User</TableCell>
							<TableCell>Item Description</TableCell>
							<TableCell>Image</TableCell>
							<TableCell>Delete Item?</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{this.props.shelf.map((item) => {
							if (this.props.user.id === item.userid) {

								

								deleteDisplay = (<Button onClick={() => this.deleteItem(item.itemid)}>Delete Item</Button>)

							} else {
								deleteDisplay = (`You can't delete this!`)
							}
							return(

								<tr>
									<TableCell>{item.username}</TableCell>
									<TableCell>{item.description}</TableCell>
									<TableCell><img className="image" src={item.image_url} alt={item.description}/></TableCell>
									<TableCell>{deleteDisplay}</TableCell>

								

								</tr>
							)
						})}
					</TableBody>
				</Table>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	user: state.user,
	shelf: state.viewShelfReducer
});


export default connect(mapStateToProps)(ViewShelf);