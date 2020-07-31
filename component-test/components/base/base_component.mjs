export class BaseComponent {
  html = ``;

  render() {
    const template = document.createElement('template');
    template.innerHTML = this.html;

    document.body.prepend(template.content);
  }
}
