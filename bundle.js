/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/maze.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/cell.js":
/*!****************************!*\
  !*** ./components/cell.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Cell {\n  constructor(renderX, renderY, x, y, grid, ctx) {\n    this.renderX = renderX;\n    this.renderY = renderY;\n    this.x = x;\n    this.y = y;\n    this.grid = grid;\n    this.width = 10;\n    this.childNodes = [];\n    this.parentNode = null;\n    this.distance = null;\n    this.gCost = null;\n    this.hCost = null;\n    this.neighborCoords = {\n      up: [-1, 0],\n      rightUp: [-1, 1],\n      right: [0, 1],\n      rightDown: [1, 1],\n      down: [1, 0],\n      leftDown: [1, -1],\n      left: [0, -1],\n      leftUp: [-1, -1],\n    };\n    this.neighborCells = {\n      up: \"\",\n      rightUp: \"\",\n      right: \"\",\n      rightDown: \"\",\n      down: \"\",\n      leftDown: \"\",\n      left: \"\",\n      leftUp: \"\",\n    };\n    this.state = {\n      type: 'w',\n      startingCell: false,\n      endingCell: false,\n      genStart: false,\n      genEnd: false,\n      checked: false,\n      stack: false,\n      visited: false,\n      solution: false,\n      neighbor: false,\n    };\n    this.vectorDir = {\n      right : [\"up\", \"rightUp\", \"right\", \"rightDown\", \"down\"],\n      left  : [\"up\", \"leftUp\", \"left\", \"leftDown\", \"down\"],\n      up    : [\"left\", \"leftUp\", \"up\", \"rightUp\", \"right\"],\n      down  : [\"left\", \"leftDown\", \"down\", \"rightDown\", \"right\"]\n    };\n    this.ctx = ctx;\n\n  }\n\n  bounds(x, y) {\n    if (x >= 60 || x < 0){\n      return false;\n    } else if ( y >= 40 || y < 0) {\n      return false;\n    } else { return true; }\n  }\n\n  setNeighbors () {\n    const x = this.x;\n    const y = this.y;\n    const upY = y - 1;\n    const downY = y + 1;\n    const rightX = x + 1;\n    const leftX = x - 1;\n    this.neighborCells = {\n      up:        this.bounds(x,      upY)   ? this.grid.getCell(x, upY)        : \"\",\n      rightUp:   this.bounds(rightX, upY)   ? this.grid.getCell(rightX, upY)   : \"\",\n      right:     this.bounds(rightX, y)     ? this.grid.getCell(rightX, y)     : \"\",\n      rightDown: this.bounds(rightX, downY) ? this.grid.getCell(rightX, downY) : \"\",\n      down:      this.bounds(x,      downY) ? this.grid.getCell(x, downY)      : \"\",\n      leftDown:  this.bounds(leftX,  downY) ? this.grid.getCell(leftX, downY)  : \"\",\n      left:      this.bounds(leftX,  y)     ? this.grid.getCell(leftX, y)      : \"\",\n      leftUp:    this.bounds(leftX,  upY)   ? this.grid.getCell(leftX, upY)    : \"\",\n    };\n  }\n\n  clear() {\n    //wipes off the cell clean\n    this.state.childNodes = [];\n    this.state.parentNode = null;\n    this.state.type = 'w';\n    this.state.stack = false;\n    this.state.solution = false;\n    this.state.endingCell = false;\n    this.state.visited = false;\n  }\n\n  clearSolution() {\n    this.state.visited = false;\n    this.state.solution = false;\n    this.state.checked = false;\n  }\n\n  makeToPath() {\n    this.state.type = \"p\";\n  }\n\n  isMatch(cell) {\n    //checks for match\n    if (cell.x === this.x && cell.y === this.y) {\n      return true;\n    } else {\n      return false;\n    }\n  }\n\n  makeChild(childCell) {\n    childCell.parentNode = this;\n    this.childNodes.push(childCell);\n  }\n\n  addMoves(moves) {\n    //makes child parent connection between the cells\n    moves.forEach( (move) => {\n      let cell = this.grid.getCell(move[0], move[1]);\n      this.makeChild(cell);\n    });\n  }\n\n  isChild(cell) {\n    let children = this.childNodes;\n    for (let i = 0; i < children.length; i++) {\n      let child = children[i];\n      if (child.isMatch(cell)) {\n        return true;\n      }\n    }\n\n    return false;\n  }\n\n  getParentNode() {\n    if (this.state.startingCell) {\n      return this;\n    }\n\n    if (this.parentNode) {\n      return this.parentNode;\n    } else {\n      return -1;\n    }\n\n  }\n\n  getMove(direction) {\n    let curPos = [this.x, this.y];\n    let dir = this.neighborCoords[direction];\n    return [curPos[0] + dir[0], curPos[1] + dir[1]];\n  }\n\n  getAllMoves() {\n    let dir = [\"up\", \"down\", \"left\", \"right\"];\n    let moves = [];\n    dir.forEach( (d) => {\n      // let move = this.getMove(d);\n      moves.push(this.getMove(d));\n    });\n\n    return moves;\n  }\n\n  validMove(coord) {\n    //checks if move is within boundary\n    if (!this.grid.inGrid(coord[0], coord[1])) {\n      return false;\n    }\n\n    let nextMoveCell = this.grid.getCell(coord[0], coord[1]);\n    let parent = this.getParentNode();\n\n    //if nextMoveCell is the parent of curr cell, return false\n    if (nextMoveCell.isMatch(parent)) {\n      return false;\n    }\n\n    return this.checkMoveValidity(nextMoveCell);\n  }\n\n  removeChild(cell) {\n    let children = this.childNodes;\n    let valids = [];\n    for (let i = 0; i < children.length; i++) {\n      let child = children[i];\n      if (!child.isMatch(cell)) {\n        valids.push(child);\n      }\n    }\n  }\n\n  checkMoveValidity(moveCell) {\n    let validNeighbors = this.validNeighbors(moveCell);\n\n    for (let i = 0; i < validNeighbors.length; i++) {\n      let neighbor = validNeighbors[i];\n      if (neighbor.state.type === \"p\") {\n        return false;\n      }\n    }\n\n    return true;\n  }\n\n  vector(moveCell) {\n    this.makeChild(moveCell);\n    let parent = moveCell.getParentNode();\n    let [px, py] = [parent.x, parent.y];\n    let [mx, my] = [moveCell.x, moveCell.y];\n\n    let vector;\n    let [dirx, diry] = [mx - px, my - py];\n    this.removeChild(moveCell);\n\n    if (dirx === 1 && diry === 0) {\n      vector = \"right\";\n    } else if (dirx === -1 && diry === 0) {\n      vector = \"left\";\n    } else if (dirx === 0 && diry === 1) {\n      vector = \"down\";\n    } else {\n      vector = \"up\";\n    }\n    return vector;\n  }\n\n  getValidMoves() {\n    let moves = this.getAllMoves();\n    let validMoves = moves.filter( (move) => {\n      return this.validMove(move);\n    });\n\n    if (validMoves.length > 0) {\n      this.addMoves(validMoves);\n      return validMoves;\n    } else {\n      return null;\n    }\n  }\n\n  validNeighbors(moveCell) {\n    let vector = this.vector(moveCell);\n    let vectorDir = this.vectorDir[vector];\n    moveCell.setNeighbors();\n    let valids =[];\n\n    for (let i = 0; i < vectorDir.length; i++) {\n      let vect = vectorDir[i];\n\n      if (moveCell.neighborCells[vect] === \"\") {\n        continue;\n      } else {\n        valids.push(moveCell.neighborCells[vect]);\n      }\n    }\n    return valids;\n  }\n\n  draw(ctx) {\n    if (this.state.startingCell) {\n      ctx.fillStyle = \"#0000ff\";\n    } else if (this.state.endingCell) {\n      ctx.fillStyle = \"#ff0000\";\n    } else if (this.state.solution) {\n      ctx.fillStyle = \"#152951\";\n    } else if (this.state.visited) {\n      ctx.fillStyle = \"#6699ff\";\n    } else if (this.state.stack || this.state.queue) {\n      ctx.fillStyle = \"#e6e600\";\n    } else if (this.state.type === \"w\") {\n      ctx.fillStyle = \"#f5f5dc\";\n    } else if (this.state.type === \"p\") {\n      ctx.fillStyle = \"#86b300\";\n    }\n    ctx.fillRect(this.renderX, this.renderY, this.width, this.width);\n  }\n}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Cell);\n\n\n//# sourceURL=webpack:///./components/cell.js?");

/***/ }),

