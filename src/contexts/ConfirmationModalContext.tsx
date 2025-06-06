// src/contexts/ConfirmationModalContext.tsx
import React, { createContext, useContext, useState, ReactNode, useCallback, useRef } from 'react';

interface ConfirmationModalContextType {
  isOpen: boolean;
  message: string | null;
  filename: string | null;
  openConfirmation: (message: string, filename: string) => Promise<boolean>;
  _confirm: () => void;
  _cancel: () => void;
  close: () => void;
}

const ConfirmationModalContext = createContext<ConfirmationModalContextType | undefined>(undefined);

export const ConfirmationModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [filename, setFilename] = useState<string | null>(null);

  // !!! ИСПРАВЛЕНИЕ: Инициализируем useRef с null и включаем null в тип функции
  const resolveRef = useRef<((confirmed: boolean) => void) | null>(null);


  const openConfirmation = useCallback((msg: string, file: string): Promise<boolean> => {
    return new Promise((resolve) => {
      // Присваиваем функцию resolve рефу
      resolveRef.current = resolve; // Теперь TypeScript знает, что resolveRef.current может быть null, но мы присваиваем ему функцию типа (confirmed: boolean) => void

      setMessage(msg);
      setFilename(file);
      setIsOpen(true);
    });
  }, []); // Зависимости пусты, так как resolveRef и setState стабильны

  // Функция вызывается при нажатии "Да"
  const _confirm = useCallback(() => {
    // !!! ИСПРАВЛЕНИЕ: Проверяем, что resolveRef.current существует перед вызовом
    if (resolveRef.current) {
      resolveRef.current(true); // Вызываем resolve промиса с true
    }
    // Сбрасываем состояние и закрываем попап
    setIsOpen(false);
    setMessage(null);
    setFilename(null);
    resolveRef.current = null; // Сбрасываем реф
  }, []); // Зависимости пусты, так как setState и resolveRef стабильны

  // Функция вызывается при нажатии "Нет" или закрытии попапа
  const _cancel = useCallback(() => {
    // !!! ИСПРАВЛЕНИЕ: Проверяем, что resolveRef.current существует перед вызовом
    if (resolveRef.current) {
      resolveRef.current(false); // Вызываем resolve промиса с false
    }
    // Сбрасываем состояние и закрываем попап
    setIsOpen(false);
    setMessage(null);
    setFilename(null);
    resolveRef.current = null; // Сбрасываем реф
  }, []); // Зависимости пусты

  return (
    <ConfirmationModalContext.Provider
      value={{
        isOpen,
        message,
        filename,
        openConfirmation,
        _confirm,
        _cancel,
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </ConfirmationModalContext.Provider>
  );
};

export const useConfirmationModal = () => {
  const context = useContext(ConfirmationModalContext);
  if (!context) {
    throw new Error('useConfirmationModal must be used within a ConfirmationModalProvider');
  }
  return context;
};