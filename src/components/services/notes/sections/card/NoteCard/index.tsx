import { TNote } from "@/types/entity";
import { Card } from "@/components/ui/card/Card";

export const NoteCard = (props : { note: TNote } & JSX.HtmlTag) => {
  const { note } = props;
  return (
   <Card id={`note-${note.id}`} hx-target="#notes" hx-swap="beforeend" hx-swap-oob={props["hx-swap-oob"] || ''}>
      <Card.Title>{note.content}</Card.Title>
      <Card.Actions>
        <button
          class='uk-button uk-button-default'
          hx-get={`/notes/${note.id}/edit`}
          hx-swap='none'
        >
          Edit
        </button>
        
        <button
          class='uk-button uk-button-danger'
          hx-delete={`/notes/${note.id}`}
          hx-target='closest section'
          hx-swap='outerHTML'
          hx-confirm='Are you sure you want to delete this note?'
        >
          Delete
        </button>
      </Card.Actions>
    </Card>
  );
};
