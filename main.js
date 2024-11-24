function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createFirework(x) {
  const firework = document.createElement("div");
  firework.className = "firework";
  firework.style.left = x + "px";
  firework.style.backgroundColor = `hsl(${random(0, 360)}, 100%, 50%)`;
  document.body.appendChild(firework);

  setTimeout(() => {
    firework.remove();
    createExplosion(x, window.innerHeight * 0.2);
  }, 1000);
}

function createExplosion(x, y) {
  const explosion = document.createElement("div");
  explosion.className = "explosion";
  explosion.style.left = x + "px";
  explosion.style.top = y + "px";
  explosion.style.backgroundColor = `hsl(${random(0, 360)}, 100%, 50%)`;
  document.body.appendChild(explosion);

  // Mengurangi jumlah partikel untuk performa di mobile
  const particleCount = window.innerWidth < 600 ? 15 : 30;
  for (let i = 0; i < particleCount; i++) {
    createParticle(x, y);
  }

  setTimeout(() => explosion.remove(), 1000);
}

function createParticle(x, y) {
  const particle = document.createElement("div");
  particle.className = "particle";
  particle.style.left = x + "px";
  particle.style.top = y + "px";
  particle.style.backgroundColor = `hsl(${random(0, 360)}, 100%, 50%)`;

  const angle = random(0, Math.PI * 2);
  const velocity = random(30, 100); // Mengurangi velocity untuk tampilan mobile
  particle.style.setProperty("--x", `${Math.cos(angle) * velocity}px`);
  particle.style.setProperty("--y", `${Math.sin(angle) * velocity}px`);

  document.body.appendChild(particle);
  setTimeout(() => particle.remove(), 1000);
}

function startFireworks() {
  const width = window.innerWidth;
  let count = 0;
  const maxFireworks = width < 600 ? 3 : 5; // Mengurangi jumlah kembang api untuk mobile

  const interval = setInterval(() => {
    if (count >= maxFireworks) {
      clearInterval(interval);
      return;
    }
    createFirework(random(width * 0.2, width * 0.8));
    count++;
  }, 800);
}

// Membuat teks dengan animasi per huruf
const text = "Happy Birthday!";
const birthdayText = document.getElementById("birthdayText");

text.split("").forEach((letter, index) => {
  const span = document.createElement("span");
  span.textContent = letter;
  span.style.setProperty("--index", index);
  birthdayText.appendChild(span);
});

// Mencegah scroll dan zoom pada mobile
document.addEventListener("touchmove", (e) => e.preventDefault(), {
  passive: false,
});

// Start the show
startFireworks();

// Restart on touch/click
document.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault();
    startFireworks();
  },
  { passive: false }
);

document.addEventListener("click", () => {
  startFireworks();
});

// Menangani perubahan orientasi
window.addEventListener("resize", () => {
  // Memperbarui ukuran teks dan emoji sesuai orientasi baru
  const birthdayContainer = document.querySelector(".birthday-container");
  birthdayContainer.style.opacity = "0";
  setTimeout(() => {
    birthdayContainer.style.opacity = "1";
  }, 100);
});
