// import Header from './components/header/header';

import ClassOfProducts from '@/components/component-dishCategories/dishListClass'

// import Dishes from '../src/components/category-list/category-list'

// const dish = new Dishes()
// const insert = document.querySelector('#root');
// dish.createPage()


const app = new ClassOfProducts();
const insert = document.querySelector('#root');
app.start(insert)


// const headerPart = new Header();
