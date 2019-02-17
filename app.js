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

const chessBoards = () => {
  let temArr = [];
  for (let i = 0; i < 10; i++) {
    temArr[i] = [];
    for (let j = 0; j < 10; j++) {
      temArr[i][j] = 0;
    }
  }
  console.log(temArr);
  return temArr;
};

const chessBoard = chessBoards();

// 画棋子 白子 黑子
const drawChess = (i, j, self) => {
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
getWinPaths();

let count = 0;
// 横向能赢的方法
for (var i = 0; i < 10; i++) {
  for (var j = 0; j < 6; j++) {
    // debugger;
    for (var k = 0; k < 5; k++) {
      winPaths[i][j + k][count] = true;
    }
    count++;
  }
}
console.log(count); // 60 横向60赢法

// 竖向能赢的方法
// const verticalWinPaths = [];
for (var i = 0; i < 10; i++) {
  for (var j = 0; j < 6; j++) {
    // debugger;
    for (var k = 0; k < 5; k++) {
      winPaths[j + k][i][count] = true;
    }
    count++;
  }
}

console.log(count); // 120 横向 + 竖 赢法

// 正斜着 能赢的方法
// const leftWinPaths = [];
for (var i = 0; i < 6; i++) {
  for (var j = 0; j < 6; j++) {
    // debugger;
    for (var k = 0; k < 5; k++) {
      winPaths[i + k][j + k][count] = true;
    }
    count++;
  }
}

console.log(count); // 横向 + 竖 + 正斜 赢法

// 反斜着 能赢的方法
// const rightWinPaths = [];
for (var i = 0; i < 6; i++) {
  for (var j = 9; j > 3; j--) {
    for (var k = 0; k < 5; k++) {
      winPaths[i + k][j - k][count] = true;
    }
    count++;
  }
}

console.log(count); // 所有的 赢法
console.log(winPaths);

// 下棋者 赢法的统计
let isOver = false;
let myWin = [];
let computerWin = [];

for (let i = 0; i < count; i++) {
  myWin[i] = 0;
  computerWin[i] = 0;
}

let self = true;
// 落棋子
canvas.onclick = e => {
  if (isOver) return;

  let x = e.offsetX;
  let y = e.offsetY;

  let i = Math.floor(x / 45);
  let j = Math.floor(y / 45);
  console.log(i, j);
  //   drawChess(m, n);
  if (chessBoard[i][j] == 0) {
    drawChess(i, j, self);
    if (self) {
      chessBoard[i][j] = 1;
    } else {
      chessBoard[i][j] = 2;
    }
    self = !self;
    //落下子后需要进行统计
    for (var k = 0; k < count; k++) {
      if (winPaths[i][j][k]) {
        //某种赢的某子true
        myWin[k]++; //离胜利又进一步
        computerWin[k] = 6; //该种赢法计算机没有机会了
        if (myWin[k] == 5) {
          //如果达到5就赢了
          console.log("厉害，你赢了！！");
          isOver = true;
          break;
        }
      }
    }
    // if (!isOver) {
    //   self = !self;
    //   computerAI();
    // }
  }
};

const computerAI = () => {};