/***/ "./components/grid.js":
/*!****************************!*\
  !*** ./components/grid.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cell__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cell */ \"./components/cell.js\");\n\n\nclass Grid {\n  constructor(ctx) {\n    this.ctx = ctx;\n    this.cells = [];\n    this.startPos = [0, 0];\n    this.startCell = null;\n    this.endCell = null;\n    this.getCell = this.getCell.bind(this);\n  }\n\n  fillGrid(ctx) {\n    this.cells = [];\n    for (let x = 0; x < 60; x++) {\n      let row = [];\n      for (let y = 0; y < 40; y++) {\n        let cellRow = (x * 10) + 10;\n        let cellCol = (y * 10) + 10;\n        let cell = new _cell__WEBPACK_IMPORTED_MODULE_0__[\"default\"](cellRow, cellCol, x, y, this, ctx);\n        row.push(cell);\n      }\n      this.cells.push(row);\n    }\n    this.cells.forEach(row => {\n      row.forEach(cell => {\n        cell.setNeighbors();\n      });\n    });\n  }\n\n  getCell(x, y) {\n    if((x < 0) || (y < 0) || (x >= 60) || (y >= 40)) {\n      return false;\n    }\n    return this.cells[x][y];\n  }\n\n  makeCellStart() {\n    //sets maze starting point always to the first cell\n    const start = this.getCell(this.startPos[0], this.startPos[1]);\n    start.state.startingCell = true;\n    this.startCell = start;\n  }\n\n  resetGrid() {\n    this.endCell = null;\n    this.cells.forEach( (row) => {\n      row.forEach( (cell) => {\n        cell.clear();\n        cell.distance = null;\n        cell.draw(this.ctx);\n      });\n    });\n  }\n\n  resetSolution() {\n    this.cells.forEach( (row) => {\n      row.forEach( (cell) => {\n        cell.clearSolution();\n        cell.draw(this.ctx);\n      });\n    });\n  }\n\n  validPath(cell) {\n    let validNeighbors = cell.validNeighbors();\n\n    validNeighbors.forEach( (cell) => {\n      if (cell.state.type === \"p\") {\n        return false;\n      }\n    });\n\n    return true;\n  }\n\n  resetCells() {\n    this.cells.forEach ( (row) => {\n      row.forEach( (cell) => {\n        cell.childNodes = [];\n        cell.parentNode = null;\n        cell.clearSolution();\n      });\n    });\n  }\n\n  inGrid(x, y) {\n    if (x >= 0 && x < 60 && y >= 0 && y < 40) {\n      return true;\n    } else {\n      false;\n    }\n  }\n\n  draw(ctx) {\n  //   this.cells.forEach ( (row) => {\n  //     row.forEach( (cell) => {\n  //       cell.draw(ctx);\n  //     });\n  //   });\n  // }\n  for (let i = 0; i < this.cells.length; i++) {\n    let row = this.cells[i];\n    for (let j = 0; j< row.length; j++) {\n      let cell = row[j];\n      cell.draw(ctx);\n    }\n  }\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Grid);\n\n\n//# sourceURL=webpack:///./components/grid.js?");

