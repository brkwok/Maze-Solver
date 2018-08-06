export const travel = (cell) => {
  cell.state.visited = true;
  cell.draw(cell.ctx);
};
