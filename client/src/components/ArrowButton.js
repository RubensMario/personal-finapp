import React from 'react';

export default function ArrowButton({ onButtonClick, buttonDisabled, type }) {
  const handleButtonClick = () => {
    onButtonClick();
  };

  return (
    <div>
      <button
        className="waves-effect waves-circle  btn"
        style={{
          backgroundColor: 'white',
          marginLeft: '5px',
          marginRight: '5px',
          fontWeight: 'bold',
          color: 'darkgrey',
        }}
        disabled={buttonDisabled}
        onClick={handleButtonClick}
      >
        {type === 'left' ? '<' : '>'}
      </button>
    </div>
  );
}
