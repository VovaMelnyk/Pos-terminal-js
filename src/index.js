// import { example, example2, materializeExample } from '@/js/example';

// materializeExample();


import Order from './components/component-order/component-order';

const order = new Order();
const root = document.querySelector('#root')
order.init(root);
