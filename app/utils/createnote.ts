import type { Note } from "~/types/note";
import { getAllNotes, saveAllNotes } from "~/utils/notes-storage";

export function createNote(
  title: string,
  description: string,
  content: string,
): Note {
  const now = new Date().toISOString();
  const newNote: Note = {
    id: crypto.randomUUID(), // Generate unique ID
    title,
    description,
    content,
    createdAt: now,
    updatedAt: now,
  };

  const notes = getAllNotes();
  notes.push(newNote);
  saveAllNotes(notes);

  return newNote;
}
