import Grid from '../components/grid';
import DFSGenerator from '../maze_generators/dfs_gen';
import BFSGenerator from '../maze_generators/bfs_gen';
import BFSSolver from '../maze_solver/bfs_solver';
import DFSSolver from '../maze_solver/dfs_solver';
import AStarSolver from '../maze_solver/a_star_solver';

export const generateMaze = (ctx) => {
  let grid = new Grid(ctx);
  let dfs = new DFSGenerator(grid);
  let bfs = new BFSGenerator(grid);
  let bfsSolver = new BFSSolver(grid);
  let dfsSolver = new DFSSolver(grid);
  let aStarSolver = new AStarSolver(grid);
  let dfsTime = document.getElementById("solv-dfs");
  let bfsTime = document.getElementById("solv-bfs");
  let astarTime = document.getElementById("solv-astar");


  $("#quick-gen").click( () => {
    bfsTime.innerText = "0.0";
    dfsTime.innerText = "0.0";
    astarTime.innerText = "0.0";
    grid.resetGrid();
    grid.resetCells();
    grid.fillGrid(ctx);
    grid.draw(ctx);
    dfs.quickMaze();
  });

  $("#dfs-gen").click( () => {
    bfsTime.innerText = "0.0";
    dfsTime.innerText = "0.0";
    astarTime.innerText = "0.0";
    grid.resetGrid();
    grid.resetCells();
    grid.fillGrid(ctx);
    grid.draw(ctx);
    $("button").prop("disabled", true);
    dfs.mazeAnimation(0);
  });

  $("#bfs-gen").click( () => {
    bfsTime.innerText = "0.0";
    dfsTime.innerText = "0.0";
    astarTime.innerText = "0.0";
    grid.resetGrid();
    grid.resetCells();
    grid.fillGrid(ctx);
    grid.draw(ctx);
    $("button").prop("disabled", true);
    bfs.mazeAnimation(0);
  });

  $("#bfs-solv").click( () => {
    bfsTime.innerText = "0.0";
    grid.resetSolution();
    $("button").prop("disabled", true);
    bfsSolver.solve();
  });

  $("#dfs-solv").click( () => {
    dfsTime.innerText = "0.0";
    grid.resetSolution();
    grid.draw(ctx);
    $("button").prop("disabled", true);
    dfsSolver.solve();
  });

  $("#astar-solv").click( () => {
    astarTime.innerText = "0.0";
    grid.resetSolution();
    grid.draw(ctx);
    $("button").prop("disabled", true);
    aStarSolver.solve();
  });

  $(".outer-dfs").hover(
    () => {
      $("#exp-dfs").show( "easing" );
    },
    () => {
      $("#exp-dfs").hide( "easing" );
    }
  );

  $(".outer-bfs").hover(
    () => {
      $("#exp-bfs").show( "easing" );
    },
    () => {
      $("#exp-bfs").hide( "easing" );
    }
  );

  $(".outer-qm").hover(
    () => {
      $("#exp-qm").show( "easing" );
    },
    () => {
      $("#exp-qm").hide( "easing" );
    }
  );
};
