import { TNote } from '../../../../types/entity';

// Create Card Card.Title Card.Description Card.Actions
type CardProps ={
  children: JSX.Element[] | JSX.Element;
  class?: string;
} & JSX.HtmlTag;

export const Card = (props: CardProps) => {
  return (
    <section
      class={`${props.class} flex flex-col gap-4 px-12 py-6 rounded-lg border border-gray-200 bg-white transition-all hover:shadow-lg focus:shadow-lg active:shadow-lg`}
      {...props}
    >
     {props.children}
    </section>
  );
};

Card.Title = (props: CardProps) => {
  return (
    <aside class='uk-margin' {...props}>
      <strong>{props.children}</strong>
    </aside>
  );
};

Card.Description = (props: CardProps) => {
  return (
    <aside class='uk-margin' {...props}>
      <strong>{props.children}</strong>
    </aside>
  );
};

Card.Actions = (props: CardProps) => {
  return <div class='flex flex-row gap-4' {...props}>{props.children}</div>;
};

