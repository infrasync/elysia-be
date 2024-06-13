import TemplateBase from "@/components/ui/templates/base";
import { NoteCard } from "./sections/card/NoteCard";
import { NoteForm } from "./sections/form/NoteForm";
import { notes } from '../../../db/schemas/notes.schema';
type TNote = {
  id: number;
  content: string;
};

export const NotesService = ({ notes }: { notes: TNote[] }) => {
  return (
    <TemplateBase>
      <main class="flex flex-col gap-12 w-full h-full align-middle p-12">
        <h2 class="uk-heading-divider uk-heading-divider-primary text-xl font-extrabold">Notes</h2>
       <NoteForm type="CREATE" />
        <section id="notes" 
          class="grid-cols-2"
        >
          {notes.map((note) => (
           <NoteCard note={note} />
          ))}
        </section>
      </main>
    </TemplateBase>
  );
};
