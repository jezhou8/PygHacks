import React, { Component } from "react";

class ApplyButton extends Component {
	makeRequest = () => {
		console.log("Made Request!!");
	};

	render() {
		return (
			<div
				style={{
					width: "30%",
					height: "25%",
					backgroundColor: "#f00",
					borderRadius: 5,
					padding: 10,
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
				onClick={this.makeRequest}
			>
				<h>Run Once</h>
			</div>
		);
	}
}

export default ApplyButton;
