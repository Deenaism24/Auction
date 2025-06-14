// src/components/FavoriteSearch.tsx
import React, { useState } from 'react'; // Удаляем forwardRef
import * as styles from './Search.module.css';
import SearchIcon from '../icons/search.svg';

interface SearchProps {
  onSearch?: (value: string) => void;
}

const FavoriteSearch: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (onSearch) {
      onSearch(value);
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
        />
        {searchValue === '' && (
          <div className={ styles.scrollingPlaceholder }>
            Быстрый поиск по товарам
          </div>
        )}
        <img src={SearchIcon} alt="Search" className={ styles.searchIcon }/>
      </div>
    </div>
  );
};

export default FavoriteSearch;