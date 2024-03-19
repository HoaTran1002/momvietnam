import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
interface Props {
  onChange?: (value: string) => void;
  valueText?: string
}
const TextEditor = ({ onChange, valueText = "" }: Props): JSX.Element => {
  const [editorValue, setEditorValue] = useState<string>(valueText);

  useEffect(() => {
    if (editorValue !== valueText) {
      setEditorValue(valueText);
    }
  }, [editorValue, valueText]);

  const handleChange = (valueText: string) => {
    if (valueText !== editorValue) {
      setEditorValue(valueText);
      if (onChange) {
        onChange(valueText);
      }
    }
  };


  return (
    <>
      <ReactQuill
        value={editorValue}
        onChange={handleChange}
        modules={{
          toolbar: {
            container: [
              [{ font: [] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ color: [] }, { background: [] }],
              [{ script: "sub" }, { script: "super" }],
              ["blockquote", "code-block"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"],
              ["clean"],
            ],
          },
        }}
        theme="snow"
      />
    </>
  );
};
export default TextEditor;
