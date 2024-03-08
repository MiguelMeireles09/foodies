import React, { useEffect, useRef } from "react";

const BotaoRemoverReceitaAdmin = ({ isOpen, handleConfirm, handleCancel , handleDelete }) => {
  const popupRef = useRef(null);

  // Add event listener to handle click outside the popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        popupRef.current &&
        !popupRef.current.contains(event.target)
      ) {
        handleCancel(); // Close the dialog if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleCancel]);

  const handleYes = () => {
    handleConfirm(); // Call handleConfirm function passed as prop
  };

  const handleNo = () => {
    handleCancel(); // Call handleCancel function passed as prop
  };

  const handleDeleteReceita = () => {
    handleDelete();
  }

  return (
    <div>
      {isOpen && (
        <div className="overlay">
          <div className="popup" ref={popupRef}>
            <p className="pt-6 px-7 pb-2 text-center">O que pretende fazer?</p>
            <div className="w-full flex justify-center">
              <button
                className="buttonYes py-3 px-4 border-t-2 border-gray-300 border-r-2 text-verde font-bold "
                onClick={handleYes}
              >
                Aprovar
              </button>
              <button
                className="buttonNo py-3 px-4 border-t-2 border-gray-300  font-bold text-black"
                onClick={handleNo}
              >
                Cancelar
              </button>
              <button
                className="buttonNo py-3 px-4 border-t-2 border-l-2 border-gray-300 font-bold text-red-500"
                onClick={handleDeleteReceita}
              >
                Apagar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BotaoRemoverReceitaAdmin;
