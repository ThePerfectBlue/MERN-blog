import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };
  return (
    <div className="react-quill">
      <ReactQuill
        value={value}
        onChange={onChange}
        theme="snow"
        modules={modules}
        //   formats={formats}
      />
    </div>
  );
};

export default Editor;
