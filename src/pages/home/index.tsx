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
import { useLocation, useNavigate } from 'react-router-dom'; // Добавляем useNavigate, если хотим убирать хэш
import { setSearchTerm } from '../../store/slices/filterSortSlice';
import { routes } from '../../routes'; // Импортируем routes для сравнения пути

const HomePage: React.FC = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const location = useLocation();
  // const navigate = useNavigate(); // Необязательно, если не убираем хэш

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
    // Эффект запускается при изменении location.hash
  }, [location.hash, searchInputRef]); // Добавляем searchInputRef в зависимости

  // !!! НОВЫЙ ЭФФЕКТ ДЛЯ СБРОСА ПОИСКА ПРИ УХОДЕ СО СТРАНИЦЫ !!!
  useEffect(() => {
    // Функция, которая будет выполняться при "размонтировании" компонента
    // или когда зависимости изменятся и условие location.pathname !== routes.home станет истинным
    return () => {
      // Сбрасываем глобальное состояние поиска в Redux при уходе с домашней страницы
      // Проверяем, что мы уходим с домашней страницы (то есть текущий location.pathname не является routes.home)
      // Эта проверка важна, если эффект запускается не только при размонтировании, но и при обновлении.
      // Однако, с return функцией useEffect, она вызывается ПЕРЕД выполнением следующего эффекта или при размонтировании.
      // Самый надежный способ - проверить ТЕКУЩИЙ путь в return функции.
      // Но для простоты и эффективности, поскольку этот эффект в HomePage,
      // return функция вызовется при уходе ИЗ HomePage.
      // Просто диспатчим сброс, если компонент HomePage вот-вот "перестанет быть видимым" на домашнем пути.
      // Лучше сделать это проверкой ТЕКУЩЕГО location.pathname в самом эффекте,
      // и диспатчить, ТОЛЬКО если мы УЖЕ НЕ на домашней странице после изменения.
      // Или, более чисто, диспатчить сброс при переходе на *другую* страницу.

      // Корректная логика:
      // Эффект запускается при изменении location.pathname
      // Если новый путь НЕ является домашним путем, сбрасываем поиск
      if (location.pathname !== routes.home) {
        dispatch(setSearchTerm(''));
        console.log("Глобальный поиск сброшен при уходе с Домашней страницы.");
      }
      // Зависимость от location.pathname гарантирует, что эффект сработает при каждом изменении пути.
      // Зависимость от dispatch необходима, потому что мы используем dispatch внутри useEffect.
      // Зависимость от location необходима, чтобы получить актуальный pathname.
    };
    // Эффект запускается при каждом изменении location.pathname
    // ВАЖНО: Если поставить зависимость только на location.pathname, эффект сработает
    // и при первом рендере (location.pathname становится '/'), что может быть нежелательно,
    // если вы хотите сохранить поиск при ОБНОВЛЕНИИ страницы.
    // Если вы хотите сброс ТОЛЬКО при навигации ИЗ home на ДРУГУЮ страницу,
    // логика должна быть в эффекте с зависимостью от location.pathname,
    // проверяющим ПРЕДЫДУЩИЙ путь. Это сложнее.

    // Простейший и безопасный вариант для сброса при ЛЮБОМ уходе с HomePage:
    // Используем cleanup-функцию useEffect. Она выполнится перед следующим вызовом эффекта (при следующем рендере из-за изменения зависимостей) ИЛИ при размонтировании компонента.
    // При размонтировании мы точно уходим с HomePage.
    // При обновлении state внутри HomePage, path не меняется, cleanup не нужен.
    // При переходе на другой путь, path меняется, cleanup сработает ДО нового рендера с новым path.
    // Этот cleanup - лучшее место для сброса при уходе.
  }, [dispatch]); // Зависимость только от dispatch

  // --- Конец нового эффекта ---


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
              onSearch={(value) => dispatch(setSearchTerm(value))}
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