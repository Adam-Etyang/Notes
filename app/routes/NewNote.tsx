"use client";
import React, { useState } from "react";
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

  return (
    <div className="relative w-full flex items-center justify-center bg-black"></div>
  );
}
