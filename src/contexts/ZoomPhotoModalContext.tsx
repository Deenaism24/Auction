import React, { createContext, useContext, useState, ReactNode } from 'react';
// Определение типа данных, предоставляемых контекстом модального окна увеличения фото
interface ZoomPhotoModalContextType {
  isOpen: boolean; // Флаг: открыто ли модальное окно
  imageUrl: string | null; // URL изображения для отображения (null, если не открыто)
  open: (url: string) => void; // Функция для открытия модального окна с изображением
  close: () => void; // Функция для закрытия модального окна
}
// Создание контекста
const ZoomPhotoModalContext = createContext<ZoomPhotoModalContextType | undefined>(undefined);
// Компонент Provider, который оборачивает приложение и предоставляет контекст
export const ZoomPhotoModalProvider = ({ children }: { children: ReactNode }) => {
// Состояние для хранения URL изображения. Если null, модальное окно закрыто.
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  return (
// Предоставление значения контекста
    <ZoomPhotoModalContext.Provider
      value={{
        isOpen: !!imageUrl, // Является открытым, если imageUrl не null
        imageUrl, // Текущий URL изображения
        open: (url: string) => setImageUrl(url), // Установка URL изображения для открытия
        close: () => setImageUrl(null), // Сброс URL изображения для закрытия
      }}
    >
      {children} {/* Вложенные компоненты, имеющие доступ к контексту */}
    </ZoomPhotoModalContext.Provider>
  );
};
// Хук для использования контекста модального окна увеличения фото в компонентах
export const useZoomPhotoModal = () => {
  const context = useContext(ZoomPhotoModalContext);
// Проверка на использование хука внутри Provider
  if (!context) throw new Error('useZoomPhotoModal must be used within ZoomPhotoModalProvider');
  return context; // Возвращает объект с состоянием и функциями управления модалкой
};