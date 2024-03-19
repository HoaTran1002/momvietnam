import { useEffect } from "react";

const Pagetitle = ({ title }: { title: string }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
};

export default Pagetitle;