/***/ }),

/***/ "./maze_generators/bfs_gen.js":
/*!************************************!*\
  !*** ./maze_generators/bfs_gen.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_gen_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/gen_util */ \"./utils/gen_util.js\");\n\n\nclass BFSGenerator {\n  constructor(grid) {\n    this.grid = grid;\n    this.queue = [];\n  }\n\n  mazeAnimation(int) {\n    this.startGeneration();\n    let mazeId = setInterval( () => {\n      if (this.queue.length > 0) {\n        let stackCell = this.getNextCell();\n        this.exploreStack(stackCell);\n      } else {\n        this.getEndCell();\n        clearInterval(mazeId);\n        $(\"button\").prop(\"disabled\", false);\n        $(\"p\").toggle(true);\n        $(\"button\").toggle(true);\n      }\n    }, int);\n\n    return mazeId;\n  }\n\n  startGeneration() {\n    this.grid.makeCellStart();\n    let startCell = this.grid.startCell;\n    startCell.makeToPath();\n    startCell.draw(startCell.grid.ctx);\n    let nextMoves = startCell.getValidMoves();\n\n      nextMoves.forEach( (move) => {\n        let cell = this.grid.getCell(move[0], move[1]);\n        cell.draw(this.grid.ctx);\n      });\n\n\n    const shuffled = _utils_gen_util__WEBPACK_IMPORTED_MODULE_0__[\"shuffle\"](nextMoves);\n    this.queue = this.queue.concat(shuffled);\n  }\n\n  exploreStack(stackCell) {\n    const parent = stackCell.getParentNode();\n    if (parent.checkMoveValidity(stackCell)) {\n      stackCell.makeToPath();\n      stackCell.draw(stackCell.grid.ctx);\n    } else {\n      return;\n    }\n\n    //get next valid moves for cell to move\n    let nextMoves = stackCell.getValidMoves();\n    //add the valid move cells to the queue;\n    if (nextMoves) {\n      nextMoves.forEach( (move) => {\n        let cell = this.grid.getCell(move[0], move[1]);\n        cell.state.queue = true;\n        cell.draw(this.grid.ctx);\n      });\n\n      const shuffled = _utils_gen_util__WEBPACK_IMPORTED_MODULE_0__[\"shuffle\"](nextMoves);\n      this.queue = this.queue.concat(shuffled);\n    }\n  }\n\n  getNextCell() {\n    if (this.queue.length === 0) {\n      return null;\n    }\n\n    let stackSize = this.queue.length;\n    let randNum = Math.floor(Math.random() * stackSize);\n    let randMovePos = this.queue[randNum];\n    // let pos = this.queue.shift();\n    let currCell = this.grid.getCell(randMovePos[0], randMovePos[1]);\n    // let currCell = this.grid.getCell(pos[0], pos[1]);\n    this.queue.splice(randNum, 1);\n    currCell.state.queue = false;\n    currCell.draw(this.grid.ctx);\n\n    return currCell;\n  }\n\n  getEndCell() {\n    while(!this.grid.endCell) {\n      let endCoord = _utils_gen_util__WEBPACK_IMPORTED_MODULE_0__[\"randomPos\"]();\n      let cell = this.grid.getCell(endCoord[0], endCoord[1]);\n\n      if (cell.state.type === \"p\") {\n        _utils_gen_util__WEBPACK_IMPORTED_MODULE_0__[\"endCell\"](cell);\n        break;\n      }\n    }\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (BFSGenerator);\n\n\n//# sourceURL=webpack:///./maze_generators/bfs_gen.js?");

