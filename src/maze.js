import Grid from '../components/grid';

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("canvasEl");
  canvasEl.width = 630;
  canvasEl.height = 430;
  const ctx = canvasEl.getContext("2d");
  ctx.lineWidth = 20;
  ctx.strokeRect(0, 0, 610, 410);

  const grid = new Grid(ctx);
  grid.fillGrid();
  grid.draw(ctx);
});
