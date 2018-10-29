import React from 'react';

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
    //let example = [[1,0,1,0,1],[1,1,1,1,1],[1,0,1,1,1],[0,0,1,0,0],[1,1,0,0,1]]
    //let example = [[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],[0,0,0,1,0,1,0,1,0,0,0,0,0,0,0],[1,0,1,0,1,0,0,1,0,0,0,0,0,0,0],[0,1,1,0,1,0,1,0,0,0,0,0,0,0,0],[1,0,1,0,1,0,1,0,0,0,0,0,0,0,0],[0,0,1,0,1,0,1,1,1,1,1,0,0,0,0],[1,0,1,0,1,0,1,1,0,0,0,1,0,0,0],[0,0,1,0,1,1,0,0,0,1,0,0,1,0,0],[1,0,1,1,0,0,0,0,1,0,1,0,1,0,0],[0,0,0,0,0,0,0,0,1,0,1,1,0,0,0],[1,0,0,0,0,0,0,0,1,1,0,0,1,0,0],[0,1,0,0,0,0,0,0,0,0,0,0,1,0,0],[1,0,1,0,0,0,0,0,0,0,0,1,0,0,0],[0,0,0,1,1,0,0,0,0,1,1,0,0,0,0],[1,0,0,0,0,1,1,1,1,0,0,0,0,0,0]]
    //let example = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1]];
    // Create zero matrix for comparison: 
    //let curr = Array.from(example, Array.from(x => x = 0))
    // Create matrix sized zero matrix:
    let example = this.props.matrix;
    let curr = example.map(r => [].concat(r).fill(0));

    let num = 1;
    let [rows, columns] = this.drawNumbers(example, num);
    this.setState({ matrix: example, num, rows, columns, curr }); 
  }

  // Create the arrays of number rows used for solving the puzzle
  drawNumbers = (matrix, num) => {
    // Calculate numbers for rows:
    let rows = [];
    let columns = [];
    matrix.forEach(row => {
      rows.push(this.calculateNumbers(row, num));
    });

    // Transpose the matrix to get the columns: 
    let matrix2 = matrix[0].map((col, i) => matrix.map(row => row[i]));
    matrix2.forEach(row => {
     columns.push(this.calculateNumbers(row, num));
    });

    return [rows, columns];
  }

  // Calculate the array of numbers needed for solving a single row
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
    let [i, ii] = param;
    event.preventDefault();
    const { matrix,num } = this.state;
    let { lives, curr } = this.state;

    // Handle right click: 
    if (matrix[i][ii] === num) {
      event.target.classList = "box boxi black";

      //Check game end condition
      curr[i][ii] = num;
      if (JSON.stringify(matrix) === JSON.stringify(curr)) {
        console.log("You won");
      } else {
        this.setState({ curr });
      }
    } else {
      // Draw cross on falsely guessed tile:
      lives = lives-1;
      event.target.classList = "box boxi cross";
      if (lives === 0) {
        // TODO: Game over and game reset
        this.gameReset();
        console.log("game over");
      }
      this.setState({ lives });
    }
  }

  // Resets the game board and lives to the original state
  gameReset = () => {
    const { matrix } = this.state;

    // Remove all black squares from DOM:
    var elements = document.getElementsByClassName("black");
    console.log(elements)

    while(elements.length > 0) {
      elements[0].classList.remove("black");
    }

    // Remove all crosses from the board:
    elements = document.getElementsByClassName("cross");
    console.log(elements)

    while(elements.length > 0) {
      elements[0].classList.remove("cross");
    }

    // Reset the matrix to starting state:
    let curr = matrix.map(r => [].concat(r).fill(0));
    let lives = 3;
    this.setState({ curr, lives });
  }

  render() {
    const { matrix, rows, columns, lives } = this.state;
    let reducer = ((acc, e) => e.length > acc ? acc = e.length : acc );
    // Calculate the rows and columns:
    let max_width = 10*rows.reduce(reducer, 0);
    let col_style = { width: `${max_width}px`, minWidth: '30px' };

    return(
    <div className="picross-container">
     <div className="picross">
      <div className="container">
        <div className="box box0 box-col box-row" style={col_style}></div>
          {columns.map((e,i) => (
            <div className="box box-col" key={`col${i}`}>{e.map((el,ii) => <div className="num" key={`${i}${ii}`}>{el}</div>)}</div>
            ))}
      </div>
      {rows.map((e, i) => (
        <div className="container" key={i}>
          <div className="row-container" style={col_style}>
            <div className="box box-row">{e.map((el,ii) => <span key={`${i}${ii}`}>{el}</span>)}</div>
          </div>
          {matrix[i].map((ee,ii) => (
            <div key={`unique ${i}${ii}`} className="box boxi" onClick={this.handleClick([i,ii])}></div>
          ))}
        </div>
      ))}
      </div>
      <div>
      <br />
      <br />
      Lives left: {lives}
      {/* <br />
      Matrix should be: <br />
      {matrix}
      <br />
      <br /> */}
      </div>
      </div>
    )
  }
}

export default Picross