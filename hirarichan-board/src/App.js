import React, {Component} from 'react';
import {Stage, Bitmap, Text} from '@createjs/easeljs';
import './App.css';
import hirarichanNormal from "./images/normal.jpg"
import hirarichanSmile from "./images/smile.jpg"
import hirarichanSad from "./images/sad.jpg"
import hirarichanAnger from "./images/anger.jpg"

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "Hello!",
      face: "normal",
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
        <Canvas width={562} height={733} state={this.state}/>
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

class Canvas extends Component {
  async loadImage(img) {
    return new Promise((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = (e) => reject(e);
    })
  }

  componentDidMount() {
    Promise.all([
      this.loadImage(this.refs.normal),
      this.loadImage(this.refs.smile),
      this.loadImage(this.refs.sad),
      this.loadImage(this.refs.anger),
    ]).then(() => {
      this.updateCanvas();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.updateCanvas();
    }
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    const canvas = this.refs.canvas;

    const faceImages = {
      "normal": this.refs.normal,
      "smile": this.refs.smile,
      "sad": this.refs.sad,
      "anger": this.refs.anger,
    };

    const stage = new Stage(canvas);

    const image = new Bitmap(faceImages[this.props.state.face]);
    image.scale = this.props.width / image.getBounds().width;
    stage.addChild(image);

    const fontSize = 40;
    const message = new Text(this.props.state.message, fontSize + "px Courier", "Black");
    message.textAlign = 'center';
    message.textBaseline = 'middle';
    message.lineHeight = fontSize * 1.2;
    message.x = this.props.width / 2;
    message.y = 220 - message.getMeasuredHeight() / 2;
    stage.addChild(message);

    stage.update();
  }

  render() {
    return (
      <div>
        <canvas ref="canvas" width={this.props.width} height={this.props.height}/>
        <img ref="normal" src={hirarichanNormal} hidden={true}/>
        <img ref="smile" src={hirarichanSmile} hidden={true}/>
        <img ref="sad" src={hirarichanSad} hidden={true}/>
        <img ref="anger" src={hirarichanAnger} hidden={true}/>
      </div>
    )
  }
}

export default App;
