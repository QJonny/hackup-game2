import Pixmap from "./pixmap";
import AudioPlayer from "./audio-player";
import Point from "./point";
import Rect from "./rect";
import Misc from "./misc";
import Random from "./random";

//------------------------------------------------------------------------

const BALL_COLORS = [0, 1];
const SPEED = 300;

export default class Ball1 {
  constructor() {
    this.absoluteTime = 0;

    this.position = null;
    this.direction = 0;
    this.radius = 0;
    this.speed = 0;
    this.racketRect = null;
    this.colorIndex = 0;
    this.changed = false;
  }

  initialise() {
    this.radius = 10;
    this.speed = SPEED; // pixels / second
    this.changed = false;
    this.restart();
  }

  restart() {
    const area = this._area;
    const min = area.top;
    const max = area.bottom;
    const y = Misc.linear(0, min, 1, max, Math.random());
    this.position = new Point(this.radius, y);
    this.direction = Misc.linear(0, -60, 1, 60, Math.random()); // -60..60 deg

    this.speed = SPEED;
    this.changed = false;
  }

  change() {
    if (!this.changed) {
      const min = 200;
      const max = 1000;
      this.speed = Misc.linear(0, min, 1, max, Math.random());

      this.changed = true;
    } else {
      this.speed = SPEED;
      this.changed = false;
    }
  }

  /**
   *
   * @param {Rect} rect
   */
  setRacketRect(rect) {
    this.racketRect = rect;
    this.racketHitWidth = this.racketRect.width / 4;
  }

  get _area() {
    return Pixmap.fullScreen.inflate(-this.radius, -this.radius);
  }

  step(device, elapsedTime, input) {
    this.absoluteTime += elapsedTime;

    const distance = elapsedTime * this.speed;

    this.position = Point.rotatePointDeg(
      this.position,
      this.direction,
      new Point(this.position.x + distance, this.position.y)
    );

    if (!this.tryHitRacket()) {
      const area = this._area;

      // Collision à droite ?
      if (this.position.x > area.right) {
        this.restart();
      }

      // Collision à gauche ?
      if (this.position.x < area.left) {
        this.direction = 180 - this.direction;

        const deltaPos = area.left - this.position.x;
        this.position = new Point(this.position.x + deltaPos, this.position.y);
      }

      // Collision en bas ?
      if (this.position.y > area.bottom) {
        this.direction = -this.direction;

        const deltaPos = this.position.y - area.bottom;
        this.position = new Point(this.position.x, this.position.y - deltaPos);
      }

      // Collision en haut ?
      if (this.position.y < area.top) {
        this.direction = -this.direction;

        const deltaPos = area.top - this.position.y;
        this.position = new Point(this.position.x, this.position.y + deltaPos);
      }
    }
  }

  tryHitRacket() {
    // Collision avec la raquette.
    if (
      this.position.y >= this.racketRect.top &&
      this.position.y <= this.racketRect.bottom &&
      this.position.x > this.racketRect.left &&
      this.position.x < this.racketRect.left + this.racketHitWidth
    ) {
      this.direction = 180 - this.direction;

      const deltaPos = this.position.x - this.racketRect.left;
      this.position = new Point(this.position.x - deltaPos, this.position.y);

      this.change();
      return true;
    } else if (
      this.position.y >= this.racketRect.top &&
      this.position.y <= this.racketRect.bottom &&
      this.position.x < this.racketRect.right &&
      this.position.x > this.racketRect.right - this.racketHitWidth
    ) {
      // gauche
      this.direction = 180 - this.direction;

      const deltaPos = this.racketRect.right - this.position.x;
      this.position = new Point(this.position.x + deltaPos, this.position.y);
      return true;
    } else if (
      this.position.y < this.racketRect.bottom &&
      this.position.y > this.racketRect.bottom - this.racketHitWidth &&
      this.position.x >= this.racketRect.left &&
      this.position.x <= this.racketRect.right
    ) {
      // bas
      this.direction = -this.direction;

      const deltaPos = this.position.y - area.bottom;
      this.position = new Point(this.position.x, this.position.y - deltaPos);
      return true;
    } else if (
      this.position.y > this.racketRect.top &&
      this.position.y < this.racketRect.top + this.racketHitWidth &&
      this.position.x >= this.racketRect.left &&
      this.position.x <= this.racketRect.right
    ) {
      // haut
      this.direction = -this.direction;

      const deltaPos = area.top - this.position.y;
      this.position = new Point(this.position.x, this.position.y + deltaPos);
      return true;
    }

    return false;
  }

  draw(device, pixmap) {
    // Draw ball.
    const rect = Rect.fromCenterSize(this.position, this.radius * 2);
    pixmap.drawIcon(
      device,
      "80x80",
      BALL_COLORS[this.changed ? 1 : 0],
      rect,
      1,
      0
    );
  }
}
