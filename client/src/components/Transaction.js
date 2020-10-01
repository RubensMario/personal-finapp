import React from 'react';

export default function Transaction({ transaction }) {
  const { _id, description, value, category, day } = transaction;

  const { transactionStyle, containerStyle } = styles;

  return (
    <div style={{ ...transactionStyle, ...containerStyle }}>
      <span value={description}>{description}</span>
    </div>
  );
}

const styles = {
  containerStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    width: '50%',
  },

  transactionStyle: {
    border: '0.1vw solid ',
    borderColor: 'lightgrey',
    borderRadius: '0.4vw',
    padding: '0.5vw',
    margin: '0.5px',
  },
};
