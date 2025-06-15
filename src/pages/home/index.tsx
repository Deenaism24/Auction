// src/pages/home/index.tsx
import React, { useRef, useEffect } from 'react';
import HeroBanner from '../../components/HeroBanner';
import AuctionLotGrid from '../../components/AuctionLotGrid';
import InformationAddition from '../../components/InformationAddition';
import HomeArticle from '../../components/HomeArticle';
import Footer from '../../widgets/footer';
import Header from '../../widgets/header';
import Search from '../../components/Search'; // Используем универсальный Search
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setSearchTerm } from '../../store/slices/filterSortSlice';

const HomePage: React.FC = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const location = useLocation();

  // Эффект для фокусировки инпута поиска по хэшу
  useEffect(() => {
    if (location.hash === '#search-section') {
      const searchSectionElement = document.getElementById('search-section');
      // Убеждаемся, что элемент с ID "search-section" существует И что ref привязан к полю ввода
      if (searchSectionElement && searchInputRef.current) {
        // Добавляем небольшую задержку, чтобы гарантировать, что скролл завершился
        // и элемент готов к фокусировке.
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 600); // Время таймаута должно быть достаточным для плавного скролла

        // Опционально: удалить хэш из URL после фокусировки, чтобы не было скролла при каждом обновлении страницы
        // navigate(location.pathname, { replace: true });
      }
    }
    // Эффект запускается при изменении location.hash.
    // НЕ добавляем cleanup функцию здесь, так как мы не хотим сбрасывать поиск при уходе с этой страницы.
  }, [location.hash, searchInputRef]); // Добавляем searchInputRef в зависимости


  // --- УДАЛЕННЫЙ ЭФФЕКТ ДЛЯ СБРОСА ПОИСКА ---
  // Предыдущий эффект с cleanup функцией, который мы УДАЛЯЕМ:
  /*
  useEffect(() => {
    return () => {
        // Эта функция сработает, когда компонент HomePage будет размонтирован.
        // УДАЛЯЕМ эту строку:
        // dispatch(setSearchTerm(''));
        console.log("Глобальный поиск сброшен при уходе с Домашней страницы (через cleanup)."); // Этот лог тоже можно удалить
    };
  }, [dispatch]); // Зависимость только от dispatch
  */
  // --- Конец удаленного эффекта ---
  // Нет, не удаляем весь useEffect, просто удаляем return () => {...} из существующего useEffect,
  // который реагирует на location.hash ИЛИ создаем новый useEffect без зависимостей (или с dispatch), но без cleanup.
  // Самый простой способ: убедиться, что ни один useEffect в HomePage не диспатчит setSearchTerm('') при уходе.
  // Проверяем: в этом файле нет других useEffect, диспатчащих сброс.
  // Значит, просто убеждаемся, что предыдущая cleanup функция удалена.
  // Если вы скопировали предыдущий код, то cleanup функция уже удалена.
  // Все, что нужно, это чтобы не было логики диспатча setSearchTerm('') при размонтировании.

  return (
    <div className="pageLayout">
      {/* Header все еще принимает searchInputRef для фокусировки */}
      <Header searchInputRef={searchInputRef} />
      <HeroBanner />
      <main className="main">
        <div className="auctionContainer">
          <AuctionLotGrid />
          <div className="sidebarContainer">
            {/* Используем универсальный компонент Search */}
            {/* Передаем реф: это инпут, который Header будет пытаться сфокусировать */}
            {/* Передаем функцию, которая будет обновлять глобальное состояние поиска в Redux */}
            <Search
              ref={searchInputRef}
              onSearch={(value) => dispatch(setSearchTerm(value))} // Этот диспатч устанавливает значение поиска
            />
            <InformationAddition/>
          </div>
        </div>
        <HomeArticle />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;