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

export async function loader() {
  return null;
}

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
    <div
      contentEditable="true"
      spellCheck="false"
      className="h-full w-full border-none outline-0"
      onInput={(e) => setContent(e.currentTarget.innerText)}
    >
      {content}
    </div>
  );
}
