class Cell {
  constructor(renderX, renderY, x, y, grid) {
    this.renderX = renderX;
    this.renderY = renderY;
    this.x = x;
    this.y = y;
    this.grid = grid;
    this.width = 10;
    this.distance = 0;
    this.childNode = [];
    this.parentNode = null;
    this.state = {
      type: 'wall',
      start: false,
      end: false,
      checked: false,
      solution: false,
    };
  }

  draw(ctx) {
    if (this.state.start) {
      ctx.fillStyle = "#00e229";
    } else if (this.state.end) {
      ctx.fillStyle = "#ff0000";
    } else {
      ctx.fillStyle = "#4db5f2";
    }
    ctx.fillRect(this.renderX, this.renderY, this.width, this.width);
  }
}


export default Cell;
