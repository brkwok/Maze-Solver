class Cell {
  constructor(renderX, renderY, x, y, grid) {
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
      down: [1, 0],
      left: [0, -1],
      right: [0, 1],
      leftUp: [-1, -1],
      rightUp: [-1, 1],
      rightDown: [1, 1],
      leftDown: [1, -1],
    };
    this.state = {
      type: 'w',
      startingCell: false,
      endingCell: false,
      genStart: false,
      genEnd: false,
      checked: false,
      stack: false,
      visited: false
    };

    // this.neighborsValidCell.bind(this);
    // this.getAllNeighbors.bind(this);
    // this.getParentNode = this.getParentNode.bind(this);
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
    let grand = parent.getParentNode();
    return cell.isMatch(grand) || cell.isMatch(parent) || cell.isChild(cell);
  }

  getParentNode() {
    if (this.state.startingCell) {
      return this;
    }

    if (this.parentNode) {
      return this.parentNode;
    }

    return;
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
      moves.push(this.getMove(d));
    });

    return moves;
  }

  filterValidMoves() {
    let moves = this.getAllMoves();
    let cell = this;
    let validMoves = moves.filter((move) => {
      return cell.checkValidMove(move[0], move[1]);
    });

    if (validMoves.length > 0) {
      this.addMoves(validMoves);
      return validMoves;
    } else {
      return null;
    }
  }

  checkValidMove(x, y) {
    //Not valid if out of boundary
    if (!this.grid.inGrid(x, y)) {
      return false;
    }

    let cell = this.grid.getCell(x, y);
    let parent = this.getParentNode();
    // let grandParent = parent.getParentNode();
    // let validNeighbors = this.neighborsValidCell();

    // if cell is a parentNode, always false
    if (cell.isMatch(parent)) {
      return false;
    }

    let neighbors = cell.neighborsValidCell();
    neighbors.forEach( (neighbor) => {
      if (!(this.relation(neighbor)) && neighbor.state.type === "p") {
        return false;
      }

      return true;
    });
  }

  getAllNeighbors() {
    let directions = Object.keys(this.neighborCoords);
    let neighbors = [];

    //receives all neighbors
    directions.forEach( (dir) => {
      neighbors.push(this.getMove(dir));
    });

    return neighbors;
  }

  neighborsValidCell() {
    let allNeighbors = this.getAllNeighbors();
    let valid = [];
    //checks validity of neighboring cells
    allNeighbors.forEach( (neighbor) => {
      if (this.grid.inGrid(neighbor[0], neighbor[1])) {
        valid.push(this.grid.getCell(neighbor[0], neighbor[1]));
      }
    });

    return valid;
  }

  draw(ctx) {
    if (this.state.startingCell) {
      ctx.fillStyle = "#ffff00";
      ctx.fillRect(this.renderX, this.renderY, this.width, this.width);
    } else if (this.state.endingCell) {
      ctx.fillStyle = "#ff0000";
      ctx.fillRect(this.renderX, this.renderY, this.width, this.width);
    } else if (this.state.type === "w") {
      ctx.fillStyle = "#b6c9ca";
      ctx.fillRect(this.renderX, this.renderY, this.width, this.width);
    } else if (this.state.type === "p") {
      ctx.fillStyle = "#3e3eb7";
      ctx.fillRect(this.renderX, this.renderY, this.width, this.width);
    } else {
      ctx.fillStyle = "#000000";
      ctx.fillRect(this.renderX, this.renderY, this.width, this.width);
    }
  }
}


export default Cell;
