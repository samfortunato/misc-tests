const DIRECTIONS = {
  UP: 'UP',
  RIGHT: 'RIGHT',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
}

class Player {
  constructor() {
    this.width = 32;
    this.height = 32;
    this.xPos = 0;
    this.yPos = 0;
    this.direction = DIRECTIONS.DOWN;

    this.movementEnabled = true;
    this.speed = 3;

    this.isAttacking = false;
    this.attackFrame = 0;
  }

  update() {
    if (this.movementEnabled) {
      if (InputHandler.isPressed('ArrowUp')) {
        this.yPos -= this.speed;
        this.direction = DIRECTIONS.UP;
      }
      if (InputHandler.isPressed('ArrowRight')) {
        this.xPos += this.speed;
        this.direction = DIRECTIONS.RIGHT;
      }
      if (InputHandler.isPressed('ArrowDown')) {
        this.yPos += this.speed;
        this.direction = DIRECTIONS.DOWN;
      }
      if (InputHandler.isPressed('ArrowLeft')) {
        this.xPos -= this.speed;
        this.direction = DIRECTIONS.LEFT;
      }
    }

    if (InputHandler.isPressed('Shift') && !this.isAttacking) this.isAttacking = true;

    this.processAttack();
  }

  processAttack() {
    if (this.isAttacking) {
      this.movementEnabled = false;

      if (this.attackFrame >= 10) {
        this.attackFrame = 0;
        this.isAttacking = false;
        this.movementEnabled = true;
      } else {
        if (this.direction === DIRECTIONS.UP) this.yPos -= 6;
        if (this.direction === DIRECTIONS.RIGHT) this.xPos += 6;
        if (this.direction === DIRECTIONS.DOWN) this.yPos += 6;
        if (this.direction === DIRECTIONS.LEFT) this.xPos -= 6;

        this.attackFrame++;
      }
    }
  }
}

class InputHandler {
  _currentlyPressedKeys;

  static initialize() {
    this._currentlyPressedKeys = {};

    document.addEventListener('keydown', evt => InputHandler.setAsPressed(evt.key));
    document.addEventListener('keyup', evt => InputHandler.setAsUnpressed(evt.key));
  }

  static isPressed(key) { return this._currentlyPressedKeys[key] === true; }
  static setAsPressed(key) { this._currentlyPressedKeys[key] = true; }
  static setAsUnpressed(key) { this._currentlyPressedKeys[key] = false; }
}

class DrawHandler {
  static canvasEl;
  ctx;

  static initialize() {
    this.canvasEl = document.querySelector('canvas');
    this.canvasEl.width = 800;
    this.canvasEl.height = 600;
    this.canvasEl.style.backgroundColor = 'grey';

    this.ctx = this.canvasEl.getContext('2d');
  }

  static clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
  }

  static drawPlayer(player) {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(player.xPos, player.yPos, player.width, player.height);
  }
}

const player = new Player();
InputHandler.initialize();
DrawHandler.initialize();

function gameStart() {
  DrawHandler.clearCanvas();

  player.update();
  DrawHandler.drawPlayer(player);

  requestAnimationFrame(gameStart);
}

gameStart();
