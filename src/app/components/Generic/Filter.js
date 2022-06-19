import React from 'react';

const Filter = () => {
  return (
    <div className="row justify-content-center mb-3">
      <select class="form-select form-select-sm mr-3 rounded-pill">
        <option selected>Filter</option>
        <option>Team</option>
        <option>Player</option>
        <option>Year</option>
        <option>Other</option>
      </select>
      <select class="form-select form-select-sm mr-3 rounded-pill">
        <option selected>Sort</option>
        <option>Name A-Z</option>
        <option>Name Z-A</option>
        <option>Oldest</option>
        <option>Newest</option>
        <option>Most Expensive</option>
        <option>Least Expensive</option>
      </select>
    </div>
  );
};

export default Filter;
