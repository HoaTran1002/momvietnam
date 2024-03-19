import React from "react";
import ModalBox from "@/components/ModalBox";
import Input from "@/components/Input";
import { useAlertMessage } from "@/contexts/AlertContext";
import Button from "../Buttons";
import useFetch from "@/hooks/useFetch.hook";
import { IFaq } from "@/interface/faq.interface";
import { apiCreateFaq } from "@/apis/faq.apis";
import { useFaqState } from "@/contexts/FaqContext";
const AddFAQuestion = (): JSX.Element => {
  const initialFaq:IFaq ={
    answer: "",
    question: ""
  }
  const [open, setOpen] = React.useState<boolean>(false);
  const { addAlert } = useAlertMessage();
  const [question, setQuestion] = React.useState<IFaq>(initialFaq)
  const {setIsReset} = useFaqState();
  const [faqState, callFaqState] = useFetch();
  const handleOpenModel = (): void => {
    setOpen(true);
  };
  const handleCloseModel = (): void => {
    setOpen(false);
  };
  const handleAdd = (): void => {
    callFaqState(
      async () => {
        try {
          await apiCreateFaq(
            {
              answer: question.answer,
              question: question.question
            }
          )
          await addAlert({
            type: "success",
            title: "Thành công",
            message: "Thêm câu hỏi thành công",
          });
          if(setIsReset)
          setIsReset(r=>!r)
        } catch {
          addAlert({
            type: "error",
            title: "Thất bại",
            message: "Đã có lỗi trong quá trình thêm câu hỏi mới vui lòng thử lại sau",
          });
        }
      }
    )
  };
  return (
    <>
      <div className="my-2">
        <Button
          className="bg-gradient-to-br from-[#8a3fd9] to-[#c163ff] text-white "
          onClick={handleOpenModel}
          beforeIcon={<i className="ri-add-fill"></i>}
        >
          Thêm câu hỏi mới
        </Button>
      </div>
      <ModalBox
        isOpen={open}
        onClose={handleCloseModel}
        styleModalClass="w-[50vw] h-max"
      >
        <div className="py-10 px-5">
          <h2 className="text-3xl font-medium">Câu hỏi mới</h2>
          <div className="py-3">
            <Input
              type="text"
              labelName="Câu hỏi ?"
              value={question.question}
              onChange={(e) => setQuestion((pre) => ({ ...pre, question: e.target.value }))}
              placeholder="Ghi câu hỏi tại đây"
            />
            <Input
              type="text-area"
              value={question.answer}
              onChange={(e) => setQuestion((pre) => ({ ...pre, answer: e.target.value }))}
              labelName="Câu trả lời"
              placeholder="Ghi câu trả lời tại đây"
            />
          </div>
          <div>
            <div className="flex justify-end items-center gap-5">
              <Button
                onClick={handleAdd}
                className="bg-gradient-to-br from-[#8a3fd9] to-[#c163ff] text-white"
                isLoading={faqState?.loading}
                beforeIcon={<i className="ri-add-line"></i>}
              >
                Thêm câu hỏi mới
              </Button>
              <Button
                onClick={handleCloseModel}
                className="bg-gradient-to-br from-[#ff9f93] to-[#ff6854] text-white"
              >
                Trở về
              </Button>
            </div>
          </div>
        </div>
      </ModalBox>
    </>
  );
};
export default AddFAQuestion;
