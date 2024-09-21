import { jsxRenderer } from "hono/jsx-renderer";

export const renderer = jsxRenderer(({ children }, c) => {
  return (
    <html>
      <head>
        <title>Terry Shek</title>
        <link
          href="https://cdn.jsdelivr.net/npm/flowbite@2.5.1/dist/flowbite.min.css"
          rel="stylesheet"
        />
        <script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.1/dist/flowbite.min.js"></script>
        <script
          src="https://cdn.tailwindcss.com"
          type="text/javascript"
        ></script>
      </head>
      <body class="container-fluid">{children}</body>
      <script
        src="https://code.jquery.com/jquery-3.7.1.min.js"
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo="
        crossorigin="anonymous"
      ></script>
      <script src="./static/App.tsx" type="module"></script>
    </html>
  );
});
