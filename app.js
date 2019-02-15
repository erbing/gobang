import demo from "./pages/proxy";
import "./assets/main.less";

demo();

const appDom = document.getElementById("app");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

// canvas.height = "800";
// canvas.width = "800";

//绘画棋盘
const drawChessBoard = function() {
  for (var i = 0; i < 10; i++) {
    context.moveTo(20 + i * 45, 20);
    context.lineTo(20 + i * 45, 20 + 45 * 9);
    context.stroke();

    context.moveTo(20, 20 + i * 45);
    context.lineTo(20 + 45 * 9, 20 + i * 45);
    context.stroke();
    context.strokeStyle = "#ccc";
  }
};
drawChessBoard();

// 画棋子 白子 黑子
const drawChess = (i, j) => {
  let self = false;
  context.beginPath();
  context.arc(20 + i * 45, 20 + j * 45, 13, 0, 2 * Math.PI); //画圆
  context.closePath();
  //渐变
  let gradient = context.createRadialGradient(
    15 + i * 45 + 2,
    15 + j * 45 - 2,
    13,
    15 + i * 45 + 2,
    15 + j * 45 - 2,
    0
  );
  if (self) {
    gradient.addColorStop(0, "#0a0a0a");
    gradient.addColorStop(1, "#636766");
  } else {
    gradient.addColorStop(0, "#d1d1d1");
    gradient.addColorStop(1, "#f9f9f9");
  }
  context.fillStyle = gradient;
  context.fill();
};

// 落棋子
canvas.onclick = e => {
  let x = e.offsetX;
  let y = e.offsetY;

  let m = Math.floor(x / 45);
  let n = Math.floor(y / 45);
  drawChess(m, n);
};

// 定义一个三维的数组，用于存放所有赢的情况
const winPaths = [];
const getWinPaths = () => {
  for (let i = 0; i < 10; i++) {
    winPaths[i] = [];
    for (let j = 0; j < 10; j++) {
      winPaths[i][j] = [];
    }
  }
  return winPaths;
};

console.log(getWinPaths());
let count = 0;
// 横向能赢的方法
const crossWinPaths = [];
for (var i = 0; i < 10; i++) {
  for (var j = 0; j < 6; j++) {
    for (var k = 0; k < 5; k++) {
      winPaths[i][j + k][count] = true;
    }
    count++;
  }
}

console.log(winPaths);

// 竖向能赢的方法
const verticalWinPaths = [];

// 左斜着 向能赢的方法
const leftWinPaths = [];

// 右斜着 向能赢的方法
const rightWinPaths = [];
