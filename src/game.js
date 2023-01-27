import Pixmap from "./pixmap";
import AudioPlayer from "./audio-player";
import Point from "./point";
import Rect from "./rect";
import Misc from "./misc";
import Random from "./random";
import PingPong1 from "./ping-pong1";

//------------------------------------------------------------------------

export default class Game {
  constructor() {
    this.audio = new AudioPlayer();
    this.pixmap = new Pixmap();

    this.mouseTouch = true; // hide mouse cursor by default
    this.mouseDown = false;
    this.mouseUp = false;
    this.mousePos = new Point(0, 0);
    this.keysDown = new Map();

    this.pingPong1 = new PingPong1();
  }

  //------------------------------------------------------------------------

  setMouseTouch(touch) {
    this.mouseTouch = touch;
  }

  // Time are in seconds.
  update(device, elapsedTime) {
    const input = {
      pos: this.mousePos,
      isDown: this.mouseDown,
      isTouch: this.mouseTouch,
      keysDown: this.keysDown,
    };

    if (this.mouseUp) {
      // Clears these events when they have been processed.
      // This allows a very short down/up click are always done!
      this.mouseDown = false;
      this.mouseUp = false;
    }

    this._step(device, elapsedTime, input);
    this._draw(device);
  }

  //------------------------------------------------------------------------

  _step(device, elapsedTime, input) {
    this.pingPong1.step(device, elapsedTime, input);
  }

  _draw(device) {
    // Draw grey background.
    const area = Pixmap.fullScreen;
    this.pixmap.drawIcon(device, "80x80", 7, area, 1, 0);

    this.pingPong1.draw(device, this.pixmap);
  }
}
