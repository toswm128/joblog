import { useState } from "react";

const useModal = (initialState: boolean) => {
  const [isModal, setIsModal] = useState(initialState);

  const showModal = () => {
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
  };

  return { isModal, showModal, closeModal };
};

export default useModal;
