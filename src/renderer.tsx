import { jsxRenderer } from "hono/jsx-renderer";

export const renderer = jsxRenderer(({ children }, c) => {
  return (
    <html>
      <head>
        <title>Terry Shek</title>
        <meta charset="UTF-8" />
        <link href="/css/output.css" rel="stylesheet" />
      </head>
      <body class="container-fluid">{children}</body>
      <script src="/static/jquery/dist/jquery.min.js"></script>
      <script src="/static/App.tsx" type="module"></script>
    </html>
  );
});
