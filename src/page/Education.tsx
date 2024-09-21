import { FC } from "hono/jsx";
import { SelectEducation } from "../db/schema";

const Education: FC<{
  educations: SelectEducation[];
}> = ({ educations }) => {
  return (
    <div class="py-3 sm:order-none order-1">
      <h2 class="text-lg font-poppins font-bold text-top-color">
        Education Background
      </h2>
      <div class="border-2 w-20 border-top-color my-3"></div>

      <div class="flex flex-col space-y-1">
        {educations.map((education) => {
          return (
            <div class="flex flex-col">
              <p class="font-semibold text-xs text-gray-700">{education.to}</p>
              <p class="text-sm font-medium">
                <span class="text-green-700">{education.fieldOfStudy}</span>,
              </p>
              <p class="text-sm font-normal text-zinc-700">
                {education.school}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Education;
