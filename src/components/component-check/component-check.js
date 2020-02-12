import '@/styles/materialize/materialize';
import M from 'materialize-css';
import './component-check-style.scss';

class Check {
  constructor() {
    this.list = [];
    this.result__value = null;
    this.total__value = null;

    this.textInput = null;
    this.textComment = null;

    this.addCommentToScreenHandleClick = this.addCommentToScreenHandleClick.bind(
      this,
    );
    this.clearFieldHandleClick = this.clearFieldHandleClick.bind(this);
    this.dropdownHandlerClick = this.dropdownHandlerClick.bind(this);
    this.removeCheckHandleClick = this.removeCheckHandleClick.bind(this);
    this.incrementAndDecrementHandleClick = this.incrementAndDecrementHandleClick.bind(
      this,
    );

    this.addProductItemHandleClick = this.addProductItemHandleClick.bind(this);
  }

  init(container) {
    this.addToScreen(container, 'beforeend', this.renderCheck());

    this.initDropdown();
    this.addListenerOnListItems();

    this.initCommentModal();
    this.addListenerOnDropdown();

    this.addListenerCommentDone();
    this.addListenerCommentClose();

    this.addListenerOnPayment();

    this.setDomElements();

    // this.addListenerOnAddedItem();
  }

  setDomElements() {
    this.result__value = document.querySelector('.result__value');
    this.total__value = document.querySelector('.total__value');

    this.textInput = document.querySelector('textarea[data-action="comment"]');
    this.textComment = document.querySelector('.comment__text');
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
          <tbody>${this.list.reduce(
            (acc, el) => this.renderListItem(el) + acc,
            '',
          )}</tbody>
        </table>
      </div>`;
  }

  renderListItem({ id, title, quantity, price }) {
    return `<tr class="food-list__item" data-id="${id}">
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
            </tr>`;
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
                  <textarea id="textarea1" class="materialize-textarea" data-action="comment"></textarea>
                  <label for="textarea1">Комментарий к чеку...</label>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="modal-footer">
          <button class="modal-close waves-effect waves-green btn" data-action="done">Готово</button>
          <button class="modal-close waves-effect waves-green btn-flat" data-action="close">Отменить</button>
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

    list.addEventListener('click', this.incrementAndDecrementHandleClick);
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

    const itemId = productItem.dataset.id;

    this.increment(
      btnDataset,
      quantityValue,
      total,
      price,
      this.total__value,
      this.result__value,
      itemId,
    );

    this.decrement(
      btnDataset,
      quantityValue,
      total,
      price,
      this.total__value,
      this.result__value,
      itemId,
    );

    if (quantityValue.textContent < 1) {
      this.removeItem(productItem);
      this.removeItemOnId(itemId);
    }
  }

  removeItemOnId(id) {
    this.list = this.list.filter(item => item.id !== Number(id));

    return this.list;
  }

  findItemOnId(id) {
    const item = this.list.find(item => item.id === Number(id));

    return item;
  }

  increment(btnDataset, quantity, total, price, amount, result, id) {
    if (btnDataset === 'increment') {
      quantity.textContent++;

      const itemQuantity = this.findItemOnId(id);

      itemQuantity.quantity = Number(quantity.textContent);

      total.textContent = this.countingAmount(
        quantity.textContent,
        price.textContent,
      );
      result.textContent = `${this.totalAmount()} ₴`;
      amount.textContent = `${this.totalAmount()} ₴`;
    }
  }

  decrement(btnDataset, quantity, total, price, amount, result, id) {
    if (btnDataset === 'decrement') {
      quantity.textContent--;

      const itemQuantity = this.findItemOnId(id);
      itemQuantity.quantity = Number(quantity.textContent);

      total.textContent = this.countingAmount(
        quantity.textContent,
        price.textContent,
      );

      result.textContent = `${this.totalAmount()} ₴`;
      amount.textContent = `${this.totalAmount()} ₴`;
    }
  }

  addListenerCommentDone() {
    const btnDone = document.querySelector('button[data-action="done"]');

    btnDone.addEventListener('click', this.addCommentToScreenHandleClick);
  }

  addListenerCommentClose() {
    const btnClose = document.querySelector('button[data-action="close"]');

    btnClose.addEventListener('click', this.clearFieldHandleClick);
  }

  addCommentToScreenHandleClick() {
    const comment = document.querySelector('.comment');

    if (this.textInput.value.trim() === '') {
      this.textComment.textContent = '';
      comment.classList.add('none');
      return;
    }

    this.textComment.textContent = this.textInput.value;
    comment.classList.remove('none');
  }

  clearFieldHandleClick() {
    if (this.textComment.textContent) {
      return;
    }

    this.textInput.value = '';
  }

  clearOrder() {
    const listItems = document.querySelector('tbody');
    const textInput = document.querySelector('textarea');
    const comment = document.querySelector('.comment');

    listItems.innerHTML = '';

    this.list.splice(0, this.list.length);

    this.result__value.textContent = `0.00 ₴`;
    this.total__value.textContent = `0.00 ₴`;

    comment.classList.add('none');
    textInput.value = '';
  }

  removeItem(item) {
    item.remove();
  }

  addListenerOnDropdown() {
    const dropdownList = document.querySelector('#dropdown1');

    dropdownList.addEventListener('click', this.dropdownHandlerClick);
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

    paymentBtn.addEventListener('click', this.removeCheckHandleClick);
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

  addProductItemHandleClick(productObj) {
    const foodList = document.querySelector('tbody');

    if (this.list.includes(productObj)) {
      productObj.quantity++;

      this.changeCheckListItem(productObj);
    } else {
      productObj.quantity = 1;
      this.list.push(productObj);

      this.addToScreen(foodList, 'beforeend', this.renderListItem(productObj));
    }

    this.result__value.textContent = `${this.totalAmount()} ₴`;
    this.total__value.textContent = `${this.totalAmount()} ₴`;
  }

  changeCheckListItem(data) {
    const item = document.querySelector(`tr[data-id="${data.id}"]`);
    const itemQuantity = item.children[1].querySelector('span');
    const itemAmount = item.children[item.children.length - 1];
    
    itemQuantity.textContent = data.quantity;
    itemAmount.textContent = this.countingAmount(data.quantity, data.price);
  }

  // addListenerOnAddedItem() {
  //   const addBtn = document.querySelector('button[data-action="add"]');

  //   addBtn.addEventListener('click', this.addProductItemHandleClick);
  // }
}

export default Check;
