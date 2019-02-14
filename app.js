import "./assets/main.less";

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
  // debugger;
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

//