/***/ }),

/***/ "./maze_generators/dfs_gen.js":
/*!************************************!*\
  !*** ./maze_generators/dfs_gen.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_gen_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/gen_util */ \"./utils/gen_util.js\");\n\n\nclass DFSGenerator {\n  constructor(grid) {\n    this.grid = grid;\n    this.stack = [];\n  }\n\n  mazeAnimation(int) {\n    this.startGeneration();\n    let mazeId = setInterval( () => {\n      if (this.stack.length > 0) {\n        let stackCell = this.getNextCell();\n        this.exploreStack(stackCell);\n        stackCell.state.checking = true;\n      } else {\n        this.getEndCell();\n        clearInterval(mazeId);\n        $(\"button\").prop(\"disabled\", false);\n        $(\"p\").toggle(true);\n        $(\"button\").toggle(true);\n      }\n    }, int);\n    return mazeId;\n  }\n\n  startGeneration() {\n    this.grid.makeCellStart();\n    let startCell = this.grid.startCell;\n    startCell.makeToPath();\n    startCell.draw(startCell.grid.ctx);\n\n    let nextMoves = startCell.getValidMoves();\n\n    nextMoves.forEach( (move) => {\n      let cell = this.grid.getCell(move[0], move[1]);\n      cell.draw(this.grid.ctx);\n    });\n\n\n    const shuffled = _utils_gen_util__WEBPACK_IMPORTED_MODULE_0__[\"shuffle\"](nextMoves);\n    this.stack = this.stack.concat(shuffled);\n  }\n\n  exploreStack(stackCell) {\n    const parent = stackCell.getParentNode();\n    if (parent.checkMoveValidity(stackCell)) {\n      stackCell.makeToPath();\n      stackCell.draw(stackCell.grid.ctx);\n    } else {\n      return;\n    }\n\n    //get next valid moves for cell to move\n    let nextMoves = stackCell.getValidMoves();\n    //add the valid move cells to the stack;\n    if (nextMoves) {\n      nextMoves.forEach( (move) => {\n        let cell = this.grid.getCell(move[0], move[1]);\n        cell.state.stack = true;\n        cell.draw(this.grid.ctx);\n      });\n\n      //randomizes next possible moves\n      const shuffled = _utils_gen_util__WEBPACK_IMPORTED_MODULE_0__[\"shuffle\"](nextMoves);\n      this.stack = this.stack.concat(shuffled);\n    }\n  }\n\n  getNextCell() {\n    if (this.stack.length === 0) {\n      return null;\n    }\n\n    //gets the random cell from the head of the node tree\n    let nextCell = this.stack.pop();\n    let currCell = this.grid.getCell(nextCell[0], nextCell[1]);\n    currCell.state.stack = false;\n    currCell.draw(this.grid.ctx);\n\n    return currCell;\n  }\n\n  quickMaze() {\n    this.startGeneration();\n    while (this.stack.length > 0) {\n      let nextCell = this.getNextCell();\n      this.exploreStack(nextCell);\n    }\n\n    this.getEndCell();\n    $(\"p\").toggle(true);\n    $(\"button\").toggle(true);\n  }\n\n  getEndCell() {\n    while(!this.grid.endCell) {\n      let endCoord = _utils_gen_util__WEBPACK_IMPORTED_MODULE_0__[\"randomPos\"]();\n      let cell = this.grid.getCell(endCoord[0], endCoord[1]);\n      if (cell.state.type === \"p\") {\n        _utils_gen_util__WEBPACK_IMPORTED_MODULE_0__[\"endCell\"](cell);\n        break;\n      }\n    }\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (DFSGenerator);\n\n\n//# sourceURL=webpack:///./maze_generators/dfs_gen.js?");

