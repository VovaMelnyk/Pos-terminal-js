import Header from './components/header/header';

const headerPart = new Header();

import GoodsCollection from './js/goodsCollection/goodsCollection';
const goods = new GoodsCollection();
const root = document.querySelector('#root');
goods.start(root);
