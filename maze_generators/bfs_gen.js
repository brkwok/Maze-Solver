import * as GenUtil from '../utils/gen_util';

class BFSGenerator {
  constructor(grid) {
    this.grid = grid;
    this.queue = [];
  }

  mazeAnimation(int) {
    this.startGeneration();
    let mazeId = setInterval( () => {
      if (this.queue.length > 0) {
        let stackCell = this.getNextCell();
        this.exploreQueue(stackCell);
      } else {
        this.getEndCell();
        clearInterval(mazeId);
        $("button").prop("disabled", false);
        $("p").toggle(true);
        $("button").toggle(true);
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


    const shuffled = GenUtil.shuffle(nextMoves);
    this.queue = this.queue.concat(shuffled);
  }

  exploreQueue(stackCell) {
    const parent = stackCell.getParentNode();
    if (parent.checkMoveValidity(stackCell)) {
      stackCell.makeToPath();
      stackCell.draw(stackCell.grid.ctx);
    } else {
      return;
    }

    //get next valid moves for cell to move
    let nextMoves = stackCell.getValidMoves();
    //add the valid move cells to the queue;
    if (nextMoves) {
      nextMoves.forEach( (move) => {
        let cell = this.grid.getCell(move[0], move[1]);
        cell.state.queue = true;
        cell.draw(this.grid.ctx);
      });

      const shuffled = GenUtil.shuffle(nextMoves);
      this.queue = this.queue.concat(shuffled);
    }
  }

  getNextCell() {
    if (this.queue.length === 0) {
      return null;
    }

    let stackSize = this.queue.length;
    let randNum = Math.floor(Math.random() * stackSize);
    let randMovePos = this.queue[randNum];
    // let pos = this.queue.shift();
    let currCell = this.grid.getCell(randMovePos[0], randMovePos[1]);
    // let currCell = this.grid.getCell(pos[0], pos[1]);
    this.queue.splice(randNum, 1);
    currCell.state.queue = false;
    currCell.draw(this.grid.ctx);

    return currCell;
  }

  getEndCell() {
    while(!this.grid.endCell) {
      let endCoord = GenUtil.randomPos();
      let cell = this.grid.getCell(endCoord[0], endCoord[1]);

      if (cell.state.type === "p") {
        GenUtil.endCell(cell);
        break;
      }
    }
  }
}

export default BFSGenerator;
