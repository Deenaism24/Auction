import React, { createContext, useContext, useState, ReactNode } from 'react';

type AuthView =
  | 'login'
  | 'register'
  | 'forgot-password'
  | 'create-password'
  | 'email-sent'
  | null;

interface AuthModalContextType {
  open: (view: Exclude<AuthView, null>) => void;
  close: () => void;
  view: AuthView;
  isOpen: boolean;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export const AuthModalProvider = ({ children }: { children: ReactNode }) => {
  const [view, setView] = useState<AuthView>(null);

  const open = (v: Exclude<AuthView, null>) => setView(v);
  const close = () => setView(null);

  return (
    <AuthModalContext.Provider value={{ open, close, view, isOpen: view !== null }}>
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (!context) throw new Error('useAuthModal must be used within AuthModalProvider');
  return context;
};
