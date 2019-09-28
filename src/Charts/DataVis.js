import ReactDOM from "react-dom";
import React, { Component } from "react";
import { Chart, Pie } from "react-chartjs-2";
import Colors from "./colors";

class MainChart extends Component {
	state = {
		data: [],
		jobs_applied: 0,
		loading: false,
	};

	CustomChart = React.createRef();

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		Chart.pluginService.register({
			beforeDraw: function(chart) {
				if (chart.config.options.elements.center) {
					//Get ctx from string
					var ctx = chart.chart.ctx;

					//Get options from the center object in options
					var centerConfig = chart.config.options.elements.center;
					var fontStyle = centerConfig.fontStyle || "Arial";
					var txt = centerConfig.text;
					var color = centerConfig.color || "#000";
					var sidePadding = centerConfig.sidePadding || 20;
					var sidePaddingCalculated =
						(sidePadding / 100) * (chart.innerRadius * 2);
					//Start with a base font of 30px
					ctx.font = "30px " + fontStyle;

					//Get the width of the string and also the width of the element minus 10 to give it 5px side padding
					var stringWidth = ctx.measureText(txt).width;
					var elementWidth =
						chart.innerRadius * 2 - sidePaddingCalculated;

					// Find out how much the font can grow in width.
					var widthRatio = elementWidth / stringWidth;
					var newFontSize = Math.floor(30 * widthRatio);
					var elementHeight = chart.innerRadius * 2;

					// Pick a new font size so it will not be larger than the height of label.
					var fontSizeToUse = Math.min(newFontSize, elementHeight);

					//Set font settings to draw it correctly.
					ctx.textAlign = "center";
					ctx.textBaseline = "middle";
					var centerX =
						(chart.chartArea.left + chart.chartArea.right) / 2;
					var centerY =
						(chart.chartArea.top + chart.chartArea.bottom) / 2;
					ctx.font = fontSizeToUse + "px " + fontStyle;
					ctx.fillStyle = color;

					//Draw text in center
					ctx.fillText(txt, centerX, centerY);
				}
			},
		});

		this.setState({ loading: true });
		let db = this.props.firebase.getDB();
		console.log(db);
		let docRef = db.collection("users").doc("16Vf4DR8qOQ18a81Uu3e");
		docRef.onSnapshot(
			docSnapshot => {
				console.log(`Received doc snapshot: ${docSnapshot}`);
				// ...
				let userData = docSnapshot.data();
				console.log("users: " + userData);
				let list = [
					userData.jobs_accepted,
					userData.jobs_denied,
					userData.jobs_pending,
				];
				this.setState({
					data: list,
					jobs_applied: userData.jobs_applied,
					loading: false,
				});
			},
			err => {
				console.log(`Encountered error: ${err}`);
			}
		);
	}

	render() {
		return (
			<Pie
				data={{
					datasets: [
						{
							data: this.state.data,
							backgroundColor: [
								Colors.accepted,
								Colors.rejected,
								Colors.pending,
							],
						},
					],

					// These labels appear in the legend and in the tooltips when hovering different arcs
					labels: ["Accepted", "Rejected", "Pending"],
				}}
				options={{
					responsive: true,
					elements: {
						center: {
							text: "Total:" + this.state.jobs_applied,
							color: "#e8c3b9", // Default is #000000
							fontStyle: "Arial", // Default is Arial
							sidePadding: 25, // Defualt is 20 (as a percentage)
						},
					},
					legend: {
						position: "right",
						labels: {
							fontColor: "white",
							boxWidth: 20,
							padding: 20,
						},
					},
				}}
			/>
		);
	}
}

export default MainChart;
