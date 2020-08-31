// import  as React from 'react';
// import  as ReactDOM from 'react-dom';
// import First from './page/first/first';
// import 'antd/dist/antd.css';
// import './style/index.scss';

// const ROOT = document.getElementById('app');

// ReactDOM.render(<First />, ROOT);
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

export { default as Button } from './components/Button';
export { default as Menu } from './components/Menu';
export { default as AutoComplete } from './components/AutoComplete';
export { default as Icon } from './components/Icon';
export { default as Input } from './components/Input';
export { default as Progress } from './components/Progress';
export { default as Transition } from './components/Transtion';
export { default as Upload } from './components/Upload';
