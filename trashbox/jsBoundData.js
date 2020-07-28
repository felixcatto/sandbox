// Different ways of creation data bounded with functions



let makeName = (name = 'vasa') => ({
  name,
  changeName() {
    this.name = this.name === 'vasa' ? 'fedya' : 'vasa';
    return this;
  },
});
x = makeName();
x.changeName();
// changeName NOT binded to x



let makeName = (name = 'vasa') => ({
  get name() {
    return name;
  },
  getName: () => name,
  changeName: () => {
    name = name === 'vasa' ? 'fedya' : 'vasa';
  },
});
x = makeName();
x.changeName();
// changeName IS binded to x



let makeName = function (name = 'vasa') {
  this.name = name;
  this.changeName = () => {
    this.name = this.name === 'vasa' ? 'fedya' : 'vasa';
    return this;
  };
};
x = new makeName();
x.changeName();
// changeName IS binded to x
