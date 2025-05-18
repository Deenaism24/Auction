import React, { forwardRef, useState } from 'react';
import './Search.css';
import SearchIcon from '../icons/search.svg';

interface SearchProps {
  onSearch?: (value: string) => void;
}

const Search = forwardRef<HTMLInputElement, SearchProps>(({ onSearch }, ref) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className='searchContainer'>
      <div className='searchInputWrapper'>
        <input
          type="text"
          value={searchValue}
          onChange={handleChange}
          className='searchInput'
          ref={ref}
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
});

export default Search;