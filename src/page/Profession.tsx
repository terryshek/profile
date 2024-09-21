import { SelectProfession } from "@/db/schema";
import { FC } from "hono/jsx";

const Profession: FC<{
  certifications: SelectProfession[];
}> = ({ certifications }) => {
  return (
    <div class="py-3 sm:order-none order-1">
      <h2 class="text-lg font-poppins font-bold text-top-color">
        Professional Certifications
      </h2>
      <div class="border-2 w-20 border-top-color my-3"></div>

      <div class="flex flex-col space-y-1">
        {certifications.map((cert) => {
          return (
            <div class="flex flex-col">
              <p class="font-semibold text-xs text-gray-700">{cert.to}</p>
              <p class="text-sm font-medium">
                <span class="text-green-700">{cert.fieldOfStudy}</span>,
              </p>
              <p class="text-sm font-normal text-zinc-700">{cert.school}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profession;
