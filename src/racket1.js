import Pixmap from "./pixmap";
import AudioPlayer from "./audio-player";
import Point from "./point";
import Rect from "./rect";
import Misc from "./misc";
import Random from "./random";

//------------------------------------------------------------------------

export default class Racket1 {
  constructor() {
    this.size = 60; // px
    this.speed = 700; // px/s
    this.position = new Point(0, 0);
  }

  initialise() {
    const area = Pixmap.fullScreen;
    this.position = new Point(
      area.right - this.size / 2,
      (area.top + area.bottom) / 2
    );
  }

  isArrowUp(input) {
    return input.keysDown.has("ArrowUp");
  }
  isArrowDown(input) {
    return input.keysDown.has("ArrowDown");
  }

  isArrowLeft(input) {
    return input.keysDown.has("ArrowLeft");
  }
  isArrowRight(input) {
    return input.keysDown.has("ArrowRight");
  }

  step(device, elapsedTime, input) {
    let deltaY = 0;
    let deltaX = 0;

    if (this.isArrowUp(input)) {
      deltaY -= this.speed * elapsedTime;
    }
    if (this.isArrowDown(input)) {
      deltaY += this.speed * elapsedTime;
    }
    if (this.isArrowLeft(input)) {
      deltaX -= this.speed * elapsedTime;
    }
    if (this.isArrowRight(input)) {
      deltaX += this.speed * elapsedTime;
    }

    const newY = this.position.y + deltaY;
    const newX = this.position.x + deltaX;

    const area = Pixmap.fullScreen;
    const radius = this.size / 2;

    this.position = new Point(newX, newY);

    if (newY - radius < area.top) {
      this.position = new Point(this.position.x, area.top + radius);
    } else if (newY + radius > area.bottom) {
      this.position = new Point(this.position.x, area.bottom - radius);
    }
    if (newX - radius < area.left) {
      this.position = new Point(area.left + radius, this.position.y);
    } else if (newX + radius > area.right) {
      this.position = new Point(area.right - radius, this.position.y);
    }
  }

  /**
   *
   * @param {*} device
   * @param {Pixmap} pixmap
   */
  draw(device, pixmap) {
    const rect = Rect.fromCenterSize(this.position, this.size);
    pixmap.drawIcon(device, "80x80", 8, rect, 1, 0);
  }

  get rect() {
    return new Rect(
      this.position.x - this.size / 2,
      this.position.y - this.size / 2,
      this.size,
      this.size
    );
  }
}
