import * as SolverUtil from '../utils/solv_util';

class BFSSolver {
  constructor(grid) {
    this.grid = grid;
    this.ctx = this.grid.ctx;
    this.end = false;
    this.stack = [];
    this.time = 0;
  }

  getPaths(cell) {
    let moves = cell.getAllMoves();

    let validPaths = [];

    moves.forEach((path) => {
      if (this.grid.inGrid(path[0], path[1])) {
        let nextCell = this.grid.getCell(path[0], path[1]);
        if (nextCell.state.type === "p" && nextCell.state.visited === false) {
          nextCell.parent = cell;
          validPaths.push(nextCell);
        }
      }
    });

    this.stack = this.stack.concat(validPaths);
  }




}
