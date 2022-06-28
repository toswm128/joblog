import reactDom from "react-dom";

const ModalPortal = ({ children }: { children?: JSX.Element }) => {
  const el = document.getElementById("modal");
  return el && reactDom.createPortal(children, el);
};

export default ModalPortal;
