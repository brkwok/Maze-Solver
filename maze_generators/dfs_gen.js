import * as DFSUtil from '../utils/dfs_util';

class DFSGenerator {
  constructor(grid) {
    this.grid = grid;
    this.stack = [];
  }

  mazeAnimation(int) {
    this.startGeneration();
    let mazeId = setInterval( () => {
      if (this.stack.length > 0) {
        let stackCell = this.getNextCell();
        this.exploreStack(stackCell);
        stackCell.state.checking = true;
      } else {
        clearInterval(mazeId);
      }
    }, int);
    return mazeId;
  }

  startGeneration() {
    this.grid.makeCellStart();
    let startCell = this.grid.startCell;
    startCell.makeToPath();
    startCell.draw(startCell.grid.ctx);

    let nextMoves = startCell.getValidMoves();

    nextMoves.forEach( (move) => {
      let cell = this.grid.getCell(move[0], move[1]);
      cell.draw(this.grid.ctx);
    });

    const shuffled = DFSUtil.shuffle(nextMoves);
    this.stack = this.stack.concat(shuffled);
    // this.stack = shuffled.concat(this.stack);
  }

  exploreStack(stackCell) {
    const parent = stackCell.getParentNode();
    if (parent.checkMoveValidity(stackCell)) {
      stackCell.makeToPath();
      stackCell.draw(stackCell.grid.ctx);
    } else {
      return;
    }

    //get next valid moves for cell to move
    let nextMoves = stackCell.getValidMoves();
    //add the valid move cells to the stack;
    if (nextMoves) {
      nextMoves.forEach( (move) => {
        let cell = this.grid.getCell(move[0], move[1]);
        cell.state.stack = true;
        cell.draw(this.grid.ctx);
      });

      const shuffled = DFSUtil.shuffle(nextMoves);
      this.stack = this.stack.concat(shuffled);
    }
  }

  getNextCell() {
    if (this.stack.length === 0) {
      return null;
    }

    let nextCell = this.stack.pop();
    let currCell = this.grid.getCell(nextCell[0], nextCell[1]);
    currCell.state.stack = false;
    currCell.draw(this.grid.ctx);

    return currCell;
  }

  quickMaze() {
    this.startGeneration();
    while (this.stack.length > 0) {
      let nextCell = this.getNextCell();
      this.exploreStack(nextCell);
    }
  }
}

export default DFSGenerator;
