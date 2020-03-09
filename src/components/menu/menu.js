import '@/styles/materialize/materialize.scss';
import './styles.scss';
import Test from './test';

class menuAdmin {
  constructor() {
    this.list = [
      { name: 'Товари', icon: 'local_grocery_store', id: 1 },
      { name: 'Страви', icon: 'local_dining', id: 2 },
      { name: 'Аналітика', icon: 'assessment', id: 3 },
      { name: 'Інгрідієнти', icon: 'widgets', id: 4 },
      { name: 'Категорії страв', icon: 'grid_on', id: 5 },
      { name: 'Категорії інгрідієнтів', icon: 'gradient', id: 6 },
    ];
    this.testWrap = null;
    this.listMenu = null;
    this.root = null;
    this.btnBack = null;
  }

  collectionKey = () => {
    this.btnBack = document.querySelector('#btn-back');
    this.root = document.querySelector('#root');
    this.testWrap = document.querySelector('.test');
    this.listMenu = document.querySelector('#slide-out');
  };

  markUpUl = () => {
    return `<a id="btn-back" href="#"><i class="medium material-icons">chevron_left</i></a>
    <ul id="slide-out" class="sidenav sidenav-fixed">
    </ul>
    <div class="test"></div>
    `;
  };
  markUpLi = ({ name, icon, id }) => {
    return `<li><a id="link" data-id="${id}" href="#"><i class="Tiny material-icons">${icon}</i>${name}</a></li>`;
  };
  renderItem = arr => arr.reduce((acc, el) => acc + this.markUpLi(el), '');
  addToScreen = (container, position, el) => {
    container.insertAdjacentHTML(position, el);
  };
  handleClickItem = e => {
    e.preventDefault();
    const clickItem = e.target.closest('li');

    if (!clickItem) return;
    const allItem = document.querySelectorAll('li');

    allItem.forEach(el => {
      if (el.classList.value === 'active') {
        el.classList.remove('active');
      }
    });
    clickItem.classList.add('active');
    const test = new Test();
    const wrapper = document.querySelector('main');
    wrapper.innerHTML = '';
    const id = Number(e.target.dataset.id);
    switch (id) {
      case 1:
        test.testMethod(wrapper);
        break;
      case 2:
        test.testMethod(wrapper);
        break;
      case 3:
        test.testMethod(wrapper);
        break;
      case 4:
        test.testMethod(wrapper);
        break;
      case 5:
        test.testMethod(wrapper);
        break;
      case 6:
        test.testMethod(wrapper);
        break;
      default:
        break;
    }
  };
  backArrow = e => {
    e.preventDefault();
    const wrapper = document.querySelector('main');
    const test = new Test();
    const clickBtnBack = e.currentTarget;
    if (!clickBtnBack) return;
    if (clickBtnBack === this.btnBack) {
      this.root.innerHTML = '';
      // test.testMethod(wrapper);
    }
  };
  addListeners = () => {
    this.listMenu.addEventListener('click', this.handleClickItem);

    this.btnBack.addEventListener('click', this.backArrow);
  };
  start = container => {
    this.addToScreen(container, 'afterbegin', this.markUpUl());
    this.collectionKey();
    this.addToScreen(this.listMenu, 'beforeend', this.renderItem(this.list));
    this.addListeners();
  };
}
export default menuAdmin;
