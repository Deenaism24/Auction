// src/contexts/ConfirmationModalContext.tsx
import React, { createContext, useContext, useState, ReactNode, useCallback, useRef } from 'react';
// Определение типа данных, предоставляемых контекстом модального окна подтверждения
interface ConfirmationModalContextType {
  isOpen: boolean; // Флаг: открыто ли модальное окно
  message: string | null; // Сообщение для отображения в модалке
  filename: string | null; // Имя файла (или другой объект), связанный с подтверждением
  openConfirmation: (message: string, filename: string) => Promise<boolean>; // Функция для открытия модалки и ожидания ответа
  _confirm: () => void; // Внутренняя функция для подтверждения (вызывается кнопкой "Да")
  _cancel: () => void; // Внутренняя функция для отмены (вызывается кнопкой "Нет" или закрытием)
  close: () => void; // Функция для закрытия модального окна (дублирует _cancel по логике закрытия)
}
// Создание контекста
const ConfirmationModalContext = createContext<ConfirmationModalContextType | undefined>(undefined);
// Компонент Provider, который оборачивает приложение и предоставляет контекст
export const ConfirmationModalProvider = ({ children }: { children: ReactNode }) => {
// Состояние для управления видимостью, сообщением и именем файла
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [filename, setFilename] = useState<string | null>(null);
// Реф для хранения функции resolve промиса, возвращаемого openConfirmation
// Позволяет выполнить resolve из обработчиков кнопок (_confirm, _cancel)
  const resolveRef = useRef<((confirmed: boolean) => void) | null>(null);
// Функция для открытия модалки. Возвращает Promise, который разрешится true/false.
  const openConfirmation = useCallback((msg: string, file: string): Promise<boolean> => {
    return new Promise((resolve) => {
      resolveRef.current = resolve; // Сохраняем функцию resolve в реф
      setMessage(msg); // Устанавливаем сообщение
      setFilename(file); // Устанавливаем имя файла
      setIsOpen(true); // Открываем модальное окно
    });
  }, []); // Зависимости пусты, т.к. resolveRef и setState стабильны
// Внутренняя функция, вызываемая при подтверждении ("Да")
  const _confirm = useCallback(() => {
    if (resolveRef.current) {
      resolveRef.current(true); // Разрешаем промис со значением true
    }
// Сбрасываем состояние и закрываем модалку
    setIsOpen(false);
    setMessage(null);
    setFilename(null);
    resolveRef.current = null; // Очищаем реф
  }, []); // Зависимости пусты
// Внутренняя функция, вызываемая при отмене ("Нет" или закрытие модалки)
  const _cancel = useCallback(() => {
    if (resolveRef.current) {
      resolveRef.current(false); // Разрешаем промис со значением false
    }
// Сбрасываем состояние и закрываем модалку
    setIsOpen(false);
    setMessage(null);
    setFilename(null);
    resolveRef.current = null; // Очищаем реф
  }, []); // Зависимости пусты
// Предоставление значения контекста, включая внутренние функции _confirm и _cancel
  return (
    <ConfirmationModalContext.Provider
      value={{
        isOpen,
        message,
        filename,
        openConfirmation,
        _confirm, // Доступны для компонента модалки подтверждения
        _cancel, // Доступны для компонента модалки подтверждения
        close: () => setIsOpen(false), // Простая функция закрытия (может использоваться извне, если не нужен resolve)
      }}
    >
      {children} {/* Вложенные компоненты */}
    </ConfirmationModalContext.Provider>
  );
};
// Хук для использования контекста модального окна подтверждения в компонентах
export const useConfirmationModal = () => {
  const context = useContext(ConfirmationModalContext);
// Проверка на использование хука внутри Provider
  if (!context) {
    throw new Error('useConfirmationModal must be used within a ConfirmationModalProvider');
  }
  return context; // Возвращает объект с состоянием и функциями управления модалкой
};