import React from 'react';
import './css/filter.css';

export default function Filter({ onFilterChange }) {
  const handleInputChange = (event) => {
    const inputText = event.target.value;
    onFilterChange(inputText);
  };

  return (
    <div className="input-field" style={{ padding: '3%' }}>
      <input
        type="text"
        placeholder="Buscar lançamentos por categoria"
        onChange={handleInputChange}
      />
    </div>
  );
}
