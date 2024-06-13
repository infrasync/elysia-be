import {t, Static} from "elysia";

export const NoteSchema = t.Object({
    id: t.Number(),
    content: t.String()
})

export const CreateNoteSchema = t.Object({
    content: t.String()
})

export type TNote = Static<typeof NoteSchema>;

