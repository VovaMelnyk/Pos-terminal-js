// import LoginForm from '@/js/login-form';
// window.addEventListener('DOMContentLoaded', new LoginForm());
// import Header from './components/header/header';

// const headerPart = new Header();

import createNewCategoriesProduct from './components/component-createNewCategoriesProduct/createNewCategoriesProduct';

const root = document.querySelector('#root');
const categoriesProduct = new createNewCategoriesProduct();
categoriesProduct.start(root);