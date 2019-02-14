import "./assets/main.less";

const appDom = document.getElementById("app");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

// canvas.height = "800";
// canvas.width = "800";
//绘画棋盘

const drawChessBoard = function() {
  for (var i = 0; i < 15; i++) {
    context.moveTo(15 + i * 30, 15);
    context.lineTo(15 + i * 30, 435);
    context.stroke();
    context.moveTo(15, 15 + i * 30);
    context.lineTo(435, 15 + i * 30);
    context.stroke();
  }
};

drawChessBoard();
