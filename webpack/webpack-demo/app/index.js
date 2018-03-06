import 'purecss';
import 'font-awesome/css/font-awesome.css';
import './index.css';
import component from './component';
import imgComponent from './imgComponent';
import svgComponent from './svgComponent';

const app = document.querySelector('#app');
app.appendChild(component());
app.appendChild(imgComponent());
app.appendChild(svgComponent());
