import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AddCardModalContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const AddCardModalContext = createContext<AddCardModalContextType | undefined>(undefined);

export const AddCardModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AddCardModalContext.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </AddCardModalContext.Provider>
  );
};

export const useAddCardModal = () => {
  const context = useContext(AddCardModalContext);
  if (!context) throw new Error('useAddCardModal must be used within AddCardModalProvider');
  return context;
};
