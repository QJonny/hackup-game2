import Pixmap from "./pixmap";
import AudioPlayer from "./audio-player";
import Point from "./point";
import Rect from "./rect";
import Misc from "./misc";
import Random from "./random";

//------------------------------------------------------------------------

export default class Racket1 {
  constructor() {
    // TODO
  }

  initialise() {
    // TODO
  }

  isArrowUp(input) {
    return input.keysDown.has("ArrowUp");
  }
  isArrowDown(input) {
    return input.keysDown.has("ArrowDown");
  }

  step(device, elapsedTime, input) {
    // TODO
  }

  draw(device, pixmap) {
    // TODO
  }
}
