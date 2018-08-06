import Grid from '../components/grid';
import DFSGenerator from '../maze_generators/dfs_gen';
import BFSGenerator from '../maze_generators/bfs_gen';
import BFSSolver from '../maze_solver/bfs_solver';

export const generateMaze = (ctx) => {
  let grid = new Grid(ctx);
  let dfs = new DFSGenerator(grid);
  let bfs = new BFSGenerator(grid);
  let bfsSolver = new BFSSolver(grid);

  $("#quick-gen").click( () => {
    grid.resetGrid();
    grid.resetCells();
    grid.fillGrid(ctx);
    grid.draw(ctx);
    dfs.quickMaze();
  });

  $("#dfs-gen").click( () => {
    grid.resetGrid();
    grid.resetCells();
    grid.fillGrid(ctx);
    grid.draw(ctx);
    $("button").prop("disabled", true);
    dfs.mazeAnimation(1);
  });

  $("#bfs-gen").click( () => {
    grid.resetGrid();
    grid.resetCells();
    grid.fillGrid(ctx);
    grid.draw(ctx);
    $("button").prop("disabled", true);
    bfs.mazeAnimation(1);
  });

  $("#bfs-solv").click( () => {
    grid.resetSolution();
    $("button").prop("disabled", true);
    bfsSolver.solve();
  });
};
