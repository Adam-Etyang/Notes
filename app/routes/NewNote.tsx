"use client";
import React, { useState, useEffect, useRef } from "react";
import { createNote } from "~/utils/createnote";
import { useNavigate } from "react-router";
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "../../components/ui/navbar-menu";
import { cn } from "~/lib/utils";

export default function CreateNote() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const editorRef = useRef(null);

  const applyFormat = (command) => {
    document.execCommand(command);
    editorRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === "b") {
      e.preventDefault();
      applyFormat("bold");
    }
    if (e.ctrlKey && e.key === "i") {
      e.preventDefault();
      applyFormat("italic");
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-4">
      <div
        ref={editorRef}
        contentEditable="true"
        spellCheck="false"
        onInput={(e) => setTitle(e.currentTarget.innerText)}
        className="mt-0 text-2xl text-bold uppercase outline-0 border-none"
      >
        Enter title
      </div>
      <div
        ref={editorRef}
        contentEditable="true"
        spellCheck="false"
        onInput={(e) => setDescription(e.currentTarget.innerText)}
        className="mt-6 text-lr text-medium outline-0 border-none"
      >
        Enter description
      </div>
      <div className="h-1 bg-[#E5E5E5] mt-2 "></div>

      <div
        ref={editorRef}
        contentEditable="true"
        spellCheck="false"
        className="h-full w-full border-none outline-0 mt-2 overflow-y-auto"
        onInput={(e) => setContent(e.currentTarget.innerText)}
      ></div>
      <div className="mt-4 text-sm text-gray-500 pb-12">This is metadata</div>
    </div>
  );
}
