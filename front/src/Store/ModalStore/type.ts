export type ModalStateType = {
  isOpen: boolean;
  type: string;
  Modals: TModals;
};

export type TModals = Map<string, TModal>;

export type TModal = {
  type: string;
  titleText: string;
  content: string;
  status: number;
  button?: TButton[];
};

export type TButton = {
  title: string;
  fuc: () => any;
};
