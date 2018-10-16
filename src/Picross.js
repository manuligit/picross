import React from 'react';
import * as math from 'mathjs';

class Picross extends React.Component {
  constructor() {
    super();
    this.state = {
      matrix: [],
      example: [],
    }
  }

  componentDidMount() {
    // Create example picross for testing:
    //let example = math.matrix([[1,1,1],[0,1,0],[0,1,0]]);
    let example = [[1,1,1],[0,1,0],[0,1,0]];
    console.log(example);

    this.setState({ matrix: example });
  }



  render() {
    return(
      <div>
        --{this.state.matrix}
      </div>
    )
  }
}

export default Picross