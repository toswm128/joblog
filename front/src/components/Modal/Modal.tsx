import DefaultButton from "../common/Buttons/DefaultButton";
import { ModalCard, ModalContainer } from "./ModalStyle";
import reactDom from "react-dom";
import useModal from "hooks/modal";
import { useState } from "react";

const ModalPortal = ({ children }: { children: JSX.Element }) => {
  const el = document.getElementById("modal");
  return el && reactDom.createPortal(children, el);
};

// interface IModal {
//   isModal?: boolean;
//   title: string;
//   buttonText: string;
//   btnClick: () => void;
//   backgroundClick?: () => void;
//   children: JSX.Element;
// }

const Modal = () => {
  const { ModalState, closeModal } = useModal();
  const { isOpen, type, Modals } = ModalState;
  const modal = Modals.get(type);

  // const modalContent = () => {
  //   switch (modal?.type) {
  //     case "default":
  //       return <span>{modal?.contentText}</span>;
  //     case "text":
  //       const content = modal?.content;
  //       console.log(content);
  //       return <input {...content} type="text" />;
  //     case "file":
  //       return <input type="file" />;
  //   }
  // };
  console.log(isOpen);

  return (
    <ModalPortal>
      <>
        {isOpen ? (
          <ModalContainer
            onClick={(e) => e.currentTarget === e.target && closeModal()}
          >
            <ModalCard>
              <h2>{modal?.titleText}</h2>
              <span>{modal?.content}</span>
              {modal?.button?.map((button, key) => (
                <DefaultButton
                  key={key}
                  onClick={button.fuc}
                  isAbled={true}
                  size={"L"}
                >
                  <>{button.title}</>
                </DefaultButton>
              ))}
            </ModalCard>
          </ModalContainer>
        ) : (
          <></>
        )}
      </>
    </ModalPortal>
  );
};
export default Modal;
