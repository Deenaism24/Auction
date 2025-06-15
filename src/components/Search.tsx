// src/components/Search.tsx
import React, { forwardRef, useState, ChangeEvent } from 'react';
import * as styles from './Search.module.css';
import SearchIcon from '../icons/search.svg';

interface SearchProps {
  onSearch?: (value: string) => void;
  placeholderText?: string;
}

// Используем forwardRef, чтобы компонент мог принимать ref
const Search = forwardRef<HTMLInputElement, SearchProps>(({ onSearch, placeholderText }, ref) => {
  const [searchValue, setSearchValue] = useState('');

  const currentPlaceholderText = placeholderText || 'Для поиска введите номер лота или название'; // Дефолтный текст, если проп не передан
  // --------------------------

  // Обработчик изменения ввода
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value); // Обновляем локальное состояние
    // Вызываем функцию, переданную через проп onSearch, если она есть
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className={ styles.searchContainer } id="search-section"> {/* Оставляем ID для ссылки из Header */}
      <div className={ styles.searchInputWrapper }>
        <input
          type="text"
          value={searchValue}
          onChange={handleChange}
          className={ styles.searchInput }
          ref={ref} // Привязываем переданный ref к полю ввода
          placeholder="" // Пустой placeholder, чтобы scrollingPlaceholder был виден поверх
          aria-label="Search lot number or title" // Добавляем aria-label для доступности
        />
        {/* Отображаем бегущий плейсхолдер только если поле пустое */}
        {searchValue === '' && (
          // !!! ИСПОЛЬЗУЕМ ПЕРЕМЕННУЮ currentPlaceholderText !!!
          <div className={ styles.scrollingPlaceholder }>
            {currentPlaceholderText}
          </div>
          // ----------------------------------------------------
        )}
        {/* Иконка поиска */}
        <img src={SearchIcon} alt="Search" className={ styles.searchIcon }/>
      </div>
    </div>
  );
});

export default Search;