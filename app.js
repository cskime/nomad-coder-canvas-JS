/*  [ Canvas ]
    - HTML에서 <canvas></canvas>만 사용하면 나머지는 JS에서 모두 작업
    - 브라우저 화면에서 pixel을 그릴 수 있는 window
    - Canvas 크기를 CSS와 JavaScript에 모두 알려줘야 함
    - Width, height는 JavaScript에서만 수정함 -> Image quality를 높이기 위해

    [ Context ]
    - 그림을 그리게 될 paint brush 같은 것
    - 2d : 2D graphic
 */

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
const canvas = document.querySelector("canvas");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const context = canvas.getContext("2d");

/*  [ Coordinate System ]
    - origin : top-left
    - X axis : horizontal
    - Y axis : vertical
    
    [ Drawing 단계 ]
    Context로 drawing할 때는 "순서"가 중요함. 차례대로 실행되며 적용되는 것
    1. Create path
        - 화면에 그려질 path 생성
        - `moveTo(x,y)` : (x, y) 좌표로 context 이동
        - `lineTo(x,y)` : (x, y) 좌표까지 path 생성
    2. Set style
        - 색상 등 style 설정
        - `fillStyle` : fill color 설정
        - `strokeStyle` : stroke color 설정
        - `lineWidth` : Stroke thickness 설정
    3. Draw path
        - 1에서 선언한 path들을 실제로 그림
        - Path는 실제로 draw하도록 함수를 호출해야 canvas에 실제로 그려짐
        - `fill()` : 해당 path의 안쪽 영역을 채움
        - `stroke()` : 해당 path를 따라 선을 그림
*/
// context.moveTo(50, 50);
// context.lineTo(150, 50);
// context.lineTo(150, 150);
// context.lineTo(50, 150);
// context.lineTo(50, 50);
// context.strokeStyle = "red";
// context.stroke();

/*  [ Shortcuts ]
    - `rect(x,y,width,height)` : 사각형 path 생성
    - `arc(x,y,radius,startAngle,endAngle)` : (x, y)를 center로 하는 원 path 생성
    - `fillRect(x,y,width,height)` : 내부에 색을 채운 rect 그리기
    - `strokeRect(x,y,width,height)` : 내부가 비어있는 rect 그리기
*/
// context.rect(50, 50, 100, 100);
// context.fillStyle = "green";
// context.fill();

// context.fillRect(150, 150, 100, 100);
// context.strokeRect(250, 250, 100, 100);

// context.arc(400, 400, 50, 0, 2 * Math.PI);
// context.fill();

/*  [ Context Separation ]
    - 하나의 context로 그리는 path들은 모두 연결되어 있음
    - 나중에 변경하는 style이 이전에 그렸던 모든 path에 적용됨
    - `beginPath()` : 새로운 path를 그리기 위해 이전에 그린 sub-paths list를 비움
*/
// context.beginPath();
// context.rect(350, 350, 100, 100);
// context.rect(450, 450, 100, 100);
// context.fillStyle = "red";
// context.fill();

/*  [ Drawing House ] */
// // walls
// context.fillRect(200, 200, 50, 200);
// context.fillRect(400, 200, 50, 200);

// // door
// context.lineWidth = 2;
// context.fillRect(300, 300, 50, 100);

// context.fillRect(200, 200, 200, 20);

// context.moveTo(200, 200);
// context.lineTo(325, 100);
// context.lineTo(450, 200);
// context.fill();

/* [ Drawing Circle ] */
// // torso
// context.fillRect(200, 200, 15, 100);
// context.fillRect(360, 200, 15, 100);
// context.fillRect(260, 200, 60, 200);

// // head
// context.arc(290, 150, 40, 0, 2 * Math.PI);
// context.fill();

// context.beginPath();
// context.arc(265, 140, 6, Math.PI, 2 * Math.PI);
// context.arc(295, 140, 6, Math.PI, 2 * Math.PI);
// context.fillStyle = "white";
// context.fill();

/* [ Draw a line when the mouse is just moved ] */
// const colors = [
//   "#f6e58d",
//   "#ffbe76",
//   "#ff7979",
//   "#badc58",
//   "#dff9fb",
//   "#f9ca24",
//   "#f0932b",
//   "#eb4d4b",
//   "#6ab04c",
//   "#c7ecee",
// ];
// canvas.addEventListener("mousemove", (event) => {
//   context.beginPath();
//   context.moveTo(0, 0);
//   context.lineTo(event.offsetX, event.offsetY);
//   context.strokeStyle = colors[Math.floor(Math.random() * colors.length)];
//   context.stroke();
// });

/* Draw with mouse */

// Painting
let isPainting = false;
function startPainting() {
  isPainting = true;
}
function endPainting() {
  isPainting = false;
}
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", endPainting);
canvas.addEventListener("mouseleave", endPainting);
canvas.addEventListener("mousemove", (event) => {
  if (isPainting) {
    context.lineTo(event.offsetX, event.offsetY);
    context.stroke();
    return;
  }

  context.beginPath();
  context.moveTo(event.offsetX, event.offsetY);
});

// Change line width
const lineWidth = document.querySelector("#line-width");
context.lineWidth = lineWidth.value;
lineWidth.addEventListener("change", (event) => {
  context.lineWidth = parseInt(event.target.value);
});

// Change colors
function changeColors(color) {
  context.strokeStyle = color;
  context.fillStyle = color;
}
const lineColor = document.querySelector("#line-color");
context.strokeStyle = lineColor.value;
lineColor.addEventListener("change", (event) => {
  changeColors(event.target.value);
});
const colorOptions = document.querySelectorAll(".color-option");
colorOptions.forEach((option) =>
  option.addEventListener("click", (event) => {
    const color = event.target.dataset.color;
    changeColors(color);
    lineColor.value = color;
  })
);

// Change mode
let isFillMode = false;
function changeFillMode() {
  isFillMode = isFillMode ? false : true;
  modeBtn.innerText = isFillMode ? "Draw" : "Fill";
}
const modeBtn = document.getElementById("mode-btn");
modeBtn.addEventListener("click", () => {
  changeFillMode();
});
canvas.addEventListener("click", () => {
  if (isFillMode) {
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
});

// Erase
const destroyBtn = document.getElementById("destroy-btn");
destroyBtn.addEventListener("click", () => {
  context.fillStyle = "white";
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
});

const eraserBtn = document.getElementById("eraser-btn");
eraserBtn.addEventListener("click", () => {
  changeColors("white");
  changeFillMode();
});
