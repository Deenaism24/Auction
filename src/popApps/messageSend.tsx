import React from 'react';
import './style.css';

interface MessageSendProps {
  onClose: () => void;
}

const MessageSend: React.FC<MessageSendProps> = ({ onClose }) => {
  return (
    <div className='popup'>
      <button className='closeButton' onClick={onClose}>×</button>
      <h2 className='title'>ПИСЬМО ОТПРАВЛЕНО</h2>
      <p className='description'>
        На указанный Вами электронный адрес отправлено письмо с инструкцией по восстановлению пароля.
      </p>
      <button onClick={onClose} className='button primaryButton'>
        Хорошо
      </button>
    </div>
  );
};

export default MessageSend;