const width = 300;
const height = 450;
let container = null;
let gameover = false;

const sleep = (duration) => new Promise((r) => setTimeout(r, duration));


let heroElement = null;
const heroSize = 40;
let heroX = width / 2;
let heroY = (height / 4) * 3;

const bulletFromX = width / 2;
const bulletFromY = width / 10;
const bulletSize = 10;
let bulletList = [];

const bulletManager = async () => {
  await danmaku1();
  await sleep(1000);
  await danmaku2();
  await sleep(1000);
  danmaku1();
  await danmaku2();
  await sleep(1000);
  await danmaku3();
  await sleep(1000);
  danmaku1();
  await danmaku3();
  await sleep(1000);
  while (!gameover) {
    danmaku1();
    danmaku2();
    await danmaku3();
    await sleep(1000);
  }
};

const danmaku1 = async() => {
  for (let i = 0; i < 25; i++) {
    for (let j = 0; j < 16; j++) {
      const angle = Math.atan2(heroY - bulletFromY, heroX - bulletFromX);
      const dx = Math.cos(angle + (j * Math.PI) / 8) * 5;
      const dy = Math.sin(angle + (j * Math.PI) / 8) * 5;
      createBullet(dx, dy);
    }
    await sleep(200);
  }
};

const danmaku2 = async () => {
  for (let i = 0; i < 5; i++) {
    const angle =
      Math.atan2(heroY - bulletFromY, heroX - bulletFromX) + Math.PI / 8;
    for (let k = 0; k < 15; k++) {
      for (let j = 0; j < 8; j++) {
        const dx = Math.cos(angle + (j * Math.PI) / 4) * 5;
        const dy = Math.sin(angle + (j * Math.PI) / 4) * 5;
        createBullet(dx, dy);
      }
      await sleep(50);
    }
    await sleep(250);
  }
};

const danmaku3 = async () => {
  for (let i = 0; i < 50; i++) {
    const angle = (Math.PI * i) / 50;
    for (let j = 0; j < 8; j++) {
      const dx = Math.cos(angle + (j * Math.PI) / 4) * 5;
      const dy = Math.sin(angle + (j * Math.PI) / 4) * 5;
      createBullet(dx, dy);
    }
    await sleep(100);
  }
};

const createBullet = (dx, dy) => {
  const div = document.createElement("div");
  container.appendChild(div);
  div.style.position = "absolute";
  div.style.width = `${bulletSize}px`;
  div.style.height = `${bulletSize}px`;
  div.style.backgroundColor = "#fff";
  div.style.borderRadius = "50%";
  bulletList.push({
    available: true,
    x: bulletFromX,
    y: bulletFromY,
    dx,
    dy,
    div
  });
};

const updateBullet = () => {
  for (const bullet of bulletList) {
    const { x, y, dx, dy, div } = bullet;
    div.style.left = `${x - bulletSize / 2}px`;
    div.style.top = `${y - bulletSize / 2}px`;
    bullet.x += dx;
    bullet.y += dy;

    if (
      bullet.x < -bulletSize / 2 ||
      bullet.x > bulletSize / 2 + width ||
      bullet.y < -bulletSize / 2 ||
      bullet.y > bulletSize / 2 + height
    ) {
      bullet.available = false;
      div.remove();
    }

    const dist = (heroX - x) ** 2 + (heroY - y) ** 2;
    if (dist < (heroSize * 0.25) ** 2) {
      gameover = true;
    }
  }
};

const eraseBullet = () => {
  bulletList = bulletList.filter((v) => v.available);
};

const updateHero = () => {
  heroElement.style.left = `${heroX - heroSize / 2}px`;
  heroElement.style.top = `${heroY - heroSize / 2}px`;
};

const init = () => {
  container = document.createElement("div");
  container.style.position = "absolute";
  container.style.width = `${width}px`;
  container.style.height = `${height}px`;
  container.style.backgroundColor = "#000";
  document.body.appendChild(container);

  heroElement = document.createElement("div");
  heroElement.style.position = "absolute";
  heroElement.style.width = `${heroSize}px`;
  heroElement.style.height = `${heroSize}px`;
  heroElement.style.fontSize = `${heroSize * 0.8}px`;
  heroElement.style.display = "flex";
  heroElement.style.alignItems = "center";
  heroElement.style.justifyContent = "center";
  heroElement.textContent = "🐥";
  updateHero();
  container.appendChild(heroElement);

  document.ondblclick = (e) => {
    e.preventDefault();
  };
  let originalX = -1,
    originalY,
    originalHeroX,
    originalHeroY;
  document.onpointerdown = (e) => {
    e.preventDefault();
    originalX = e.pageX;
    originalY = e.pageY;
    originalHeroX = heroX;
    originalHeroY = heroY;
  };
  document.onpointermove = (e) => {
    if (gameover) {
      return;
    }
    e.preventDefault();
    if (originalX !== -1) {
      heroX = originalHeroX + (e.pageX - originalX) * 1.5;
      heroY = originalHeroY + (e.pageY - originalY) * 1.5;
      heroX = Math.max(Math.min(heroX, width - heroSize / 2), heroSize / 2);
      heroY = Math.max(Math.min(heroY, height - heroSize / 2), heroSize / 2);
      updateHero();
    }
  };
  document.onpointerup = (e) => {
    e.preventDefault();
    originalX = -1;
  };
};

window.onload = async () => {
  init();
  bulletManager();
  while (!gameover) {
    await sleep(16);
    updateBullet();
    eraseBullet();
  }
};