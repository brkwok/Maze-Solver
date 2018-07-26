class Cell {
  constructor(renderX, renderY, x, y, grid) {
    this.renderX = renderX;
    this.renderY = renderY;
    this.x = x;
    this.y = y;
    this.grid = grid;
    this.width = 10;
    this.state = {
      type: 'wall',
      start: false,
      end: false,
    };
  }

  draw(ctx) {
    ctx.fillStyle = "#00e229";
    ctx.fillRect(this.renderX, this.renderY, this.width, this.width);
  }
}


export default Cell;
