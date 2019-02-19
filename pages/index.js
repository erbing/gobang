// // const appDom = document.getElementById("app");
// const titleDom = document.getElementById("title");
// const startBtn = document.getElementById("start");
// const backBtn = document.getElementById("back");
// const cancelBackBtn = document.getElementById("cancelBack");

// const canvas = document.getElementById("canvas");
// const context = canvas.getContext("2d");

// let isBack = false;
// if (!isBack) {
//   cancelBackBtn.className += " disable-btn";
//   backBtn.className += " disable-btn";
// }

// // 绘画棋盘 改为 利用 css 进行绘制
// const drawChessBoard = (function() {
//   //   for (var i = 0; i < 10; i++) {
//   //     context.moveTo(20 + i * 45, 20);
//   //     context.lineTo(20 + i * 45, 20 + 45 * 9);
//   //     context.stroke();
//   //     context.moveTo(20, 20 + i * 45);
//   //     context.lineTo(20 + 45 * 9, 20 + i * 45);
//   //     context.stroke();
//   //     context.strokeStyle = "#ccc";
//   //   }
// })();

// const chessBoard = (() => {
//   let temArr = [];
//   for (let i = 0; i < 10; i++) {
//     temArr[i] = [];
//     for (let j = 0; j < 10; j++) {
//       temArr[i][j] = 0;
//     }
//   }
//   return temArr;
// })();

// // 画棋子 白子 黑子
// const drawChess = (i, j, self) => {
//   context.beginPath();
//   context.arc(20 + i * 45, 20 + j * 45, 13, 0, 2 * Math.PI); //画圆
//   context.closePath();
//   //渐变
//   let gradient = context.createRadialGradient(
//     15 + i * 45 + 2,
//     15 + j * 45 - 2,
//     13,
//     15 + i * 45 + 2,
//     15 + j * 45 - 2,
//     0
//   );
//   if (self) {
//     gradient.addColorStop(0, "#0a0a0a");
//     gradient.addColorStop(1, "#636766");
//   } else {
//     gradient.addColorStop(0, "#d1d1d1");
//     gradient.addColorStop(1, "#f9f9f9");
//   }
//   context.fillStyle = gradient;
//   context.fill();
// };

// const winPaths = []; // 定义一个三维的数组，用于存放所有赢的情况
// let count = 0; // 定义 所有能赢的 方法数

// const getWinPaths = (() => {
//   for (let i = 0; i < 10; i++) {
//     winPaths[i] = [];
//     for (let j = 0; j < 10; j++) {
//       winPaths[i][j] = [];
//     }
//   }
//   return winPaths;
// })();

// // 横向能赢的方法
// for (var i = 0; i < 10; i++) {
//   for (var j = 0; j < 6; j++) {
//     // debugger;
//     for (var k = 0; k < 5; k++) {
//       winPaths[i][j + k][count] = true;
//     }
//     count++;
//   }
// }

// // 竖向能赢的方法
// for (var i = 0; i < 10; i++) {
//   for (var j = 0; j < 6; j++) {
//     // debugger;
//     for (var k = 0; k < 5; k++) {
//       winPaths[j + k][i][count] = true;
//     }
//     count++;
//   }
// }

// // 正斜着 能赢的方法
// for (var i = 0; i < 6; i++) {
//   for (var j = 0; j < 6; j++) {
//     // debugger;
//     for (var k = 0; k < 5; k++) {
//       winPaths[i + k][j + k][count] = true;
//     }
//     count++;
//   }
// }

// // 反斜着 能赢的方法
// for (var i = 0; i < 6; i++) {
//   for (var j = 9; j > 3; j--) {
//     for (var k = 0; k < 5; k++) {
//       winPaths[i + k][j - k][count] = true;
//     }
//     count++;
//   }
// }

// // 下棋者 赢法的统计
// let isOver = false;
// let myWin = [];
// let _myWin = [];
// let otherWin = [];
// let computerWin = [];
// let _computerWin = [];
// let repeatPosition = false;

// let _i = "";
// let _j = "";
// let _compi = 0;
// let _compj = 0;

