import DefaultButton from "../Buttons/DefaultButton";
import { ModalCard, ModalContainer } from "./ModalStyle";
import reactDom from "react-dom";

const ModalPortal = ({ children }: { children: JSX.Element }) => {
  const el = document.getElementById("modal");
  return el && reactDom.createPortal(children, el);
};

interface IModal {
  isModal?: boolean;
  title: string;
  buttonText: string;
  btnClick: () => void;
  backgroundClick?: () => void;
  children: JSX.Element;
}

const Modal = ({
  isModal,
  title,
  buttonText,
  btnClick,
  backgroundClick,
  children,
}: IModal) => {
  return (
    <ModalPortal>
      <>
        {isModal ? (
          <ModalContainer
            onClick={(e) =>
              e.currentTarget === e.target &&
              backgroundClick &&
              backgroundClick()
            }
          >
            <ModalCard>
              <h2>{title}</h2>
              <span>{children}</span>
              <DefaultButton onClick={btnClick} isAbled={true} size={"L"}>
                <>{buttonText}</>
              </DefaultButton>
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
