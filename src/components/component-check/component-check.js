import '@/styles/materialize/materialize';
import M from 'materialize-css';
import './component-check-style.scss';

class Check {
  constructor() {
    this.value = 1;
    this.list = [
      {
        id: Date.now(),
        title: 'Кaльмар',
        quantity: 1,
        price: 38.0,
      },
      {
        id: Date.now(),
        title: 'Пиво',
        quantity: 1,
        price: 58.0,
      },
      {
        id: Date.now(),
        title: 'Орешки',
        quantity: 1,
        price: 20.5,
      },
    ];
  }

  init(container) {
    this.addToScreen(container, 'beforeend', this.renderCheck());

    this.initDropdown();
    this.addListenerOnListItems();

    this.initCommentModal();
    this.addListenerOnDropdown();

    this.addListenerCommentDone();
  }

  renderCheck() {
    return `
      <div class="check">
        ${this.renderList()}
        ${this.renderComments()}
        ${this.renderSummary()}
        ${this.renderCheckButtons()}
        ${this.renderCommentModal()}
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
              <td class="quantity">
                <div class="counter">
                  <button class="decrement" data-action="decrement">&ndash;</button>
                    <span data-action="quantity">${quantity}</span>
                  <button class="increment" data-action="increment">+</button>
                </div>
              </td>
              <td>${price.toFixed(2)}</td>
              <td class="total">${this.countingAmount(quantity, price)}</td>
            </tr>
          `;
  }

  renderComments() {
    return `
      <div class="comment none">
        <span class="comment__span bold">Комментарий:</span>
        <p class="comment__text"></p>
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
        <li><a class="waves-effect waves-light modal-trigger" href="#modal1">Комментарий к чеку...</a></li>
        <li><a href="#!">Очистить заказ</a></li>
      </ul>
    `;
  }

  renderCommentModal() {
    return `
      <div id="modal1" class="modal">
        <div class="modal-content">
          <div class="row">
            <form class="col s12">
              <div class="row">
                <div class="input-field col s12">
                  <textarea id="textarea1" class="materialize-textarea"></textarea>
                  <label for="textarea1">Комментарий к чеку...</label>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="modal-footer">
          <button class="modal-close waves-effect waves-green btn" data-action="done">Готово</button>
          <button class="modal-close waves-effect waves-green btn-flat">Отменить</button>
        </div>
      </div>
    `;
  }

  initDropdown() {
    document.addEventListener('DOMContentLoaded', () => {
      const elems = document.querySelectorAll('.dropdown-trigger');
      const options = {
        constrainWidth: false,
      };

      M.Dropdown.init(elems, options);
    });
  }

  initCommentModal() {
    document.addEventListener('DOMContentLoaded', function() {
      const elems = document.querySelectorAll('.modal');
      const options = {
        dismissible: false,
      };
      M.Modal.init(elems, options);
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

  addListenerOnListItems() {
    const list = document.querySelector('.food-list');

    list.addEventListener(
      'click',
      this.incrementAndDecrementHandleClick.bind(this),
    );
  }

  incrementAndDecrementHandleClick(e) {
    if (e.target.tagName !== 'BUTTON') {
      return;
    }
    console.log(e.target.parentNode.children[1].textContent);
    if (e.target.dataset.action === 'increment') {
      let value1 = Number(e.target.parentNode.children[1].textContent);
      e.target.addEventListener('click', () => {
        let test = value1;
        test++;

        e.target.parentNode.children[1].textContent = test;
      });
    } else if (e.target.dataset.action === 'decrement') {
      let value2 = Number(e.target.parentNode.children[1].textContent);
      e.target.addEventListener('click', () => {
        let test = value2;
        test--;

        e.target.parentNode.children[1].textContent = test;
      });
    }
  }

  addListenerCommentDone() {
    const btnDone = document.querySelector('button[data-action="done"]');

    btnDone.addEventListener(
      'click',
      this.addCommentToScreenHandleClick.bind(this),
    );
  }

  addCommentToScreenHandleClick() {
    const textInput = document.querySelector('textarea');
    const comment = document.querySelector('.comment');
    const textComment = document.querySelector('.comment__text');

    if (textInput.value.trim() === '') {
      textComment.textContent = '';
      comment.classList.add('none');
      return;
    }

    textComment.textContent = textInput.value;
    comment.classList.remove('none');
  }

  clearOrder() {
    const listItems = document.querySelector('tbody');
    const textInput = document.querySelector('textarea');
    const comment = document.querySelector('.comment');

    const result__value = document.querySelector('.result__value');
    const total__value = document.querySelector('.total__value');

    listItems.innerHTML = '';
    result__value.textContent = `0.00 ₴`;
    total__value.textContent = `0.00 ₴`;
    comment.classList.add('none');
    textInput.value = '';
  }

  addListenerOnDropdown() {
    const dropdownList = document.querySelector('#dropdown1');

    dropdownList.addEventListener(
      'click',
      this.dropdownHandlerClick.bind(this),
    );
  }

  dropdownHandlerClick(e) {
    if (e.target.tagName !== 'A') {
      return;
    }

    if (e.target.text === 'Очистить заказ') {
      this.clearOrder();
    }
  }
}

export default Check;
