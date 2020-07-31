document.addEventListener('DOMContentLoaded', (evt) => {
  console.log(evt);
  console.log('dom content loaded');
});

function createHtml() {
  document.body.innerHTML = `
    <div>
      sup
    </div>
  `;
}

createHtml();
