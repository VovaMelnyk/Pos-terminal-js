import './admin-page.scss';
import menuAdmin from '../menu/menu';
class Admin {
  constructor() {}

  renderMarkup() {
    return `<div class="wrapper-admin-page">
    <aside class="wrapper-admin-page__aside"></aside>
    <main class="wrapper-admin-page__main"></main>
    </div>`;
  }
  addToScreen = (container, position, element) => {
    container.insertAdjacentHTML(position, element);
  };
  start = container => {
    this.addToScreen(container, 'beforeend', this.renderMarkup());
    const aside = document.querySelector('.wrapper-admin-page__aside');
    new menuAdmin().start(aside);
  };
}
export default Admin;
// <header class="wrapper-admin-page__header"></header>
