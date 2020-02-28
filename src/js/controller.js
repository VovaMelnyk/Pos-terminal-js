import Check from '../components/component-check/component-check';
import Menu from '../components/component-menu/component-menu';
import Order from '../components/component-order/component-order';

const order = new Order();
const check = new Check();
const menu = new Menu();

export const initOrder = order.init;
export const initCheck = check.init;
export const initMenu = menu.init;

export const addProductItem = check.addProductItemHandleClick;
