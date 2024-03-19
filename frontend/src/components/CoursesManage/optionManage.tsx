import React from 'react'
import Button from '../Buttons'
import Input from '../Input'
import Table, { ColumnsProps } from '../Table'
import ModalMessage from '../ModalMessage'
import ModalBox from '../ModalBox'
import { ICategory } from '@/interface/category.interface'
import Tooltip from '../Tooltip'
interface IOptionManage{
    handleChangeCategory:(e:ICategory[])=>void
    listOption?:ICategory[]
}
const OptionManage = ({listOption,handleChangeCategory}:IOptionManage): JSX.Element => {

    const [options, setOptions] = React.useState<ICategory[]>(listOption||[])
    const [optionName, setOptionName] = React.useState<ICategory | undefined>(undefined)
    const [optionItems, setOptionItems] = React.useState([{}])
    const [optionIndex, setOptionIndex] = React.useState<number>(0)
    const [optionItemIndex, setOptionItemIndex] = React.useState<number>(0)
    const [optionItemRenameStatus, setOptionItemRenameStatus] = React.useState<boolean>(false)
    const [deleteOption, setDeleteOption] = React.useState<boolean>(false)
    const [deleteOptionItem, setDeleteOptionItem] = React.useState<boolean>(false)
    const [updateOptionItem, setUpdateOptionItem] = React.useState<boolean>(false)
    const [optionItemRename, setOptionItemRename] = React.useState<string>('')
    const [optionItemName, setOptionItemName] = React.useState('')
    const [optionItemSelect, setOptionItemSelect] = React.useState<string>('')
    const [optionSelect, setOptionSelect] = React.useState<string>('')
    const listOptionsItems: ColumnsProps[] = [
        {
            field: "id",
            headerName: "STT"
        },
        {
            field: "timeUp",
            headerName: "Mốc thời gian"
        },
        {
            field: "actions",
            headerName: "Thao tác",
            type: "actions",
            getActions: (param: any) => [
                <Button
                    key="delete" className="bg-gradient-to-br from-[#8a3fd9] to-[#c163ff] text-white"
                    onClick={() => { setUpdateOptionItem(true); setOptionItemSelect(param.timeUp) }}
                >
                    Sửa
                </Button>,
                <Button
                    key="edit"
                    className="bg-gradient-to-br from-[#ff8d8d] to-[#ff0000] text-white"
                    onClick={() => handleAlertDeleteOptionItem(param.timeUp,param.id)}
                >
                    Xóa
                </Button>,
            ],
        },
    ]

    const handleAddOption = () => {
        if(optionName?.name !== ""){
            setOptions((pre) => ([...pre, { name: optionName?.name, listTimeLearning: [] }]))
            setOptionName(undefined)
            setOptionItemRenameStatus(false)
        }
    }
    const handleChangeOptionTab = (name: string) => {
        setOptionItemRename(name)
        setOptionItemRenameStatus(true)
    }

    const handleChosesTab = (index: number, name: string) => {
        setOptionIndex(index)
        setOptionSelect(name)
        setOptionItemRenameStatus(false)
    }
    const handleChangeOptionItems = () => {
        const option = options.find((_r: ICategory,index:number) => index === optionIndex);
        const rows = option?.listTimeLearning?.map((r: string, index: number) => {
            const id = index + 1
            const timeUp = r || "";
            return { id, timeUp };
        }) || [];
        setOptionItems(rows)
    }
    const handleAddOptionItem = () => {
        if(optionItemName !== ""){
            const option = options.find((_r: ICategory,index:number) => index === optionIndex);
            option?.listTimeLearning?.push(optionItemName)
            setOptionItemName('')
            handleChangeOptionItems()
        }
    }


    const handleAlertDeleteOptionItem = (name: string,index:number) => {
        setOptionItemIndex(index - 1)
        
        setOptionItemSelect(name)
        setDeleteOptionItem(true)
    }
    const handleDeleteOption = () => {
        const newCategory = options.filter((_cate:ICategory,index:number)=> index !== optionIndex)
        setOptions(newCategory)
        setDeleteOption(false)
        setOptionItemRenameStatus(false)
    }
    const handleDeleteOptionItem = () => {
        const newCategory = options.map((_cate: ICategory, index: number) => {
            if (index === optionIndex) {
                return {
                    ..._cate,
                    listTimeLearning: _cate.listTimeLearning?.filter((_value: string, i: number) => (i !== optionItemIndex ))
                };
            }
            return _cate;
        }).filter(Boolean); 
    
        setOptions(newCategory);
        setDeleteOptionItem(false)
    }
    const handleUpdateOption = () => {
        const newCategory = options.find((_cate: ICategory, index: number) => index === optionIndex);
        if (newCategory) {
            newCategory.name = optionItemRename;
    
            const newOptions = options.map((_cate: ICategory, index: number) =>
                index === optionIndex ? newCategory : _cate
            );
            setOptions(newOptions);
        }
        setOptionItemRenameStatus(false);
    };
    
    const handleUpdateOptionItem = () => {
        const newCategory = options.map((_cate: ICategory, index: number) => {
            if (index === optionIndex) {
                return {
                    ..._cate,
                    listTimeLearning: _cate.listTimeLearning?.map((value: string, i: number) => (i === optionItemIndex ? optionItemSelect : value))
                };
            }
            return _cate;
        }).filter(Boolean); 
    
        setOptions(newCategory);
        setOptionItemRenameStatus(false);
        setUpdateOptionItem(false);
    };
    
    
    React.useEffect(() => {
        handleChangeOptionItems()
    }, [optionIndex,updateOptionItem,listOption,options])
    React.useEffect(()=>{
        handleChangeCategory(options)
    },[options,optionItemRenameStatus])
    React.useEffect(()=>{
        if(listOption){
            setOptions(listOption)
            handleChangeOptionItems()
        }
    },[listOption])
    return (
        <div className='bg-white p-5 rounded-lg mt-8'>
            <h2 className="text-3xl font-medium">Danh mục khóa học </h2>
            <div className='flex gap-3 items-center mt-5'>
                <div className='flex items-center  gap-4 bg-gray-100 p-3 rounded-sm'>
                    <Input
                        value={optionName?.name}
                        placeholder='Nhập tên danh mục vào đây'
                        className='w-[300px]'
                        onChange={(e) => setOptionName((pre) => ({ ...pre, name: e.target.value }))}
                    />
                    <div>
                        <Button
                            beforeIcon={<i className="ri-add-line"></i>}
                            className='bg-gradient-to-br  from-[#8a3fd9] to-[#c163ff] text-white'
                            onClick={() => handleAddOption()}
                        >
                            Thêm danh mục mới
                        </Button>
                    </div>
                </div>
            </div>
            <div className='mt-4 grid grid-cols-12'>
                <div className='flex flex-col col-span-5 ' >
                    {
                        optionItemRenameStatus ? (
                            options?.map((r: ICategory, index: number) => (
                               index === optionIndex ? (
                                    <div key={r._id} className='inline-flex gap-2 text-3xl px-5 py-2 rounded-none bg-gray-100 '>
                                        <Input
                                            className='text-base'
                                            value={optionItemRename}
                                            onChange={(e) => setOptionItemRename(e.target.value)}
                                        />
                                        <div className='text-sm flex items-center gap-3'>
                                            <Button
                                                className='bg-gradient-to-br  from-[#8a3fd9] to-[#c163ff] text-white'
                                                onClick={handleUpdateOption}
                                            >
                                                Sửa
                                            </Button>
                                            <Button
                                                className='bg-gradient-to-br from-[#ff8d8d] to-[#ff0000] text-white'
                                                onClick={() => setDeleteOption(true)}
                                            >
                                                Xóa
                                            </Button>

                                        </div>


                                    </div>
                                ) : (
                                    <span
                                        key={index}
                                        className={`text-3xl font-semibold cursor-pointer px-5 py-2 rounded-none ${index === optionIndex ? "text-[#8a3fd9] bg-gray-100 rounded-tl-lg rounded-tr-lg " : "text-gray-20"}`}
                                        onClick={() => handleChosesTab(index, r?.name || "")}
                                    >
                                        <span>
                                            {r.name}

                                        </span>
                                        {
                                           index === optionIndex && (
                                                <span className='h-5 w-5 rounded-full bg-[#8a3fd9] '>

                                                </span>
                                            )
                                        }
                                    </span>
                                )

                            ))
                        ) : (
                            options?.map((r: ICategory, index: number) => (
                                <span
                                    onClick={() => handleChosesTab(index, r?.name || "")}
                                    key={index}
                                    className={`text-2xl group flex items-center gap-3 font-semibold cursor-pointer px-5 py-2 rounded-none ${index === optionIndex ? "text-white bg-admin_primary rounded-tl-lg rounded-bl-lg " : "text-gray-20"}`}
                                >
                                    <span >
                                        {r.name}
                                    </span>
                                    <span className={`${index === optionIndex ? 'inline-block' : "hidden"}`}>

                                        <Tooltip name='Chỉnh sửa tên danh mục'> 
                                            <span className={`px-3 py-1 inline-flex rounded-full text-admin_secondary items-center justify-center  bg-white `} onClick={() => handleChangeOptionTab(r.name || "")}>
                                                <i className="ri-edit-line text-sm"></i>
                                            </span>

                                        </Tooltip>
                                    </span>
                                </span>
                            ))
                        )
                    }
                </div>
                <div className={`col-span-7 bg-admin_primary rounded-tr-lg rounded-br-lg p-5 ${options.length < 1 && "hidden"} `}>
                    <div className='flex items-center w-full  gap-4 p-3'>
                        <div className='flex-1'>
                            <Input
                                value={optionItemName}
                                placeholder='Nhập mốc thời gian vào đây '
                                className='w-full  bg-white'
                                onChange={(e) => setOptionItemName(e.target.value)}
                            />
                        </div>
                        <div>
                            <Tooltip name='Thêm mốc thời gian'>
                                <Button
                                    beforeIcon={<i className="ri-add-line"></i>}
                                    className='bg-gradient-to-br  from-primary to-secondary text-white'
                                    onClick={handleAddOptionItem}
                                >
                                </Button>

                            </Tooltip>
                        </div>
                    </div>
                    <div className='bg-white p-3 rounded max-h-[300px] overflow-y-scroll'>
                        <Table
                            rows={optionItems}
                            columns={listOptionsItems}
                        />
                    </div>
                </div>
            </div>
            {
                deleteOption && (
                    <ModalMessage
                        title='Thông báo'
                        content={`Bạn có muốn xóa danh mục ${optionItemRename} không`}
                        isOk={handleDeleteOption}
                        isClose={() => setDeleteOption(false)}
                    />
                )
            }
            {
                deleteOptionItem && (
                    <ModalMessage
                        title='Thông báo'
                        content={`Bạn có muốn xóa mốc thời gian ${optionItemSelect} tại danh mục ${optionSelect} không`}
                        isOk={() => handleDeleteOptionItem()}
                        isClose={() => setDeleteOptionItem(false)}
                    />
                )
            }
            <ModalBox
                styleModalClass='w-[40vw] h-[30vh]'
                onClose={()=>setUpdateOptionItem(false)}
                isOpen={updateOptionItem}
            >
                <div className='p-5 mt-2 flex flex-col w-full h-full justify-evenly'>
                    <span>
                        <Input
                            labelName='Mốc thời gian'
                            value={optionItemSelect}
                            onChange={(e) => setOptionItemSelect(e.target.value)}
                        />
                    </span>
                    <div className='flex justify-end'>
                        <Button
                            beforeIcon={<i className="ri-add-line"></i>}
                            className='bg-gradient-to-br  from-[#8a3fd9] to-[#c163ff] text-white'
                            onClick={handleUpdateOptionItem}
                        >
                            Cập nhập mốc thời gian
                        </Button>
                    </div>
                </div>
            </ModalBox>
        </div>
    )
}
export default OptionManage
