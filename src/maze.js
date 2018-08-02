// import { generateMaze } from '../utils/generator_handler';
import DFSGenerator from '../maze_generators/dfs_gen';
import BFSGenerator from '../maze_generators/bfs_gen';
import Grid from '../components/grid';
import * as GeneratorHandler from '../utils/generator_handler';

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("canvasEl");
  canvasEl.width = 630;
  canvasEl.height = 430;
  const ctx = canvasEl.getContext("2d");
  ctx.lineWidth = 10;
  ctx.strokeRect(5, 5, 610, 410);
  // generateMaze(ctx);

  let maze = new Grid(ctx);
  maze.fillGrid(ctx);
  maze.draw(ctx);
  let generator = new DFSGenerator(maze);
  // generator.mazeAnimation(1);
  let generator2 = new BFSGenerator(maze);
  GeneratorHandler.generateMaze(ctx);
  generator2.mazeAnimation(1);
});
