import React, { useState, useRef } from 'react';
import './QRCodeModal.css';

const QRCodeModal = ({ show, onClose, children }) => {
  const [isSwipedUp, setIsSwipedUp] = useState(false); // Track swipe up state
  const modalContentRef = useRef(null);

  // Handle swipe up/down based on touch events
  const handleTouchStart = (e) => {
    modalContentRef.current.startY = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    const deltaY = e.touches[0].clientY - modalContentRef.current.startY;
    if (deltaY > 100) {
      setIsSwipedUp(false); // Swipe down to dismiss
    } else if (deltaY < -100) {
      setIsSwipedUp(true); // Swipe up to reveal
    }
  };

  const handleToggleSwipe = () => {
    setIsSwipedUp(!isSwipedUp);
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-content ${isSwipedUp ? 'swipe-up' : ''}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        ref={modalContentRef}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <div className="modal-header">
          <div className="swipe-indicator" onClick={handleToggleSwipe}>
            <span>{isSwipedUp ? '↓' : '↑'}</span>
          </div>
          <button className="modal-close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;
