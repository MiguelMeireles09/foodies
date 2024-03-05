import React from 'react';

export default function BotaoRemoverLike({ isOpen, handleConfirm, handleCancel }) {
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
          <div className="popup">
            <p>Pretende remover dos favoritos?</p>
            <button onClick={handleYes}>Sim</button>
            <button onClick={handleNo}>Não</button>
          </div>
        </div>
      )}
    </div>
  );
}





