import { BaseComponent } from "../base/base_component.mjs";

class VideoComponent extends BaseComponent {
  constructor() {
    super();

    this.video = 'Video';

    this.html = `
      <p>${this.video}</p>

      <a href="../home/home.html">Back to Home</a>
    `;
  }
}

new VideoComponent().render();
