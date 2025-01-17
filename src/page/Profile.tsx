import { SelectEducation } from "../db/schema";
import { type FC } from "hono/jsx";
import TopContent from "./TopContent";
import Education from "./Education";
import About from "./About";
import Contact from "./Contact";
import SkillSet from "./Skills";
import Footer from "./Footer";
import { UserInfo, WorkHistory } from "@/db/queries/select";
import Experience from "./Experience";
import Profession from "./Profession";

export const Profile: FC<{
  users: UserInfo[];
  companies: WorkHistory[];
  avatar: string;
}> = ({ users, companies, avatar }) => {
  //       // once the Element has been successfully converted to canvas
  return (
    <div class="bg-gray-100 p-4" id="profile">
      <div class="border-1 shadow-lg shadow-gray-700 rounded-lg ">
        {/* <!-- top content -->  */}
        <TopContent users={users} avatar={avatar} />

        {/* <!-- main content --> */}
        <div class="p-5">
          <div class="flex flex-col sm:flex-row sm:mt-10">
            <div class="flex flex-col sm:w-1/3">
              {/* <!-- My contact --> */}
              <Contact
                contacts={
                  users.find((user) => user.name == "Terry Shek")?.contact ?? []
                }
              />
              {/* <!-- top Skills --> */}
              <SkillSet
                skills={
                  users.find((user) => user.name == "Terry Shek")?.skills ?? []
                }
              />
              {/* <!-- Education Background --> */}
              <Education
                educations={
                  users.find((user) => user.name == "Terry Shek")?.education ??
                  []
                }
              />

              {/* <!-- Profession History --> */}
              <Profession
                certifications={
                  users.find((user) => user.name == "Terry Shek")?.profession ??
                  []
                }
              />
            </div>
            <div class="flex flex-col sm:w-2/3 ml-2 order-first sm:order-none sm:-mt-10">
              {/* <!-- About me --> */}
              <About />
              {/* <!-- Professional Experience --> */}
              <Experience companies={companies} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
