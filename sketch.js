let grid = [];
let rows = 4;
let cols = 4;
let w;
let score = 0;
let resetButton;

function setup() {
  createCanvas(610, 700);
  w = (width - 10) / rows;

  for (let i = 0; i < cols; i++) {
    grid[i] = [];
  }

  resetButton = createButton("Reset");
  resetButton.position(width - 75, height - 55);
  resetButton.mousePressed(reset);

  addCell();
  addCell();

}

function draw() {
  background(205);
  fill(187, 173, 158);
  rect(0, 0, 610, 610);
  let stopped = true;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      fill(205, 193, 178);
      stroke(187, 173, 158);
      strokeWeight(5);
      rect(i * w + 10, j * w + 10, w - 10, w - 10, 10);
    }
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j] != undefined) {
        grid[i][j].show();
        grid[i][j].merged = false;
        if(Math.abs(grid[i][j].x - grid[i][j].x2) > 0.1 || Math.abs(grid[i][j].y - grid[i][j].y2) > 0.1) {
          stopped = false;
        }
      }
    }
  }

  if(stopped) {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (grid[i][j] != undefined) {
          grid[i][j].new = false;
        }
      }
    }
  }
}

function addCell() {
  let emptyCells = [];

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j] == null) {
        emptyCells.push({
          x: i,
          y: j
        });
      }
    }
  }

  let newCell = random(emptyCells);
  if (newCell != null) {
    grid[newCell.x][newCell.y] = new cell(newCell.x, newCell.y);
  }

  //console.log(grid[newCell.x][newCell.y]);
}

function moveLeft() {
  let moved = false;

  for (let k = 1; k < cols; k++) {
    for (let i = 1; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (grid[i][j] != null) {
          if (grid[i - 1][j] == null) {
            grid[i - 1][j] = grid[i][j];
            grid[i - 1][j].x2 = i - 1;
            grid[i][j] = undefined;
            moved = true;
          } else if (grid[i - 1][j].value == grid[i][j].value &&
            !grid[i - 1][j].merged && !grid[i][j].merged) {
            grid[i][j].merge(grid[i - 1][j]);
            grid[i - 1][j] = grid[i][j];
            grid[i - 1][j].x2 = i - 1;
            grid[i][j] = undefined;
            moved = true;
          }
        }
      }
    }
  }

  return moved;
}

function moveRight() {
  let moved = false;

  for (let k = 1; k < rows; k++) {
    for (let i = cols - 2; i >= 0; i--) {
      for (let j = rows - 1; j >= 0; j--) {
        if (grid[i][j] != null) {
          if (grid[i + 1][j] == null) {
            grid[i + 1][j] = grid[i][j];
            grid[i + 1][j].x2 = i + 1;
            grid[i][j] = undefined;
            moved = true;
          } else if (grid[i + 1][j].value == grid[i][j].value &&
            !grid[i + 1][j].merged && !grid[i][j].merged) {
            grid[i][j].merge(grid[i + 1][j]);
            grid[i + 1][j] = grid[i][j];
            grid[i + 1][j].x2 = i + 1;
            grid[i][j] = undefined;
            moved = true;
          }
        }
      }
    }
  }

  return moved;
}

function moveUp() {
  let moved = false;

  for (let k = 1; k < cols; k++) {
    for (let j = 1; j < cols; j++) {
      for (let i = 0; i < rows; i++) {
        if (grid[i][j] != null) {
          if (grid[i][j - 1] == null) {
            grid[i][j - 1] = grid[i][j];
            grid[i][j - 1].y2 = j - 1;
            grid[i][j] = undefined;
            moved = true;
          } else if (grid[i][j - 1].value == grid[i][j].value &&
            !grid[i][j - 1].merged &&
            !grid[i][j].merged) {
            grid[i][j].merge(grid[i][j-1]);
            grid[i][j - 1] = grid[i][j];
            grid[i][j - 1].y2 = j - 1;
            grid[i][j] = undefined;
            moved = true;
          }
        }
      }
    }
  }

  return moved;
}

function moveDown() {
  let moved = false;

  for (let k = 1; k < rows; k++) {
    for (let j = rows - 2; j >= 0; j--) {
      for (let i = cols - 1; i >= 0; i--) {
        if (grid[i][j] != null) {
          if (grid[i][j + 1] == null) {
            grid[i][j + 1] = grid[i][j];
            grid[i][j + 1].y2 = j + 1;
            grid[i][j] = undefined;
            moved = true;
          } else if (grid[i][j + 1].value == grid[i][j].value &&
            !grid[i][j + 1].merged && !grid[i][j].merged) {
            grid[i][j].merge(grid[i][j+1]);
            grid[i][j + 1] = grid[i][j];
            grid[i][j + 1].y2 = j + 1;
            grid[i][j] = undefined;
            moved = true;
          }
        }
      }
    }
  }

  return moved;
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    let moved = moveLeft();
    if (moved) addCell();
  } else if (keyCode === RIGHT_ARROW) {
    let moved = moveRight();
    if (moved) addCell();
  } else if (keyCode === UP_ARROW) {
    let moved = moveUp();
    if (moved) addCell();
  } else if (keyCode === DOWN_ARROW) {
    let moved = moveDown();
    if (moved) addCell();
  }
}

function reset() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = undefined;

    }
  }

  addCell();
  addCell();
  score = 0;
}

class cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.x2 = x;
    this.y2 = y;
    this.merged = false;
    this.new = true;
    if (random() >= 0.9) {
      this.value = 4;
    } else {
      this.value = 2;
    }
  }

  show() {
      if (this.value == 2) {
        fill(238, 228, 216);
      } else if (this.value == 4) {
        fill(236, 226, 197);
      } else if (this.value == 8) {
        fill(248, 177, 114);
      } else if (this.value == 16) {
        fill(255, 143, 90);
      } else if (this.value == 32) {
        fill(255, 109, 86);
      } else if (this.value == 64) {
        fill(255, 67, 42);
      } else if (this.value == 128) {
        fill(234, 216, 106);
      } else {
        fill(234, 214, 88);
      }
      noStroke();
      this.x = lerp(this.x, this.x2, 0.15);
      this.y = lerp(this.y, this.y2, 0.15);
      if((Math.abs(this.x - this.x2)) < 0.001) {
        this.x = this.x2;
      }

      if((Math.abs(this.y - this.y2)) < 0.001) {
        this.y = this.y2;
      }

      if(!this.new) {
        rect(this.x * w + 10, this.y * w + 10, w - 10, w - 10, 10);
        fill(255);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(60);
        text(this.value, ((this.x * w) + w / 2 + 5), ((this.y * w) + w / 2 + 5));
      }
  }

  merge(other) {
    this.value += other.value;
    this.merged = true;
  }
}
