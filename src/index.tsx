import * as React from 'react';
import * as ReactDOM from 'react-dom';
import First from './page/first/first';
import 'antd/dist/antd.css';
import './style/index.scss';

const ROOT = document.getElementById('app');

ReactDOM.render(<First />, ROOT);
