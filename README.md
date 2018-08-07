# Maze-Solver

[Maze-Solver Live](https://brkwok.github.io/Maze-Solver/)

Maze-Solver is a maze visualization built using JavaScript and HTML5 Canvas illustrating various algorithms that build and solve mazes.

<p align="center">
  <img src="https://raw.githubusercontent.com/brkwok/Maze-Solver/master/assets/images/maze_solver.png" title="Maze-Solver">
</p>


## General Concept

### HTML5 Canvas

The very basic foundation of Maze-Solver is a canvas element that reflects a JavaScript grid component that is configured as a 2D-array of cell components.

`Grid` class is initialized filled with wall cells from `Cell` class that keeps track of its state and renders itself in different colors.


## Maze Generation

### Constraints


```
  vector(moveCell) {
    this.makeChild(moveCell);
    let parent = moveCell.getParentNode();
    let [px, py] = [parent.x, parent.y];
    let [mx, my] = [moveCell.x, moveCell.y];

    let vector;
    let [dirx, diry] = [mx - px, my - py];
    this.removeChild(moveCell);

    if (dirx === 1 && diry === 0) {
      vector = "right";
    } else if (dirx === -1 && diry === 0) {
      vector = "left";
    } else if (dirx === 0 && diry === 1) {
      vector = "down";
    } else {
      vector = "up";
    }
    return vector;
  }
  
    validNeighbors(moveCell) {
    let vector = this.vector(moveCell);
    let vectorDir = this.vectorDir[vector];
    moveCell.setNeighbors();
    let valids =[];

    for (let i = 0; i < vectorDir.length; i++) {
      let vect = vectorDir[i];

      if (moveCell.neighborCells[vect] === "") {
        continue;
      } else {
        valids.push(moveCell.neighborCells[vect]);
      }
    }
    return valids;
  }
```

The code above ensures that the path does not intersect neither adjacently nor diagonally. Initially, the moveCell performs checks for the vector. Depending on the direction that it moved from, it finds its relevant neighbors(disregarding the paths that the cell has already created) and examines each of those cells for any intersections.

### Animation

The animation of each of the algorithms were accomplished through setting each generation steps inside a `setInterval()` function. Only after the stack is emptied, then the interval is cleared.


## Maze Solver

### A* searching

A* is a pathfinding algorithm that keeps track of the total cost from the start node and the end node. In general, in A* algorithm, each cells keep track of G-cost(distance from the start node to the current node), H-cost(distance from end node), and F-cost(sum of both F and G costs). Unlike other algorithms that searchs for random paths until it reaches the end node, A* algorithm favors exploring cells with the lowest cost the travel to.

```
  calcCost(cell) {
    let startCell = this.grid.startCell;
    let endCell = this.grid.endCell;

    //calculate the gCost from current cell to starting cell
    cell.gCost = Math.floor(Math.sqrt(Math.pow((Math.abs(startCell.x - cell.x) * 10), 2) + Math.pow((Math.abs(startCell.y - cell.y) * 10), 2)));
    //calculate the hCost from current cell to starting cell
    cell.hCost =  Math.floor(Math.sqrt(Math.pow((Math.abs(endCell.x - cell.x) * 10), 2) + Math.pow((Math.abs(endCell.y - cell.y) * 10), 2)));
    let fCostKey = cell.gCost + cell.hCost;

    if (this.fCost[fCostKey]) {
      let fKey = this.fCost[fCostKey];
      let hCost = cell.hCost;
      if (fKey[hCost]) {
        fKey[hCost].push(cell);
      } else {
        fKey[hCost] = [cell];
      }
    } else {
      this.fCost[fCostKey] = {};
      let hCost = cell.hCost;
      this.fCost[fCostKey][hCost] = [cell];
    }

    return this.fCost;
  }
  
    makeMove() {
    let intKeys = Object.keys(this.fCost).map( (el) => {
      return parseInt(el);
    });
    let smallestCost = Math.min.apply(null, intKeys);
    let hCost = this.fCost[smallestCost];
    let hIntKeys = Object.keys(hCost).map( (el) => {
      return parseInt(el);
    });
    let smallestHCost = Math.min.apply(null, hIntKeys);
    let cells = hCost[smallestHCost];
    let nextCell = cells.shift();

    if (cells.length === 0) {
      delete hCost[smallestHCost];
    }

    if (Object.keys(hCost).length === 0) {
      delete this.fCost[smallestCost];
    }


    SolverUtil.travel(nextCell);

    if (nextCell.state.endingCell) {
      this.traceBack(nextCell);
      this.end = true;
    } else {
      return this.getPaths(nextCell);
    }
  }
  ```
  The moves are stored in objects as F-costs as the keys pointing to another object that has H-costs directing to array of cells with corresponding H-costs
  
  ```
  this.fCost = {
    fCost: {
      hCost: [Cell1, Cell2]
    }
  }
  ```
  In each loop during its search, solver searches from the keys of the fCost in its state the lowest fCost and selects hCosts with lowest value as well, thus directing itself to the cell that is closer to the end node.
  
  ### Depth-first searching
  
  ```
    constructor(grid) {
    this.grid = grid;
    this.ctx = this.grid.ctx;
    this.end = false;
    this.stack = [];
    this.time = 0;
  }
  
    getPaths(cell) {
    let moves = cell.getAllMoves();
    let validPaths = [];

    for (let i = 0; i < moves.length; i++) {
      let move = moves[i];
      if (this.grid.inGrid(move[0], move[1])) {
        let nextCell = this.grid.getCell(move[0], move[1]);
        if (nextCell.state.type === "p" && nextCell.state.visited === false) {
          nextCell.parent = cell;
          nextCell.state.probe = true;
          validPaths.push(nextCell);
          nextCell.draw(this.ctx);
        }
      }
    }

    this.stack = this.stack.concat(validPaths);
    return validPaths;
  }
  
    makeMove() {
    let cell = this.stack.pop();
    SolverUtil.travel(cell);

    if (cell.state.endingCell) {
      this.traceBack(cell);
      this.end = true;
    } else {
      let nextPaths = this.getPaths(cell);
      this.stack = this.stack.concat(nextPaths);
    }
  }
  ```
  
  The depth-first search algorithm uses a stack(first in, last out), so that the algorithm will continue traveling down by a single branch of a node-tree until it reaches a dead end.
  
  
  ### Breadth-first searching
  
  ```
    makeMove() {
    let cell = this.queue[0];

    while (cell.state.visited) {
      cell = this.queue.shift();
    }
    SolverUtil.travel(cell);

    if (cell.state.endingCell) {
      this.traceBack(cell);
      this.end = true;
    } else {
      let nextPaths = this.getPaths(cell);
      this.queue = this.queue.concat(nextPaths);
    }
  }
  ```
  Breadth-first search algorithm is very similar to the depth-first searching algorithm, but instead of using the stack, it implements a queue(first in, first out) of all possible moves it can make from a given position. 
