export default (text = 'Hello world!') => {
  const element = document.createElement('div');
  element.innerHTML = text;
  // element.className = 'pure-button';
  element.className = 'fa fa-hand-spock-o fa-1g';
  const f = () => 322;
  f();
  return element;
};
