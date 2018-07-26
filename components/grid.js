import Cell from './cell';

class Grid {
  constructor(ctx) {
    this.ctx = ctx;
    this.cells = [];
    this.startPos = [0, 0];
    this.endPos = [59, 39];
  }

  fillGrid() {
    for (let x = 0; x < 60; x++) {
      let row = [];
      for (let y = 0; y < 40; y++) {
        let cellRow = (x * 10) + 10;
        let cellCol = (y * 10) + 10;
        let cell = new Cell(cellRow, cellCol, x, y, this);
        row.push(cell);
      }
      this.cells.push(row);
    }
  }

  getCell(x, y) {
    return this.cells[x][y];
  }

  makeCellStart() {
    const start = this.getCell(this.startPos[0], this.startPos[1]);
    start.state.startCell = true;
  }

  makeCellEnd() {
    const end = this.getCell(this.endPos[0], this.endPos[1]);
    end.state.endCell = true;
  }

  resetGrid() {
    for (let x = 0; x < this.cells.length; x++) {
      for (let y = 0; y < this.cells[0].length; y++) {
        let cell = this.cells[x][y];
        cell.clear();
        cell.distance = null;
        cell.draw(this.ctx);
      }
    }
  }

  resetCells() {
    this.cells.forEach ( (row) => {
      row.forEach( (cell) => {
        cell.childNodes = [];
        cell.parentNode = [];
      });
    });
  }

  draw(ctx) {
    ctx.lineWidth = 10;
    this.cells.forEach ( (row) => {
      row.forEach( (cell) => {
        cell.draw(ctx);
      });
    });
  }
}

export default Grid;
