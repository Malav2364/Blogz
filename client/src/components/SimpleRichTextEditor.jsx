import React, { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import axiosInstance from "../utils/axiosInstance";

import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaHighlighter,
  FaHeading,
  FaListUl,
  FaListOl,
  FaQuoteRight,
  FaUndo,
  FaRedo,
  FaImage,
} from "react-icons/fa";

const SimpleRichTextEditor = ({ content, onChange }) => {
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("image", file);

      try {
        setUploading(true);
        const response = await axiosInstance.post("/api/posts/upload-image", formData);
        const imageHtml = `<img src="${response.data.url}" alt="Uploaded image" style="max-width: 100%; height: auto;" />`;
        editor.commands.insertContent(imageHtml);
      } catch (err) {
        console.error("Image upload failed:", err);
      } finally {
        setUploading(false);
      }
    };
  };

  if (!editor) return null;

  const toolbarButtons = [
    [FaBold, () => editor.chain().focus().toggleBold().run()],
    [FaItalic, () => editor.chain().focus().toggleItalic().run()],
    [FaUnderline, () => editor.chain().focus().toggleUnderline().run()],
    [FaHighlighter, () => editor.chain().focus().toggleHighlight().run()],
    [FaHeading, () => editor.chain().focus().toggleHeading({ level: 2 }).run()],
    [FaListUl, () => editor.chain().focus().toggleBulletList().run()],
    [FaListOl, () => editor.chain().focus().toggleOrderedList().run()],
    [FaQuoteRight, () => editor.chain().focus().toggleBlockquote().run()],
    [FaUndo, () => editor.chain().focus().undo().run()],
    [FaRedo, () => editor.chain().focus().redo().run()],
    [FaImage, handleImageUpload],
  ];

  return (
    <div className="border border-slate-300 rounded-xl bg-white shadow-md overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-3 border-b bg-slate-50">
        {toolbarButtons.map(([IconComponent, action], i) => (
          <button
            key={i}
            type="button"
            className="p-2 rounded bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 transition"
            onClick={action}
          >
            {IconComponent && <IconComponent />}
          </button>
        ))}
      </div>

      {/* Upload Spinner */}
      {uploading && (
        <p className="text-sm text-blue-600 italic flex items-center gap-2 px-4 py-2">
          <span className="animate-spin border-2 border-blue-500 border-t-transparent rounded-full w-4 h-4"></span>
          Uploading image...
        </p>
      )}

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className="p-4 min-h-[300px] bg-white prose max-w-none"
      />
    </div>
  );
};

export default SimpleRichTextEditor;
