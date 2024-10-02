import { WorkHistory } from "@/db/queries/select";
import { detectUrl, formatDate } from "../lib/utils";
import { date } from "drizzle-orm/pg-core";
import { FC } from "hono/jsx";
import { html, raw } from "hono/html";

const Experience: FC<{
  companies: WorkHistory[];
}> = ({ companies }) => {
  return (
    <div class="py-3">
      <h2 class="text-lg font-poppins font-bold text-top-color">
        Professional Experience
      </h2>
      <div class="pt-4 flex flex-col">
        {companies.map((company) => {
          const urlCheck = new RegExp(
            "([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?"
          );
          const exp = company.experience?.experience || "";
          if (urlCheck.test(exp)) {
            console.log("It has an URL!", company.name);
            const match = urlCheck.exec(exp);
            if (match) {
              console.log(`${company.name} : `, match[0]);
            }
          } else {
            console.log("No URL found in ", `${company.name}`);
          }
          return (
            <>
              <div class="flex flex-col">
                <p class="text-lg font-bold text-gray-700">
                  <div class="flex justify-between">
                    <div>
                      {company.name} |{" "}
                      <span class="uppercase px-1">{company.location}</span>|
                      <span class="bg-amber-100 rounded-s ml-2">
                        {company.industry}
                      </span>
                    </div>
                    <div>
                      {`${formatDate(company.from)} - ${formatDate(
                        company.to
                      )}`}
                    </div>
                  </div>
                </p>
                <p class="text-sm font-normal pt-2">
                  {raw(detectUrl(company.experience?.experience || ""))}
                </p>
                <div class="container py-2 pl-2">
                  {/* <!-- Projects --> */}
                  {company.projects.length >= 1 && (
                    <>
                      <h4 class="text-lg font-poppins font-bold text-top-color">
                        Projects
                      </h4>
                      <div class="border-2 w-20 border-top-color my-3"></div>
                    </>
                  )}
                  <ul class="text-sm list-disc pl-4 space-y-1">
                    {company.projects.map((project) => {
                      return (
                        <li>
                          <span class="font-semibold">{project.name}</span>-{" "}
                          {detectUrl(project.description)}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              {/* <!-- Skills --> */}
              <div class="flex justify-start gap-2 flex-wrap py-4">
                {company.skills.map((set) => {
                  const { skill } = set;
                  return skill.map((tech) => (
                    <span class="bg-slate-400 rounded px-3 py-1 text-sm font-semibold text-gray-800">
                      # {tech}
                    </span>
                  ));
                })}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Experience;
