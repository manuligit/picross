import React from 'react';
import Creator from './Creator';

class Picross extends React.Component {
  constructor() {
    super();
    this.state = {
      matrix: [],
      curr: [],
      rows: [],
      columns: [],
      example: [],
      num: -1,
      lives: 3,
    }
  }

  componentDidMount() {
    // Create example picross for testing:
    //let example = math.matrix([[1,1,1],[0,1,0],[0,1,0]]);
    //let example = [[1,1],[1,0],[0,0],[0,0]];
    //let example = [[0,0,0],[0,0,1]]
    let example = [[1,0,1,0,1],[1,1,1,1,1],[1,0,1,1,1],[0,0,1,0,0],[1,1,0,0,1]]
    //[[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],[0,0,0,1,0,1,0,1,0,0,0,0,0,0,0],[0,0,1,0,1,0,0,1,0,0,0,0,0,0,0],[0,1,1,0,1,0,1,0,0,0,0,0,0,0,0],[1,0,1,0,1,0,1,0,0,0,0,0,0,0,0],[1,0,1,0,1,0,1,1,1,1,1,0,0,0,0],[1,0,1,0,1,0,1,1,0,0,0,1,0,0,0],[1,0,1,0,1,1,0,0,0,1,0,0,1,0,0],[1,0,1,1,0,0,0,0,1,0,1,0,1,0,0],[1,0,0,0,0,0,0,0,1,0,1,1,0,0,0],[1,0,0,0,0,0,0,0,1,1,0,0,1,0,0],[0,1,0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,1,0,0,0,0,0,0,0,0,1,0,0,0],[0,0,0,1,1,0,0,0,0,1,1,0,0,0,0],[0,0,0,0,0,1,1,1,1,0,0,0,0,0,0]]

    // Create zero matrix for comparison: 
    //let curr = Array.from(example, Array.from(x => x = 0))
    let curr = example.map(r => [].concat(r).fill(0));
    console.log(curr)

    let num = 1;
    console.log('example')
    console.log(example);
    let [rows, columns] = this.drawNumbers(example, num);
    console.log(rows, columns);
    this.setState({ matrix: example, num, rows, columns, curr }); 
  }

  // Create the arrays of number rows used for solving the puzzle
  drawNumbers = (matrix, num) => {
    // Do columns
    let rows = [];
    let columns = [];
    matrix.forEach(row => {
      console.log(this.calculateNumbers(row, num))
      rows.push(this.calculateNumbers(row, num));
    });

    // Transpose the matrix to get the columns: 
    let matrix2 = matrix[0].map((col, i) => matrix.map(row => row[i]));
    matrix2.forEach(row => {
     columns.push(this.calculateNumbers(row, num));
    });

    return [rows, columns];
  }

  // Calculate the array of numbers needed for solving one row
  calculateNumbers = (row, num) => {
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

    // Remove empty lists from results
    let result2 = result.filter(Number);

    // console.log("result", result2);
    return result2;
  }

  handleClick = (param) => (event) => {
    console.log("klik")
    let [i, ii] = param;
    event.preventDefault();
    const { matrix,num } = this.state;
    let { lives, curr } = this.state;

    if (matrix[i][ii] === num) {
      event.target.classList = "box black";

      //check game end condition
      curr[i][ii] = num;
      if (JSON.stringify(matrix) === JSON.stringify(curr)) {
        console.log("You won");
      } else {
        this.setState({ curr });
      }


    } else {
      // Do something to show what went wrong
      lives = lives-1;
      if (lives === 0) {
        console.log("game over");
      }
      this.setState({ lives });
    }
  } 



  render() {
    const { matrix, rows, columns, lives } = this.state;

    return(
    <div>
      {/* <div className="container">
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
      ))}; */}


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
            <div key={`unique ${i}${ii}`} className="box boxi" onClick={this.handleClick([i,ii])}></div>
          ))}
        </div>
      ))}

      <br />
      <br />
      Lives left: {lives}
      <br />
      Matrix should be: <br />
      {matrix}
      <br />
      <br />

      <Creator />
      </div>
    )
  }
}

export default Picross