/***/ }),

/***/ "./maze_solver/a_star_solver.js":
/*!**************************************!*\
  !*** ./maze_solver/a_star_solver.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_solv_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/solv_util */ \"./utils/solv_util.js\");\n\n\nclass AStarSolver {\n  constructor(grid) {\n    this.grid = grid;\n    this.ctx = this.grid.ctx;\n    this.end = false;\n    this.time = 0;\n    this.fCost = {};\n    this.stack = [];\n  }\n\n  traceBack(cell) {\n    setTimeout( () => {\n      if (cell.state.startingCell) {\n        $(\"button\").prop(\"disabled\", false);\n        return;\n      } else {\n        let parentCell = cell.parentNode;\n        parentCell.state.solution = true;\n        parentCell.draw(this.ctx);\n        this.traceBack(parentCell);\n      }\n    }, 0);\n  }\n\n  getPaths(cell) {\n    let moves = cell.getAllMoves();\n    for (let i = 0; i < moves.length; i++) {\n      let move = moves[i];\n      if (this.grid.inGrid(move[0], move[1])) {\n        let nextCell = this.grid.getCell(move[0], move[1]);\n        if (nextCell.state.type === \"p\" && nextCell.state.visited === false) {\n          this.calcCost(nextCell);\n          nextCell.parent = cell;\n        }\n      }\n    }\n\n    return this.fCost;\n  }\n\n  makeMove() {\n    let intKeys = Object.keys(this.fCost).map( (el) => {\n      return parseInt(el);\n    });\n    let smallestCost = Math.min.apply(null, intKeys);\n    let hCost = this.fCost[smallestCost];\n    let hIntKeys = Object.keys(hCost).map( (el) => {\n      return parseInt(el);\n    });\n    let smallestHCost = Math.min.apply(null, hIntKeys);\n    let cells = hCost[smallestHCost];\n    let nextCell = cells.shift();\n\n    if (cells.length === 0) {\n      delete hCost[smallestHCost];\n    }\n\n    if (Object.keys(hCost).length === 0) {\n      delete this.fCost[smallestCost];\n    }\n\n\n    _utils_solv_util__WEBPACK_IMPORTED_MODULE_0__[\"travel\"](nextCell);\n\n    if (nextCell.state.endingCell) {\n      this.traceBack(nextCell);\n      this.end = true;\n    } else {\n      return this.getPaths(nextCell);\n    }\n  }\n\n  calcCost(cell) {\n    let startCell = this.grid.startCell;\n    let endCell = this.grid.endCell;\n\n    cell.gCost = Math.floor(Math.sqrt(Math.pow((Math.abs(startCell.x - cell.x) * 10), 2) + Math.pow((Math.abs(startCell.y - cell.y) * 10), 2)));\n    cell.hCost =  Math.floor(Math.sqrt(Math.pow((Math.abs(endCell.x - cell.x) * 10), 2) + Math.pow((Math.abs(endCell.y - cell.y) * 10), 2)));\n    let fCostKey = cell.gCost + cell.hCost;\n\n    if (this.fCost[fCostKey]) {\n      let fKey = this.fCost[fCostKey];\n      let hCost = cell.hCost;\n      if (fKey[hCost]) {\n        fKey[hCost].push(cell);\n      } else {\n        fKey[hCost] = [cell];\n      }\n    } else {\n      this.fCost[fCostKey] = {};\n      let hCost = cell.hCost;\n      this.fCost[fCostKey][hCost] = [cell];\n    }\n\n    return this.fCost;\n  }\n\n  solve() {\n    this.end = false;\n    this.fCost = {};\n    let start = this.grid.startCell;\n    this.getPaths(start);\n\n    let solver = setInterval( () => {\n      if (this.end === false) {\n        this.makeMove();\n      } else {\n        clearInterval(solver);\n      }\n    }, 0);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (AStarSolver);\n\n\n//# sourceURL=webpack:///./maze_solver/a_star_solver.js?");

