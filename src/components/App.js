import React from 'react';
import '../App.css';
import Message from './Message';

class App extends React.Component {
  constructor() {
    super();
    this.startDrift = this.startDrift.bind(this);
    this.stopDrift = this.stopDrift.bind(this);
    this.drift = this.drift.bind(this);
    this.getClassNames = this.getClassNames.bind(this);
    this.state = {
      width: window.innerWidth,
      drift: false,
      activeMessageIndex: 0,
      messages: [
        `Why don't you pause for a moment and take a deep breath...`,
        `Now try moving your mouse a little.`,
        `Uh oh... what's happening...`,
        `Try moving your mouse to prevent the glaciers from separating.`,
        `It gets pretty tiring though, huh...`,
        `It's almost as if...`,
        `...the effort of the individual to prevent global warming...`,
        `...pales in comparison to the impact that would be made if change happened at a corporate and policy level...`,
        `Sigh...`,
        `C'est la vie!`,
      ]
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
      drift: true
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

  changeMessage() {
    if (this.state.activeMessageIndex < this.state.messages.length - 1) {
      var newIndex = this.state.activeMessageIndex+1;
      this.setState({activeMessageIndex: newIndex});
    }
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
    if (this.state.width <= 500) {
      var messages = this.state.messages;
      messages[1] = `Now try tapping once.`;
      messages[3] = `Try tapping and holding to prevent the glaciers from separating.`;
      this.setState({
        messages: messages,
      })
    }
  };

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  componentDidMount() {
    this.handleWindowSizeChange();
    setInterval(this.changeMessage.bind(this), 5000);
  }

  render() {
    const { activeMessageIndex, messages } = this.state;
    return (
      <div className="App" onMouseMove={this.drift} onTouchStart={this.drift} onTouchEnd={this.drift}>
        <Message message={messages[activeMessageIndex]} />
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
