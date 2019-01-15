import * as SolverUtil from '../utils/solv_util';

class BFSSolver {
  constructor(grid) {
    this.grid = grid;
    this.ctx = this.grid.ctx;
    this.end = false;
    this.queue = [];
    this.time = 0;

    this.getPaths = this.getPaths.bind(this);
    this.solve = this.solve.bind(this);
  }

  traceBack(cell) {
    setTimeout( () => {
      if (cell.state.startingCell) {
        $("button").prop("disabled", false);
        return;
      } else {
        let parentCell = cell.parentNode;
        parentCell.state.solution = true;
        parentCell.draw(this.ctx);
        this.traceBack(parentCell);
      }
    }, 0);
  }

  getPaths(cell) {
    let moves = cell.getAllMoves();
    let validPaths = [];

    for (let i = 0; i < moves.length; i++) {
      let move = moves[i];
      if (this.grid.inGrid(move[0], move[1])) {
        let nextCell = this.grid.getCell(move[0], move[1]);
        if (nextCell.state.type === "p" && nextCell.state.visited === false) {
          nextCell.parent = cell;
          nextCell.state.probe = true;
          validPaths.push(nextCell);
          nextCell.draw(this.ctx);
        }
      }
    }

    this.queue = this.queue.concat(validPaths);
    return validPaths;
  }

  makeMove() {
    let cell = this.queue[0];

    while (cell.state.visited) {
      cell = this.queue.shift();
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
    this.end = false;
    this.queue = [];
    let start = this.grid.startCell;
    this.getPaths(start);

    let solver = setInterval( () => {
      let timer = document.getElementById("solv-bfs");
      let time = timer.innerText;
      let timeToInt = parseFloat(time);

      if (this.end === false) {
        let newTime = timeToInt + 0.01;
        timer.innerText = newTime.toFixed(2);
        this.makeMove();
      } else {
        clearInterval(solver);
      }
    }, 10);
  }
}

export default BFSSolver;
