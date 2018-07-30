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
        let stackCell = this.getRandomStack();
        if (this.grid.validPath(stackCell)) {
          this.exploreStack(stackCell);
        }
      } else {
        clearInterval(mazeId);
      }
    }, int);

    return mazeId;
  }

  startGeneration() {
    this.grid.makeCellStart();
    this.grid.makeCellEnd();
    let startCell = this.grid.startCell;
    startCell.makeToPath();
    this.stack.push(startCell);
    startCell.state.stack = true;
    startCell.draw(startCell.grid.ctx);

    let nextMoves = startCell.filterValidMoves();
    nextMoves.forEach( (move) => {
      let cell = this.grid.getCell(move[0], move[1]);
      cell.state.stack = true;
      cell.draw(this.grid.ctx);
    });

    this.stack.concat(nextMoves);
  }

  exploreStack(stackCell) {
    stackCell.makeToPath();
    stackCell.draw(stackCell.grid.ctx);
    // stackCell.state.stack = false;
    // let stackCellIdx = this.stack.indexOf(stackCell);
    // this.stack.splice(stackCellIdx, 1);

    //get next valid moves for cell to move
    let nextMoves = stackCell.filterValidMoves();

    //add the valid move cells to the stack;
    if (nextMoves) {
      nextMoves.forEach( (move) => {
        let cell = this.grid.getCell(move[0], move[1]);
        cell.state.stack = true;
        cell.draw(this.grid.ctx);
      });

      this.stack.concat(nextMoves);
    }
    // return nextMoves;
  }

  getRandomStack() {
    if (this.stack.length === 0) {
      return null;
    }

    let stackSize = this.stack.length;
    let randNum = Math.floor(Math.random() * stackSize);
    let randStackCell = this.stack[randNum];
    this.stack.splice(randNum, 1);
    randStackCell.state.stack = false;
    randStackCell.draw(this.grid.ctx);

    return randStackCell;
  }

  generateMaze() {
    this.startGeneration();
    while (this.stack.length > 0) {
      let nextCell = this.getRandomStack();

      if (this.grid.validPath(nextCell)) {
        this.exploreStack(nextCell);
      }
    }
  }


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
  //   let nextMoves = stackCell.filterValidMoves();
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
