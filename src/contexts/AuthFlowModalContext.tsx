import React, { createContext, useContext, useState, ReactNode } from 'react';
// Определение типа возможных представлений в модальном окне (login, register и т.д.)
type AuthView =
  | 'login' // Вход
  | 'register' // Регистрация
  | 'forgot-password' // Забыли пароль
  | 'create-password' // Создать новый пароль
  | 'email-sent' // Email отправлен
  | null; // Модалка закрыта
// Определение типа данных, предоставляемых контекстом модального окна авторизации/аутентификации
interface AuthModalContextType {
  open: (view: Exclude<AuthView, null>, data?: any) => void; // Функция для открытия модалки с определенным представлением и опциональными данными
  close: () => void; // Функция для закрытия модального окна
  view: AuthView; // Текущее активное представление в модалке
  isOpen: boolean; // Флаг: открыто ли модальное окно (view не null)
  data?: any; // Опциональные данные, передаваемые при открытии (предзаполненные поля)
}
// Создание контекста
const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);
// Компонент Provider, который оборачивает приложение и предоставляет контекст
export const AuthModalProvider = ({ children }: { children: ReactNode }) => {
// Состояние для хранения текущего представления модалки и опциональных данных
  const [view, setView] = useState<AuthView>(null); // По умолчанию модалка закрыта
  const [data, setData] = useState<any>(null); // По умолчанию данных нет
// Функция для открытия модального окна с указанным представлением и данными
  const open = (v: Exclude<AuthView, null>, d?: any) => {
    setView(v); // Устанавливаем новое представление
    setData(d || null); // Устанавливаем данные (или null, если данных нет)
  };
// Функция для закрытия модального окна (сбрасывает представление и данные)
  const close = () => {
    setView(null); // Сбрасываем представление (закрывает модалку)
    setData(null); // Сбрасываем данные
  };
// Предоставление значения контекста
  return (
    <AuthModalContext.Provider value={{ open, close, view, isOpen: view !== null, data }}>
      {children} {/* Вложенные компоненты, имеющие доступ к контексту */}
    </AuthModalContext.Provider>
  );
};
// Хук для использования контекста модального окна авторизации/аутентификации в компонентах
export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
// Проверка на использование хука внутри Provider
  if (!context) throw new Error('useAuthModal must be used within AuthModalProvider');
  return context; // Возвращает объект с состоянием (текущее представление) и функциями open/close
};