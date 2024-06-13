const TemplateBase = ({ children }: Html.PropsWithChildren) => {
  return (
    <html lang="en">
      <script src="https://unpkg.com/htmx.org@1.9.12"></script>
      <link
        rel="stylesheet"
        href="https://unpkg.com/franken-ui-releases@0.0.13/dist/green.min.css"
      />
      <script src="https://cdn.jsdelivr.net/npm/tailwindcss-cdn@3.4.3/tailwindcss.js"></script>

      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Elysia</title>
      </head>
      <body class="flex flex-col gap-3 h-full align-middle justify-center items-center px-72">
        {children}
      </body>
    </html>
  );
};

export default TemplateBase;
