/* Elements */

const container = document.getElementById("container");

const brush = document.getElementById("brush");

const control = document.getElementById("control");
const thicknessIndicator = document.querySelector(
  "#thickness-preview .brush-indicator"
);
const thicknessInput = document.querySelector("#control__thickness input");
const color = document.getElementById("color");
const colorOption = document.querySelectorAll(
  "#control__palette .color-option"
);
const erase = document.querySelector("#control__eraser button:first-child");
const eraseAll = document.querySelector("#control__eraser button:last-child");
const textInput = document.querySelector("#control__text input");
const image = document.getElementById("image-input");
const save = document.querySelector("#control__function button:first-child");

const CANVAS_WIDTH = 800;
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

/* Constant */

const CURSOR_HIDDEN_CLASSNAME = "cursor--hidden";
const BRUSH_HIDDEN_CLASSNAME = "brush--hidden";
const CONTROL_HIDDEN_CLASSNAME = "control--hidden";

/* State */

let isPainting = false;

function setPainting(painting) {
  isPainting = painting;
}

/* Cursor */

function setCursorHidden(hidden) {
  if (hidden) {
    container.classList.add(CURSOR_HIDDEN_CLASSNAME);
  } else {
    container.classList.remove(CURSOR_HIDDEN_CLASSNAME);
  }
}

/* Brush */

function setBrushHidden(hidden) {
  if (hidden) {
    brush.classList.add(BRUSH_HIDDEN_CLASSNAME);
  } else {
    brush.classList.remove(BRUSH_HIDDEN_CLASSNAME);
  }
}

function moveBrush(x, y) {
  brush.style.top = y + "px";
  brush.style.left = x + "px";
}

function changeBrushColor(brushColor) {
  if (brushColor === "white") {
    brushColor = "#ffffff";
    brush.style.border = "1px solid black";
  } else {
    brush.style.border = "none";
  }

  brush.style.backgroundColor = brushColor;
  thicknessIndicator.style.backgroundColor = brushColor;
  color.value = brushColor;
  context.strokeStyle = brushColor;
  context.fillStyle = brushColor;
}

function changeBrushSize(value) {
  const size = value + "px";
  brush.style.width = size;
  brush.style.height = size;
  thicknessIndicator.style.width = size;
  thicknessIndicator.style.height = size;
  context.lineWidth = parseInt(value);
}

/* Control */

function showControl(x, y) {
  control.classList.remove(CONTROL_HIDDEN_CLASSNAME);
  control.style.top = y + "px";
  control.style.left = x + "px";
}

function hideControl() {
  control.classList.add(CONTROL_HIDDEN_CLASSNAME);
}

/* Draw Text */

function drawText(x, y) {
  const text = textInput.value;

  if (text !== "") {
    context.save();
    context.lineWidth = 1;
    context.font = "48px serif";
    context.fillText(text, x, y);
    context.restore();
  }
}

/* Event Listener */

canvas.addEventListener("mouseenter", () => {
  setCursorHidden(true);
  setBrushHidden(false);
});
canvas.addEventListener("mouseleave", () => {
  setCursorHidden(false);
  setBrushHidden(true);
  setPainting(false);
});
canvas.addEventListener("mousedown", (event) => {
  setPainting(true);
  hideControl();
});
canvas.addEventListener("mouseup", () => {
  setPainting(false);
});
canvas.addEventListener("mousemove", (event) => {
  moveBrush(event.offsetX, event.offsetY);

  if (isPainting) {
    context.lineTo(event.offsetX, event.offsetY);
    context.stroke();
    return;
  }

  context.beginPath();
  context.moveTo(event.offsetX, event.offsetY);
});
canvas.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  setPainting(false);
  showControl(event.offsetX, event.offsetY);
});
canvas.addEventListener("dblclick", (event) => {
  drawText(event.offsetX, event.offsetY);
});

thicknessInput.addEventListener("change", (event) => {
  const value = event.target.value;
  changeBrushSize(value);
});
color.addEventListener("change", (event) => {
  changeBrushColor(event.target.value);
});
colorOption.forEach((option) => {
  option.addEventListener("click", (event) => {
    changeBrushColor(event.target.dataset.color);
  });
});
erase.addEventListener("click", () => {
  changeBrushColor("white");
});
eraseAll.addEventListener("click", () => {
  const result = confirm("Do you want to erase all drawings?");
  if (result) {
    context.save();
    context.fillStyle = "white";
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    context.restore();
    hideControl();
  }
});
image.addEventListener("click", (event) => {
  hideControl();
});
image.addEventListener("change", (event) => {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);

  const image = new Image();
  image.src = url;
  image.onload = () => {
    context.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    image.value = null; // 선택된 file 지우기
  };
});
save.addEventListener("click", (event) => {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.png";
  a.click();
  hideControl();
});
