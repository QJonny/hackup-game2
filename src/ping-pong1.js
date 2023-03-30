import Pixmap from "./pixmap";
import AudioPlayer from "./audio-player";
import Point from "./point";
import Rect from "./rect";
import Misc from "./misc";
import Random from "./random";

import Ball from "./ball1";
import Racket from "./racket1";

//------------------------------------------------------------------------

const NO_BALLS = 2;

export default class PingPong1 {
  constructor() {
    this.position = new Point(100, 100);
    this.direction = 30; // 30 deg
    this.radius = 20;

    this.balls = [];
    this.racket = new Racket();

    for (let i = 0; i < NO_BALLS; i++) {
      const ball = new Ball();
      ball.initialise();
      this.balls.push(ball);
    }
    this.racket.initialise();
  }

  step(device, elapsedTime, input) {
    this.racket.step(device, elapsedTime, input);

    for (let ball of this.balls) {
      ball.setRacketRect(this.racket.rect);
      ball.step(device, elapsedTime, input);
    }
  }

  draw(device, pixmap) {
    for (let ball of this.balls) {
      ball.draw(device, pixmap);
    }

    this.racket.draw(device, pixmap);
  }
}
