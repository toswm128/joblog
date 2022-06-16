import BoardItem from "components/common/NewBlogs/BoardList/BoardItem";

interface IMainLoader {
  flex?: number;
}

const ScrollLoader = ({ flex }: IMainLoader) => {
  return (
    <>
      {flex &&
        Array.from({ length: flex }, (_, index) => index + 1).map((key) => (
          <BoardItem key={key} />
        ))}
    </>
  );
};

export default ScrollLoader;
