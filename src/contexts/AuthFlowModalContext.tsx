import React, { createContext, useContext, useState, ReactNode } from 'react';

type AuthView =
  | 'login'
  | 'register'
  | 'forgot-password'
  | 'create-password'
  | 'email-sent'
  | null;

interface AuthModalContextType {
  open: (view: Exclude<AuthView, null>, data?: any) => void;
  close: () => void;
  view: AuthView;
  isOpen: boolean;
  data?: any;
}


const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export const AuthModalProvider = ({ children }: { children: ReactNode }) => {
  const [view, setView] = useState<AuthView>(null);
  const [data, setData] = useState<any>(null);

  const open = (v: Exclude<AuthView, null>, d?: any) => {
    setView(v);
    setData(d || null);
  };

  const close = () => {
    setView(null);
    setData(null);
  };

  return (
    <AuthModalContext.Provider value={{ open, close, view, isOpen: view !== null, data }}>
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (!context) throw new Error('useAuthModal must be used within AuthModalProvider');
  return context;
};
