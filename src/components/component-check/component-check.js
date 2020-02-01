import '@/styles/materialize/materialize';
import './component-check-style.scss';

class Check {
  constructor() {
    this.list = [
      {
        id: Date.now(),
        title: 'Кaльмар',
        quantity: 1,
        price: 40,
      },
      {
        id: Date.now(),
        title: 'Cок',
        quantity: 1,
        price: 20,
      },
    ];
  }

  init(container) {
    this.addToScreen(container, 'beforeend', this.renderCheck());
  }

  renderCheck() {
    return `
      <div class="check">
        ${this.renderList()}
      </div>`;
  }

  renderList() {
    return `
      <div class="food-list">
        <table>
          <thead>
            <tr>
              <th>Наименование</th>
              <th>Кол-во</th>
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
              <td>${title}</td>
              <td>${quantity}</td>
              <td>${price.toFixed(2)}</td>
              <td>${this.countingAmount(quantity, price)}</td>
            </tr>
          `;
  }

  addToScreen(container, position, element) {
    container.insertAdjacentHTML(position, element);
  }

  countingAmount(quantity, price) {
    const total = Math.floor(quantity * price).toFixed(2);

    return total;
  }
}

export default Check;
