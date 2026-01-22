"use client";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "../../hooks/use-outside-click";
import type { Route } from "./+types/home";
import type { Note } from "~/types/note";
import { getAllNotes, createNote } from "~/utils/notes-storage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [active, setActive] = useState<Note | boolean | null>(null);

  const [notes, setNotes] = useState<Note[]>([]);

  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }
    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useEffect(() => {
    const existingNotes = getAllNotes();
    if (existingNotes.length == 0) {
      createNote(
        "Welcome to Your Notes App!",
        "Your first note - click to expand",
        "This is a sample note to help you get started. Click on any note card to view its full content. You can create new notes, edit existing ones, and organize your thoughts!",
      );

      createNote(
        "Meeting Notes - Team Sync",
        "Jan 21, 2026 - Weekly standup",
        "Discussed Q1 goals and project timeline.\n\nKey Takeaways:\n- Launch new feature by Feb 15\n- Weekly standups every Monday at 10am\n- Need to hire 2 new developers\n- Budget approved for new tools\n\nAction Items:\n- John: Update project roadmap\n- Sarah: Schedule interviews\n-Mike: Research new deployment tools",
      );

      createNote(
        "Project Ideas",
        "Cool projects I want to build",
        "1. A task management app with calendar integration\n2. A weather dashboard with beautiful animations\n3. A recipe organizer with meal planning\n4. A fitness tracker with progress charts\n5. A markdown-based blog platform\n\nThese are some ideas I've been thinking about. Need to prioritize which one to start first!",
      );

      createNote(
        "Shopping List",
        "Things to buy this week",
        "- Milk\n- Eggs\n- Bread\n- Coffee\n-Apples\n- Chicken\n- Rice\n- Butter\n-Yogurt\n\nDon't forget to check the pantry before going to the store!",
      );
      setNotes(getAllNotes());
    } else {
      setNotes(existingNotes);
    }
  }, []);

  useOutsideClick(ref, () => setActive(null));

  console.log("Notes in state:", notes);
  console.log("Notes count:", notes.length);

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-base"
                    >
                      {active.description}
                    </motion.p>
                  </div>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-4">
        {notes.map((note, index) => (
          <motion.div
            layoutId={`card-${note.title}-${id}`}
            key={note.id}
            onClick={() => setActive(note)}
            className="p-4 flex flex-col  hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col  w-full">
              <div className="flex justify-center items-center flex-col">
                <motion.h3
                  layoutId={`title-${note.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base"
                >
                  {note.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${note.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-base"
                >
                  {note.description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
