import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ZoomPhotoModalContextType {
  isOpen: boolean;
  imageUrl: string | null;
  open: (url: string) => void;
  close: () => void;
}

const ZoomPhotoModalContext = createContext<ZoomPhotoModalContextType | undefined>(undefined);

export const ZoomPhotoModalProvider = ({ children }: { children: ReactNode }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  return (
    <ZoomPhotoModalContext.Provider
      value={{
        isOpen: !!imageUrl,
        imageUrl,
        open: (url: string) => setImageUrl(url),
        close: () => setImageUrl(null),
      }}
    >
      {children}
    </ZoomPhotoModalContext.Provider>
  );
};

export const useZoomPhotoModal = () => {
  const context = useContext(ZoomPhotoModalContext);
  if (!context) throw new Error('useZoomPhotoModal must be used within ZoomPhotoModalProvider');
  return context;
};
