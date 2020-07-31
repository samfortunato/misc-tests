const canvasEl = document.querySelector('canvas');
canvasEl.width = 800;
canvasEl.height = 600;
const ctx = canvasEl.getContext('2d');

const PLAYER = {
  xPos: 0,
  yPos: 0,

  isJumping: false,
  jumpOffset: 0,
  jumpFrame: 0,
  yVelocity: 0,
  yVelocityRateOfChange: 0.01,

  isAttacking: false,
  attackFrame: 0,
  rotateAmount: 0,
}

const CURRENT_PRESSED_KEYS = {};
document.addEventListener('keydown', evt => CURRENT_PRESSED_KEYS[evt.key] = true);
document.addEventListener('keyup', evt => CURRENT_PRESSED_KEYS[evt.key] = false);

function updatePlayer() {
  if (CURRENT_PRESSED_KEYS.ArrowUp) PLAYER.yPos -= 3;
  if (CURRENT_PRESSED_KEYS.ArrowRight) PLAYER.xPos += 3;
  if (CURRENT_PRESSED_KEYS.ArrowDown) PLAYER.yPos += 3;
  if (CURRENT_PRESSED_KEYS.ArrowLeft) PLAYER.xPos -= 3;

  if (CURRENT_PRESSED_KEYS[' '] && !PLAYER.isJumping) {
    PLAYER.isJumping = true;
    PLAYER.yVelocity = -5;
  }

  if (CURRENT_PRESSED_KEYS.Shift && !PLAYER.isAttacking) {
    PLAYER.isAttacking = true;
  }
}

function drawPlayer() {
  handlePlayerJump();
  drawPlayerShadow();

  handlePlayerAttack();
  ctx.fillStyle = 'black';
  ctx.fillRect(PLAYER.xPos, PLAYER.yPos + PLAYER.jumpOffset, 32, 32);

  ctx.restore();
}

function handlePlayerJump() {
  if (PLAYER.isJumping) {
    if ((PLAYER.yPos + PLAYER.jumpOffset) > PLAYER.yPos) {
      PLAYER.jumpOffset = 0;
      PLAYER.yVelocity = 0;
      PLAYER.yVelocityRateOfChange = 0.01;
      PLAYER.jumpFrame = 0;
      PLAYER.isJumping = false;
    } else {
      PLAYER.jumpFrame++;
      PLAYER.jumpOffset += PLAYER.yVelocity + PLAYER.yVelocityRateOfChange
      PLAYER.yVelocityRateOfChange += 0.2;
    }
  }
}

function handlePlayerAttack() {
  if (PLAYER.isAttacking) {
    if (PLAYER.attackFrame < 10) {
      ctx.save();
      ctx.translate(PLAYER.xPos + 16, (PLAYER.yPos + PLAYER.jumpOffset) + 16);
      ctx.rotate(PLAYER.rotateAmount * (Math.PI / 180));
      ctx.translate(-(PLAYER.xPos + 16), -((PLAYER.yPos + PLAYER.jumpOffset) + 16));

      PLAYER.rotateAmount += 20;
      PLAYER.attackFrame++;
    } else {
      PLAYER.rotateAmount = 0;
      PLAYER.attackFrame = 0;
      PLAYER.isAttacking = false;
    }
  }
}

function drawPlayerShadow() {
  if (PLAYER.isJumping) {
    ctx.fillStyle = 'darkgray';
    ctx.fillRect(PLAYER.xPos, PLAYER.yPos + 16, 32, 16);
  }
}

function draw() {
  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

  updatePlayer();
  drawPlayer();

  requestAnimationFrame(draw);
}

draw();
