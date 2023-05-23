import { useState } from 'react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Editor() {
 const [newData,setNewData] = useState(''); 

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ color: ['#000000','#e60000']}],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ direction: "rtl" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5] }],
      [{ font: [] }],
      [{ align: [] }],
      
    ],
  };

  function onChangeHandler(htmlContent){
   setNewData(htmlContent);
   console.log(newData);
  }


  return (
    <div>
      <ReactQuill modules={modules}
      placeholder='내용을 입력해주세요.'
      onChange={onChangeHandler}
      />
    </div>
  );
}
