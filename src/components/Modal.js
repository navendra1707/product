import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-[90vw] mx-4 max-h-[70vh] overflow-auto">
          <button
            className="absolute top-3 right-3 text-gray-600 text-2xl leading-none"
            onClick={onClose}
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