/***/ }),

/***/ "./maze_solver/bfs_solver.js":
/*!***********************************!*\
  !*** ./maze_solver/bfs_solver.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_solv_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/solv_util */ \"./utils/solv_util.js\");\n\n\nclass BFSSolver {\n  constructor(grid) {\n    this.grid = grid;\n    this.ctx = this.grid.ctx;\n    this.end = false;\n    this.queue = [];\n    this.time = 0;\n\n    this.getPaths = this.getPaths.bind(this);\n    this.solve = this.solve.bind(this);\n  }\n\n  traceBack(cell) {\n    setTimeout( () => {\n      if (cell.state.startingCell) {\n        $(\"button\").prop(\"disabled\", false);\n        return;\n      } else {\n        let parentCell = cell.parentNode;\n        parentCell.state.solution = true;\n        parentCell.draw(this.ctx);\n        this.traceBack(parentCell);\n      }\n    }, 0);\n  }\n\n  getPaths(cell) {\n    let moves = cell.getAllMoves();\n    let validPaths = [];\n\n    for (let i = 0; i < moves.length; i++) {\n      let move = moves[i];\n      if (this.grid.inGrid(move[0], move[1])) {\n        let nextCell = this.grid.getCell(move[0], move[1]);\n        if (nextCell.state.type === \"p\" && nextCell.state.visited === false) {\n          nextCell.parent = cell;\n          validPaths.push(nextCell);\n        }\n      }\n    }\n\n    this.queue = this.queue.concat(validPaths);\n    return validPaths;\n  }\n\n  makeMove() {\n    let cell = this.queue[0];\n\n    while (cell.state.visited) {\n      cell = this.queue.shift();\n    }\n    _utils_solv_util__WEBPACK_IMPORTED_MODULE_0__[\"travel\"](cell);\n\n    if (cell.state.endingCell) {\n      this.traceBack(cell);\n      this.end = true;\n    } else {\n      let nextPaths = this.getPaths(cell);\n      this.queue = this.queue.concat(nextPaths);\n    }\n  }\n\n  solve() {\n    this.end = false;\n    this.queue = [];\n    let start = this.grid.startCell;\n    this.getPaths(start);\n\n\n    let solver = setInterval( () => {\n      if (this.end === false) {\n        this.makeMove();\n      } else {\n        clearInterval(solver);\n      }\n    }, 0);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (BFSSolver);\n\n\n//# sourceURL=webpack:///./maze_solver/bfs_solver.js?");

