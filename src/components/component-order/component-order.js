import Check from '../component-check/component-check';
import Menu from '../component-menu/component-menu';
import './component-order-style.scss';

const check = new Check();
const menu = new Menu();

export const addProductItem = check.addProductItemHandleClick;

class Order {
  constructor() {}

  init(container) {
    this.addToScreen(container, 'beforeend', this.renderOrder());

    this.initializationCheckAndMenuComponents();
  }

  addToScreen(container, position, element) {
    container.insertAdjacentHTML(position, element);
  }

  renderOrder() {
    return `
      <div class="order"></div>`;
  }

  initializationCheckAndMenuComponents() {
    const order = document.querySelector('.order');

    check.init(order);
    menu.init(order);
  }
}

export default Order;
