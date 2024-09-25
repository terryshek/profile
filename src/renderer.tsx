import { jsxRenderer } from "hono/jsx-renderer";

export const renderer = jsxRenderer(({ children }, c) => {
  return (
    <html
      style={{
        scrollBehavior: "smooth",
      }}
    >
      <head>
        <title>Terry Shek</title>
        <meta charset="UTF-8" />
        <link rel="stylesheet" href="/static/css/output.css" />
      </head>
      <body class="container-fluid">{children}</body>
      <script src="/static/jquery/dist/jquery.js" />
      <script src="/static/js/app.js" />
    </html>
  );
});
