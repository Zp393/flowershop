// Modal pop-up with Escape support
const modal = document.getElementById('modal');
const shopNowBtn = document.getElementById('shopNowBtn');
const closeModal = document.getElementById('closeModal');

shopNowBtn.addEventListener('click', (e) => {
  e.preventDefault();
  modal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display === 'flex') {
    modal.style.display = 'none';
  }
});

// Falling petals animation with improvements
const canvas = document.getElementById('petal-canvas');
const ctx = canvas.getContext('2d');
let petals = [];
let animationId = null;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createPetals() {
  for (let i = 0; i < 15; i++) {
    petals.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 8 + 2,
      angle: Math.random() * 2 * Math.PI,
      speed: Math.random() * 1 + 0.5,
      color: 'pink'
    });
  }
}

function drawPetals() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  petals.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
  });
  movePetals();
}

function movePetals() {
  petals.forEach(p => {
    p.y += p.speed;
    p.x += Math.sin(p.angle) * 0.5;

    if (p.y > canvas.height) {
      p.y = 0;
      p.x = Math.random() * canvas.width;
    }
  });
}

function animatePetals() {
  drawPetals();
  animationId = requestAnimationFrame(animatePetals);
}

// Pause animation when tab is inactive
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    cancelAnimationFrame(animationId);
  } else {
    animatePetals();
  }
});

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
createPetals();
animatePetals();

// Testimonials 
let currentIndex = 0;
const testimonials = document.querySelectorAll('.testimonial');
const track = document.querySelector('.testimonial-track');
const totalTestimonials = testimonials.length;

document.getElementById('slideRight').addEventListener('click', () => {
  if (currentIndex < totalTestimonials - 1) {
    currentIndex++;
  } else {
    currentIndex = 0; // loop to start
  }
  updateSlider();
});

document.getElementById('slideLeft').addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = totalTestimonials - 1; // loop to end
  }
  updateSlider();
});

function updateSlider() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}
