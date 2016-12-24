function Ghost() {
  this.direction =  null,
  this.posX = null,
  this.posY = null,

  this.init = function(direction, x, y) {

    console.log('init ghost');

    this.direction = direction;

    this.posX = x;
    this.posY = y;
  }

  this.random_run = function() {

    console.log('ghost run');
    var ran = getRandom(0,1);
    var clonePosX = this.posX;
    var clonePosY = this.posY;

    if (ran < 0.15) {
      if (clonePosX < grid.width-1)
        clonePosX++
    } else if (ran < 0.35) {
      if (clonePosX > 0)
        clonePosX--;
    } else if (ran < 0.6) {
      if (clonePosY > 0)
      clonePosY--;

    } else if (ran < 0.8) {
      if (clonePosY < grid.height-1)
        clonePosY++
    }

    if (grid.get(clonePosX, clonePosY)  === EMPTY) {
      grid.set(EMPTY, this.posX, this.posY);

      this.posX = clonePosX;
      this.posY = clonePosY;

      grid.set(GHOST, this.posX, this.posY);
    } else if (grid.get(clonePosX, clonePosY) === FRUIT) {
      this.random_run();
    }
  }

  this.smartRun = function() {
  //   var clonePlayerPos = {
  //
  //   }
  //   detectPlayer: function() {
  //     var player
  //   }
  }
}
