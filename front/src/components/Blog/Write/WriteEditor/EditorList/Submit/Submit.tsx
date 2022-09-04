import useWrite from "hooks/write/useWrite";
import PutButton from "./Buttons/PutButton";
import PostButton from "./Buttons/PostButton";

interface ISubmit {
  dom: any[];
}

const Submit = ({ dom }: ISubmit) => {
  const {
    WriteEditorState: { putId },
  } = useWrite();
  return <>{putId ? <PutButton dom={dom} /> : <PostButton dom={dom} />}</>;
};

export default Submit;
