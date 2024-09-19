import {
  SelectCompany,
  SelectContact,
  SelectEducation,
  SelectProject,
  SelectSkillSet,
  SelectUser,
} from "../db/schema";
import { useEffect, type FC } from "hono/jsx";
import TopContent from "./TopContent";
import Education from "./Education";
import About from "./About";
import Contact from "./Contact";
import SkillSet from "./Skills";
import Footer from "./Footer";
import { WorkHistory } from "@/db/queries/select";
import { date } from "drizzle-orm/mysql-core";

export const Profile: FC<{
  users: SelectUser[];
  skills: SelectSkillSet[];
  contacts: SelectContact[];
  educations: SelectEducation[];
  companies: WorkHistory[];
  projects: SelectProject[];
}> = ({ users, skills, contacts, educations, companies, projects }) => {
  return (
    <div class="bg-gray-100 p-4">
      <div class="border-1 shadow-lg shadow-gray-700 rounded-lg ">
        {/* <!-- top content -->  */}
        <TopContent users={users} />
        {/* <!-- main content --> */}
        <div class="p-5">
          <div class="flex flex-col sm:flex-row sm:mt-10">
            <div class="flex flex-col sm:w-1/3">
              {/* <!-- My contact --> */}
              <Contact contacts={contacts} />
              {/* <!-- Skills --> */}
              <SkillSet />
              {/* <!-- Education Background --> */}
              <Education educations={educations} />
            </div>

            <div class="flex flex-col sm:w-2/3 ml-2 order-first sm:order-none sm:-mt-10">
              {/* <!-- About me --> */}
              <About />

              {/* <!-- Professional Experience --> */}
              <div class="py-3">
                <h2 class="text-lg font-poppins font-bold text-top-color">
                  Professional Experience
                </h2>
                <div class="pt-4 flex flex-col">
                  {companies.map((company) => {
                    return (
                      <>
                        <div class="flex flex-col">
                          <p class="text-lg font-bold text-gray-700">
                            <div class="flex justify-between">
                              <div>
                                {company.name} | {company.location}
                                {company.industry}
                              </div>
                              <div>{date(company.to)}</div>
                            </div>
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
                                    <span class="font-semibold">
                                      {project.name}
                                    </span>
                                    - {project.description}
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
                              <span class="bg-gray-300 rounded px-3 py-1 text-sm font-semibold text-gray-800">
                                #{tech}
                              </span>
                            ));
                          })}
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
