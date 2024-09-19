import { Hono } from "hono";
import { renderer } from "./renderer";
import { db } from "./db";
import * as Schema from "./db/schema";
import {
  createCompany,
  createContact,
  createEducation,
  createProject,
  createSkill,
  createUser,
} from "./db/queries/insert";
import jsx, { FC, use, useEffect, useState } from "hono/jsx";
import {
  getCompany,
  getContacts,
  getEducations,
  getProject,
  getSkills,
  getUsers,
  WorkHistory,
} from "./db/queries/select";
import { env } from "hono/adapter";
import {
  companyTable,
  InsertCompany,
  InsertContact,
  InsertEducation,
  InsertExperience,
  InsertProject,
  InsertSkillSet,
  projectTable,
} from "./db/schema";
import { Profile } from "./page/Profile";
interface Bindings {
  DATABASE_URL: string;
  MY_NAME: string;
}

const app = new Hono<{ Bindings: Bindings }>();

app.use(renderer);

app.get("/admin", async (c) => {
  // const client = hc<AppType>("/");
  const { DATABASE_URL } = env(c);
  const database = db(DATABASE_URL);
  const companies = await getCompany(database);
  const initForm: InsertProject = {
    name: "test",
    companyId: 1,
    description: "test",
  };
  return c.render(
    <div class="bg-slate-500 p-8">
      <div class="max-w-sm mx-auto mx">
        <label
          for="countries"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select your company
        </label>
        <select
          id="company"
          name="company"
          onChange={(e) => {
            console.log("e: ", e);
          }}
          value={"companyId"}
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 px-4"
        >
          {companies.map((company) => {
            return <option value={company.id}>{company.name}</option>;
          })}
        </select>
        <div class="flex items-center justify-end my-3">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          ></button>
        </div>
      </div>
    </div>
  );
});
app.get("/company", async (c) => {
  const { DATABASE_URL: url } = env(c);
  const database = db(url);
  const workHistory = await getCompany(database);
  return c.json<WorkHistory[]>(workHistory);
});
app.get("/", async (c) => {
  const { DATABASE_URL: url } = env(c);
  const database = db(url);
  const users = await getUsers(database);
  const skills = await getSkills(database);
  const contacts = await getContacts(database);
  const educations = await getEducations(database);
  const companies = await getCompany(database);
  const projects = await getProject(database);

  const fetching = await Promise.all([
    users,
    skills,
    contacts,
    educations,
    companies,
    projects,
  ]);
  return c.render(
    fetching && (
      <html>
        <head>
          <title>{users[0].name}</title>
        </head>
        <body class="container-fluid">
          <Profile
            users={users}
            skills={skills}
            contacts={contacts}
            educations={educations}
            companies={companies}
            projects={projects}
          />
        </body>
      </html>
    )
  );
});

app.get("/contact", async (c) => {
  const { DATABASE_URL: url } = env(c);
  const database = db(url);
  const contactData: InsertContact[] = [
    {
      userId: 1,
      icon: `<svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="h-4"
                      >
                        <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                        <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                      </svg>`,
      label: "jcst0227@gmail.com",
      navigation: "jcst0227@gmail.com",
      location: "hong kong",
    },
    {
      userId: 1,
      location: "hong kong",
      icon: `<svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-linkedin"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                      </svg>`,
      label: "314601b3",
      navigation: "https://www.linkedin.com/in/terry-shek-314601b3/",
    },
  ];
  const contacts = await createContact(contactData, database);
  return c.json({ contacts });
});

export default app;
