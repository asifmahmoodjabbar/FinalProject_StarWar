class Beam {
  constructor(x, y, velocityX) {
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.velocityX = velocityX;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = "black";
    ctx.fillStyle = "#FF0000";
    ctx.lineWidth = 3;
    ctx.stroke();

    this.x += this.velocityX;
  }

  crashWith() {
    astroidsArr.forEach((element) => {
      let dx = element.x - this.x;
      let dy = element.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.radius + element.radius) {
        element.collision = true;
        score += 50;
        explosion();
      }
    });
  }
}
