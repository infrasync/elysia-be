import { Context } from "elysia";
import { db } from "@/lib/db";
import { NotesService } from "@/components/services/notes";
import { TNote } from "../../types/entity";
import { notes } from "@/db/schemas/notes.schema";
import { eq, desc } from "drizzle-orm";
import { NoteForm } from "@/components/services/notes/sections/form/NoteForm";
export async function getNotes() {
  const notes = await db.query.notes.findMany();

  return <NotesService notes={notes} />;
}

export async function createNote({ body }: Context) {
  const { content } = body as Omit<TNote, "id">;
  await db.insert(notes).values({ content });

  const latestNote = await db.query.notes.findFirst({
    orderBy: desc(notes.id),
  });

  return (
    <NoteForm type="CREATE" currentNote={latestNote} />
  );
}

export async function deleteNote({ params }: Context) {
  const { id } = params;
  await db.delete(notes).where(eq(notes.id, id));
  return null;
}

export async function updateNote({ params, body }: Context) {
  const { id } = params;
  const { content } = body as Omit<TNote, "id">;
  await db.update(notes).set({ content }).where(eq(notes.id, id));
  const updatedNote = await db.query.notes.findFirst({
    where: eq(notes.id, id),
    orderBy: desc(notes.id),
  });

  return (
    <NoteForm type="UPDATE" currentNote={updatedNote} />
  );
}

export async function updateNoteFormUI({ params }: Context) {
  const { id } = params;
  const currentNote = await db.query.notes.findFirst({
    where: eq(notes.id, id),
    orderBy: desc(notes.id),
  });

  return <NoteForm type="UPDATE_UI" currentNote={currentNote} />}
