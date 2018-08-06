class AStarSolver {
  constructor(grid) {
    this.grid = grid;
    this.ctx = this.grid.ctx;
    this.end = false;
    this.queue = [];
    this.time = 0;

    this.getPaths = this.getPaths.bind(this);
    this.solve = this.solve.bind(this);
  }

}

export default AStarSolver;
