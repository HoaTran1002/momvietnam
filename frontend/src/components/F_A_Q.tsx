import React from "react";
export interface IPropsFAQuestion {
  question: string;
  answer: string;
}
const FAQuestion = ({ ...props }: IPropsFAQuestion): JSX.Element => {
  const [show, setShow] = React.useState<boolean>(false);
  const handelShowQuestion = (): void => {
    setShow((r) => !r);
  };
  return (
    <div
      className="py-3 px-4 cursor-pointer rounded-md transition-all duration-500  border border-solid border-[#9eb26c] bg-white"
      onClick={handelShowQuestion}
    >
      <div className=" flex items-center justify-between ">
        <span className="text-[#7b8b58] text-xl font-semibold">{props.question}</span>
        <span
          className={`${show ? "rotate-90 " : ""
            } transition-all ml-2`}
        >
          <i
            className={`text-[#7b8b58] ${show
                ? "rotate-45 ri-arrow-drop-right-fill"
                : "ri-arrow-drop-right-fill"
              } text-5xl`}
          ></i>
        </span>
      </div>
      <div
        className={`transition-all duration-300 ${show ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden `}
      >
        <div className="relative mt-4 mb-4">
          <span className="inline-block absolute rounded-md w-[3px] h-full top-0 left-4 bottom-0 bg-[#4141416a]">

          </span>
          <p className="pl-10 py-3 text-[#647147]">{props.answer}</p>

        </div>
      </div>
    </div>
  );
};
export default FAQuestion;
