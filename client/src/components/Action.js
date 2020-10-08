import React from 'react';

export default function Action({ type, onActionClick }) {
  const { actionStyle } = styles;

  const handleClick = () => {
    onActionClick(type);
  };

  return (
    <span className="material-icons" onClick={handleClick} style={actionStyle}>
      {type}
    </span>
  );
}

const styles = {
  actionStyle: {
    // paddingLeft: '0.3rem',
    // marginLeft: '2rem',
    fontSize: '1.2rem',
    cursor: 'pointer',
  },
};
