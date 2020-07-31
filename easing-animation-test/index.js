class DrawHandler {
  canvasEl;
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

  static drawBox(box) {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(box.xPos, box.yPos, box.width, box.height);
  }
}

function updateBox(box) {
  if (box.animationFrame >= 40) {
    box.xPos = 300;
    box.moveSpeed = 5;
    box.animationFrame = 0;
  } else {
    box.xPos += box.moveSpeed;

    if (box.moveSpeed > 0) {
      box.moveSpeed -= 0.2;
    }

    box.animationFrame++;
  }
}

DrawHandler.initialize();
const box = { xPos: 300, yPos: 300, width: 32, height: 32, moveSpeed: 5, animationFrame: 0 };

function startDrawLoop() {
  DrawHandler.clearCanvas();

  updateBox(box);
  DrawHandler.drawBox(box);

  requestAnimationFrame(startDrawLoop);
}

startDrawLoop();
