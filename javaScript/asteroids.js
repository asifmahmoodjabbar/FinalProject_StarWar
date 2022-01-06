class Astroids {
  constructor(x, y, radius, velocityX, velocityY) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.collision = false;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();

    if (this.radius < 25) {
      ctx.drawImage(
        asteroid,
        this.x - 35,
        this.y - 40,
        this.radius * 3.5,
        this.radius * 3.5
      );
    } else {
      ctx.drawImage(
        asteroid,
        this.x - 55,
        this.y - 55,
        this.radius * 3.5,
        this.radius * 3.5
      );
    }

    this.x -= this.velocityX;
    this.y += this.velocityY;
  }
  update() {
    if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
      this.velocityY = -1 * this.velocityY;
    }
    this.draw();
  }

  crashWith(mouseX, mouseY) {
    let dx = mouseX - this.x;
    let dy = mouseY - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.radius + 30) {
      this.collision = true;
      collision = true;
      explosion();
    }
  }
}
