import React from 'react';

const messageStyle = {
  position:'absolute',
  zIndex: 3,
  top: 0,
  right:10,
  color: '#c3d9ed',
  fontFamily: 'Inconsolata',
  padding:10,
  border: '2px dotted',
}

function Message(props) {
  return <p style={messageStyle}>{props.message}</p>;
}

export default Message;
