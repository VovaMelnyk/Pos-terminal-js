// import { example, example2, materializeExample } from '@/js/example';

// materializeExample();
import GoodsCollection from './js/goodsCollection/goodsCollection';
const collectionG = new GoodsCollection();
const workShop = document.querySelector('#root');
collectionG.start(workShop);
