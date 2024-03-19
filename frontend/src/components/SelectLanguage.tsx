import React, { useCallback } from "react";
import VietNamFlag from "@/assets/images/Flags/VietNam_Flag.png";
import UkFlag from "@/assets/images/Flags/Englang_Flag.png";
// import KoreanFlag from "@/assets/images/Flags/Korean_Flag.png";
// import JapanFlag from "@/assets/images/Flags/Japan_Flag.png";
import i18next from "i18next";
import LocalStorage from "@/utils/localStorage";
// import LocalStorage from "@/utils/localStorage";
interface IPropsSelectLanguage {
  name: string;
  type?: string;
  img: string;
}

const SelectLanguage = (): JSX.Element => {
  const languages: IPropsSelectLanguage[] = [
    { name: "Tiếng Việt", img: VietNamFlag, type: "vi" },
    { name: "English", img: UkFlag, type: "en" },
    // { name: "Tiếng Hàn", img: KoreanFlag },
    // { name: "Tiếng Nhật", img: JapanFlag },
  ];
  const [languageChose, setLanguageChose] = React.useState<number>(0);
  const [openOptions, setOpenOptions] = React.useState<boolean>(false);

  const handleChangeLanguage = useCallback((index: number, type: string | undefined) => {
    setLanguageChose(index);
    setOpenOptions((r) => !r);
    i18next.changeLanguage(type);
    LocalStorage.setItem<number>("lang", index);
  }, []);
  const handleChoseLanguage = (): void => {
    setOpenOptions((r) => !r);
  };
  React.useEffect(()=>{
    const lang = LocalStorage.getItem<number>("lang")
    setLanguageChose(lang || 0)
  },[languageChose])
  return (
    <div className="box-language h-8 bg-white rounded-sm shadow-lg p-[4px] flex gap-1 relative">
      <div
        className="flex items-center gap-1 cursor-pointer"
        onClick={handleChoseLanguage}
      >
        <img
          src={languages[languageChose].img}
          className="h-6 w-10 "
          alt={languages[languageChose].name}
        />
        <i className="ri-arrow-down-s-line text-black font-semibold  "></i>
      </div>
      <div
        className={`flex items-center z-30 p-3 bg-white flex-col absolute right-0 rounded-md top-full mt-2 w-[150px] ${
          openOptions ? "block" : "hidden"
        } shadow-2xl max-sm:-right-2/4 `}
      >
        {languages.map((r: IPropsSelectLanguage, index: number) => (
          <div
            key={index}
            className={`w-full cursor-pointer hover:bg-[#c0c0c0] max-sm:justify-start flex text-black items-center gap-3 mb-1 p-1 transition-all duration-300 ${
              languageChose === index ? "bg-[#c0c0c0] " : ""
            }`}
            onClick={(): void => handleChangeLanguage(index, r.type)}
          >
            <img
              className="h-6 w-10 object-cover rounded-sm"
              src={r.img}
              alt=""
            />

            <span className="block text-sm max-w-max font-semibold">
              {r.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SelectLanguage;
