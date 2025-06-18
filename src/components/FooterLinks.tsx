// src/components/FooterLinks.tsx
import React from 'react';
import * as styles from './FooterLinks.module.css';
import { routes } from '../routes'; // Импорт определений маршрутов и якорей

import { downloadEmptyPdf } from '../utils/downloadPDF'; // Импорт утилиты для скачивания PDF

import { useConfirmationModal } from '../contexts/ConfirmationModalContext'; // Импорт хука для модалки подтверждения

// Компонент для отображения страницы со всеми ссылками из футера
const FooterLinks: React.FC = () => {
  // Получаем функцию для открытия модалки подтверждения из контекста
  const { openConfirmation } = useConfirmationModal();

  // Асинхронный обработчик клика по ссылке, который инициирует скачивание PDF после подтверждения
  const handleDownloadClick = async (linkText: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault(); // Предотвращаем стандартное действие ссылки
    }

    // Формируем имя файла для скачивания на основе текста ссылки
    const filename = `${linkText.replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '_')}.pdf`;
    const message = 'Скачать файл'; // Сообщение для модалки подтверждения

    // Открываем модалку подтверждения и ждем ответа пользователя
    const confirmed = await openConfirmation(message, filename);

    // Если пользователь подтвердил, скачиваем пустой PDF
    if (confirmed) {
      downloadEmptyPdf(filename);
    }
  };

  // Карта для сопоставления ключей групп ссылок с ID якорей на странице
  const anchorMap: { [key: string]: string } = {
    support: routes.ANCHOR_FOOTER_LINKS_SUPPORT,
    corporate: routes.ANCHOR_FOOTER_LINKS_CORPORATE,
    more: routes.ANCHOR_FOOTER_LINKS_MORE,
  };

  // JSX, описывающий внешний вид компонента
  return (
    // Контейнер для всех ссылок футера
    <div className={styles.footerLinksContainer}>

      {/* Заголовок страницы */}
      <h1 className={styles.footerLinksTitle}>Дополнительная информация</h1>

      {/* Итерируемся по группам ссылок, определенным в routes.ts, перебор всех пар ключ-значение */}
      {Object.entries(routes.footerLinks).map(([groupKey, links]) => (
        // Контейнер для каждой группы ссылок, с ID якоря для навигации
        <div
          key={groupKey}
          id={anchorMap[groupKey]} // Присваиваем ID якоря
          className={styles.linkGroup} // Стили группы
        >
          {/* Заголовок группы ссылок */}
          <h2 className={styles.groupTitle}>{groupKey.toUpperCase()}</h2>
          {/* Список ссылок внутри группы */}
          <ul className={styles.linksList}>
            {/* Итерируемся по отдельным ссылкам в группе */}
            {links.map(link => (
              // Элемент списка для каждой ссылки
              <li key={link.path}>
                <div
                  className={styles.link}
                  onClick={(e) => handleDownloadClick(link.text, e)}
                >
                  {link.text} {/* Текст ссылки */}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FooterLinks;