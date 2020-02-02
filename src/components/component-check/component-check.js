import '@/styles/materialize/materialize';
import M from 'materialize-css';
import './component-check-style.scss';

class Check {
  constructor() {
    this.list = [
      {
        id: Date.now(),
        title: 'Кaльмар',
        quantity: 1,
        price: 26.96,
      },
      {
        id: Date.now(),
        title: 'Cок',
        quantity: 4,
        price: 20,
      },
      {
        id: Date.now(),
        title: 'Салат',
        quantity: 3,
        price: 50.15,
      },
    ];
  }

  init(container) {
    this.addToScreen(container, 'beforeend', this.renderCheck());

    this.initDropdown();
  }

  renderCheck() {
    return `
      <div class="check">
        ${this.renderList()}
        ${this.renderComments()}
        ${this.renderSummary()}
        ${this.renderCheckButtons()}
      </div>`;
  }

  renderList() {
    return `
      <div class="food-list">
        <table>
          <thead>
            <tr>
              <th class="title">Наименование</th>
              <th class="quantity">Кол-во</th>
              <th>Цена</th>
              <th>Итого</th>
            </tr>
          </thead>
          <tbody>
            ${this.list.reduce((acc, el) => this.renderListItem(el) + acc, '')}
          </tbody>
        </table>
      </div>`;
  }

  renderListItem({ title, quantity, price }) {
    return `<tr class="food-list__item">
              <td class="title">${title}</td>
              <td class="quantity">${quantity}</td>
              <td>${price.toFixed(2)}</td>
              <td class="total">${this.countingAmount(quantity, price)}</td>
            </tr>
          `;
  }

  renderComments() {
    return `
      <div class="comment">
        <p><span class="bold">Комментарий:</span> 1111</p>
      </div>`;
  }

  renderSummary() {
    return `
      <div class="summary">
        <div class="btn-wrapper">
          <button class="btn summary-btn">Email, SMS</button>
        </div>
        <div class="total-wrapper">
          <div class="calculate">
            <div class="result">
              <p class="result__title">Итого</p>
              <p class="result__value">${this.totalAmount()} &#8372</p>
            </div>
            <div class="bonus">
              <p class="bonus__title">Бонусы</p>
              <p class="bonus__value">&ndash;</p>
            </div>
          </div>
          <div class="total">
            <p class="total__title">К оплате</p>
            <p class="total__value">${this.totalAmount()} &#8372</p>
          </div>
        </div>
      </div>
    `;
  }

  renderCheckButtons() {
    return `
      <div class="check-buttons">
        <button class="dropdown-trigger btn more" data-target='dropdown1'>
          <i class="material-icons">more_horiz</i>
        </button>
        ${this.renderDropdownMenu()}
        <button class="btn pay">Оплатить</button>
      </div>`;
  }

  renderDropdownMenu() {
    return `
      <ul id='dropdown1' class='dropdown-content'>
        <li><a href="#!">Комментарий к чеку...</a></li>
        <li><a href="#!">Очистить заказ</a></li>
      </ul>
    `;
  }

  initDropdown() {
    document.addEventListener('DOMContentLoaded', () => {
      const elems = document.querySelectorAll('.dropdown-trigger');
      const options = {
        closeOnClick: false,
        constrainWidth: false,
      };

      M.Dropdown.init(elems, options);
    });
  }

  addToScreen(container, position, element) {
    container.insertAdjacentHTML(position, element);
  }

  countingAmount(quantity, price) {
    const total = (quantity * price).toFixed(2);

    return total;
  }

  totalAmount() {
    return this.list
      .reduce(
        (acc, el) => Number(this.countingAmount(el.quantity, el.price)) + acc,
        0,
      )
      .toFixed(2);
  }


}

export default Check;
