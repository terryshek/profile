import { Hono } from "hono";
import { renderer } from "./renderer";
import { db } from "./db";
import { getAccessRight, getCompany, getUsers } from "./db/queries/select";
import { env } from "hono/adapter";
import { Profile } from "./page/Profile";
import { basicAuth } from "hono/basic-auth";
import { bearerAuth } from "hono/bearer-auth";
import Demo from "./page/Demo";
import Scroll from "./page/Scroll";
import { getFolderDirectoryAllFiles } from "./lib/utils";
import _ from "lodash";

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
  const role = c.get("role") ?? "visitor";
  const { DATABASE_URL: url } = env(c);
  const database = db(url);
  const companies = await getCompany(database);
  return c.render(<Demo role={role} companies={companies} />);
});
app.get("/auth/scroll", async (c) => {
  const { DATABASE_URL: url } = env(c);
  const database = db(url);
  const companies = await getCompany(database);
  const companiesName = companies.map((company) => _.camelCase(company.name));
  const companiesDemo: { [key: string]: string[] } = {};
  for (let i = 0; i < companiesName.length; i++) {
    const testFolder = `./public/static/${companiesName[i]}`;
    const demoFile = getFolderDirectoryAllFiles(testFolder);
    companiesDemo[companiesName[i]] = demoFile;
  }
  const role = c.get("role") ?? "visitor";
  return c.render(
    <Scroll companies={companies} role={role} demoFiles={companiesDemo} />
  );
});

app.get("/", async (c) => {
  const { DATABASE_URL: url } = env(c);
  const database = db(url);
  const users = await getUsers(database);
  const companies = await getCompany(database);
  const fetching = await Promise.all([users, companies]);
  return c.render(fetching && <Profile users={users} companies={companies} />);
});

export default app;
