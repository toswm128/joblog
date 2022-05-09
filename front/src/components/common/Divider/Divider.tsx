import { DividerContainer } from "./DividerStyle";

interface IDivder {
  children: JSX.Element;
}

const Divider = ({ children }: IDivder) => {
  return (
    <DividerContainer>
      <p></p>
      <span>{children}</span>
    </DividerContainer>
  );
};

export default Divider;