/***/ }),

/***/ "./maze_solver/dfs_solver.js":
/*!***********************************!*\
  !*** ./maze_solver/dfs_solver.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_solv_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/solv_util */ \"./utils/solv_util.js\");\n\n\nclass DFSSolver {\n  constructor(grid) {\n    this.grid = grid;\n    this.ctx = this.grid.ctx;\n    this.end = false;\n    this.stack = [];\n    this.time = 0;\n\n    this.getPaths = this.getPaths.bind(this);\n    this.solve = this.solve.bind(this);\n  }\n\n  traceBack(cell) {\n    setTimeout( () => {\n      if (cell.state.startingCell) {\n        $(\"button\").prop(\"disabled\", false);\n        return;\n      } else {\n        let parentCell = cell.parentNode;\n        parentCell.state.solution = true;\n        parentCell.draw(this.ctx);\n        this.traceBack(parentCell);\n      }\n    }, 0);\n  }\n\n  getPaths(cell) {\n    let moves = cell.getAllMoves();\n    let validPaths = [];\n\n    for (let i = 0; i < moves.length; i++) {\n      let move = moves[i];\n      if (this.grid.inGrid(move[0], move[1])) {\n        let nextCell = this.grid.getCell(move[0], move[1]);\n        if (nextCell.state.type === \"p\" && nextCell.state.visited === false) {\n          nextCell.parent = cell;\n          validPaths.push(nextCell);\n        }\n      }\n    }\n\n    this.stack = this.stack.concat(validPaths);\n    return validPaths;\n  }\n\n  makeMove() {\n    let cell = this.stack.pop();\n    _utils_solv_util__WEBPACK_IMPORTED_MODULE_0__[\"travel\"](cell);\n\n    if (cell.state.endingCell) {\n      this.traceBack(cell);\n      this.end = true;\n    } else {\n      let nextPaths = this.getPaths(cell);\n      this.stack = this.stack.concat(nextPaths);\n    }\n  }\n\n  solve() {\n    this.end = false;\n    this.stack = [];\n    let start = this.grid.startCell;\n    this.getPaths(start);\n\n\n    let solver = setInterval( () => {\n      if (this.end === false) {\n        this.makeMove();\n      } else {\n        clearInterval(solver);\n      }\n    }, 0);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (DFSSolver);\n\n\n//# sourceURL=webpack:///./maze_solver/dfs_solver.js?");

/***/ }),

/***/ "./src/maze.js":
/*!*********************!*\
  !*** ./src/maze.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/grid */ \"./components/grid.js\");\n/* harmony import */ var _utils_generator_handler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/generator_handler */ \"./utils/generator_handler.js\");\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const canvasEl = document.getElementById(\"canvasEl\");\n  canvasEl.width = 620;\n  canvasEl.height = 420;\n  const ctx = canvasEl.getContext(\"2d\");\n  ctx.lineWidth = 10;\n  ctx.strokeRect(5, 5, 610, 410);\n\n  let maze = new _components_grid__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ctx);\n  maze.fillGrid(ctx);\n  maze.draw(ctx);\n\n  _utils_generator_handler__WEBPACK_IMPORTED_MODULE_1__[\"generateMaze\"](ctx);\n});\n\n\n//# sourceURL=webpack:///./src/maze.js?");

/***/ }),

/***/ "./utils/gen_util.js":
/*!***************************!*\
  !*** ./utils/gen_util.js ***!
  \***************************/
/*! exports provided: shuffle, endCell, randomPos */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"shuffle\", function() { return shuffle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"endCell\", function() { return endCell; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"randomPos\", function() { return randomPos; });\nconst shuffle = (arr) => {\n  for (let i = arr.length - 1; i > 0; i--) {\n    const j = Math.floor(Math.random() * (i + 1));\n    [arr[i], arr[j]] = [arr[j], arr[i]];\n  }\n  return arr;\n};\n\nconst endCell = (endCell) => {\n  endCell.state.endingCell = true;\n  endCell.grid.endCell = endCell;\n  endCell.draw(endCell.grid.ctx);\n};\n\nconst randomPos = () => {\n  let x = Math.floor((Math.random() * 3) + 56);\n  let y = Math.floor((Math.random() * 3) + 36);\n\n  return [x, y];\n};\n\n\n//# sourceURL=webpack:///./utils/gen_util.js?");

