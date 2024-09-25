import { Hono } from "hono";
import { renderer } from "./renderer";
import { db } from "./db";
import { getAccessRight, getCompany, getUsers } from "./db/queries/select";
import { env } from "hono/adapter";
import { Profile } from "./page/Profile";
import { basicAuth } from "hono/basic-auth";
import { bearerAuth } from "hono/bearer-auth";

import { fileToNumber, getFolderDirectoryAllFiles } from "./lib/utils";
import _ from "lodash";
import path from "node:path";
import { serveStatic } from "hono/serve-static";
import fs from "node:fs";
import { pathToFileURL } from "node:url";
import { getRouterName, showRoutes } from "hono/dev";
import Demo from "./page/Demo";
interface Bindings {
  DATABASE_URL: string;
  USERNAME: string;
  PASSWORD: string;
}

interface State {
  role?: string;
}

const app = new Hono<{ Bindings: Bindings; Variables: State }>();

app.use(renderer);
const token = "terryshek";

app.use("/api/*", bearerAuth({ token }));

app.get("/api/page", (c) => {
  return c.json({ message: "You are authorized" });
});

app.use(
  "/auth/*",
  basicAuth({
    verifyUser: async (username, password, c) => {
      const { DATABASE_URL: url } = env(c);
      const database = db(url);
      const credential = await getAccessRight(username, password, database);
      c.set("role", credential[0]?.role);
      return credential.length > 0;
    },
    invalidUserMessage: "Unauthorized",
  })
);
app.get("/auth/demo", async (c) => {
  const { DATABASE_URL: url } = env(c);
  const database = db(url);
  const companies = await getCompany(database);
  const companiesName = companies.map((company) => _.camelCase(company.name));
  const companiesDemo: { [key: string]: string[] } = {};
  const dirname = path.join("/static", "/");

  for (let i = 0; i < companiesName.length; i++) {
    let demoFile = getFolderDirectoryAllFiles(companiesName[i]);
    if (companiesName[i] === "continentalHoldingsLimited") {
      demoFile = demoFile.sort((a, b) => {
        return fileToNumber(a) - fileToNumber(b);
      });
    }
    companiesDemo[companiesName[i]] = demoFile;
  }
  console.log("companiesDemo: ", companiesDemo);

  const role = c.get("role") ?? "visitor";
  return c.render(
    <Demo
      companies={companies}
      role={role}
      path={dirname}
      demoFiles={companiesDemo}
    />
  );
});

app.get("/", async (c) => {
  const { DATABASE_URL: url } = env(c);
  const database = db(url);
  const user = "Terry Shek";
  const camelCaseUser = _.camelCase(user);
  const users = await getUsers(user, database);
  const companies = await getCompany(database);
  const fetching = await Promise.all([users, companies]);
  return c.render(
    fetching && (
      <Profile
        users={users}
        companies={companies}
        avatar={path.join("./", "static", `${camelCaseUser}.jpeg`)}
      />
    )
  );
});

export default app;