// for (let i = 0; i < count; i++) {
//   myWin[i] = 0;
//   otherWin[i] = 0;
//   computerWin[i] = 0;
//   _myWin[i] = 0;
//   _computerWin[i] = 0;
// }

// let self = true;
// // 落棋子
// canvas.onclick = e => {
//   if (isOver) return;
//   cancelBackChangeStyle();

//   let x = e.offsetX;
//   let y = e.offsetY;

//   let i = Math.floor(x / 45);
//   let j = Math.floor(y / 45);

//   if (_i === i && _j === j) {
//     // 说明重复的下在了原来的位置
//     repeatPosition = true;
//   }

//   _i = i;
//   _j = j;

//   if (chessBoard[i][j] == 0) {
//     drawChess(i, j, self);
//     if (self) {
//       chessBoard[i][j] = 1;
//     } else {
//       chessBoard[i][j] = 2;
//     }

//     //落下子后需要进行统计
//     for (var k = 0; k < count; k++) {
//       if (winPaths[i][j][k]) {
//         //某种赢的某子true
//         console.log(chessBoard[i][j]);
//         // 下面注释的是同 非机器人 下棋的模式需要的
//         if (self) {
//           myWin[k]++;
//           _computerWin[k] = computerWin[k]; // 为悔棋做准备
//         } else {
//           otherWin[k]++;
//         }

//         //离胜利又进一步
//         computerWin[k] = 6; //该种赢法计算机没有机会了

//         if (myWin[k] == 5) {
//           //如果 我能 达到5就赢了
//           console.log("厉害，你赢了！！");
//           titleDom.innerHTML = "Congratulations, you've won!!!";
//           isOver = true;
//           break;
//         }

//         if (otherWin[k] == 5) {
//           //如果 对手 达到5就赢了
//           titleDom.innerHTML = "Congratulations, you've won!!!";
//           isOver = true;
//           break;
//         }
//       }
//     }
//     self = !self;
//     if (!isOver) {
//       self = !self;
//       computerAI();
//     }
//   }
// };

// //  机器人下期
// const computerAI = () => {
//   var myScore = [];
//   var computerScore = [];
//   var max = 0;
//   var u = 0,
//     v = 0;
//   for (var i = 0; i < 9; i++) {
//     myScore[i] = [];
//     computerScore[i] = [];
//     for (var j = 0; j < 9; j++) {
//       myScore[i][j] = 0;
//       computerScore[i][j] = 0;
//     }
//   }
//   for (var i = 0; i < 9; i++) {
//     for (var j = 0; j < 9; j++) {
//       if (chessBoard[i][j] == 0) {
//         for (var k = 0; k < count; k++) {
//           if (winPaths[i][j][k]) {
//             if (myWin[k] == 1) {
//               myScore[i][j] += 200;
//             } else if (myWin[k] == 2) {
//               myScore[i][j] += 400;
//             } else if (myWin[k] == 3) {
//               myScore[i][j] += 2000;
//             } else if (myWin[k] == 4) {
//               myScore[i][j] += 10000;
//             }

//             if (computerWin[k] == 1) {
//               computerScore[i][j] += 220;
//             } else if (computerWin[k] == 2) {
//               computerScore[i][j] += 420;
//             } else if (computerWin[k] == 3) {
//               computerScore[i][j] += 2100;
//             } else if (computerWin[k] == 4) {
//               computerScore[i][j] += 20000;
//             }
//           }
//         }

//         if (myScore[i][j] > max) {
//           max = myScore[i][j];
//           u = i;
//           v = j;
//         } else if (myScore[i][j] == max) {
//           if (computerScore[i][j] > computerScore[u][v]) {
//             u = i;
//             v = j;
//           }
//         }

//         if (computerScore[i][j] > max) {
//           max = computerScore[i][j];
//           u = i;
//           v = j;
//         } else if (computerScore[i][j] == max) {
//           if (myScore[i][j] > myScore[u][v]) {
//             u = i;
//             v = j;
//           }
//         }
//       }
//     }
//   }

//   // 处理悔棋
//   if (repeatPosition) {
//     u = _compi;
//     v = _compj;
//     repeatPosition = false;
//   }

//   _compi = u;
//   _compj = v;

