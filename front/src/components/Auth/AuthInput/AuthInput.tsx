import { InputContainer } from "components/common/styleObject/InputStyle";
import React, { useState } from "react";
import {
  AuthInputContainer,
  ErrMsgContainer,
  SuccessMsgContainer,
} from "./AuthInputStyle";

interface IAuthInput {
  updateValue: (value: string) => void;
  placeholder: string;
  type: string;
  reg: RegExp;
  errMsg: string;
  successMsg?: string;
}

const AuthInput = ({
  updateValue,
  placeholder,
  type,
  reg,
  errMsg,
  successMsg,
}: IAuthInput) => {
  const [value, setValue] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const tags = { value, onChange, placeholder, type };

  const cheackValue = () => {
    if (reg.test(value)) {
      updateValue(value);
      return <SuccessMsgContainer>{successMsg}</SuccessMsgContainer>;
    } else {
      updateValue("");
      return <ErrMsgContainer>{errMsg}</ErrMsgContainer>;
    }
  };

  return (
    <AuthInputContainer>
      <InputContainer {...tags} />
      {value && cheackValue()}
    </AuthInputContainer>
  );
};

export default AuthInput;
