import GoodsCollection from '@/js/goodsCollection/goodsCollection';
const goods = new GoodsCollection();

const root = document.querySelector('#root');
goods.start(root);
