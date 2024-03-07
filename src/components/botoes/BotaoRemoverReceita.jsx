import React, { useEffect, useRef } from "react";

const BotaoRemoverReceita = ({ isOpen, handleConfirm, handleCancel }) => {
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

  return (
    <div>
      {isOpen && (
        <div className="overlay">
          <div className="popup" ref={popupRef}>
            <p className="pt-6 px-7 pb-2">Pretender apagar a receita?</p>
            <div className="w-full flex justify-center">
              <button
                className="buttonYes py-3 border-t-2 border-gray-300 border-r-2 text-verde font-bold "
                onClick={handleYes}
              >
                Sim
              </button>
              <button
                className="buttonNo py-3 border-t-2 border-gray-300  font-bold text-red-500"
                onClick={handleNo}
              >
                Não
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BotaoRemoverReceita;
