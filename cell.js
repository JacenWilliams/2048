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
