import Cell from './cell';

class Grid {
  constructor(ctx) {
    this.ctx = ctx;
    this.cells = [];
    this.startPos = [0, 0];
    this.startCell = null;
    this.endCell = null;
    this.getCell = this.getCell.bind(this);
  }

  fillGrid(ctx) {
    for (let x = 0; x < 60; x++) {
      let row = [];
      for (let y = 0; y < 40; y++) {
        let cellRow = (x * 10) + 10;
        let cellCol = (y * 10) + 10;
        let cell = new Cell(cellRow, cellCol, x, y, this, ctx);
        row.push(cell);
      }
      this.cells.push(row);
    }
    this.cells.forEach(row => {
      row.forEach(cell => {
        cell.setNeighbors();
      });
    });
  }

  getCell(x, y) {
    if((x < 0) || (y < 0) || (x >= 60) || (y >= 40)) {
      return false;
    }
    return this.cells[x][y];
  }

  makeCellStart() {
    //sets maze starting point always to the first cell
    const start = this.getCell(this.startPos[0], this.startPos[1]);
    start.state.startingCell = true;
    this.startCell = start;
  }

  resetGrid() {
    this.endCell = null;
    this.cells.forEach( (row) => {
      row.forEach( (cell) => {
        cell.clear();
        cell.distance = null;
        cell.draw(this.ctx);
      });
    });
  }

  resetSolution() {
    this.cells.forEach( (row) => {
      row.forEach( (cell) => {
        cell.clearSolution();
        cell.draw(this.ctx);
      });
    });
  }

  validPath(cell) {
    let validNeighbors = cell.validNeighbors();

    let parent = cell.getParentNode();
    let grandParent = parent.getParentNode();

    validNeighbors.forEach( (cell) => {
      if (!(parent.isMatch(cell) || grandParent.isMatch(cell) || parent.isChild(cell)) && cell.state.type === "p") {
        return false;
      }
    });

    return true;
  }

  resetCells() {
    this.cells.forEach ( (row) => {
      row.forEach( (cell) => {
        cell.childNodes = [];
        cell.parentNode = null;
      });
    });
  }

  inGrid(x, y) {
    if (x >= 0 && x < 60 && y >= 0 && y < 40) {
      return true;
    } else {
      false;
    }
  }

  draw(ctx) {
    this.cells.forEach ( (row) => {
      row.forEach( (cell) => {
        cell.draw(ctx);
      });
    });
  }
}

export default Grid;
