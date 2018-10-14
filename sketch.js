let grid = [];
let rows = 4;
let cols = 4;
let w;
let score = 0;
let scoreDisp = 0;

function setup() {
  createCanvas(610, 700);
  w = (width - 10) / rows;

  for (let i = 0; i < cols; i++) {
    grid[i] = [];
  }
  textFont('Clear Sans');
  addCell();
  addCell();

}

function draw() {
  background(249,249,238);
  fill(187, 173, 158);
  rect(0, 0, 610, 610, 5);
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
  if(mouseX > width - 75 && mouseX < width - 10
    && mouseY > height - 65  && mouseY < height - 20 ) {
    fill(143,123,100, 100);
    document.body.style.cursor = "pointer";
  } else {
    fill(143,123,100);
    document.body.style.cursor = "default";
  }
  noStroke();
  rect(width - 75, height - 65, 70, 40, 5);
  textSize(w/8);
  textAlign(CENTER, CENTER);
  fill(249,246,241);
  text("RESET", width-73, height-65, 70, 40);

  if(scoreDisp != score) {
    scoreDisp++;
  }
  textSize(w/4);
  fill(119,110,100);
  text("Score: " + scoreDisp, 100, height - 50);
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
      }score
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

function mouseClicked() {
  if(mouseX > width - 75 && mouseX < width - 10
    && mouseY > height - 65  && mouseY < height - 20 ) {
    console.log("reset");
    reset();
  }
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
