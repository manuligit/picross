import React from 'react';
import Creator from './Creator';
import Picross from './Picross';

class Game extends React.Component {  
  constructor() {
  super();
  this.state = {
    picross: false,
    creator: false,
    levels: [],
    matrix: []
  }
}
  componentDidMount() {
    let levels = [
      [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,1,1,0,0,1,1,0],[0,1,1,0,0,1,1,0],[0,0,0,1,1,0,0,0],[0,0,1,1,1,1,0,0],[0,0,1,1,1,1,0,0],[0,0,1,0,0,1,0,0]],
      [[0,0,0,0,0,0],[0,1,0,0,1,0],[0,0,0,0,0,0],[1,0,0,0,0,1],[0,1,1,1,1,0],[0,0,0,0,0,0]],
      [[1,0,1,0,1],[1,1,1,1,1],[1,0,1,1,1],[0,0,1,0,0],[1,1,0,0,1]],
    ]

    this.setState({ levels });
  }

  toggle = (event) => {
    //console.log('toggle');
    const { name } = event.target;
    let value = this.state[name];

    value = !value;
    this.setState({ [name]: value });
  }

  render() {
    let { picross, creator, levels } = this.state;
    console.log('picross', picross)
    console.log('creator', creator)
    let gameframe = (<button name="picross" type="button" onClick={this.toggle}>Start a new game</button>)
    let levelframe = (<button name="creator" type="button" onClick={this.toggle}>Create a new level</button>)

    if (picross === true) {
      // Get a random level:
      let i = Math.floor(Math.random() * levels.length);
      let level = levels[i];

      gameframe = ( 
        <div style={{ width: '100%' }}>
          <Picross matrix={level}/>
          <br />
          <button name="picross" type="button" onClick={this.toggle}>Close the game</button>
        </div> )
    }

    if (creator === true) {
      levelframe = (
        <div>
          <Creator />
          <br />
          <button name="creator" type="button" onClick={this.toggle}>Close level creator</button>
        </div>
      )
    }

    return(
      <div>
        <div className="gameframe">
          {gameframe}
        </div>
        <div className="levelframe">
          {levelframe}
        </div>
      </div>
    )
  }
}

export default Game