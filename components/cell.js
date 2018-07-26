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

    // this.neighborCoords = {
    //   up: [1, 0],
    //   down: [-1, 0],
    //   left: [0, -1],
    //   right: [0, 1],
    //   leftUp: [-1, -1],
    //   rightUp: [1, 1],
    //   rightDown: [1, -1],
    //   leftDown: [-1, -1],
    // };
    this.state = {
      type: 'w',
      startCell: false,
      endCell: false,
      checked: false,
    };
  }

  wallToPath() {
    this.state.type = "p";
  }

  isCell(cell) {
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

  isChild(cell) {
    let children = this.childNodes;

    for (let i = 0; i < children.length; i++) {
      let child = children[i];
      if (child.isCell(cell)) {
        return true;
      }
    }

    return false;
  }

  getParentNode() {
    if (this.state.startCell) {
      return this;
    }

    if (this.parent) {
      return this.parent;
    }

    return;
  }


  draw(ctx) {
    if (this.state.startCell) {
      ctx.fillStyle = "#00ff00";
    } else if (this.state.endCell) {
      ctx.fillStyle = "#ff0000";
    } else {
      ctx.fillStyle = "#0000ff";
    }
    ctx.fillRect(this.renderX, this.renderY, this.width, this.width);
  }
}


export default Cell;
