import React from 'react';

export default function Filter({ textToFilter, onFilterChange }) {
  const handleInputChange = (event) => {
    const inputText = event.target.value;
    onFilterChange(inputText);
  };

  return (
    <div style={{ padding: '3%' }}>
      <input
        type="text"
        placeholder="Buscar lançamentos por categoria"
        // value={textToFilter}
        onChange={handleInputChange}
      />
    </div>
  );
}
