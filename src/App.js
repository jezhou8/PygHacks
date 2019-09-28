import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainChart from './Charts/DataVis';
import { withFirebase } from './Firebase';

function App() {
  const MainChartBase = withFirebase(MainChart);
  return (
    <div className="App">
      <header className="App-header">
        <MainChartBase></MainChartBase>
      </header>
    </div>
  );
}

export default App;
