import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useSearchForm = (refetch: () => any, data: any) => {
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [isModal, setIsModal] = useState(false);
  const [selectIdx, setSelectIdx] = useState(-1);
  const [errText, setErrText] = useState("");
  const navigate = useNavigate();

  const debounceSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timer) clearTimeout(timer);
    const newTimer = setTimeout(async () => {
      if (e.target.value) {
        await refetch();
        setIsModal(true);
      }
    }, 800);
    setTimer(newTimer);
  };

  const selectSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    navigate(`/board/${data[selectIdx].idx}`);
    setIsModal(false);
    setSelectIdx(-1);
  };

  const KeyDownSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Escape":
        setIsModal(false);
        break;
      case "ArrowDown":
        selectIdx < data?.length - 1
          ? setSelectIdx((prev) => prev + 1)
          : setSelectIdx(0);
        break;
      case "ArrowUp":
        selectIdx > 0
          ? setSelectIdx((prev) => prev - 1)
          : setSelectIdx(data?.length - 1);
        break;
      case "Enter":
        selectIdx >= 0 && selectSearch(e);
        console.log(selectIdx, e.key);
    }
  };

  return {
    debounceSearch,
    KeyDownSearch,
    setErrText,
    selectIdx,
    errText,
    isModal,
    setIsModal,
  };
};

export default useSearchForm;
