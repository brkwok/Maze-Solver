// import { generateMaze } from '../utils/generator_handler';
import DFSGenerator from '../maze_generators/dfs_gen';
import Grid from '../components/grid';

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("canvasEl");
  canvasEl.width = 630;
  canvasEl.height = 430;
  const ctx = canvasEl.getContext("2d");
  ctx.lineWidth = 10;
  ctx.strokeRect(5, 5, 610, 410);
  // generateMaze(ctx);

  let maze = new Grid(ctx);
  maze.fillGrid();
  maze.draw(ctx);
  let generator = new DFSGenerator(maze);
  generator.mazeAnimation(1);

});
