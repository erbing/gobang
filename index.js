// import "./assets/main.less";

class init {
  constructor() {
    this.titleDom = ""; // title 的 dom
    this.startBtn = ""; // start btn 的 dom
    this.backBtn = ""; // 悔棋的 dom
    this.cancelBackBtn = ""; // 撤销悔棋的 dom
    this.canvas = ""; // canvas 的dom
    this.context = {}; // canvas 上下文对象
  }

  // 获取 Dom 元素
  getDomFun(id) {
    return document.getElementById(id);
  }

  // 改变样式
  backChangeStyle() {
    this.backBtn.className += " disable-btn";
    this.cancelBackBtn.className = this.cancelBackBtn.className.split(" ")[0];
  }
  // 改变样式
  cancelBackChangeStyle() {
    this.cancelBackBtn.className += " disable-btn";
    this.backBtn.className = this.backBtn.className.split(" ")[0];
  }

  initDom() {
    this.titleDom = this.getDomFun("title");
    this.startBtn = this.getDomFun("start");
    this.backBtn = this.getDomFun("back");
    this.cancelBackBtn = this.getDomFun("cancelBack");
    this.canvas = this.getDomFun("canvas");
    this.context = canvas.getContext("2d");
  }
}

export default class goBang extends init {
  constructor() {
    super();
    this.board = 10;
    this.chessBoard = [];
    this.winPaths = [];
    this.count = 0; // 所有赢法的数据统计
    this.isOver = false; // 是否已经结束
    this.myWin = [];
    this._myWin = [];
    this.otherWin = [];
    this.computerWin = [];
    this._computerWin = [];
    this.repeatPosition = false; // 是否重复上一步

    this._i = "";
    this._j = "";
    this._compi = 0;
    this._compj = 0;

    this.isBack = false;
    this.self = true;
  }

  addMethers() {
    this.canvas.addEventListener("click", e => {
      this.chessClick(e);
    });
    this.backBtn.addEventListener("click", () => {
      this.chessback();
    });
    this.cancelBackBtn.addEventListener("click", () => {
      this.chessCancleBack();
    });
    this.startBtn.addEventListener("click", () => {
      location.reload();
    });
  }

  // 获取 棋盘中的每个点
  getChessBoard() {
    let temArr = [];
    for (let i = 0; i < 10; i++) {
      temArr[i] = [];
      for (let j = 0; j < 10; j++) {
        temArr[i][j] = 0;
      }
    }
    this.chessBoard = temArr;
  }

  // 画棋子
  drawChess(i, j, self) {
    this.context.beginPath();
    this.context.arc(20 + i * 45, 20 + j * 45, 13, 0, 2 * Math.PI); //画圆
    this.context.closePath();
    //渐变
    let gradient = this.context.createRadialGradient(
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
    this.context.fillStyle = gradient;
    this.context.fill();
  }

  //赢法数组、赢法种类、赢法数目
  getWinPaths() {
    let winPaths = [];
    let count = 0;
    for (let i = 0; i < 10; i++) {
      winPaths[i] = [];
      for (let j = 0; j < 10; j++) {
        winPaths[i][j] = [];
      }
    }

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

    // 竖向能赢的方法
    for (var i = 0; i < 10; i++) {
      for (var j = 0; j < 6; j++) {
        // debugger;
        for (var k = 0; k < 5; k++) {
          winPaths[j + k][i][count] = true;
        }
        count++;
      }
    }

    // 正斜着 能赢的方法
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 6; j++) {
        // debugger;
        for (var k = 0; k < 5; k++) {
          winPaths[i + k][j + k][count] = true;
        }
        count++;
      }
    }

    // 反斜着 能赢的方法
    for (var i = 0; i < 6; i++) {
      for (var j = 9; j > 3; j--) {
        for (var k = 0; k < 5; k++) {
          winPaths[i + k][j - k][count] = true;
        }
        count++;
      }
    }

    this.count = count;
    this.winPaths = winPaths;

