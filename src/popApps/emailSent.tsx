import React from 'react';
import './style.css'; // Using the common popup styles

interface EmailSentPopupProps {
  onClose: () => void;
}

const EmailSentPopup: React.FC<EmailSentPopupProps> = ({ onClose }) => {
  return (
    <div className='popup'>
      <button className='closeButton' onClick={onClose}>×</button>
      <h2 className='title'>EMAIL SENT</h2>
      <p className='description'>
        We've sent you an email with further instructions. Please check your inbox.
      </p>
      <button onClick={onClose} className='button primaryButton'>
        OK
      </button>
    </div>
  );
};

export default EmailSentPopup;