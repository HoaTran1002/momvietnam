import React from 'react'
export interface IOption {
    name?: string,
    value?: string
}
interface CustomSelectProps {
    options: IOption[];
    value?:string;
    lableName?: string;
    className?: string;
    isError?: boolean;
    errorMessage?: string;
    onSelect: (selected: IOption) => void;
}

const Select: React.FC<CustomSelectProps> = ({ lableName, className,value = "", isError = false, errorMessage, options, onSelect }) => {
    const [selected, setSelected] = React.useState<IOption | null>(null);
    const [showOptions, setShowOptions] = React.useState(false);
    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const selectOption = (option: IOption) => {
        setSelected(option)
        onSelect(option);
        setShowOptions(false);
    };
    React.useEffect(()=>{
        if(value !== ""){
            setSelected(options.find((r:IOption)=>r.value === value) || null)
        }
    },[value])
    
    return (
        <>
            <label
                htmlFor="countries"
                className="block mt-3 text-sm font-medium text-gray-900 "
            >
                {lableName}
            </label>
            <div className={`${className} relative bg-gray-50 border mt-1  border-solid ${isError
                    ? "border-red-600 text-red-400"
                    : "border-gray-300 text-gray-900"
                } text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block min-w-[200px] p-2.5  cursor-pointer`} onClick={toggleOptions}>
                <div className='flex items-center justify-between w-full'>
                    <span>
                        {
                            selected?.name || '-- Chọn --'
                        }
                    </span>
                    <span className={`transition-all duration-300 ${showOptions ? 'rotate-90' : 'rotate-0'} `}>
                        <i className="ri-arrow-right-s-line"></i>
                    </span>
                </div>
                {showOptions && (
                    <div className="absolute top-full left-0 bg-white z-20 text-gray-900 rounded shadow-lg flex flex-col min-w-[200px] w-max">
                        {options.map((option, index) => (
                            <div className="text-base hover:bg-slate-100 transition-all duration-300 px-4 py-3 cursor-pointer" key={index} onClick={() => selectOption(option)}>
                                {option.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {isError && (
                <span className="text-red-400 text-sm">{errorMessage}</span>
            )}
        </>
    );
};
export default Select