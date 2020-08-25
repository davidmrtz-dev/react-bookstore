import React from 'react';
import PropTypes from 'prop-types';
import filters from '../tools/categories';

const Filter = ({ filter, changeFilter }) => (
  <>
    <label htmlFor="category">
      Filter
      <select
        id="filters"
        // value={filter}
        defaultValue={filter}
        onChange={e => changeFilter(e.target.value)}
      >
        <option key="All" value="All">
          All
        </option>
        {filters.map(cat => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </label>
  </>
);

export default Filter;

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  changeFilter: PropTypes.func.isRequired,
};