    for (let i = 0; i < count; i++) {
      this.myWin[i] = 0;
      this.otherWin[i] = 0;
      this.computerWin[i] = 0;
      this._myWin[i] = 0;
      this._computerWin[i] = 0;
    }
  }

  chessClick(e) {
    if (this.isOver) return;
    this.cancelBackChangeStyle();
    this.startBtn.innerHTML = "reStart";

    let x = e.offsetX;
    let y = e.offsetY;

    this.i = Math.floor(x / 45);
    this.j = Math.floor(y / 45);

    if (this._i === this.i && this._j === this.j) {
      // 说明重复的下在了原来的位置
      this.repeatPosition = true;
    }

    this._i = this.i;
    this._j = this.j;

    if (this.chessBoard[this.i][this.j] == 0) {
      this.drawChess(this.i, this.j, this.self);
      if (this.self) {
        this.chessBoard[this.i][this.j] = 1;
      } else {
        this.chessBoard[this.i][this.j] = 2;
      }

      //落下子后需要进行统计
      for (var k = 0; k < this.count; k++) {
        if (this.winPaths[this.i][this.j][k]) {
          //某种赢的某子true
          // 下面注释的是同 非机器人 下棋的模式需要的
          if (this.self) {
            this.myWin[k]++;
            this._computerWin[k] = this.computerWin[k]; // 为悔棋做准备
          } else {
            this.otherWin[k]++;
          }

          //离胜利又进一步
          this.computerWin[k] = 6; //该种赢法计算机没有机会了

          if (this.myWin[k] == 5) {
            //如果 我能 达到5就赢了
            this.titleDom.innerHTML = "Congratulations, you've won!!!";
            this.isOver = true;
            break;
          }

          if (this.otherWin[k] == 5) {
            //如果 对手 达到5就赢了
            this.titleDom.innerHTML = "Congratulations, you've won!!!";
            this.isOver = true;
            break;
          }
        }
      }
      this.self = !this.self;
      if (!this.isOver) {
        this.self = !this.self;
        this.computerAI();
      }
    }
  }

  // 计算机下棋
  computerAI() {
    var myScore = [];
    var computerScore = [];
    var max = 0;
    var u = 0,
      v = 0;
    for (var i = 0; i < 9; i++) {
      myScore[i] = [];
      computerScore[i] = [];
      for (var j = 0; j < 9; j++) {
        myScore[i][j] = 0;
        computerScore[i][j] = 0;
      }
    }
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        if (this.chessBoard[i][j] == 0) {
          for (var k = 0; k < this.count; k++) {
            if (this.winPaths[i][j][k]) {
              if (this.myWin[k] == 1) {
                myScore[i][j] += 200;
              } else if (this.myWin[k] == 2) {
                myScore[i][j] += 400;
              } else if (this.myWin[k] == 3) {
                myScore[i][j] += 2000;
              } else if (this.myWin[k] == 4) {
                myScore[i][j] += 10000;
              }

              if (this.computerWin[k] == 1) {
                computerScore[i][j] += 220;
              } else if (this.computerWin[k] == 2) {
                computerScore[i][j] += 420;
              } else if (this.computerWin[k] == 3) {
                computerScore[i][j] += 2100;
              } else if (this.computerWin[k] == 4) {
                computerScore[i][j] += 20000;
              }
            }
          }

          if (myScore[i][j] > max) {
            max = myScore[i][j];
            u = i;
            v = j;
          } else if (myScore[i][j] == max) {
            if (computerScore[i][j] > computerScore[u][v]) {
              u = i;
              v = j;
            }
          }

          if (computerScore[i][j] > max) {
            max = computerScore[i][j];
            u = i;
            v = j;
          } else if (computerScore[i][j] == max) {
            if (myScore[i][j] > myScore[u][v]) {
              u = i;
              v = j;
            }
          }
        }
      }
    }

    // 处理悔棋
    if (this.repeatPosition) {
      u = this._compi;
      v = this._compj;
      this.repeatPosition = false;
    }

    this._compi = u;
    this._compj = v;

    this.drawChess(u, v, false);

    this.chessBoard[u][v] = 2; //计算机占据位置

    for (var k = 0; k < this.count; k++) {
      if (this.winPaths[u][v][k]) {
        this.computerWin[k]++;
        this._myWin[k] = this.myWin[k];
        this.myWin[k] = 6; //这个位置对方不可能赢了
        if (this.computerWin[k] == 5) {
          this.titleDom.innerHTML = "AI wins. Keep trying!!!";
          this.isOver = true;
        }
      }
    }
    if (!this.isOver) {
      console.log(123);
    }
  }

  // 悔棋功能
  chessback() {
    // 销毁 我自己下的棋
    if (
      this.backBtn.className &&
      this.backBtn.className.split(" ").length > 1
    ) {
      console.log("还未开始下棋，无法悔棋～");
      return;
    }

    if (this.isOver) {
      this.titleDom.innerHTML = "GoBang";
    }
    this.isOver = false;

    this.destoryPieces(this._i, this._j);
    this.chessBoard[this._i][this._j] = 0;

    for (var k = 0; k < this.count; k++) {
      // 将可能赢的情况都减1
      if (this.winPaths[this._i][this._j][k]) {
        this.myWin[k]--;
      }
    }

    // 销毁 机器人下的棋子
    this.destoryPieces(this._compi, this._compj);
    this.chessBoard[this._compi][this._compj] = 0;

    for (var k = 0; k < this.count; k++) {
      // 将可能赢的情况都减1
      if (this.winPaths[this._compi][this._compj][k]) {
        this.computerWin[k]--;
      }
    }

    this.backChangeStyle();
  }

  // 撤销悔棋 功能
  chessCancleBack() {
    if (
      this.cancelBackBtn.className &&
      this.cancelBackBtn.className.split(" ").length > 1
    ) {
      console.log("还未开始下棋，无法 撤销悔棋～");
      return;
    }

    this.chessBoard[this._i][this._j] = 1; //我，已占位置
    this.drawChess(this._i, this._j, this.self);
    for (var k = 0; k < this.count; k++) {
      if (this.winPaths[this._i][this._j][k]) {
        this.myWin[k]++;
        this._computerWin[k] = this.computerWin[k];
        this.computerWin[k] = 6; //这个位置对方不可能赢
      }
      if (this.myWin[k] == 5) {
        this.titleDom.innerHTML = "Congratulations, you've won!!!";
        this.isOver = true;
      }
    }

    // 计算机撤销相应的悔棋
    this.chessBoard[this._compi][this._compj] = 2; //计算机，已占位置
    this.drawChess(this._compi, this._compj, false);
    for (var k = 0; k < this.count; k++) {
      if (this.winPaths[this._compi][this._compj][k]) {
        this.computerWin[k]++;
        this._myWin[k] = this.myWin[k];
        this.myWin[k] = 6; //这个位置对方不可能赢
      }
      if (this.computerWin[k] == 5) {
        this.titleDom.innerHTML = "AI wins. Keep trying!!!";
        this.isOver = true;
      }
    }

    this.cancelBackChangeStyle();
  }

  // 销毁 canvas 中棋子的样式
  destoryPieces(i, j) {
    //擦除该圆
    this.context.clearRect(i * 45 + 20 - 13, j * 45 + 20 - 13, 26, 26);

    // 重画该圆周围的格子
    this.context.beginPath();
    // this.context.moveTo(20 + i * 45, j * 45);
    // this.context.lineTo(20 + i * 45, j * 45 + 45);

    // this.context.moveTo(i * 45, j * 45 + 20);
    // this.context.lineTo((i + 1) * 45, j * 45 + 20);
    this.context.stroke();
    // this.context.strokeStyle = "#ccc";
  }

  // 画棋盘 canvas 的 方式画棋盘
  drawChessBoard() {
    //   for (var i = 0; i < 10; i++) {
    //     context.moveTo(20 + i * 45, 20);
    //     context.lineTo(20 + i * 45, 20 + 45 * 9);
    //     context.stroke();
    //     context.moveTo(20, 20 + i * 45);
    //     context.lineTo(20 + 45 * 9, 20 + i * 45);
    //     context.stroke();
    //     context.strokeStyle = "#ccc";
    //   }
  }

  init() {
    // 初始化 Dom
    this.initDom();
    // 初始化监听方法绑定
    this.addMethers();
    // 初始化 棋盘
    this.drawChessBoard();
    // 获取棋盘上的每个点
    this.getChessBoard();
    // 初始化 赢法数组、赢法种类、赢法数目
    this.getWinPaths();

    if (!this.isBack) {
      this.cancelBackBtn.className += " disable-btn";
      this.backBtn.className += " disable-btn";
    }
  }
}
