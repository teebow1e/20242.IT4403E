import React, { useEffect } from 'react';

function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
      window.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.body.style.overflow = 'auto'; // Restore scrolling when modal is closed
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      <div className="flex items-center justify-center min-h-screen p-4">
        <div
          className="relative bg-white rounded-lg shadow-xl max-w-3xl mx-auto z-10"
          onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
