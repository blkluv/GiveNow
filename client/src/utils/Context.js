import React, { useState, createContext } from 'react';

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <ModalContext.Provider value={{ showModal, toggleModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