/***/ }),

/***/ "./utils/generator_handler.js":
/*!************************************!*\
  !*** ./utils/generator_handler.js ***!
  \************************************/
/*! exports provided: generateMaze */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"generateMaze\", function() { return generateMaze; });\n/* harmony import */ var _components_grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/grid */ \"./components/grid.js\");\n/* harmony import */ var _maze_generators_dfs_gen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../maze_generators/dfs_gen */ \"./maze_generators/dfs_gen.js\");\n/* harmony import */ var _maze_generators_bfs_gen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../maze_generators/bfs_gen */ \"./maze_generators/bfs_gen.js\");\n/* harmony import */ var _maze_solver_bfs_solver__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../maze_solver/bfs_solver */ \"./maze_solver/bfs_solver.js\");\n/* harmony import */ var _maze_solver_dfs_solver__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../maze_solver/dfs_solver */ \"./maze_solver/dfs_solver.js\");\n/* harmony import */ var _maze_solver_a_star_solver__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../maze_solver/a_star_solver */ \"./maze_solver/a_star_solver.js\");\n\n\n\n\n\n\n\nconst generateMaze = (ctx) => {\n  let grid = new _components_grid__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ctx);\n  let dfs = new _maze_generators_dfs_gen__WEBPACK_IMPORTED_MODULE_1__[\"default\"](grid);\n  let bfs = new _maze_generators_bfs_gen__WEBPACK_IMPORTED_MODULE_2__[\"default\"](grid);\n  let bfsSolver = new _maze_solver_bfs_solver__WEBPACK_IMPORTED_MODULE_3__[\"default\"](grid);\n  let dfsSolver = new _maze_solver_dfs_solver__WEBPACK_IMPORTED_MODULE_4__[\"default\"](grid);\n  let aStarSolver = new _maze_solver_a_star_solver__WEBPACK_IMPORTED_MODULE_5__[\"default\"](grid);\n\n  $(\"#quick-gen\").click( () => {\n    grid.resetGrid();\n    grid.resetCells();\n    grid.fillGrid(ctx);\n    grid.draw(ctx);\n    dfs.quickMaze();\n  });\n\n  $(\"#dfs-gen\").click( () => {\n    grid.resetGrid();\n    grid.resetCells();\n    grid.fillGrid(ctx);\n    grid.draw(ctx);\n    $(\"button\").prop(\"disabled\", true);\n    dfs.mazeAnimation(0);\n  });\n\n  $(\"#bfs-gen\").click( () => {\n    grid.resetGrid();\n    grid.resetCells();\n    grid.fillGrid(ctx);\n    grid.draw(ctx);\n    $(\"button\").prop(\"disabled\", true);\n    bfs.mazeAnimation(0);\n  });\n\n  $(\"#bfs-solv\").click( () => {\n    grid.resetSolution();\n    $(\"button\").prop(\"disabled\", true);\n    bfsSolver.solve();\n  });\n\n  $(\"#dfs-solv\").click( () => {\n    grid.resetSolution();\n    grid.draw(ctx);\n    $(\"button\").prop(\"disabled\", true);\n    dfsSolver.solve();\n  });\n\n  $(\"#astar-solv\").click( () => {\n    grid.resetSolution();\n    grid.draw(ctx);\n    $(\"button\").prop(\"disabled\", true);\n    aStarSolver.solve();\n  });\n};\n\n\n//# sourceURL=webpack:///./utils/generator_handler.js?");

/***/ }),

/***/ "./utils/solv_util.js":
/*!****************************!*\
  !*** ./utils/solv_util.js ***!
  \****************************/
/*! exports provided: travel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"travel\", function() { return travel; });\nconst travel = (cell) => {\n  cell.state.visited = true;\n  cell.draw(cell.ctx);\n};\n\n\n//# sourceURL=webpack:///./utils/solv_util.js?");

/***/ })

/******/ });