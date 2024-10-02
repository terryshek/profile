import { jsxRenderer } from "hono/jsx-renderer";
import { Suspense } from "hono/jsx/streaming";

export const renderer = jsxRenderer(({ children }, c) => {
  console.log("c: ", c);
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
      <body class="container-fluid">
        <Suspense fallback={<div>loading...</div>}>{children}</Suspense>
      </body>
      <script src="/static/jquery/dist/jquery.js" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"
        integrity="sha512-BNaRQnYJYiPSqHHDb58B0yaPfCu+Wgds8Gp/gU33kqBtgNS4tSPHuGibyoeqMV/TJlSKda6FXzoEyYGjTe+vXA=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      ></script>
      <script src="/static/js/app.js" />
    </html>
  );
});
