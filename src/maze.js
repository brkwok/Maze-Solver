import * as GeneratorHandler from '../utils/generator_handler';

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("canvasEl");
  canvasEl.width = 620;
  canvasEl.height = 420;
  const ctx = canvasEl.getContext("2d");
  ctx.lineWidth = 10;
  ctx.strokeRect(5, 5, 610, 410);

  GeneratorHandler.generateMaze(ctx);
});
