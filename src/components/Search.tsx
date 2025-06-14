// import React, { forwardRef, useState } from 'react';
// import * as styles from './Search.module.css';
// import SearchIcon from '../icons/search.svg';
//
// interface SearchProps {
//   onSearch?: (value: string) => void;
// }
//
// const Search = forwardRef<HTMLInputElement, SearchProps>(({ onSearch }, ref) => {
//   const [searchValue, setSearchValue] = useState('');
//
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchValue(e.target.value);
//     if (onSearch) {
//       onSearch(e.target.value);
//     }
//   };
//
//   return (
//     <div className={ styles.searchContainer } id="search-section">
//       <div className={ styles.searchInputWrapper }>
//         <input
//           type="text"
//           value={searchValue}
//           onChange={handleChange}
//           className={ styles.searchInput }
//           ref={ref}
//         />
//         {searchValue === '' && (
//           <div className={ styles.scrollingPlaceholder }>
//             Для поиска по аукциону введите номер лота или название
//           </div>
//         )}
//         <img src={SearchIcon} alt="Search" className={ styles.searchIcon }/>
//       </div>
//     </div>
//   );
// });
//
// export default Search;

// src/components/Search.tsx
import React, { forwardRef, useState } from 'react';
import * as styles from './Search.module.css';
import SearchIcon from '../icons/search.svg';

interface SearchProps {
  onSearch?: (value: string) => void;
  // Новый проп, чтобы отличить использование на главной странице
  isHomePage?: boolean;
}

// Используем forwardRef всегда в определении компонента.
// Проп 'isHomePage' позволяет настроить поведение внутри.
const Search = forwardRef<HTMLInputElement, SearchProps>(({ onSearch, isHomePage = false }, ref) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  // Определяем текст плейсхолдера в зависимости от того, домашняя ли это страница
  const placeholderText = isHomePage
    ? 'Для поиска по аукциону введите номер лота или название'
    : 'Быстрый поиск по товарам';

  // Элемент SearchContainer имеет ID "search-section", который используется для прокрутки на домашней странице
  return (
    <div className={ styles.searchContainer } id="search-section">
      <div className={ styles.searchInputWrapper }>
        <input
          type="text"
          value={searchValue}
          onChange={handleChange}
          className={ styles.searchInput }
          ref={ref} // Передаем ref на инпут. React ForwardRef позаботится о том, чтобы он работал, если ref был передан из родителя.
        />
        {searchValue === '' && (
          <div className={ styles.scrollingPlaceholder }>
            {placeholderText}
          </div>
        )}
        <img src={SearchIcon} alt="Search" className={ styles.searchIcon }/>
      </div>
    </div>
  );
});

export default Search;