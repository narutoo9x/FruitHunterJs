function Player() {
  this.direction = null;

  this.init =  function(direction, x, y) {

    this.direction = direction;
    console.log('init player');

    this.posX = x;
    this.posY = y;
  }

  this.run = function() {
    var clonePosX = player.posX;
    var clonePosY = player.posY;

    switch (player.direction) {
      case LEFT: {
        if (clonePosX > 0 )
          clonePosX--;
        break;
      }
      case UP: {
        if (clonePosY > 0)
          clonePosY--;
        break;
      }
      case RIGHT: {
        if (clonePosX < COLS-1)
          clonePosX++;
        break;
      }
      case DOWN: {
        if (clonePosY < ROWS-1)
          clonePosY++;
        break;
      }
    }

    // console.log(clonePosX, clonePosY);
    // if (0 > clonePosX || clonePosX > grid.width-1 || 0 > clonePosY || clonePosY > grid.height-1) {
    //   return init();
    // }


    grid.set(EMPTY, player.posX, player.posY);
    player.posX = clonePosX;
    player.posY = clonePosY;


    if (grid.get(clonePosX, clonePosY) === FRUIT) {
      // num_fruits--;
      grid.set(PLAYER, player.posX, player.posY);
      score++;
    } else {
      grid.set(PLAYER, player.posX, player.posY);

    }
  }
}
