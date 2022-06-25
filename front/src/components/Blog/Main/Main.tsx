import useModal from "hooks/modal";
import NewBlogs from "components/common/NewBlogs";
import { defaultBreakPoints } from "assets/breakpoints/breakpoints";
import useBlogAPI from "assets/API/useBlogAPI";

const Main = () => {
  const { isModal, showModal, closeModal } = useModal(false);
  const { getBlog } = useBlogAPI();
  return (
    <NewBlogs
      isModal={isModal}
      showModal={showModal}
      closeModal={closeModal}
      breakpoints={defaultBreakPoints}
      infiniteFuc={getBlog}
      querykey={"blogs"}
    />
  );
};

export default Main;
