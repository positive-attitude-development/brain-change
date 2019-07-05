import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardContent, Button} from '@material-ui/core';
import {CSVLink} from 'react-csv';
import './DataView.css';


class DataView extends Component{

	componentDidMount() {
		this.props.dispatch({type: 'DOWNLOAD_RESULT_DATA'});
	}

	render(){
		return(
			<Card raised className="card">
				<CardContent>
					<h3>Results Data:</h3>
					<CSVLink
						className="CSVLink"
						filename={"brain-change-export.csv"}
						data={this.props.resultData}
					>
						<Button disabled={!this.props.resultData[0]} variant="contained" color="primary" size="large">
							Download All Results
						</Button>
					</CSVLink>
				</CardContent>
			</Card>
		)
	}
}

const mapStateToProps = state => ({
  admin: state.admin,
  resultData: state.resultData
});

export default connect(mapStateToProps)(DataView);