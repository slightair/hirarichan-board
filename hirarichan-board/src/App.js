import React, {Component} from 'react';
import './App.css';
import Canvas from './Canvas'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "Hello!",
      face: "normal",
      color: "#000000",
    };

    this.faces = [
      "normal",
      "smile",
      "sad",
      "anger",
    ]
  }

  onChangeFace(e) {
    this.setState({face: e.target.value});
  }

  onChangeMessage(e) {
    this.setState({message: e.target.value});
  }

  render() {
    return (
      <div className="App">
        <Canvas width={540} height={720} faces={this.faces} state={this.state}/>
        <select value={this.state.face} onChange={this.onChangeFace.bind(this)}>
          {this.faces.map((face) => {
            return <option key={face} value={face}>{face}</option>
          })}
        </select>
        <textarea value={this.state.message} onChange={this.onChangeMessage.bind(this)}/>
      </div>
    );
  }
}

export default App;
