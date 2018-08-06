import * as SolverUtil from '../utils/solv_util';

class BFSSolver {
  constructor(grid) {
    this.grid = grid;
    this.ctx = this.grid.ctx;
    this.end = false;
    this.queue = [];
    this.time = 0;
  }

  traceBack(cell) {
    setTimeout( () => {
      if (cell.state.startingCell) {
        $("button").prop("disabled", false);
        return;
      } else {
        let parentCell = cell.parentNode;
        parentCell.state.solution = true;
        parentCell.draw(cell.ctx);
        this.traceBack(parent);
      }
    }, 0);
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

    this.queue = this.queue.concat(validPaths);
  }

  makeMove() {
    let cell = this.queue[0];
    let i = 0;

    while (cell.state.visited) {
      cell = this.queue[i];
      i++;
    }
    SolverUtil.travel(cell);

    if (cell.state.endingCell) {
      this.traceBack(cell);
      this.end = true;
    } else {
      let nextPaths = this.getPaths(cell);
      this.queue = this.queue.concat(nextPaths);
    }
  }

  solve() {
    let start = this.grid.startCell;
    this.getPaths(start);


    let solver = setInterval( () => {
      if (this.end === false) {
        this.makeMove();
      } else {
        clearInterval(solver);
      }
    }, 1);
  }
}

export default BFSSolver;
