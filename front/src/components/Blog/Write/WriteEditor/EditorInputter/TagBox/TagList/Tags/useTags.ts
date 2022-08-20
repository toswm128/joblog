import useWrite from "hooks/write/useWrite";

const useTags = () => {
  const {
    WriteEditorState: { isTagBox, tagBoxFocusIdx },
    setLineText,
    closeTagBox,
    setTag2H1,
    setTag2H2,
    setTag2H3,
    setTag2A,
    setTag2Code,
    setTag2CallOut,
  } = useWrite();

  const selectTag = (setTag: (any: any) => any) => {
    if (typeof isTagBox === "number") {
      setTag(isTagBox);
      setLineText("", isTagBox);
      closeTagBox();
    }
  };
  const selectTagId = () => {
    if (typeof isTagBox === "number") {
      switch (tagBoxFocusIdx) {
        case 0:
          setTag2H1(isTagBox);
          break;
        case 1:
          setTag2H2(isTagBox);
          break;
        case 2:
          setTag2H3(isTagBox);
          break;
        case 3:
          setTag2A(isTagBox);
          break;
        case 4:
          setTag2Code(isTagBox);
          break;
        case 5:
          setTag2CallOut(isTagBox);
          break;
      }
      setLineText("", isTagBox);
      closeTagBox();
    }
  };

  return { selectTag, selectTagId };
};

export default useTags;
