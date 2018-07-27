import Grid from '../components/grid';

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("canvasEl");
  canvasEl.width = 630;
  canvasEl.height = 430;
  const ctx = canvasEl.getContext("2d");
  ctx.lineWidth = 10;
  ctx.strokeRect(5, 5, 610, 410);


  const grid = new Grid(ctx);
  grid.fillGrid();
  debugger
  grid.makeCellStart();
  grid.makeCellEnd();
  grid.draw(ctx);
});
