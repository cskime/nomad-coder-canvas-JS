/* Elements */

const container = document.getElementById("container");
const brush = document.getElementById("brush");
const control = document.getElementById("control");

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 800;
const canvas = document.querySelector("canvas");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const THICKNESS_DEFAULT = 10;
const COLOR_DEFAULT = "black";
const context = canvas.getContext("2d");
context.lineWidth = THICKNESS_DEFAULT;
context.strokeStyle = COLOR_DEFAULT;
context.fillStyle = COLOR_DEFAULT;
context.lineCap = "round";

/* State */

let isPaintMode = false;
let isControlShown = false;

/* Cursor */

function setCursorHidden(hidden) {
  const CURSOR_HIDDEN_CLASSNAME = "container-cursor--hidden";
  if (hidden) {
    container.classList.add(CURSOR_HIDDEN_CLASSNAME);
  } else {
    container.classList.remove(CURSOR_HIDDEN_CLASSNAME);
  }
}

/* Brush */

function setBrushHidden(hidden) {
  const BRUSH_HIDDEN_CLASSNAME = "brush--hidden";

  if (isControlShown || hidden) {
    brush.classList.add(BRUSH_HIDDEN_CLASSNAME);
  } else {
    brush.classList.remove(BRUSH_HIDDEN_CLASSNAME);
  }
}

function moveBrush(x, y) {
  brush.style.left = x + "px";
  brush.style.top = y + "px";
}

/* Control */

const CURSOR_HIDDEN_CLASSNAME = "control--hidden";

function showControl(x, y) {
  control.classList.remove(CURSOR_HIDDEN_CLASSNAME);
  control.style.left = x + 10 + "px";
  control.style.top = y + "px";
  isControlShown = true;
  setCursorHidden(false);
}

function hideControl() {
  control.classList.add(CURSOR_HIDDEN_CLASSNAME);
  isControlShown = false;
  setCursorHidden(true);
}

/* Painting */

function setPaintMode(paintMode) {
  isPaintMode = isControlShown ? false : paintMode;
}

/* Event Listener */

container.addEventListener("mouseenter", () => {
  setBrushHidden(false);
});
container.addEventListener("mouseleave", () => {
  setBrushHidden(true);
});
container.addEventListener("mousemove", (event) => {
  moveBrush(event.offsetX, event.offsetY);
});
container.addEventListener("contextmenu", (event) => {
  if (isControlShown) {
    return;
  }
  event.preventDefault();
  showControl(event.offsetX, event.offsetY);
  setPaintMode(false);
  setBrushHidden(true);
});
container.addEventListener("click", () => {
  hideControl();
  setBrushHidden(false);
});

canvas.addEventListener("mousedown", () => {
  setPaintMode(true);
});
canvas.addEventListener("mouseup", () => {
  setPaintMode(false);
});
canvas.addEventListener("mouseleave", () => {
  setPaintMode(false);
});
canvas.addEventListener("mousemove", (event) => {
  if (isControlShown) {
    return;
  }

  if (isPaintMode) {
    context.lineTo(event.offsetX, event.offsetY);
    context.stroke();
    return;
  }

  context.beginPath();
  context.moveTo(event.offsetX, event.offsetY);
});
