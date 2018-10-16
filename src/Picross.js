import React from 'react';
import * as math from 'mathjs';

class Picross extends React.Component {
  constructor() {
    super();
    this.state = {
      matrix: [],
      example: [],
      num: -1,
    }
  }

  componentDidMount() {
    // Create example picross for testing:
    //let example = math.matrix([[1,1,1],[0,1,0],[0,1,0]]);
    let example = [[1,1,1],[0,1,0],[0,1,0]];
    // Get grade if many colors and set num (max):
    let num = 1;
    console.log(example);

    this.setState({ matrix: example, num });
  }



  render() {
    const { matrix, num } = this.state;

    return(
      <div>
          aaa
        {matrix.map((e,i) => (
          <tr>
          {e.map((ee, ii) => (
            <>
            {ee === num ?
              <td className="black">{ee}</td> 
            : ( 
              <td>{ee}</td>
            )}
            </>
          ))}
        </tr>
        ))}
      </div>
    )
  }
}

export default Picross