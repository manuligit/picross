import React from 'react';

class Creator extends React.Component {  
  constructor() {
  super();
  this.state = {
    matrix: [],
    height: 1,
    width: 1,
    columns: [],
    rows: [],
    num: 1,
  }
}

handleChange = (event) => {
  event.preventDefault();
  const target = event.target;
  const value = target.value;
  const name = target.name;

  this.setState({
    [name]: value
  });
}

handleSubmit = (event) => {
  event.preventDefault();
  const { height, width } = this.state;
  if (height > 0 && width > 0 && height < 50 && width < 50) {
    console.log(width, height)
    this.createMatrix(width, height);
  }

  console.log(width, height)
}

// Create a zero matrix from the height and width:
createMatrix = (x,y) => {
  let matrix = [];
    for (let i = 0; i < y; i++) {
      matrix.push(Array(parseInt(x,10)).fill(0));
    }

    this.setState({ matrix });
    let num = 1;
    
    let [rows, columns] = this.drawNumbers(matrix, 1);
    console.log(rows, columns);
    this.setState({ matrix, num, rows, columns }); 
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
  let [i,ii] = param;
  event.preventDefault();

  let { matrix, num } = this.state;
  if (matrix[i][ii] === 0) {
    matrix[i][ii] = num;
    event.target.classList = "box black";
  } else {
    matrix[i][ii] = 0;
    event.target.classList = "box boxi";
  }
  

  let [rows, columns] = this.drawNumbers(matrix, num);
  this.setState({ matrix, rows, columns });
}



render() {
  let { matrix, columns, rows, num } = this.state;
  let form = (    
  <div>Enter the size of the picross:
    <form>
      <label>
      Name:
      <input type="number" name="width" onChange={this.handleChange}/>
      <input type="number" name="height" onChange={this.handleChange}/>
      </label>
      <button type="button" label="Create" onClick={this.handleSubmit} />
    </form>
  </div>)


  if (matrix.length < 1) {
    return (form)
  }

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
            <div key={`unique ${i}${ii}`} className="box boxi" onClick={this.handleClick([i,ii])}></div>
            ))}
        </div>
      ))}


    <p>Matrix:</p>
    {JSON.stringify(matrix)}      
    </div>
  )
  }

}

export default Creator