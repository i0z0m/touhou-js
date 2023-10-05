const width = 300;
const height = 450;

let heroElement = null;
const heroSize = 40;
let heroX = width / 2;
let heroY = (height / 4) * 3;

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

window.onload = () => {
  init();
};