import Grid from '../components/grid';
import DFSGenerator from '../maze_generators/dfs_gen';
import BFSGenerator from '../maze_generators/bfs_gen';
import BFSSolver from '../maze_solver/bfs_solver';
import DFSSolver from '../maze_solver/dfs_solver';

export const generateMaze = (ctx) => {
  let grid = new Grid(ctx);
  let dfs = new DFSGenerator(grid);
  let bfs = new BFSGenerator(grid);
  let bfsSolver = new BFSSolver(grid);
  let dfsSolver = new DFSSolver(grid);

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
    dfs.mazeAnimation(0);
  });

  $("#bfs-gen").click( () => {
    grid.resetGrid();
    grid.resetCells();
    grid.fillGrid(ctx);
    grid.draw(ctx);
    $("button").prop("disabled", true);
    bfs.mazeAnimation(0);
  });

  $("#bfs-solv").click( () => {
    grid.resetSolution();
    grid.draw(ctx);
    $("button").prop("disabled", true);
    bfsSolver.solve();
  });

  $("#dfs-solv").click( () => {
    grid.resetSolution();
    grid.draw(ctx);
    $("button").prop("disabled", true);
    dfsSolver.solve();
  });
};
