import Pixmap from "./pixmap";
import AudioPlayer from "./audio-player";
import Point from "./point";
import Rect from "./rect";
import Misc from "./misc";
import Random from "./random";

//------------------------------------------------------------------------

export default class Ball1 {
  constructor() {
    this.absoluteTime = 0;

    this.position = null;
    this.direction = 0;
    this.radius = 0;
    this.speed = 0;
    this.racketRect = null;
  }

  initialise() {
    this.radius = 20;
    this.speed = 400; // 400 pixels / second
    this.restart();
  }

  restart() {
    const area = this._area;
    const min = area.top;
    const max = area.bottom;
    const y = Misc.linear(0, min, 1, max, Math.random());
    this.position = new Point(this.radius, y);
    this.direction = Misc.linear(0, -60, 1, 60, Math.random()); // -60..60 deg
  }

  setRacketRect(rect) {
    this.racketRect = rect;
  }

  get _area() {
    return Pixmap.fullScreen.inflate(-this.radius, -this.radius);
  }

  step(device, elapsedTime, input) {
    this.absoluteTime += elapsedTime;

    this.position = Point.rotatePointDeg(
      this.position,
      this.direction
      // TODO: new point?
    );

    // Collision avec la raquette.
    // TODO

    // Collision à droite ?

    // Collision à gauche ?

    // Collision en bas ?

    // Collision en haut ?
  }

  draw(device, pixmap) {
    // Draw ball.
    const rect = Rect.fromCenterSize(this.position, this.radius * 2);
    pixmap.drawIcon(device, "80x80", 0, rect, 1, 0);
  }
}
