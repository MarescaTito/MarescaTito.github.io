import React, { Component } from 'react';
import './App.css';
import { BsCircleFill } from 'react-icons/bs';
import Popup from 'reactjs-popup';
import { isArrayLiteralExpression } from 'typescript';


var colors=['black', 'red', 'blue', 'yellow', 'purple', 'darkgreen', 'orange', 'yellowgreen',
 'saddlebrown', 'pink', 'teal', 'white', 'gray', 'darkred', 'deeppink', 'cyan']

var ballColors = Array(20);
for(var i = 0; i<20; i++) {
  ballColors[i] = ['black', 'black', 'black', 'black'];
}


function colorChange(tubeId, ballId, color) {
  ballColors[tubeId][ballId] = color;
  console.log(ballColors);
}



function tubeClick(tubeId) {
  console.log(tubeId);
}

class Ball extends Component {
  constructor(props) {
    super(props);
    this.state = {color: "black"};
  }



  render() {

    var theTubeId = this.props.tubeId;
    var theBallId = this.props.ballId;

    return <Popup
      trigger= {<BsCircleFill id={theTubeId + ' ' + theBallId} color={  ballColors[this.props.tubeId][this.props.ballId]}/>}
      disabled = {this.props.playing}
      modal
    >
      {function (close) { 
      var theButtons = Array(16);

      for(var i = 0; i<16; i++) {
        var theColor = colors[i];
        theButtons[i] = <button
          style={{backgroundColor: colors[i], height: '30px', width: '100px'}}
          id={i}
          onClick={() => {
            console.log(this);
            document.getElementById(theTubeId + " " + theBallId).style.color = document.getElementById(i).style.backgroundColor;
            colorChange(theTubeId, theBallId, 'cyan');
            close();
          }}
        />
      }

      return(      
      <div>
        {theButtons}
      </div>);
    }}

    </Popup>
  }

}

class Tube extends Component {
  constructor(props) {
    super(props);
    this.state = {selected: false};
  }

  render() {
  return (
    <button onClick={() =>  {if (this.props.playing) tubeClick(this.props.tubeId)}} className = "tube">
    <Ball playing={this.props.playing} tubeId = {this.props.tubeId} ballId={0}/>
    <Ball playing={this.props.playing} tubeId = {this.props.tubeId} ballId={1}/>
    <Ball playing={this.props.playing} tubeId = {this.props.tubeId} ballId={2}/>
    <Ball playing={this.props.playing} tubeId = {this.props.tubeId} ballId={3}/>
  </button>
  );
  }
}

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {playing: false, tubeNum: 1};
  }

  render() {
  
    var tubeArray = Array(this.state.tubeNum);
    for(var i = 0; i<this.state.tubeNum; i++) {
      tubeArray[i] = <Tube key={i} playing={this.state.playing} tubeId = {i}/>;
    }

    return (
    <div className="flex-container">
      <div>
        <button className = "addButton" onClick={() => this.setState({playing: this.state.playing,
           tubeNum: this.state.tubeNum < 20 ? this.state.tubeNum + 1 : this.state.tubeNum})}> 
          + 
        </button>
        <button className = "addButton" onClick={() => this.setState({playing: this.state.playing, 
          tubeNum: this.state.tubeNum > 1 ? this.state.tubeNum - 1 : this.state.tubeNum})}> 
          - 
        </button>
      </div>
      {tubeArray}
      <button className = "playButton" onClick={() => this.setState({playing: !this.state.playing, tubeNum: this.state.tubeNum})}>
        {this.state.playing ? "Set up" : 'Play'} 
      </button>
    </div>
    )
  }

}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Game/>
      </header>
    </div>
  );
}



export default App;
