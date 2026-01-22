import type { Note } from "~/types/note";

const NOTES_STORAGE_KEY = "notes-app-data";

/**
 * Get all notes from localStorage
 */
export function getAllNotes(): Note[] {
  if (typeof window === "undefined") return []; // SSR safety
  
  try {
    const stored = localStorage.getItem(NOTES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading notes:", error);
    return [];
  }
}

/**
 * Save all notes to localStorage
 */
export function saveAllNotes(notes: Note[]): void {
  if (typeof window === "undefined") return; // SSR safety
  
  try {
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error("Error saving notes:", error);
  }
}

/**
 * Get a single note by ID
 */
export function getNoteById(id: string): Note | undefined {
  const notes = getAllNotes();
  return notes.find((note) => note.id === id);
}

/**
 * Create a new note
 */
export function createNote(
  title: string,
  description: string,
  content: string
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

/**
 * Update an existing note
 */
export function updateNote(
  id: string,
  updates: Partial<Omit<Note, "id" | "createdAt">>
): Note | null {
  const notes = getAllNotes();
  const index = notes.findIndex((note) => note.id === id);

  if (index === -1) return null;

  notes[index] = {
    ...notes[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  saveAllNotes(notes);
  return notes[index];
}

/**
 * Delete a note by ID
 */
export function deleteNote(id: string): boolean {
  const notes = getAllNotes();
  const filtered = notes.filter((note) => note.id !== id);

  if (filtered.length === notes.length) return false; // Note not found

  saveAllNotes(filtered);
  return true;
}
