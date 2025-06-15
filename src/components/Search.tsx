// src/components/Search.tsx
import React, { forwardRef, useState, ChangeEvent } from 'react';
import * as styles from './Search.module.css';
import SearchIcon from '../icons/search.svg';

// Определяем пропсы, которые компонент может принимать
interface SearchProps {
  // Опциональная функция обратного вызова, вызываемая при изменении ввода
  onSearch?: (value: string) => void;
  // Опциональный текст для бегущего плейсхолдера
  placeholderText?: string;
}

// Используем forwardRef, чтобы этот компонент мог принимать ref с родителя
// и привязывать его к внутреннему DOM-элементу (input)
const Search = forwardRef<HTMLInputElement, SearchProps>(({ onSearch, placeholderText }, ref) => {
  // Состояние для хранения текущего значения поля ввода
  const [searchValue, setSearchValue] = useState('');

  // Определяем текст плейсхолдера: используем переданный проп, или дефолтный текст
  const currentPlaceholderText = placeholderText || 'Для поиска введите номер лота или название';

  // Обработчик события изменения значения в поле ввода
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value); // Обновляем локальное состояние с новым значением
    // Если передана функция onSearch, вызываем ее с текущим значением
    if (onSearch) {
      onSearch(value);
    }
  };

  // JSX, описывающий внешний вид компонента
  return (
    // Основной контейнер поиска. ID используется для навигации по якорю.
    <div className={ styles.searchContainer } id="search-section">
      <div className={ styles.searchInputWrapper }>
        {/* Поле ввода для поискового запроса */}
        <input
          type="text"
          value={searchValue}
          onChange={handleChange}
          className={ styles.searchInput }
          ref={ref} // Привязываем ref, переданный от родителя, к этому инпуту
          placeholder="" // Делаем placeholder пустым, чтобы наш кастомный бегущий текст был виден
          aria-label="Search lot number or title" // Атрибут для доступности (чтения скринридерами)
        />
        {/* Бегущий плейсхолдер, отображается только если поле ввода пустое */}
        {searchValue === '' && (
          <div className={ styles.scrollingPlaceholder }>
            {currentPlaceholderText} {/* Используем определенный текст плейсхолдера */}
          </div>
        )}
        {/* Иконка поиска, позиционированная абсолютно внутри обертки */}
        <img src={SearchIcon} alt="Search" className={ styles.searchIcon }/>
      </div>
    </div>
  );
});

export default Search;