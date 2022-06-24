import { InputContainer } from "components/common/styleObject/InputStyle";
import React, { useEffect, useState } from "react";
import {
  AuthInputContainer,
  ErrMsgContainer,
  SuccessMsgContainer,
} from "./AuthInputStyle";

interface IAuthInput {
  setValue: (value: any) => any;
  placeholder: string;
  type: string;
  reg: RegExp;
  errMsg: string;
  successMsg?: string;
}

const AuthInput = ({
  setValue,
  placeholder,
  type,
  reg,
  errMsg,
  successMsg,
}: IAuthInput) => {
  const [value, setThisValue] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThisValue(e.target.value);
    setValue(e.target.value);
  };

  const tags = { value, onChange, placeholder, type };

  useEffect(() => {
    if (reg.test(value)) {
      setValue(value);
      setIsSuccess(true);
    } else {
      setValue("");
      setIsSuccess(false);
    }
  }, [reg, setValue, value]);

  return (
    <AuthInputContainer>
      <InputContainer {...tags} />
      {isSuccess ? (
        <SuccessMsgContainer>{successMsg}</SuccessMsgContainer>
      ) : (
        <ErrMsgContainer>{errMsg}</ErrMsgContainer>
      )}
    </AuthInputContainer>
  );
};

export default AuthInput;
