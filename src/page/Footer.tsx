import { FC } from "hono/jsx";

const Footer: FC = () => {
  return (
    <footer class="flow-root rounded-lg shadow mt-4 bg-gray-800">
      <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span class="text-sm text-gray-500 sm:text-center text-gray-400">
          © {new Date().getFullYear()} All Rights Reserved.
        </span>
        <div class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <div class="pr-2">build by:</div>
          <div class="flex justify-start items-center flex-wrap">
            {[
              "tailwind",
              "react",
              "typescript",
              "hono",
              "drizzle",
              "neon",
              "postgres",
              "vite",
              "esbuild",
              "cloudflare",
            ].map((item) => {
              return <div class="text-yellow-100 pr-3">{item}</div>;
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
