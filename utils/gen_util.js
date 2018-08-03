


export const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const endCell = (endCell) => {
  endCell.state.endingCell = true;
  endCell.grid.endCell = endCell;
  endCell.draw(endCell.grid.ctx);
};

export const randomPos = () => {
  let x = Math.floor((Math.random() * 3) + 56);
  let y = Math.floor((Math.random() * 3) + 36);

  return [x, y];
};
