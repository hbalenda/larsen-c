import React from 'react';

const messageStyle = {
  position:'absolute',
  zIndex: 3,
  top: 0,
  right:10,
  color: '#c3d9ed',
  fontFamily: 'Inconsolata',
  padding: `10px 20px`,
  border: '2px dotted',
  backgroundColor: '#f2f6f5',
  width: '300px',
  fontWeight: 'bold',
}

function Message(props) {
  return <p style={messageStyle}>{props.message}</p>;
}

export default Message;
