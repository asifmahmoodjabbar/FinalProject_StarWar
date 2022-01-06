class Stars {
  constructor(x, y, radius, velocityX, velocityY) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = "white";
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.stroke();

    this.x -= this.velocityX;
  }

  clearStars() {
    astroidsArr.forEach((element, index, arr) => {
      if (element.x < 0) {
        astroidsArr.splice(index, 1);
      }
    });
  }
}
