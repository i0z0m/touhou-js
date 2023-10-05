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
};

window.onload = () => {
  init();
};