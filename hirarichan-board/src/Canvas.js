import React, {Component} from 'react';
import {Bitmap, Stage, Text} from "@createjs/easeljs";

class Canvas extends Component {
  constructor(props) {
    super(props);

    this.canvas = React.createRef();
    this.faceImages = {};
    props.faces.forEach((face) => {
      this.faceImages[face] = React.createRef();
    })
  }

  async loadImage(img) {
    return new Promise((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = (e) => reject(e);
    })
  }

  componentDidMount() {
    const loaders = Object.values(this.faceImages).map((image) => {
      return this.loadImage(image.current)
    });

    Promise.all(loaders).then(() => {
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
    const canvas = this.canvas.current;
    const state = this.props.state;

    const stage = new Stage(canvas);

    const image = new Bitmap(this.faceImages[state.face].current);
    image.scale = this.props.width / image.getBounds().width;
    stage.addChild(image);

    const fontSize = 40;
    const fontName = "Courier";
    const message = new Text(state.message, `${fontSize}px ${fontName}`, state.color);
    message.textAlign = 'center';
    message.textBaseline = 'middle';
    message.lineHeight = fontSize * 1.2;
    message.x = this.props.width / 2;
    message.y = 210 - message.getMeasuredHeight() / 2;
    stage.addChild(message);

    stage.update();
  }

  render() {
    return (
      <div id={"main-canvas"}>
        <canvas ref={this.canvas} width={this.props.width} height={this.props.height}/>
        {this.props.faces.map((face) => {
          return <img ref={this.faceImages[face]} key={face}
                      src={`${process.env.PUBLIC_URL}/images/${face}.jpg`}
                      alt={face} hidden={true}/>
        })}
      </div>
    )
  }
}

export default Canvas
