import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { CLOSE_MODAL, OPEN_MODAL } from "Store/ModalStore/action";
import { TModal } from "Store/ModalStore/type";
import { useTypedSelector } from "Store/rootReducer";

const useModal = () => {
  const dispatch = useDispatch();
  const ModalState = useTypedSelector((state) => state.Modal);

  const openModal = useCallback(
    (type: string, option?: TModal) =>
      dispatch({
        type: OPEN_MODAL,
        payload: { type, option },
      }),
    [dispatch]
  );

  const closeModal = useCallback(
    () =>
      dispatch({
        type: CLOSE_MODAL,
      }),
    [dispatch]
  );

  return { ModalState, openModal, closeModal };
};

export default useModal;
