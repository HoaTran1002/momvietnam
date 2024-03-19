import { apiDeleteFaq, apiUpdateFaq } from '@/apis/faq.apis';
import Button from '@/components/Buttons';
import Input from '@/components/Input';
import ModalBox from '@/components/ModalBox';
import ModalMessage from '@/components/ModalMessage';
import {Paginate} from '@/components/Paginate/Paginate';
import Table, { ColumnsProps } from '@/components/Table';
import { useAlertMessage } from '@/contexts/AlertContext';
import { useFaqState } from '@/contexts/FaqContext';
import useFetch from '@/hooks/useFetch.hook';
import { IFaq } from '@/interface/faq.interface';
import React from 'react'
const ListData = (): JSX.Element => {
  const [isShowMessage, setIsShowMessage] = React.useState<boolean>(false);
  const [question, setQuestion] = React.useState<IFaq>({
    answer: "",
    question: ""
  })
  const { addAlert } = useAlertMessage()
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const { listFaq, setIsReset,page,setPage,total_pages } = useFaqState();
  const [_faqState, callFaqState] = useFetch();
  const headerColumns: ColumnsProps[] = [
    {
      field: "stt",
      headerName: "STT",
      header_content_center:true,
      content_center:true
    },
    {
      field: "question",
      headerName: "Câu hỏi",
      header_content_center:true
    },
    {
      field: "answer",
      headerName: "Câu trả lời",
      header_content_center:true
    },
    {
      field: "actions",
      type: "actions",
      headerName:"Tùy chọn",
      header_content_center:true,
      getActions: (param: IFaq) => [
        <Button key="delete" className="bg-gradient-to-br from-[#8a3fd9] to-[#c163ff] text-white" onClick={() => {
          setQuestion(param)
          setIsEdit(true)
        }
        } >
          Sửa
        </Button>,
        <Button
          key="edit" className="bg-gradient-to-br from-[#ff9393] to-[#ff3838] text-white"
          onClick={() => { setQuestion(param); setIsShowMessage(true) }}
        >
          Xóa
        </Button>,
      ],
    },
    {
      field: "_id",
      hidden: true,
    },
  ];
  const rows = listFaq?.map((r: IFaq, index: number) => ({
    stt: index + 1,
    question: r.question,
    answer: r.answer,
    _id: r._id
  })) || [];

  const handleEdit = () => {
    callFaqState(
      async () => {
        try {
          await apiUpdateFaq({
            _id: question._id,
            answer: question.answer,
            question: question.question
          })
          if (setIsReset)
            setIsReset(r => !r)
          await addAlert({
            title: "Thành công",
            message: "Sửa câu hỏi thành công",
            type: "success"
          })
        } catch {
          await addAlert({
            title: "Thất bại",
            message: "Đã bị lỗi trong quá trình sửa câu hỏi vui lòng thử lại sau",
            type: "error"
          })
        }
      }
    )
  }
  const handleDelete = () => {
    callFaqState(
      async () => {
        try {
          await apiDeleteFaq({ _id:question._id })
          if (setIsReset)
            setIsReset(r => !r)
          await addAlert({
            title: "Thành công",
            message: "Xóa câu hỏi thành công",
            type: "success"
          })
        } catch {
          await addAlert({
            title: "Thất bại",
            message: "Đã bị lỗi trong quá trình xóa câu hỏi vui lòng thử lại sau",
            type: "error"
          })
        }
      }
    )
    setIsShowMessage(false)
  }
  return (
    <>
    <div>
      <Table columns={headerColumns} rows={rows} />
      <div className='flex justify-end'>
        <Paginate
          total_pages={total_pages || 0}
          current={page || 0}
          onChangePage={(e)=>setPage&&setPage(e)}
        />
      </div>
    </div>
      {isShowMessage && (
        <ModalMessage
          content="Bạn muốn xóa câu hỏi này ? "
          isOk={handleDelete}
          isClose={() => setIsShowMessage(false)}
          title="Thông báo "
        />
      )}

      <ModalBox
        isOpen={isEdit}
        onClose={() => setIsEdit(false)}
        styleModalClass="w-[50vw] h-max"
      >
        <div className="py-10 px-5">
          <div className="py-3">
            <Input
              type="text"
              value={question.question}
              onChange={(e) => setQuestion((pre) => ({ ...pre, question: e.target.value }))}
              labelName="Câu hỏi ?"
              placeholder="ghi câu hỏi tại đây"
            />
            <Input
              type="text-area"
              value={question.answer}
              onChange={(e) => setQuestion((pre) => ({ ...pre, answer: e.target.value }))}
              labelName="Câu trả lời"
              placeholder="ghi câu trả lời tại đây"
            />
          </div>
          <div>
            <div className="flex justify-end items-center gap-5">
              <Button
                onClick={handleEdit}
                className="bg-gradient-to-br from-[#8a3fd9] to-[#c163ff] text-white"
              >
                Sửa câu hỏi
              </Button>
              <Button
                onClick={() => setIsEdit(false)}
                className="bg-gradient-to-br from-[#ff9f93] to-[#ff6854] text-white"
              >
                Trở về
              </Button>
            </div>
          </div>
        </div>
      </ModalBox>
    </>
  )
}
export default ListData
