import React, { Component } from "react";

import "./Banner.css";
import Colors from "../Charts/colors";

const divStyle = {
	backgroundColor: "#383d49",
	borderRadius: "5",
	borderStyle: "solid",
	borderRightColor: "#383d49",
	borderTopColor: "#383d49",
	borderBottomColor: "#383d49",
	borderLeftColor: "#383d49",

	alignItems: "center",
	justifyContent: "center",
	height: "50%",
	width: "45%",
};

class Banner extends Component {
	state = {
		jobData: {
			total: 0,
			accepted: 0,
			rejected: 0,
			pending: 0,
		},
	};

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		let db = this.props.firebase.getDB();
		console.log(db);
		let docRef = db.collection("users").doc("16Vf4DR8qOQ18a81Uu3e");
		docRef.get().then(doc => {
			if (!doc.exists) {
				console.log("No such document!");
			} else {
				let userData = doc.data();
				console.log("users: " + userData);
				let list = {
					accepted: userData.jobs_accepted,
					rejected: userData.jobs_denied,
					pending: userData.jobs_pending,
					total: userData.jobs_applied,
				};
				this.setState({
					jobData: list,
					loading: false,
				});
			}
		});
		let observer = docRef.onSnapshot(
			docSnapshot => {
				console.log(`Received doc snapshot: ${docSnapshot}`);
				// ...
				let userData = docSnapshot.data();
				console.log("users: " + userData);
				let list = {
					accepted: userData.jobs_accepted,
					rejected: userData.jobs_denied,
					pending: userData.jobs_pending,
					total: userData.jobs_applied,
				};
				this.setState({
					jobData: list,
					loading: false,
				});
			},
			err => {
				console.log(`Encountered error: ${err}`);
			}
		);
	}

	render() {
		let { jobData } = this.state;
		return (
			<div className="Container">
				<div className="Banner">
					<div style={divStyle}>
						<div className="TextContainer">
							<h className="text">Total: </h>
							<h className="text">
								{jobData.accepted +
									jobData.rejected +
									jobData.pending}
							</h>
						</div>
					</div>
					<div
						style={{
							...divStyle,
							borderLeftColor: Colors.accepted,
						}}
					>
						<div className="TextContainer">
							<h className="text">Accepted: </h>
							<h className="text">{jobData.accepted}</h>
						</div>
					</div>
				</div>
				<div className="Banner">
					<div
						style={{
							...divStyle,
							borderLeftColor: Colors.rejected,
						}}
					>
						<div className="TextContainer">
							<h className="text">Rejected: </h>
							<h className="text">{jobData.rejected}</h>
						</div>
					</div>
					<div
						style={{ ...divStyle, borderLeftColor: Colors.pending }}
					>
						<div className="TextContainer">
							<h className="text">Pending: </h>
							<h className="text">{jobData.pending}</h>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Banner;
