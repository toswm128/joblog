import { useEffect, useRef, useState } from "react";

interface IViewObserver {
  observerFuc: () => any;
}

const ViewObserver = ({ observerFuc }: IViewObserver) => {
  const target = useRef<any>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry], observer) => {
        if (entry.isIntersecting) observerFuc();
      },
      { threshold: 1 }
    );
    observer.observe(target.current);
    return () => observer.disconnect();
  }, []);

  return <div ref={target}></div>;
};

export default ViewObserver;
