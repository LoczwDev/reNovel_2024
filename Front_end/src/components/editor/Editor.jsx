import { EditorContent, useEditor } from "@tiptap/react";
import "highlight.js/styles/atom-one-dark.css";
import MenuBar from "./MenuBar";
import { extensions } from "../../constants/tiptapExtensions";

const Editor = ({ onDataChange, content, editable, className }) => {
  const editor = useEditor({
    editable,
    extensions: extensions,
    editorProps: {
      attributes: {
        class: `${className} text-justify  dark:bg-base-100 !prose !dark:prose-invert prose-sm sm:prose-base max-w-none mt-2 focus:outline-none prose-pre:bg-[#282c34] prose-pre:text-[#abb2bf] border border-violet px-5 py-5 mb-7 rounded-xl`,
      },
    },
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      onDataChange(json);
    },
    content: content,
  });

  return (
    <div className="w-full relative">
      {editable && <MenuBar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
