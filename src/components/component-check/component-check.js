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
        price: 120.5,
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

    this.addListenerOnPayment();
    //--------------------FOR TEST-------------------------------------------
    this.addListenerOnAddedItem();
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
              <th class="list-title">Наименование</th>
              <th class="list-quantity">Кол-во</th>
              <th class="list-price">Цена</th>
              <th class="list-total">Итого</th>
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
              <td class="item-title">${title}</td>
              <td class="item-quantity">
                <div class="counter">
                  <button class="decrement" data-action="decrement">&ndash;</button>
                    <span data-action="quantity">${quantity}</span>
                  <button class="increment" data-action="increment">+</button>
                </div>
              </td>
              <td class="item-price">${price.toFixed(2)}</td>
              <td class="item-total">${this.countingAmount(
                quantity,
                price,
              )}</td>
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
          <button class="btn summary-btn" data-action="add">Email, SMS</button>
        </div>
        <div class="guests-amount">
          <p class="guests-amount__value">Количество гостей:  <span class="bold" data-action="guests">4</span></p>
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
        <button class="btn pay" data-action="payment">Оплатить</button>
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

  totalSummaryAmount() {
    const allTotal = document.querySelectorAll('.item-total');

    return [...allTotal]
      .reduce((acc, el) => Number(el.textContent) + acc, 0)
      .toFixed(2);
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

    const btnDataset = e.target.dataset.action;
    const parentElem = e.target.parentNode;

    const productItem = parentElem.closest('tr');
    const quantityValue = parentElem.children[1];

    const total = productItem.querySelector('.item-total');
    const price = productItem.querySelector('.item-price');

    const result__value = document.querySelector('.result__value');
    const total__value = document.querySelector('.total__value');

    this.increment(
      btnDataset,
      quantityValue,
      total,
      price,
      total__value,
      result__value,
    );

    this.decrement(
      btnDataset,
      quantityValue,
      total,
      price,
      total__value,
      result__value,
    );

    if (quantityValue.textContent < 1) {
      this.removeItem(productItem);
    }
  }

  increment(btnDataset, quantity, total, price, amount, result) {
    if (btnDataset === 'increment') {
      quantity.textContent++;

      total.textContent = this.countingAmount(
        quantity.textContent,
        price.textContent,
      );
      result.textContent = `${this.totalSummaryAmount()} ₴`;
      amount.textContent = `${this.totalSummaryAmount()} ₴`;
    }
  }

  decrement(btnDataset, quantity, total, price, amount, result) {
    if (btnDataset === 'decrement') {
      quantity.textContent--;

      total.textContent = this.countingAmount(
        quantity.textContent,
        price.textContent,
      );

      result.textContent = `${this.totalSummaryAmount()} ₴`;
      amount.textContent = `${this.totalSummaryAmount()} ₴`;
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

    this.list.splice(0, this.list.length);

    result__value.textContent = `0.00 ₴`;
    total__value.textContent = `0.00 ₴`;
    comment.classList.add('none');
    textInput.value = '';
  }

  removeItem(item) {
    item.innerHTML = '';
  }

  addListenerOnDropdown() {
    const dropdownList = document.querySelector('#dropdown1');

    dropdownList.addEventListener(
      'click',
      this.dropdownHandlerClick.bind(this),
    );
  }

  dropdownHandlerClick(e) {
    e.preventDefault();

    if (e.target.tagName !== 'A') {
      return;
    }

    if (e.target.text === 'Очистить заказ') {
      this.clearOrder();
    }
  }

  addListenerOnPayment() {
    const paymentBtn = document.querySelector('button[data-action="payment"]');

    paymentBtn.addEventListener(
      'click',
      this.removeCheckHandleClick.bind(this),
    );
  }

  removeCheckHandleClick() {
    const check = document.querySelector('.check');
    const root = document.querySelector('#root');

    check.remove();

    //--------------------RENDER COMPONENT PAYMENT FOR TEST------------------------------------
    this.addToScreen(root, 'beforeend', this.renderPayment());
  }

  //--------------------ADD COMPONENT PAYMENT FOR TEST------------------------------------
  renderPayment() {
    return `
     <div class="payment">
      <h2 class="payment__title">Компонент оплаты</h2>
    </div>`;
  }

  //--------------------ADD FOOD-ITEM FOR TEST-------------------------------------------
  addProductItemHandleClick() {
    const productObj = {
      id: Date.now(),
      title: 'Орешки',
      quantity: 3,
      price: 30,
    };
   
    const foodList = document.querySelector('tbody');
    const result__value = document.querySelector('.result__value');
    const total__value = document.querySelector('.total__value');

    const resultSum = Number(this.totalSummaryAmount()) + Number(this.countingAmount(productObj.quantity, productObj.price));
    const totalSum = Number(this.totalSummaryAmount()) + Number(this.countingAmount(productObj.quantity, productObj.price));
    
    this.list.push(productObj);

    result__value.textContent = `${resultSum.toFixed(2)} ₴`;
    total__value.textContent = `${totalSum.toFixed(2)} ₴`;

    
    this.addToScreen(foodList, 'beforeend', this.renderListItem(productObj));
  }

  //--------------------ADD FOOD-ITEM FOR TEST-------------------------------------------
  addListenerOnAddedItem() {
    const addBtn = document.querySelector('button[data-action="add"]');

    addBtn.addEventListener('click', this.addProductItemHandleClick.bind(this));
  }
}

export default Check;
