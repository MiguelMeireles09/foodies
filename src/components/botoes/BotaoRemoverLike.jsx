import React, { useEffect, useRef } from 'react';

const BotaoRemoverLike = ({ isOpen, handleConfirm, handleCancel }) => {
  const popupRef = useRef(null);

  // Add event listener to handle click outside the popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && popupRef.current && !popupRef.current.contains(event.target)) {
        handleCancel(); // Close the dialog if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleCancel]);

  const handleYes = () => {
    handleConfirm(); // Call handleConfirm function passed as prop
  };

  const handleNo = () => {
    handleCancel(); // Call handleCancel function passed as prop
  }

  return (
    <div>
      {isOpen && (
        <div className="overlay">
          <div className="popup" ref={popupRef}>
            <p>Pretende remover dos favoritos?</p>
            <button onClick={handleYes}>Sim</button>
            <button onClick={handleNo}>Não</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BotaoRemoverLike;
