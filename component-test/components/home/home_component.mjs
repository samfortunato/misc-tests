import { BaseComponent } from "../base/base_component.mjs";

class HomeComponent extends BaseComponent {
  constructor() {
    super();
    this.name = 'Test Name';

    this.html = `
      <h1>Test</h1>
      <p>Your name: ${this.name}</p>

      <a href="../video/video.html">Video Page</a>
    `;
  }
}

new HomeComponent().render();
