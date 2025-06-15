// src/components/Search.tsx
import React, { forwardRef, useState, ChangeEvent, Ref } from 'react'; // Добавляем Ref
import * as styles from './Search.module.css'; // Используем существующие стили
import SearchIcon from '../icons/search.svg'; // Используем существующую иконку

interface SearchProps {
  // onSearch - функция, которая будет вызываться при изменении ввода
  // Её реализуют родительские компоненты (HomePage или FavoritePage)
  onSearch?: (value: string) => void;
  // Ref передается с помощью forwardRef. Он нужен для HomePage, чтобы Header мог сфокусировать инпут.
  // На FavoritePage этот ref не нужен, и туда будет передан null.
}

// Используем forwardRef, чтобы компонент мог принимать ref
const Search = forwardRef<HTMLInputElement, SearchProps>(({ onSearch }, ref) => {
  const [searchValue, setSearchValue] = useState(''); // Локальное состояние для значения в поле ввода

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
          placeholder="" // Пустой placeholder, чтобы scrollingPlaceholder был виден
          aria-label="Search lot number or title" // Добавляем aria-label для доступности
        />
        {/* Отображаем бегущий плейсхолдер только если поле пустое */}
        {searchValue === '' && (
          <div className={ styles.scrollingPlaceholder }>
            Для поиска по аукциону введите номер лота или название
          </div>
        )}
        {/* Иконка поиска */}
        <img src={SearchIcon} alt="Search" className={ styles.searchIcon }/>
      </div>
    </div>
  );
});

export default Search;