import { FC, startViewTransition, useEffect, useState } from "hono/jsx";
import { SelectUser } from "../db/schema";

export const TopContent: FC<{ users: SelectUser[]; avatar: string }> = ({
  users,
  avatar,
}) => {
  return (
    <div class="flex rounded-t-lg bg-top-color sm:px-2 w-full bg-slate-400 justify-around topContent">
      <div class="h-40 w-40 overflow-hidden sm:rounded-full sm:relative sm:p-0 top-10 left-5 p-3">
        <img src={avatar} />
      </div>
      <div class="w-2/3 sm:text-center pl-5 mt-10 text-start">
        <p class="font-poppins font-bold text-heading sm:text-4xl text-2xl">
          {users[0].name}
        </p>
        <p class="text-heading">{users[0].title}</p>
      </div>
    </div>
  );
};

export default TopContent;
