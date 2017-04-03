import React from 'react';
import '../App.css';

class App extends React.Component {
  constructor() {
    super();
    this.startDrift = this.startDrift.bind(this);
    this.stopDrift = this.stopDrift.bind(this);
    this.drift = this.drift.bind(this);
    this.getClassNames = this.getClassNames.bind(this);
    this.state = {
      drift: false
    };
  }

  getClassNames(object){
    var classNames = [];
    classNames.push(object);
    if(this.state.drift){classNames.push(`${object}-active`)};
    if(!this.state.drift){classNames.push(`${object}-inactive`)}
    return classNames;
  }

  drift(){
    !this.state.drift ? this.startDrift() : this.stopDrift();
    this.setState({
      drift:true
    })
  }

  startDrift() {
    var rightShelf = document.getElementsByClassName('right')[0];
    var leftShelf = document.getElementsByClassName('left')[0];
    rightShelf.classList.add('right-active');
    leftShelf.classList.add('left-active');
  }

  stopDrift() {
    var rightShelf = document.getElementsByClassName('right')[0];
    var leftShelf = document.getElementsByClassName('left')[0];

    var rightComputedStyle = window.getComputedStyle(rightShelf);
    var leftComputedStyle = window.getComputedStyle(leftShelf);

    var marginRight = rightComputedStyle.getPropertyValue('margin-right');
        rightShelf.style.marginRight = marginRight;
        rightShelf.classList.remove('right-active');
    var marginLeft = leftComputedStyle.getPropertyValue('margin-left');
        leftShelf.style.marginLeft = marginLeft;
        leftShelf.classList.remove('left-active');

    clearInterval(this.timer);
    this.timer = setTimeout(this.startDrift,300);
  }

  render() {
    return (
      <div className="App" onMouseMove={this.drift}>
        <div className="ice-wrapper">
          <div className={this.getClassNames("right").join(" ")}>
          </div>
          <div className={this.getClassNames("left").join(" ")}>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
