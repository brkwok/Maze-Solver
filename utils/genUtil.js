

class GeneratorUtil {
  startGen(startingCell) {
    startingCell.makePath();
    startingCell.draw(startingCell.grid.ctx);
  }


}

export default GeneratorUtil;
