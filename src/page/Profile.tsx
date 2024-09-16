import { html, raw } from "hono/html";
import { SelectContactMethod, SelectSkillSet, SelectUser } from "../db/schema";
import type { FC } from "hono/jsx";
import TopContent from "./TopContent";
import Contact from "./contact";
import SkillSet from "./skills";
import Education from "./Education";
import About from "./About";
export const Profile: FC<{
  users: SelectUser[];
  skills: SelectSkillSet[];
  contacts: SelectContactMethod[];
}> = ({ users, skills, contacts }) => {
  return (
    <div class="bg-gray-100 p-4">
      <div class="border-1 shadow-lg shadow-gray-700 rounded-lg ">
        {/* <!-- top content -->  */}
        <TopContent />
        {/* <!-- main content --> */}
        <div class="p-5">
          <div class="flex flex-col sm:flex-row sm:mt-10">
            <div class="flex flex-col sm:w-1/3">
              {/* <!-- My contact --> */}
              <Contact contacts={contacts} />
              {/* <!-- Skills --> */}
              <SkillSet />
              {/* <!-- Education Background --> */}
              <Education />
            </div>

            <div class="flex flex-col sm:w-2/3 order-first sm:order-none sm:-mt-10">
              {/* <!-- About me --> */}
              <About />
              {/* <!-- Professional Experience --> */}
              <div class="py-3">
                <h2 class="text-lg font-poppins font-bold text-top-color">
                  Professional Experience
                </h2>
                <div class="border-2 w-20 border-top-color my-3"></div>

                <div class="flex flex-col">
                  <div class="flex flex-col">
                    <p class="text-lg font-bold text-gray-700">
                      Nexplore | Software Engineer
                    </p>
                    <p class="font-semibold text-sm text-gray-700">
                      2021 - Present
                    </p>
                    <p class="font-semibold text-sm text-gray-700 mt-2 mb-1">
                      Key Responsibilities
                    </p>
                    <ul class="text-sm list-disc pl-4 space-y-1">
                      <li>Working on customer facing product</li>
                      <li>Delivering highly efficient solutions</li>
                      <li>Solving critical bugs</li>
                    </ul>

                    <div class="py-3">
                      <h2 class="text-lg font-poppins font-bold text-top-color">
                        Projects
                      </h2>
                      <div class="border-2 w-20 border-top-color my-3"></div>
                      <div class="flex flex-col">
                        <div class="flex flex-col">
                          <p class="text-lg font-semibold text-gray-700">
                            Used Books mobile app
                          </p>
                          <p class="font-normal text-sm text-gray-700 mb-1 pl-2">
                            A platform to sell as well as to buy used books only
                            for PCCoE College due to this reuse of books will be
                            there beneficial for environment also indirectly
                            helps increase communication between juniors and
                            seniors.
                          </p>
                        </div>
                        <div class="flex flex-col">
                          <p class="text-lg font-semibold text-gray-700">
                            Parking Automation System
                          </p>
                          <p class="font-normal text-sm text-gray-700 mb-1 pl-2">
                            it’s a web application which helps you to book your
                            slot for your car just like booking a movie ticket
                            from home.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="flex flex-col mt-8">
                    <p class="text-lg font-bold text-gray-700">
                      TailwindFlex.com | Lead
                    </p>
                    <p class="font-semibold text-sm text-gray-700">2020-2021</p>
                    <p class="font-semibold text-sm text-gray-700 mt-2 mb-1">
                      Key Responsibilities
                    </p>
                    <ul class="text-sm list-disc pl-4 space-y-1">
                      <li>Developed usable components</li>
                      <li>Solving complex problems</li>
                      <li>Solving critical bugs</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* <!-- Projects --> */}
              <div class="py-3">
                <h2 class="text-lg font-poppins font-bold text-top-color">
                  Projects
                </h2>
                <div class="border-2 w-20 border-top-color my-3"></div>

                <div class="flex flex-col">
                  <div class="flex flex-col">
                    <p class="text-lg font-semibold text-gray-700">
                      Used Books mobile app
                    </p>
                    <p class="font-normal text-sm text-gray-700 mb-1 pl-2">
                      A platform to sell as well as to buy used books only for
                      PCCoE College due to this reuse of books will be there
                      beneficial for environment also indirectly helps increase
                      communication between juniors and seniors.
                    </p>
                  </div>
                  <div class="flex flex-col">
                    <p class="text-lg font-semibold text-gray-700">
                      Parking Automation System
                    </p>
                    <p class="font-normal text-sm text-gray-700 mb-1 pl-2">
                      it’s a web application which helps you to book your slot
                      for your car just like booking a movie ticket from home.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
