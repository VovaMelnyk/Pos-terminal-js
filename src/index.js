// import { example, example2, materializeExample } from '@/js/example';

// materializeExample();
import Check from './components/component-check/component-check';

const check = new Check();

const root = document.querySelector('#root');

check.init(root);
