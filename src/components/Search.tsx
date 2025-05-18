import React, { useState } from 'react';
import './Search.css';
import SearchIcon from '../icons/search.svg';

const Search: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className='searchContainer'>
      <div className='searchInputWrapper'>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className='searchInput'
        />
        {searchValue === '' && (
          <div className='scrollingPlaceholder'>
            Для поиска по аукциону введите номер лота или название
          </div>
        )}
        <img src={SearchIcon} alt="Search" className='searchIcon' />
      </div>
    </div>
  );
};

export default Search;
