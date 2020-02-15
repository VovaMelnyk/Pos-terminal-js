// import { example, example2, materializeExample } from '@/js/example';

// materializeExample();
import menu from '@/components/menu/menu.js';
const menuAdmin = new menu();
const root = document.querySelector('#root');
menuAdmin.start(root);
