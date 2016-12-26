// Setup canvas
var COLS=20, ROWS=20;

// objects
var EMPTY=0, PLAYER=1, FRUIT=2, GHOST=3;

// direction
var LEFT=0, UP=1, RIGHT=2, DOWN=3;

// keycodes
var KEY_LEFT=37, KEY_UP=38, KEY_RIGHT=39, KEY_DOWN=40, KEY_ENTER=13;

var grid = {
  width : null,
  heght : null,
  _grid: null,
  init : function(d, col, row) {

    this.width = col,
    this.height = row,

    this._grid = [];

    for (var x=0; x < col; x++) {
      this._grid.push([]);
			for (var y=0; y < row; y++) {
				this._grid[x].push(d);
			}
		}
  },

  set: function(val, x, y) {
		this._grid[x][y] = val;
	},

	get: function(x, y) {
		return this._grid[x][y];
	}
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

// player object
var player = new Player();

//ghost object
var ghost = new Ghost();

// random fruit in the grid
function createFruit(fruits) {
  for (var x=0; x < grid.width; x++) {
		for (var y=0; y < grid.height; y++) {
			if (grid.get(x, y) === EMPTY) {
				fruits.push({x:x, y:y});
			}
		}
	}
  var ranpos = fruits[Math.floor(Math.random()*fruits.length)];
	grid.set(FRUIT, ranpos.x, ranpos.y);
}

// init
function initFruit(num_fruits) {
  console.log('init ' + num_fruits + ' fruits');
  var empty = [];

  for (var i=0; i<num_fruits; i++) {
    createFruit(empty);
  }
}


var canvas, ctx, keystate, frames, score, num_fruits, ghostSpeed, playerSpeed;

function startGame() {
  canvas = document.createElement("canvas");
  canvas.width = COLS*20;
  canvas.height = ROWS*20;
  ctx = canvas.getContext("2d");

  ctx.font = '40px Helvetica'
  ctx.fillStyle = '#f00';
  ctx.fillText('Fruit Hunter', canvas.width/2 - 100, canvas.height/2);

  document.getElementById('screen').appendChild(canvas);
  ctx.font = '14px Helvetica'

  keystate = {};

  document.addEventListener("keydown", function(e) {
    keystate[e.keyCode] = true;
  });
  document.addEventListener("keyup", function(e) {
    delete keystate[e.keyCode];
  });

  document.getElementById("start").addEventListener("click", function(){
    start();
  });

  document.getElementById("pause").addEventListener("click", function(){
    pause();
  });

}

function start() {
  frames = 0;
  // init game info
  num_fruits = document.getElementById('num_fruit').value;
  ghost_speed = 60 - document.getElementById('ghost_speed').value;
  player_speed = 60 - document.getElementById('player_speed').value;
  
  init();
  loop();
}
// function unpause() {
//   if (frames == 'undefined')
//     frames = 0;
// }

function pause() {
  frames = 'undefined';
  console.log(frames);
}

// init default config
function init() {
  score = 0;
  grid.init(EMPTY, COLS, ROWS);

  var playerPos = {x:1, y:1}

  var ghostPos = { x: getRandomInt(0, COLS-1), y: getRandomInt(0, COLS-1) }

  player.init(RIGHT,playerPos.x, playerPos.y);
  ghost.init(DOWN, ghostPos.x, ghostPos.y);

  // grid.set(GHOST, ghostPos.x, ghostPos.y);
  grid.set(PLAYER, playerPos.x, playerPos.y);
  grid.set(GHOST, ghostPos.x, ghostPos.y);

  initFruit(num_fruits);
}


function loop() {
  update();
  draw();

  window.requestAnimationFrame(loop, canvas);
}

function update() {

  frames++;

  if (keystate[KEY_LEFT]) player.direction = LEFT;
  if (keystate[KEY_UP]) player.direction = UP;
  if (keystate[KEY_RIGHT]) player.direction = RIGHT;
  if (keystate[KEY_DOWN]) player.direction = DOWN;

  // TODO: fix to press enter is start game
  if (keystate[KEY_ENTER]) {
    // if (frames == undefined || score == num_fruits)
    // start();
    // unpause();
  }

  if (frames % ghost_speed === 0) {
    ghost.random_run();
  }

  if (frames % player_speed === 0) {
    // ghost.random_run();
    player.run();

    if (ghost.posX-1 == player.posX-1 && ghost.posY-1 == player.posY-1) {
      console.log('The ghost catch you, You lose!');
      window.alert('You lose');
      init();
    }

    if (score == num_fruits) {
      window.setTimeout(function() {
        console.log('log');
        window.alert('You win!');
      }, 1);
      init();
    }
  }

}

function draw() {
  var total_width = canvas.width/grid.width;
  var total_height = canvas.height/grid.height;

  for (var col=0; col < grid.width; col++) {
		for (var row=0; row < grid.height; row++) {
			switch(grid.get(col, row)) {
				case EMPTY:
					ctx.fillStyle = "#fff";
					break;
				case PLAYER:
					ctx.fillStyle = "#0f0";
					break;
				case FRUIT:
					ctx.fillStyle = "#f00";
					break;
        case GHOST:
          ctx.fillStyle = "#00f"
          break;
			}
			ctx.fillRect(col*total_width, row*total_height, total_width, total_height );
		}
	}

  // draw score
  ctx.fillStyle = "#000";
  ctx.fillText("SCORE: " + score, 10, canvas.height - 10);
}

startGame();
