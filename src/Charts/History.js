import ReactDOM from "react-dom";
import React, { Component } from "react";
import { Chart, Bar } from "react-chartjs-2";
import Colors from "./colors";

class HistoryChart extends Component {
	state = {
		data: {
			accepted: [5, 3, 2, 5, 6, 7, 2],
			rejected: [6, 2, 3, 4, 5, 1, 4],
			pending: [10, 22, 15, 23, 5, 30, 5],
		},
		loading: false,
	};

	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	render() {
		return (
			<div style={{ width: "95%", marginTop: 5, marginBottom: 40 }}>
				<Bar
					data={{
						labels: ["1", "2", "3", "4", "5", "6", "7"],
						datasets: [
							{
								label: "Accepted",
								data: this.state.data.accepted,
								backgroundColor: Colors.accepted,
							},
							{
								label: "Rejected",
								data: this.state.data.rejected,
								backgroundColor: Colors.rejected,
							},
							{
								label: "Pending",
								data: this.state.data.pending,
								backgroundColor: Colors.pending,
							},
						],
					}}
					options={{
						scales: {
							xAxes: [{ stacked: true }],
							yAxes: [{ stacked: true }],
						},
					}}
				/>
			</div>
		);
	}
}

export default HistoryChart;
