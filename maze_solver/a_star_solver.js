import * as SolverUtil from '../utils/solv_util';

class AStarSolver {
  constructor(grid) {
    this.grid = grid;
    this.ctx = this.grid.ctx;
    this.end = false;
    this.time = 0;
    this.fCost = {};
    this.stack = [];
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
    for (let i = 0; i < moves.length; i++) {
      let move = moves[i];
      if (this.grid.inGrid(move[0], move[1])) {
        let nextCell = this.grid.getCell(move[0], move[1]);
        if (nextCell.state.type === "p" && nextCell.state.visited === false) {
          this.calcCost(nextCell);
          nextCell.parent = cell;
          nextCell.state.probe = true;
          nextCell.draw(this.ctx);
        }
      }
    }

    return this.fCost;
  }

  makeMove() {
    let intKeys = Object.keys(this.fCost).map( (el) => {
      return parseInt(el);
    });
    let smallestCost = Math.min.apply(null, intKeys);
    let hCost = this.fCost[smallestCost];
    let hIntKeys = Object.keys(hCost).map( (el) => {
      return parseInt(el);
    });
    let smallestHCost = Math.min.apply(null, hIntKeys);
    let cells = hCost[smallestHCost];
    let nextCell = cells.shift();

    if (cells.length === 0) {
      delete hCost[smallestHCost];
    }

    if (Object.keys(hCost).length === 0) {
      delete this.fCost[smallestCost];
    }


    SolverUtil.travel(nextCell);

    if (nextCell.state.endingCell) {
      this.traceBack(nextCell);
      this.end = true;
    } else {
      return this.getPaths(nextCell);
    }
  }

  calcCost(cell) {
    let startCell = this.grid.startCell;
    let endCell = this.grid.endCell;

    cell.gCost = Math.floor(Math.sqrt(Math.pow((Math.abs(startCell.x - cell.x) * 10), 2) + Math.pow((Math.abs(startCell.y - cell.y) * 10), 2)));
    cell.hCost =  Math.floor(Math.sqrt(Math.pow((Math.abs(endCell.x - cell.x) * 10), 2) + Math.pow((Math.abs(endCell.y - cell.y) * 10), 2)));
    let fCostKey = cell.gCost + cell.hCost;

    if (this.fCost[fCostKey]) {
      let fKey = this.fCost[fCostKey];
      let hCost = cell.hCost;
      if (fKey[hCost]) {
        fKey[hCost].push(cell);
      } else {
        fKey[hCost] = [cell];
      }
    } else {
      this.fCost[fCostKey] = {};
      let hCost = cell.hCost;
      this.fCost[fCostKey][hCost] = [cell];
    }

    return this.fCost;
  }

  solve() {
    this.end = false;
    this.fCost = {};
    let start = this.grid.startCell;
    this.getPaths(start);

    let solver = setInterval( () => {
      if (this.end === false) {
        this.makeMove();
      } else {
        clearInterval(solver);
      }
    }, 0);
  }
}

export default AStarSolver;
