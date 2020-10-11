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
    fontSize: '1.2rem',
    cursor: 'pointer',
  },
};
