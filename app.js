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
context.lineCap = "round";

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

/*  [ Load image file to Browser ]
    - 브라우저는 사용자의 file system과 격리되어 있으므로 직접 문서들을 읽을 수 없음 -> sandbox
    - 사용자가 input을 통해 직접 선택한 파일들만 브라우저의 메모리에 로드할 수 있음
    - 로드된 메모리의 URL을 통해 이미지에 접근
    - 이 URL은 인터넷상에 존재하지 않음. 브라우저가 메모리에 있는 파일을 나타내는 형식.
*/
const fileInput = document.getElementById("file");
fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);

  /* [ JavaScript로 Image 추가하기 ] 
     - new Image() == <img src="" />
     - `src`로 image path 설정 -> 여기서는 브라우저가 메모리에 로드한 URL
     - `onLoad` : URL에 있는 image가 로드되었을 때 event
     - `drawImage(image, dx, dy, dw, dh)` : Cavnas API에서 제공하는 image 추가 함수
        - image : Image object
        - dx, dy : Canvas에서의 location
        - dw, dh : Canvas에서의 size
  */
  const image = new Image();
  image.src = url;
  image.onload = () => {
    context.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null; // 선택된 file 지우기
  };
});

/*  [ Add text to canvas ]
    - `dblclick` : 더블클릭 event
    - `context.strokeText(text,x,y)` : (x, y) location에 text 그려넣기 (테두리만))
    - `context.fillText(text,x,y)` : (x, y) location에 text 그려넣기 (색이 채워짐)
    - `context.font` : 폰트 지정 (e.g. "48px serif")

    [ Context 상태 저장하기 ]
    - `lineWidth`가 5일 때 `strokeText`를 호출하면 글자들이 두껍게 그려질 것
    - `lineWidth`를 1로 설정하면 brush 두께도 같이 줄어드는 문제가 있음
    - Text를 그릴 때만 `lineWidth`를 1로 설정하고, 이후 원래 값으로 복귀시켜야 함
    - 즉, 이전 상태를 저장하고 변경 후 저장한 상태를 다시 되돌릴 필요가 있다.
    - `context.save()` : Context의 현재 state 저장 (color, style 등)
    - `context.restore()` : 저장해 두었던 context state를 되돌림
 */
const textInput = document.getElementById("text");
canvas.addEventListener("dblclick", (event) => {
  const text = textInput.value;

  if (text !== "") {
    context.save();
    context.lineWidth = 1;
    context.font = "48px serif";
    context.fillText(text, event.offsetX, event.offsetY);
    context.restore();
  }
});

/*  [ Save the contents in canvas into image ] 
    - `toDataURL()` : Canvas에 있는 모든 data들을 base64 encoding된 image URL로 추출
    - <a> tag 이용
        - href : Canvas에서 추출한 image url로 이동
        - download : 링크를 누를 때 download를 동작사킴. 다운로드되는 이미지 이름 설정
        - `click()` : JavaScript에서 click event를 발생시킴
*/
const saveBtn = document.getElementById("save");
saveBtn.addEventListener("click", (event) => {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.png";
  a.click();
});
