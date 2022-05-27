import { useState } from "react";

const useModal = (initialState: boolean) => {
  const [isModal, setIsModal] = useState(initialState);
  const [status, setStatus] = useState<number>(0);

  const showModal = (status?: number) => {
    setIsModal(true);
    status ? setStatus(status) : setStatus(0);
  };

  const closeModal = () => {
    setIsModal(false);
  };

  return { isModal, showModal, closeModal, status };
};

export default useModal;
