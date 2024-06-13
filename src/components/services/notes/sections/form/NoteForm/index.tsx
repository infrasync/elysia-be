import { match } from 'ts-pattern';
import { NoteCard } from '@/components/services/notes/sections/card/NoteCard';

type Props = {
  currentNote?: {
    id: number;
    content: string;
  };
  type: 'UPDATE_UI' | 'CREATE' | 'UPDATE';
};

export const NoteForm = (props: Props) => {
  const { currentNote, type } = props;
  console.log(currentNote);

  return (
    <>
      {match(type)
        .with('CREATE', () => (
          <>
            <form
              id='noteForm'
              hx-post='/notes'
              hx-target='#notes'
              hx-swap='beforeend'
              hx-swap-oob='true'
            >
              <textarea name='content' placeholder='Add a note'></textarea>
              <button type='submit'>Add - Create {currentNote?.id}</button>
            </form>
            {currentNote && <NoteCard note={currentNote} />}
          </>
        ))
        .with('UPDATE', () => (
          <>
            <form
              id='noteForm'
              hx-post='/notes'
              hx-target='#notes'
              hx-swap='beforeend'
              hx-swap-oob='true'
            >
              <textarea name='content' placeholder='Add a note'></textarea>
              <button type='submit'>Add - Update{currentNote?.id}</button>
            </form>
            {currentNote && <NoteCard note={currentNote} hx-swap-oob='true' />}
          </>
        ))
        .with('UPDATE_UI', () => (
          <form
            id='noteForm'
            hx-patch={`/notes/${currentNote?.id}`}
            hx-target='#notes'
            hx-swap='beforeend'
            hx-swap-oob='true'
          >
            <textarea name='content' placeholder='Update a note'>
              {currentNote?.content}
            </textarea>
            <button type='submit'>Update Notes</button>
          </form>
        ))
        .exhaustive()}
    </>
  );
};
