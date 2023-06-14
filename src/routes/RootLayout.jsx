import { createContext } from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { useState } from 'react';

const modalContext = createContext();

function RootLayout() {
  
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <modalContext.Provider value={{ isOpen, openModal, closeModal }}>
        <Header />
        <Outlet context={'hi'}/>
      </modalContext.Provider>
    </>
  );
}

export default RootLayout;
export {modalContext};
