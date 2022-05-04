import React from "react";
import { AuthContainer, AuthComponents } from "./AuthStyle";
import logo from "assets/png/jobl_logo.png";

interface IAuthForm {
  children: JSX.Element;
  submit: () => Promise<void>;
}

const AuthForm: React.FC<IAuthForm> = ({ children, submit }) => {
  return (
    <AuthContainer>
      <AuthComponents
        onSubmit={e => {
          e.preventDefault();
          submit();
        }}
      >
        <img src={logo} alt="" />
        {children}
      </AuthComponents>
    </AuthContainer>
  );
};

export default AuthForm;
