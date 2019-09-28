import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { withFirebase } from "./Firebase";
import MainChart from "./Charts/DataVis";
import HistoryChart from "./Charts/History";
import Banner from "./components/Banner";
import ApplyButton from "./components/ApplyButton";

const BannerBase = withFirebase(Banner);
const MainChartBase = withFirebase(MainChart);
const HistoryChartBase = withFirebase(HistoryChart);
const ApplyButtonBase = withFirebase(ApplyButton);

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<MainChartBase></MainChartBase>
					<BannerBase></BannerBase>
					<HistoryChartBase></HistoryChartBase>
					<ApplyButtonBase></ApplyButtonBase>
				</header>
			</div>
		);
	}
}

export default App;
