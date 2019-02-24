import React, {Component} from 'react';
import {Bitmap, Stage, Text} from "@createjs/easeljs";
import WebFont from "webfontloader"

class Canvas extends Component {
  constructor(props) {
    super(props);

    this.canvas = props.canvasRef || React.createRef();
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

  async loadFonts() {
    return new Promise((resolve, reject) => {
        WebFont.load({
          custom: {
            families: ['TanukiMagic'],
            urls: ['/fonts.css'],
          },
          active() {
            resolve();
          },
          inactive() {
            reject("Could not load web fonts");
          },
        })
      }
    )
  }

  componentDidMount() {
    const imageLoaders = Object.values(this.faceImages).map((image) => {
      return this.loadImage(image.current)
    });
    const loaders = imageLoaders.concat([this.loadFonts()]);

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
    const fontName = "TanukiMagic";
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
