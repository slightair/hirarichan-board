import React, {Component} from 'react';
import './App.css';
import {
  withStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  TextField,
} from '@material-ui/core'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {indigo, amber} from '@material-ui/core/colors';
import CameraIcon from '@material-ui/icons/CameraAlt';
import {CompactPicker} from 'react-color';
import Canvas from './Canvas'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "Hello!",
      face: "normal",
      color: "#333333",
    };

    this.faces = [
      "normal",
      "smile",
      "sad",
      "anger",
    ];

    this.colors = [
      '#333333', '#808080', '#cccccc', '#D33115',
      '#E27300', '#FCC400', '#B0BC00', '#68BC00',
      '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF',
    ];

    this.canvasRef = React.createRef();
    this.saveImageButtonRef = React.createRef();
  }

  onChangeFace(e) {
    this.setState({face: e.target.value});
  }

  onChangeMessage(e) {
    this.setState({message: e.target.value});
  }

  onChangeColor(color) {
    this.setState({color: color.hex});
  }

  onClickSaveImage(e) {
    const canvas = this.canvasRef.current;
    const button = this.saveImageButtonRef.current;
    button.href = canvas.toDataURL("image/jpg");
  }

  render() {
    const {classes} = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <CameraIcon className={classes.mainIcon}/>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Hirarichan Board
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.main}>
          <Grid container justify="center">
            <Grid item className={classes.mainCanvas}>
              <Canvas width={540} height={720} faces={this.faces} state={this.state} canvasRef={this.canvasRef}/>
            </Grid>
            <Grid item className={classes.settings}>
              <Grid container>
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel>Face</FormLabel>
                  <RadioGroup aria-label="Face" name="face" className={classes.group} value={this.state.face}
                              onChange={this.onChangeFace.bind(this)}>
                    {this.faces.map((face) => {
                      return <FormControlLabel key={face}
                                               value={face}
                                               control={<Radio color="primary"/>}
                                               label={face}/>
                    })}
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid container>
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel>Message</FormLabel>
                  <TextField multiline
                             rowsMax={5}
                             value={this.state.message}
                             onChange={this.onChangeMessage.bind(this)}
                             margin="normal"
                  />
                </FormControl>
              </Grid>
              <Grid container>
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel>Color</FormLabel>
                  <CompactPicker color={this.state.color}
                                 colors={this.colors}
                                 className={classes.colorPicker}
                                 onChangeComplete={this.onChangeColor.bind(this)}/>
                </FormControl>
              </Grid>
              <Grid container>
                <Button variant="outlined" component="a" color="primary" href="#" download="hirarichan.jpg"
                        buttonRef={this.saveImageButtonRef} onClick={this.onClickSaveImage.bind(this)}>
                  Save Image
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: indigo,
    secondary: amber,
  },
});

const styles = {
  mainIcon: {
    marginRight: 20,
  },
  grow: {
    flexGrow: 1,
  },
  mainCanvas: {
    textAlign: "center",
  },
  settings: {
    paddingTop: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  colorPicker: {
    margin: `${theme.spacing.unit * 2}px 0`,
  }
};

export default withStyles(styles)(App);
