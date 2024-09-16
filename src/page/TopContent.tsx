import { FC } from "hono/jsx";

export const TopContent: FC = () => {
  return (
    <div class="flex rounded-t-lg bg-top-color sm:px-2 w-full bg-slate-400">
      <div class="h-40 w-40 overflow-hidden sm:rounded-full sm:relative sm:p-0 top-10 left-5 p-3">
        <img src="./static/terry.jpeg" />
      </div>

      <div class="w-2/3 sm:text-center pl-5 mt-10 text-start">
        <p class="font-poppins font-bold text-heading sm:text-4xl text-2xl">
          Terry Shek
        </p>
        <p class="text-heading">Software Engineer</p>
      </div>
    </div>
  );
};

export default TopContent;
