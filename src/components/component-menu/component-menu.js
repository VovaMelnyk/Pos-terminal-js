import '@/styles/materialize/materialize';
import './component-check-style.scss';

class Menu {
  constructor() {
    this.categoriesList = [{}];
  }

  init(container) {
    this.addToScreen(container, 'beforeend', this.renderMenu());
  }

  addToScreen(container, position, element) {
    container.insertAdjacentHTML(position, element);
  }

  renderMenu() {
    return `
      <div class="menu"></div>`;
  }
}

export default Menu;
