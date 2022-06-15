import useModal from "hooks/modal";
import NewBlogs from "components/common/NewBlogs";
import { defaultBreakPoints } from "assets/breakpoints/breakpoints";

const Main = () => {
  const { isModal, showModal, closeModal } = useModal(false);

  return (
    <NewBlogs
      isModal={isModal}
      showModal={showModal}
      closeModal={closeModal}
      breakpoints={defaultBreakPoints}
    />
  );
};

export default Main;
