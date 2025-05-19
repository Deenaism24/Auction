import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DeleteFavoriteModalContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const DeleteFavoriteModalContext = createContext<DeleteFavoriteModalContextType | undefined>(undefined);

export const DeleteFavoriteModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DeleteFavoriteModalContext.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </DeleteFavoriteModalContext.Provider>
  );
};

export const useDeleteFavoriteModal = () => {
  const context = useContext(DeleteFavoriteModalContext);
  if (!context) throw new Error('useDeleteFavoriteModal must be used within DeleteFavoriteModalProvider');
  return context;
};
