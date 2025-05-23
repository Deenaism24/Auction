import React, { forwardRef, useState } from 'react';
import * as styles from './Search.module.css';
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
    <div className={ styles.searchContainer }>
      <div className={ styles.searchInputWrapper }>
        <input
          type="text"
          value={searchValue}
          onChange={handleChange}
          className={ styles.searchInput }
          ref={ref}
        />
        {searchValue === '' && (
          <div className={ styles.scrollingPlaceholder }>
            Для поиска по аукциону введите номер лота или название
          </div>
        )}
        <img src={SearchIcon} alt="Search" className={ styles.searchIcon }/>
      </div>
    </div>
  );
});

export default Search;