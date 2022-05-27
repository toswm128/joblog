import { InputContainer } from "components/common/styleObject/InputStyle";
import React, { useCallback } from "react";
import {
  AuthInputContainer,
  ErrMsgContainer,
  SuccessMsgContainer,
} from "./AuthInputStyle";

interface IAuthInput {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: string;
  reg: RegExp;
  errMsg: string;
  successMsg?: string;
}

const AuthInput = ({
  value,
  onChange,
  placeholder,
  type,
  reg,
  errMsg,
  successMsg,
}: IAuthInput) => {
  const tags = { value, onChange, placeholder, type };
  const cheackValue = () => {
    return reg.test(value) ? (
      <SuccessMsgContainer>{successMsg}</SuccessMsgContainer>
    ) : (
      <ErrMsgContainer>{errMsg}</ErrMsgContainer>
    );
  };

  return (
    <AuthInputContainer>
      <InputContainer {...tags} />
      {value && cheackValue()}
    </AuthInputContainer>
  );
};

export default AuthInput;
