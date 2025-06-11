// src/pages/openLot/index.tsx
import React, { useRef } from 'react'; // Добавляем useState и useEffect, если нужно загружать данные асинхронно
import { useParams } from 'react-router-dom'; // Хук для получения URL-параметров
import Header from '../../widgets/header';
import Footer from '../../widgets/footer';
import Lot from '../../components/Lot'; // Импортируем компонент отображения лота
// !!! ИМПОРТИРУЕМ СПИСОК ВСЕХ ЛОТОВ ИЗ REDUX !!!
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Lot as LotType } from '../../store/slices/filterSortSlice';

const OpenLotPage: React.FC = () => {
  const { lot: lotNumberParam } = useParams<{ lot: string }>();

  // !!! ЧТЕНИЕ СПИСКА ВСЕХ ЛОТОВ ИЗ REDUX !!!
  const allLots = useSelector((state: RootState) => state.filterSort.allLots) as LotType[];
  // !!! КОНЕЦ ЧТЕНИЯ ИЗ REDUX !!!

  // Находим лот по номеру из URL
  // Используем useMemo, чтобы не пересчитывать при каждом рендере, если allLots не меняется
  const foundLot = React.useMemo(() => {
    // Проверяем, что lotNumberParam существует
    if (!lotNumberParam) return undefined;

    // Ищем лот в списке по номеру (с приведением типов к строке для надежности сравнения)
    return allLots.find(item => item.number !== undefined && item.number !== null && item.number.toString() === lotNumberParam);
  }, [allLots, lotNumberParam]); // Зависимости: список всех лотов и параметр из URL

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Если лот не найден, можем отобразить 404 или сообщение об ошибке
  if (!foundLot && lotNumberParam) { // Показываем "не найдено", только если параметр был, но лот не нашли
    // return <NotFoundPage />; // Если у вас есть компонент 404
    return (
      <>
        <Header searchInputRef={searchInputRef} />
        <main className="main">
          <div className="lotContainer"> {/* Используем тот же контейнер, что и в компоненте Lot */}
            <div className="notFound">Лот с номером "{lotNumberParam}" не найден.</div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Если лот найден (или lotNumberParam не задан, тогда foundLot = undefined, и мы рендерим заглушку в компоненте Lot)
  return (
    <>
      <Header searchInputRef={searchInputRef} />
      <main className="main"> {/* Используем общий класс main */}
        <Lot lot={foundLot} />
        {/* Возможно, здесь будет секция с похожими лотами или другая дополнительная информация */}
      </main>
      <Footer />
    </>
  );
};

export default OpenLotPage;