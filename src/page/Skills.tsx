import { SelectTopSkill } from "@/db/schema";
import { html, raw } from "hono/html";
import { FC } from "hono/jsx";

export const SkillSet: FC<{ skills: SelectTopSkill[] }> = ({ skills }) => {
  return (
    <div class="py-3 sm:order-none order-2">
      <h2 class="text-lg font-poppins font-bold text-top-color">Top Skills</h2>
      <div class="border-2 w-20 border-top-color my-3"></div>
      {skills.map((skill) => {
        return (
          <div class="flex items-center my-1">
            <div class="w-6">{html`${raw(skill.icon)}`}</div>
            <div class="ml-2">{skill.label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default SkillSet;
