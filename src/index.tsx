import { Context, Env, Hono } from "hono";
import { renderer } from "./renderer";
import { db } from "./db";
import { getAccessRight, getCompany, getUsers } from "./db/queries/select";
import { env } from "hono/adapter";
import { Profile } from "./page/Profile";
import { basicAuth } from "hono/basic-auth";
import { bearerAuth } from "hono/bearer-auth";
import { cors } from "hono/cors";
import { fileToNumber, getFolderDirectoryAllFiles } from "./lib/utils";
import _ from "lodash";
import path from "node:path";
import Demo from "./page/Demo";
import { serveStatic } from "hono/serve-static";
import { Data } from "node_modules/hono/dist/types/context";
import { readFileSync } from "node:fs";
import { cache } from "hono/cache";
import "dayjs/locale/zh-cn";

import { DemoTypeObj, State, Bindings } from "./app.service";

const app = new Hono<{ Bindings: Bindings; Variables: State }>();
app.get(
  "*",
  cache({
    cacheName: "my-app",
    cacheControl: "max-age=3600",
  })
);
app.use(renderer);
app.use("/api/*", cors());
app.use(
  "/static/*",
  serveStatic({
    getContent: function (
      path: string,
      c: Context<Env, any, {}>
    ): Promise<Data | Response | null> {
      throw new Error("Function not implemented.");
    },
  })
);
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
  const role = c.get("role") ?? "visitor";
  // const videPath = (company: Restriction) =>
  //   path.join(path.basename("/public"), "/static/", `${company}/video.json`);

  // const source = (company: Restriction): DemoVideo[] =>
  //   JSON.parse(readFileSync(videPath(company), "utf8")) || [];

  // const videoList: Record<Restriction, DemoVideo[]> = {
  //   nexplore: source("nexplore"),
  //   sunlife: source("sunlife"),
  // };
  // console.log("videoList", videoList);

  const list: DemoTypeObj = {
    mobile: {
      continentalHoldingsLimited: [
        "1.png",
        "2.png",
        "3.png",
        "4.png",
        "5.png",
        "6.png",
        "7.png",
        "8.png",
        "9.png",
        "10.png",
        "11.png",
        "12.png",
      ],
      liFungLimited: ["img1.jpg", "img2.jpg"],
    },
    web: {
      nexplore: [
        "ACA.png",
        "DOCUMENT TRACKER.png",
        "EVENT MANAGER.png",
        "FOTOLIO.png",
        "INSPECTION.png",
        "ISSUE REGISTER.png",
        "POWERFLOW.png",
        "PUNCHLIST.png",
        "QUALITY CONTROL.png",
        "SCI.png",
      ],
      sunlife: [
        "img1.png",
        "img2.PNG",
        "img3.PNG",
        "img4.JPG",
        "img6.PNG",
        "mg5.JPG",
      ],
    },
    ux: {
      sunlife: [],
      nexplore: [],
    },
  };
  return c.render(
    <Demo
      demoList={list}
      companies={companies}
      role={role}
      path={dirname}
      videoList={{
        nexplore: [
          {
            video:
              "https://drive.google.com/file/d/1yRX6KPGKG0yCGIEjNC2Criy0ZHTWxWb4/preview",
            title: "Nexplore Quality Web Portal",
            content:
              "it is a cloud-based process control platform designed for the construction industry.",
          },
          {
            video:
              "https://drive.google.com/file/d/1NO2TIqrXw0a8YpBOff9c2H47ywNnRsgL/preview",
            title: "Nexplore Minerva",
            content:
              "An efficient and transparent application portal to all levels (client, contractors, subcontractors etc.)",
          },
        ],
        sunlife: [
          {
            video:
              "https://www.youtube.com/embed/_ZlA04IdWPQ?si=W-JV7dmxyLvYRAJ3",
            title: "My Sun Life HK Client Digital Platforms",
            content:
              "Consolidate all details of your policies, updates of your investment-linked fund prices and savings at your fingertips",
          },
          {
            video:
              "https://www.youtube.com/embed/JzkOxxZa1ig?si=10pLrlfeN41hh6Ld",
            title: "My Sun Life HK Client Digital Platforms",
            content:
              "Consolidate all details of your policies, updates of your investment-linked fund prices and savings at your fingertips",
          },
        ],
      }}
      demoFiles={{
        nexplore: [
          "ACA.png",
          "DOCUMENT TRACKER.png",
          "EVENT MANAGER.png",
          "FOTOLIO.png",
          "INSPECTION.png",
          "ISSUE REGISTER.png",
          "POWERFLOW.png",
          "PUNCHLIST.png",
          "QUALITY CONTROL.png",
          "SCI.png",
        ],
        sunlife: [
          "img1.png",
          "img2.PNG",
          "img3.PNG",
          "img4.JPG",
          "img6.PNG",
          "mg5.JPG",
        ],
        continentalHoldingsLimited: [
          "1.png",
          "2.png",
          "3.png",
          "4.png",
          "5.png",
          "6.png",
          "7.png",
          "8.png",
          "9.png",
          "10.png",
          "11.png",
          "12.png",
        ],
        southChinaMorningPost: [],
        liFungLimited: ["img1.jpg", "img2.jpg"],
        somdayLtd: [],
        kanHanTechnologiesLimited: [],
        travelzen: [],
      }}
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
