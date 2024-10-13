import { SelectProfession } from "@/db/schema";
import { detectUrl } from "../lib/utils";
import { FC } from "hono/jsx";
import { raw } from "hono/html";

/*************  ✨ Codeium Command ⭐  *************/
/**
 * A component that renders a list of professional certifications.
 *
 * Props:
 * - certifications: An array of `SelectProfession` objects.
 *
 * The component renders a list of certifications, with the following format:
 * - The `to` date of the certification, with a font size of 10px and a font
 *   weight of 600.
 * - The `fieldOfStudy` of the certification, with a font size of 13px and a
 *   font weight of 500.
 * - The `school` of the certification, with a font size of 13px and a font
 *   weight of 400.
 * - The `description` of the certification, with a font size of 12px and a
 *   font weight of 400. If the description is a URL, it is rendered as a link.
 *
 * The component also renders a horizontal line above and below the list of
 * certifications.
 */
/******  96519301-85a8-443f-a9a0-dfba7b135ebf  *******/ const Profession: FC<{
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
              <span class="text-xs text-gray-500">
                {cert.description ? raw(detectUrl(cert.description)) : null}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profession;
