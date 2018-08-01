import * as DFSUtil from '../utils/dfs_util';

class DFSGenerator {
  constructor(grid) {
    this.grid = grid;
    this.stack = [];

    // this.startGeneration = this.startGeneration.bind(this);
    // this.mazeAnimation = this.mazeAnimation.bind(this);
    // this.exploreStack = this.exploreStack.bind(this);
    // this.getRandomStack = this.getRandomStack.bind(this);
    // this.generateMaze = this.generateMaze.bind(this);
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
    // // this.stack.push([startCell.x, startCell.y]);
    // startCell.state.stack = true;
    startCell.draw(startCell.grid.ctx);
    //
    let nextMoves = startCell.getValidMoves();

    if (nextMoves === null) { return; } else {
      nextMoves.forEach( (move) => {
        let cell = this.grid.getCell(move[0], move[1]);
        cell.draw(this.grid.ctx);
      });
    }
    //
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
      // const stackIdx = this.stack.indexOf(stackCell);
      // this.stack.splice(stackIdx, 1);
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
      // nextMoves.forEach( (move) => {
      //   this.stack.push(move);
      // });
      // this.stack.concat(nextMoves);
      const shuffled = DFSUtil.shuffle(nextMoves);
      this.stack = this.stack.concat(shuffled);
    }
    // return nextMoves;
  }

  getNextCell() {
    if (this.stack.length === 0) {
      return null;
    }

    // let stackSize = this.stack.length;
    // let randNum = Math.floor(Math.random() * stackSize);
    // let randMovePos = this.stack[randNum];
    let nextCell = this.stack.pop();
    //
    let currCell = this.grid.getCell(nextCell[0], nextCell[1]);
    // this.stack.splice(randNum, 1);
    currCell.state.stack = false;
    currCell.draw(this.grid.ctx);

    return currCell;
  }

  quickMaze() {
    this.startGeneration();
    while (this.stack.length > 0) {
      let nextCell = this.getNextCell();

      if (this.grid.validPath(nextCell)) {
        this.exploreStack(nextCell);
      }
    }
  }

  //
  // generationStart() {
  //   this.grid.makeCellStart();
  //   this.grid.makeCellEnd();
  //   let startCell = this.grid.startCell;
  //   startCell.state.visited = true;
  //   startCell.state.type = "p";
  //   this.stack.push(startCell);
  //   startCell.state.stack = true;
  //   startCell.draw(this.grid.ctx);
  // }
  //
  // createPath(stackCell) {
  //
  //   stackCell.makeToPath();
  //   stackCell.draw(this.grid.ctx);
  //   stackCell.state.stack = false;
  //   let stackIdx = this.stack.indexOf(stackCell);
  //   this.stack.splice(stackIdx, 1);
  //
  //   let nextMoves = stackCell.getValidMoves();
  //
  //   if (nextMoves !== null) {
  //     nextMoves.forEach( (move) => {
  //       let cell = this.grid.getCell(move[0], move[1]);
  //       cell.state.stack = true;
  //       this.stack.push(cell);
  //       cell.draw(this.grid.ctx);
  //     });
  //   }
  // }
  //
  // getRandomStack() {
  //   if (this.stack.length === 0) {
  //     return null;
  //   }
  //
  //   let stackSize = this.stack.length;
  //   let random = Math.floor(Math.random() * stackSize);
  //   let randCell = this.stack[random];
  //
  //   if (randCell.grid.validPath(randCell)) {
  //     this.createPath(randCell);
  //   }
  // }
  //
  // generateMaze() {
  //   this.generationStart();
  //
  //   while (this.stack.length > 0) {
  //     this.getRandomStack();
  //   }
  // }
}

export default DFSGenerator;
