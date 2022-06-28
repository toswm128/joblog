import { ModalStateType, TModal, TModals } from "./type";
const Modals: TModals = new Map();

const defaultModal: TModal = {
  type: "default",
  titleText: "",
  content: "",
  status: 0,
  button: [
    {
      title: "",
      fuc: () => {},
    },
  ],
};

const err500Modal: TModal = {
  type: "default",
  titleText: "서버 오류",
  content: "현재 서버가 불안정하여 나중에 다시 시도해 주세요",
  status: 500,
  button: [
    {
      title: "새로고침",
      fuc: () => {},
    },
  ],
};

const err400Modal: TModal = {
  type: "default",
  titleText: "입력값이 유효하지 않습니다.",
  content: "입력값을 확인 해 주세요",
  status: 400,
  button: [
    {
      title: "닫기",
      fuc: () => {},
    },
  ],
};

Modals.set("default", defaultModal);
Modals.set("err500", err500Modal);
Modals.set("err400", err400Modal);

const ModalState: ModalStateType = {
  isOpen: false,
  type: "default",
  Modals,
};

export default ModalState;
