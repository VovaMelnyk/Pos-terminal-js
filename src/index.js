import Add_OneClass_Good from './js/one-class-good/add_class_one_good.js';

const addGood = new Add_OneClass_Good();

const workShop = document.querySelector('#root');
const varUl = document.createElement('ul');
workShop.append(varUl);
addGood.start(varUl);

// import Dishes from './components/category-list/category-list.js';
// const newDishes = new Dishes();
// newDishes.createPage();

// import addDish from './components/add-category/add-category.js';
// const newAddDishes = new addDish();
// newAddDishes.createPage();
