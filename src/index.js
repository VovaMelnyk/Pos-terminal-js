import Add_OneClass_Good from './js/one-class-good/add_class_one_good.js';

const addGood = new Add_OneClass_Good();
console.log(addGood);

const workShop = document.querySelector('#root');
console.log(workShop);
const varUl = document.createElement('ul');
workShop.append(varUl);
console.log(workShop);
addGood.start(varUl);
