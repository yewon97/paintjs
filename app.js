const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

// pixel modifier
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = 'white';
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

const stopPainting = () => {
  painting = false;
};

const startPainting = () => {
  painting = true;
};

const onMouseMove = (e) => {
  // 내가 마우스를 움직이는 동안 계속 발생하는 거
  const x = e.offsetX;
  const y = e.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke(); // 선이 그려지는 효과를 주는 코드임
  }
};

const handleColorClick = (e) => {
  // console.log(e.target.style);
  const color = e.target.style.backgroundColor;
  // console.log(color);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
};

const handleRangeChange = (e) => {
  // console.log(e.target.value);
  const size = e.target.value;
  ctx.lineWidth = size;
};

const handleModeClick = () => {
  if (filling === true) {
    filling = false;
    mode.innerText = 'Fill';
  } else {
    filling = true;
    mode.innerText = 'Paint';
  }
};

const handleCanvasClick = () => {
  if(filling) {
    ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
  }
}

const handleCM = (e) => { // 마우스 우클릭 방지
  e.preventDefault();
} 

const handleSaveClick = () => { // 다른이름으로 저장하기
  const image = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = image;
  // a태그의 속성 중 하나인 download
  link.download = "PaintJS[🎨]";
  // console.log(link);
  link.click();
}

if (canvas) {
  // canvas가 있으면
  canvas.addEventListener('mousemove', onMouseMove);
  // mousedown => 클릭했을 때
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('mousedown', handleCanvasClick);
  canvas.addEventListener('contextmenu', handleCM); // 우클릭 방지
}

// Array.from 메소드는 object로 부터 arrary를 만든다.
// console.log(Array.from(colors));
Array.from(colors).forEach(function (color) {
  color.addEventListener('click', handleColorClick);
  // console.log(color);
});

if (range) {
  range.addEventListener('input', handleRangeChange);
}

if (mode) {
  mode.addEventListener('click', handleModeClick);
}

if(saveBtn) {
  saveBtn.addEventListener('click', handleSaveClick);
}
