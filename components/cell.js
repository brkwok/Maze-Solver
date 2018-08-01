class Cell {
  constructor(renderX, renderY, x, y, grid, ctx) {
    this.renderX = renderX;
    this.renderY = renderY;
    this.x = x;
    this.y = y;
    this.grid = grid;
    this.width = 10;
    this.childNodes = [];
    this.parentNode = null;
    this.distance = null;
    this.neighborCoords = {
      up: [-1, 0],
      rightUp: [-1, 1],
      right: [0, 1],
      rightDown: [1, 1],
      down: [1, 0],
      leftDown: [1, -1],
      left: [0, -1],
      leftUp: [-1, -1],
    };
    this.neighborCells = {
      up: "",
      rightUp: "",
      right: "",
      rightDown: "",
      down: "",
      leftDown: "",
      left: "",
      leftUp: "",
    };
    this.state = {
      type: 'w',
      startingCell: false,
      endingCell: false,
      genStart: false,
      genEnd: false,
      checked: false,
      stack: false,
      visited: false,
      checking: false,
      neighbor: false
    };
    this.ctx = ctx;

  }

  bounds(x, y) {
    if (x >= 60 || x < 0){
      return false;
    } else if ( y >= 40 || y < 0) {
      return false;
    } else { return true; }
  }

  setNeighbors () {
    const x = this.x;
    const y = this.y;
    const upY = y - 1;
    const downY = y + 1;
    const rightX = x + 1;
    const leftX = x - 1;
    this.neighborCells = {
      up:        this.bounds(x,      upY)   ? this.grid.getCell(x, upY) : "",
      rightUp:   this.bounds(rightX, upY)   ? this.grid.getCell(rightX, upY) : "",
      right:     this.bounds(rightX, y)     ? this.grid.getCell(rightX, y) : "",
      rightDown: this.bounds(rightX, downY) ? this.grid.getCell(rightX, downY) : "",
      down:      this.bounds(x,      downY) ? this.grid.getCell(x, downY) : "",
      leftDown:  this.bounds(leftX,  downY) ? this.grid.getCell(leftX, downY) : "",
      left:      this.bounds(leftX,  y)     ? this.grid.getCell(leftX, y) : "",
      leftUp:    this.bounds(leftX,  upY)   ? this.grid.getCell(leftX, upY) : "",
    };
  }

  clear() {
    this.state.checked =  false;
  }

  makeToPath() {
    this.state.type = "p";
  }

  isMatch(cell) {
    if (cell.x === this.x && cell.y === this.y) {
      return true;
    } else {
      return false;
    }
  }

  makeChild(childCell) {
    childCell.parentNode = this;
    this.childNodes.push(childCell);
  }

  addMoves(moves) {
    moves.forEach( (move) => {
      let cell = this.grid.getCell(move[0], move[1]);
      this.makeChild(cell);
    });
  }

  isChild(cell) {
    let children = this.childNodes;
    for (let i = 0; i < children.length; i++) {
      let child = children[i];
      if (child.isMatch(cell)) {
        return true;
      }
    }

    return false;
  }

  relation(cell) {
    let parent = this.getParentNode();
    // let grand = parent.getParentNode();
    // cell.isMatch(grand) ||
    return parent.isMatch(cell) || parent.isChild(cell);
  }

  getParentNode() {
    if (this.state.startingCell) {
      return this;
    }

    if (this.parentNode) {
      return this.parentNode;
    } else {
      // [this.x, this.y] = [-1, -1];
      return false;
    }

    // return;
  }

  getMove(direction) {
    let curPos = [this.x, this.y];
    let dir = this.neighborCoords[direction];
    return [curPos[0] + dir[0], curPos[1] + dir[1]];
  }

  getAllMoves() {
    let dir = ["up", "down", "left", "right"];
    let moves = [];
    dir.forEach( (d) => {
      // let move = this.getMove(d);
      moves.push(this.getMove(d));
    });

    return moves;
  }

  validMove(coord) {
    //checks if move is within boundary
    if (!this.grid.inGrid(coord[0], coord[1])) {
      return false;
    }

    let nextMoveCell = this.grid.getCell(coord[0], coord[1]);
    let parent = this.getParentNode();

    //if nextMoveCell is the parent of curr cell, return false
    if (nextMoveCell.isMatch(parent)) {
      return false;
    }
    nextMoveCell.state.checking = true;
    nextMoveCell.draw(nextMoveCell.ctx);

    let result = this.checkMoveValidity(nextMoveCell);
    // nextMoveCell.validNeighbors().forEach( n => {
    //   n.state.neighbor = false;
    //   n.draw(n.ctx);
    // });
    nextMoveCell.state.checking = false;
    nextMoveCell.draw(nextMoveCell.ctx);
    return result;
  }

  checkMoveValidity(moveCell) {
    //gather all the neighboring cells
    let neighbors = moveCell.validNeighbors();
    const testCB = this.relation.bind(this);
    function testing (neighbors, testCB) {neighbors.forEach(cell =>
      console.log(testCB(cell)));}
    //
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];
      if (!(this.relation(neighbor)) && neighbor.state.type === "p") {

        return false;
      }
    }
    return true;
  }

  getValidMoves() {
    let moves = this.getAllMoves();
    let validMoves = moves.filter( (move) => {
      return this.validMove(move);
    });

    if (validMoves.length > 0) {
      this.addMoves(validMoves);
      return validMoves;
    } else {
      return null;
    }
  }

  neighbors() {
    let directions = Object.keys(this.neighborCoords);
    let neighbors = [];

    //receives all neighbors
    directions.forEach( (dir) => {
      neighbors.push(this.getMove(dir));
    });

    return neighbors;
  }

  validNeighbors() {
    let allNeighbors = this.neighbors();
    let valid = [];

    for (let i = 0; i < allNeighbors.length; i++) {
      let neighborCoord = allNeighbors[i];
      if (this.grid.inGrid(neighborCoord[0], neighborCoord[1])) {
        valid.push(this.grid.getCell(neighborCoord[0], neighborCoord[1]));
      }
    }
    return valid;
  }



  draw(ctx) {
    if (this.state.startingCell) {
      ctx.fillStyle = "#ffff00";
    } else if (this.state.endingCell) {
      ctx.fillStyle = "#ff0000";
    } else if (this.state.checking) {
      ctx.fillStyle = "#ffc9ff";
    } else if (this.state.stack) {
      ctx.fillStyle = "#00ffff";
    } else if (this.state.type === "w") {
      ctx.fillStyle = "#b6c9ca";
    } else if (this.state.type === "p") {
      ctx.fillStyle = "#3e3eb7";
    } else {
      ctx.fillStyle = "#000000";
    }
    ctx.fillRect(this.renderX, this.renderY, this.width, this.width);
  }
}


export default Cell;


// up: this.grid.getCell(this.x, this.y-1),
// rightUp: this.grid.getCell(this.x+1, this.y-1),
// right: this.grid.getCell(this.x+1, this.y),
// rightDown: this.grid.getCell(this.x+1, this.y+1),
// down: this.grid.getCell(this.x, this.y+1),
// leftDown: this.grid.getCell(this.x-1, -this.y+1),
// left: this.grid.getCell(this.x-1, this.y),
// leftUp: this.grid.getCell(this.x-1, this.y-1),
