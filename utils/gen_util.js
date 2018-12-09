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
  const coords = [[59, 39], [58, 39], [57, 39], [59, 38], [59, 37]];
  // let x = Math.floor((Math.random() * 4) + 56);
  // let y = Math.floor((Math.random() * 4) + 36);
  let random = Math.floor((Math.random() * 4));

  return coords[random];
};