//   drawChess(u, v, false);
//   chessBoard[u][v] = 2; //计算机占据位置
//   for (var k = 0; k < count; k++) {
//     if (winPaths[u][v][k]) {
//       computerWin[k]++;
//       _myWin[k] = myWin[k];
//       myWin[k] = 6; //这个位置对方不可能赢了
//       if (computerWin[k] == 5) {
//         titleDom.innerHTML = "AI wins. Keep trying!!!";
//         isOver = true;
//       }
//     }
//   }
//   if (!isOver) {
//     console.log(123);
//   }
// };

// // 悔棋功能
// backBtn.onclick = () => {
//   // 销毁 我自己下的棋
//   if (backBtn.className && backBtn.className.split(" ").length > 1) {
//     console.log("还未开始下棋，无法悔棋～");
//     return;
//   }

//   if (isOver) {
//     titleDom.innerHTML = "GoBang";
//   }
//   isOver = false;

//   destoryPieces(_i, _j);
//   chessBoard[_i][_j] = 0;

//   for (var k = 0; k < count; k++) {
//     // 将可能赢的情况都减1
//     if (winPaths[_i][_j][k]) {
//       myWin[k]--;
//     }
//   }

//   // 销毁 机器人下的棋子
//   destoryPieces(_compi, _compj);

//   chessBoard[_compi][_compj] = 0;

//   for (var k = 0; k < count; k++) {
//     // 将可能赢的情况都减1
//     if (winPaths[_compi][_compj][k]) {
//       computerWin[k]--;
//       //   myWin[k] = _myWin[i]; //这个位置我可能赢
//     }
//   }
//   backChangeStyle();
// };

// // 悔棋功能 改变 样式方法
// const backChangeStyle = () => {
//   backBtn.className += " disable-btn";
//   cancelBackBtn.className = cancelBackBtn.className.split(" ")[0];
// };

// // 撤销悔棋 功能
// cancelBackBtn.onclick = () => {
//   if (
//     cancelBackBtn.className &&
//     cancelBackBtn.className.split(" ").length > 1
//   ) {
//     console.log("还未开始下棋，无法 撤销悔棋～");
//     return;
//   }

//   chessBoard[_i][_j] = 1; //我，已占位置
//   drawChess(_i, _j, self);
//   for (var k = 0; k < count; k++) {
//     if (winPaths[_i][_j][k]) {
//       myWin[k]++;
//       _computerWin[k] = computerWin[k];
//       computerWin[k] = 6; //这个位置对方不可能赢
//     }
//     if (myWin[k] == 5) {
//       titleDom.innerHTML = "Congratulations, you've won!!!";
//       isOver = true;
//     }
//   }

//   // 计算机撤销相应的悔棋
//   chessBoard[_compi][_compj] = 2; //计算机，已占位置
//   drawChess(_compi, _compj, false);
//   for (var k = 0; k < count; k++) {
//     if (winPaths[_compi][_compj][k]) {
//       computerWin[k]++;
//       _myWin[k] = myWin[k];
//       myWin[k] = 6; //这个位置对方不可能赢
//     }
//     if (computerWin[k] == 5) {
//       titleDom.innerHTML = "AI wins. Keep trying!!!";
//       isOver = true;
//     }
//   }

//   cancelBackChangeStyle();
// };

// // 撤销悔棋功能 改变 样式方法
// const cancelBackChangeStyle = () => {
//   cancelBackBtn.className += " disable-btn";
//   backBtn.className = backBtn.className.split(" ")[0];
// };

// // canvas 销毁 棋子
// const destoryPieces = (i, j) => {
//   //擦除该圆
//   context.clearRect(i * 45 + 20 - 13, j * 45 + 20 - 13, 26, 26);

//   // 重画该圆周围的格子
//   context.beginPath();
//   //   context.moveTo(20 + i * 45, j * 45);
//   //   context.lineTo(20 + i * 45, j * 45 + 45);

//   //   context.moveTo(i * 45, j * 45 + 20);
//   //   context.lineTo((i + 1) * 45, j * 45 + 20);

//   context.stroke();
//   //   context.strokeStyle = "#ccc";
// };
