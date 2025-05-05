const canvas = document.getElementById('flower-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Flower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 2;
    this.growthRate = Math.random() * 0.5 + 0.2;
    this.maxRadius = Math.random() * 20 + 30;
    this.petalColor = `hsl(${Math.random() * 360}, 70%, 80%)`;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    for (let i = 0; i < 5; i++) {
      ctx.rotate(Math.PI / 2.5);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(10, 10, 0, this.radius);
      ctx.quadraticCurveTo(-10, 10, 0, 0);
      ctx.fillStyle = this.petalColor;
      ctx.fill();
    }
    ctx.restore();
  }

  update() {
    if (this.radius < this.maxRadius) {
      this.radius += this.growthRate;
      this.draw();
    }
  }
}

const flowers = [];

for (let i = 0; i < 15; i++) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  flowers.push(new Flower(x, y));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  flowers.forEach(flower => flower.update());
  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
