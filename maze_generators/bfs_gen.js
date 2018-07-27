import Grid from '../components/grids'

class DFSGenerator {
  constuctor(grid) {
    this.grid = grid;
    this.stack = [];
  }

  startGeneration() {
    this.grid.makeCellStart();
    this.grid.makeCellEnd();
    let startCell = this.grid.startCell;
    startCell.makeToPath();
    startCell.draw(startCell.grid.ctx);
  }

  
}
