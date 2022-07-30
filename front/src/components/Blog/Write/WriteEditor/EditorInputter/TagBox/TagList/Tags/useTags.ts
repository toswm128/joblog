import useWrite from "hooks/write/useWrite";

const useTags = () => {
  const {
    WriteEditorState: { isTagBox },
    setLineText,
    closeTagBox,
  } = useWrite();
  const selectTag = (setTag: (any: any) => any) => {
    if (typeof isTagBox === "number") {
      setTag(isTagBox);
      setLineText("", isTagBox);
      closeTagBox();
    }
  };

  return { selectTag };
};

export default useTags;
