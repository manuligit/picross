import React from 'react';
import * as math from 'mathjs';

class Picross extends React.Component {
  constructor() {
    super();
    this.state = {
      matrix: [],
      rows: [],
      columns: [],
      example: [],
      num: -1,
    }
  }

  componentDidMount() {
    // Create example picross for testing:
    //let example = math.matrix([[1,1,1],[0,1,0],[0,1,0]]);
    //let example = [[1,1],[1,0],[0,0],[0,0]];
    //let example = [[0,0,0],[0,0,1]]
    let example = [[1,0,1,0,1],[1,1,1,1,1],[1,0,1,1,1],[0,0,1,0,0],[1,1,0,0,1]]


    // Get grade if many colors and set num (max):
    let num = 1;
    console.log(example);
    let [rows, columns] = this.drawNumbers(example, num);
    console.log(rows, columns);
    this.setState({ matrix: example, num, rows, columns }); 
  }

  drawNumbers = (matrix, num) => {
    console.log("drawnumbers")
    //const { matrix } = this.state; 
    console.log("matrix", matrix);
    // Found items are grey
    // Unfound/overflowing items are red
    // Normal items are black

    // Do columns
    let rows = [];
    let columns = [];
    matrix.forEach(row => {
      console.log(this.calculateNumbers(row, num))
      rows.push(this.calculateNumbers(row, num));
    });

    //rows = [].concat(...rows);
    //console.log("rows", rows);

    // Transpose the matrix to get the columns: 
    let matrix2 = matrix[0].map((col, i) => matrix.map(row => row[i]));
    //console.log("matrix", matrix)
    //console.log("matrix2", matrix2)
    matrix2.forEach(row => {
     columns.push(this.calculateNumbers(row, num));
    });

    //columns = [].concat(...columns);
    console.log("rows", rows);
    console.log("columns", columns);

    return [rows, columns];
  }

  calculateNumbers = (row, num) => {
    //const { num } = this.state; 
    //console.log('eeee')

    //let row = [1,0,1,1,0,1,1,1];

    let result = row.reduce((accumulator, current) => {
      if (current === num) {
        // If it's the first element, add 1:
        if (accumulator.length === 0) {
          accumulator.push(parseInt(1,10));
        // If it's element after first, add +1 to the previous 
        } else if (accumulator.length > 0) {
          let snib =  accumulator[accumulator.length-1] + parseInt(1, 10);
          accumulator[accumulator.length-1] = parseInt(snib, 10);
        }
      } else {
        if (accumulator.length > 0) {
            accumulator.push([])
        }
      }
        return accumulator;
    }, []);

    // Remove empty lists
    let result2 = result.filter(Number);

    console.log("result", result2);
    return result2;
  }


  render() {
    const { matrix, num, rows, columns } = this.state;

    return(
    <div>
      <div className="container">
              <div className="box box0"></div>
              {columns.map((e,i) => (
                <div className="box box-col" key={`col${i}`}>{e.map((el,ii) => <div className="num" key={`${i}${ii}`}>{el}</div>)}</div>
              ))}
      </div>
      {rows.map((e, i) => (
        <div className="container" key={i}>
          <div className="box box-row">{e.map((el,ii) => <span key={`${i}${ii}`}>{el}</span>)}</div>
          {matrix[i].map((ee,ii) => (
            <div key={`unique ${i}${ii}`} className={ee === num ? "black box" : "box"}></div>
          ))}
        </div>
      ))};

      <br />

      <button type="button" onClick={() => this.calculateNumbers([1,0,1,1,0,0,0,0,1,1,1])}> KLIK </button>
      <button type="button" onClick={() => this.drawNumbers(matrix)}> KLAK </button>
      <br />
      <br />
      Matrix should be: <br />
      {matrix}
      </div>
    )
  }
}

export default Picross