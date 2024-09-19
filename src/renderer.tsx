import { jsxRenderer } from "hono/jsx-renderer";

export const renderer = jsxRenderer(({ children }, c) => {
  return (
    <html>
      <head>
        <title>Terry Shek</title>
        <script
          src="https://cdn.tailwindcss.com"
          type="text/javascript"
        ></script>
      </head>
      <body>{children}</body>
    </html>
  );
});
