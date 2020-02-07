import './admin-page.scss';
class Admin {
  constructor() {}

  renderMarkup() {
    return `<div class="wrapper-admin-page">
    <header class="wrapper-admin-page__header"></header>
    <aside class="wrapper-admin-page__aside"></aside>
    <main class="wrapper-admin-page__main"></main>
    </div>`;
  }
  addToScreen(container, position, element) {
    container.insertAdjacentHTML(position, element);
  }
  start(container) {
    this.addToScreen(container, 'beforeend', this.renderMarkup());
  }
}
export default Admin;
