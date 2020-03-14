import '@/styles/materialize/materialize.scss';
import './styles.scss';
import Test from './test';
import CategoryIngridients from '../component-CategoryIngridients/CategoryIngridients';
import Dishes from '../category-list/category-list';
import GoodsCollection from '../goodsCollection/goodsCollection';
import ClassOfProducts from '../component-dishCategories/dishListClass';
import Hall from '../hall/hall';

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
    this.btnBack = document.querySelector('#admin-page-btn-back');
    this.root = document.querySelector('#root');
    this.testWrap = document.querySelector('.test');
    this.listMenu = document.querySelector('#slide-out');
  };

  markUpUl = () => {
    return `<a id="admin-page-btn-back" href="#"><i class="medium material-icons admin-menu-icon">chevron_left</i></a>
    <ul id="slide-out" class="sidenav sidenav-fixed">
    </ul>
    `;
  };
  markUpLi = ({ name, icon, id }) => {
    return `<li><a id="admin-page-link" data-id="${id}" href="#"><i class="Tiny material-icons admin-menu-icon">${icon}</i>${name}</a></li>`;
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
      if (el.classList.value === 'admin-page-active') {
        el.classList.remove('admin-page-active');
      }
    });
    clickItem.classList.add('admin-page-active');
    const test = new Test();
    const wrapper = document.querySelector('.wrapper-admin-page__main');
    wrapper.innerHTML = '';
    const id = Number(e.target.dataset.id);
    switch (id) {
      case 1:
        new GoodsCollection().start(wrapper);
        break;
      case 2:
        new ClassOfProducts().start(wrapper);
        break;
      case 3:
        test.testMethod(wrapper);
        break;
      case 4:
        test.testMethod(wrapper);
        break;
      case 5:
        new Dishes([
          { name: 'ajax', img: 'img' },
          { name: 'pop', img: 'img' },
        ]).createPage();
        break;
      case 6:
        new CategoryIngridients(wrapper).init();
        break;
      default:
        break;
    }
  };
  backArrow = e => {
    e.preventDefault();
    const clickBtnBack = e.currentTarget;
    if (!clickBtnBack) return;
    if (clickBtnBack === this.btnBack) {
      this.root.innerHTML = '';
      new Hall().start(this.root);
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
