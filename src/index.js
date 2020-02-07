// import { example, example2, materializeExample } from '@/js/example';
import './styles/base.scss';
// materializeExample();
const root = document.querySelector('#root');
createTestBox();
const tb = document.querySelector('.testbox');

/**
 * Code for review Check component.
 */
import Check from './components/component-check/component-check';

const check = new Check();

check.init(tb);
/**
 * Code for review Check component.
 */

/**
 * Code for review Menu component.
 */
import Menu from './components/component-menu/component-menu';

const menu = new Menu();

menu.init(tb);
/**
 * Code for review Menu component.
 */

function createTestBox() {
  const testBox = document.createElement('div');

  testBox.classList.add('testbox');

  root.append(testBox);

}
