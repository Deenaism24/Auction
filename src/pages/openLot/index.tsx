// src/pages/openLot/index.tsx
import React, { useRef } from 'react'; // Импорт хука useRef
import { useParams } from 'react-router-dom'; // Хук для получения параметров из URL
import Header from '../../widgets/header';
import Footer from '../../widgets/footer';
import Lot from '../../components/Lot';
// ИМПОРТЫ ДЛЯ REDUX (для доступа к полному списку лотов)
import { useSelector } from 'react-redux'; // Хук для чтения состояния из Redux
import { RootState } from '../../store'; // Тип корневого состояния Redux
import { Lot as LotType } from '../../store/slices/filterSortSlice'; // Тип лота

// Компонент страницы для отображения деталей отдельного лота
const OpenLotPage: React.FC = () => {
  // Получаем параметр 'lot' (номер лота) из URL
  const { lot: lotNumberParam } = useParams<{ lot: string }>();

  // ЧТЕНИЕ СПИСКА ВСЕХ ЛОТОВ ИЗ REDUX STORE
  // Предполагаем, что полный список лотов уже загружен в Redux при входе на главную страницу
  const allLots = useSelector((state: RootState) => state.filterSort.allLots) as LotType[];

  // Используем useMemo для поиска лота по номеру из URL
  // Это предотвращает повторный поиск при каждом рендере, если allLots или lotNumberParam не изменились
  const foundLot = React.useMemo(() => {
    // Если параметр номера лота отсутствует в URL, возвращаем undefined
    if (!lotNumberParam) return undefined;

    // Ищем лот в массиве allLots по его номеру
    // Преобразуем номер лота и параметр из URL в строку для надежного сравнения
    return allLots.find(item =>
      item.number !== undefined &&
      item.number !== null &&
      item.number.toString() === lotNumberParam
    );
  }, [allLots, lotNumberParam]); // Зависимости мемо: массив всех лотов и параметр из URL

  // Реф для поля поиска в хедере.
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Условный рендеринг: если лот не найден по номеру из URL
  // Проверяем, что lotNumberParam был задан, но foundLot оказался undefined
  if (!foundLot && lotNumberParam) {
    // Отображаем сообщение "Лот не найден"
    return (
      <>
        {/* Хедер */}
        <Header searchInputRef={searchInputRef} />
        <main className="main"> {/* Основная область контента */}
          {/* Контейнер для сообщения об ошибке */}
          <div className="lotContainer"> {/* Используем тот же класс контейнера, что и для компонента Lot */}
            <div className="notFound">Лот с номером "{lotNumberParam}" не найден.</div> {/* Сообщение об ошибке */}
          </div>
        </main>
        {/* Футер */}
        <Footer />
      </>
    );
  }

  // Если лот найден (foundLot не undefined) или lotNumberParam не задан (тогда foundLot = undefined,
  // и компонент Lot сам отобразит "Лот не найден" или другую заглушку, если передать ему undefined)
  return (
    <>
      {/* Хедер */}
      <Header searchInputRef={searchInputRef} />
      <main className="main"> {/* Основная область контента */}
        {/* Отображаем компонент Lot, передавая ему найденный лот */}
        {/* Компонент Lot внутри себя обрабатывает случай, если переданный лот === undefined */}
        <Lot lot={foundLot} />
        {/* Здесь можно добавить другие секции, например, с похожими лотами */}
      </main>
      {/* Футер */}
      <Footer />
    </>
  );
};

export default OpenLotPage;