import React, { Component } from 'react';
import './App.css';

class App extends Component {
  handleFileSelect(event) {
    const file = new FileReader();
    file.onload = (event) => this.handleFileRead(event.target.result) // needs a function to invoke when it is done. it is kind of like a promise but not quite
    file.readAsText(event.target.files[0]);
  }
  handleCsvParsing(csv)
  {
    let cell = [];
    let row = [];
    const file = [];
    let commaInCell = false;
    for (let i = 0; i <= csv.length; i++) {
      if (csv[i] === '\n' || i === csv.length) // if at the end of the row
      {
        row.push(cell.join(''));
        cell = [];
        file.push(row);
        row = [];
        commaInCell = false;
      }
      else // if its not the end of the row
      {
        if (csv[i] === '"' && !commaInCell) {
          commaInCell = true;
        }
        else if (commaInCell) // if there is a comma in the the cell
        {
          if (csv[i] === '"') {
            if (csv[i + 1] === '"') // if it is a quotation
            {
              cell.push(csv[i]);
              i++;
            }
            else //if (csv[i + 1] === ',') // if it is the end of the cell
            {
              i++;
              commaInCell = false;
              row.push(cell.join(''));
              cell = [];
            }
          }
          else {
            cell.push(csv[i]);
          }
        }
        else // if there is no comma or double quote in the cell
        {
          if (csv[i] === ',')// if end of the cell
          {
            row.push(cell.join(''));
            cell = [];
          }
          else {
            if (csv[i] === '"') { // if is double quotes skip
              cell.push('"');
              i++; // skip
            }
            else {
              cell.push(csv[i])
            }
          }
        }
      }
    }
    console.log(file);
    return file;
  }
  handleCsvToJson(parsedCsv)
  {
    const json = [];
    for(let i = 1; i < parsedCsv.length; i++)
    {
      let obj = {};
      for(let j = 0; j < parsedCsv[i].length; j++)
      {
        obj[parsedCsv[0][j]] = parsedCsv[i][j];
      }
      json.push(obj);
      obj = {};
    }
    // console.log(json);
    return json;

  }
  handleFileRead(csv) {
    console.log(csv);
    const parsedCsv = this.handleCsvParsing(csv)
    const json = this.handleCsvToJson(parsedCsv);
    console.log(json);
  }
  render() {
    return (
      <div className="App">
        app component
      <input type='file' onChange={(event) => this.handleFileSelect(event)} />
      </div>
    );
  }
}

export default App;
