import { WorkHistory } from "../db/queries/select";

import _ from "lodash";
import { FC } from "hono/jsx";
import { splitCamelCaseToString } from "../lib/utils";
import { DemoTypeObj, Restriction, DemoVideo, DemoType } from "../app.service";

const Demo: FC<{
  demoList: DemoTypeObj;
  companies: WorkHistory[];
  role: string;
  demoFiles: Record<string, string[]>;
  path: string;
  videoList: Record<Restriction, DemoVideo[]>;
}> = ({ companies, role, demoFiles, path, videoList, demoList }) => {
  return (
    <>
      <div class="w-full bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 md:hidden lg:hidden">
        <div>
          <select
            id="select_tags"
            class="bg-gray-50 border-0 border-b border-gray-200 text-gray-900 text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {companies.map((company, index) => {
              const companyDemoName = _.camelCase(company.name);
              return demoFiles[companyDemoName] &&
                demoFiles[companyDemoName].length ? (
                <option value={`tabs-${index}`}>{company.name}</option>
              ) : null;
            })}
          </select>
        </div>
      </div>
      <div id="tabs">
        <aside
          id="demo-sidebar"
          class="fixed top-0 left-0 z-40 w-75 h-screen transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div class="h-full py-3 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <a class="flex items-center ps-2.5 mb-5">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                class="h-6 me-3 sm:h-7"
                alt="Flowbite Logo"
              />
              <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                {role}
              </span>
            </a>
            <ul class="space-y-2 font-medium">
              {Object.keys(demoList).map((key, index) => {
                return (
                  <li>
                    <a
                      href={`#tabs-${index}`}
                      class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                      <button
                        class={`inline-block ${
                          key === "0" ? "text-blue-500" : ""
                        }`}
                        id={"profile-styled-tab" + key}
                        type="button"
                        role="tab"
                      >
                        <span class="mx-3">
                          {DemoType[key as keyof typeof DemoType]}
                        </span>
                      </button>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
        <div class="p-4 sm:ml-64">
          <div class="p-4  rounded-lg dark:border-gray-700">
            {Object.keys(demoList).map((key, index) => {
              const demoKey = key as keyof typeof DemoType;
              return (
                <ul
                  class="space-y-4 text-gray-500 list-disc list-inside dark:text-gray-400"
                  id={`tabs-${index}`}
                >
                  <p class="font-normal pt-2 text-5xl">{DemoType[demoKey]}</p>

                  {Object.keys(demoList[demoKey]).map((company) => {
                    const list = demoList[demoKey][company] ?? [];
                    const companyDemoName = _.camelCase(company);
                    return (
                      <>
                        <li>
                          <div class="col-span-full">
                            <p class="pt-2 text-4xl font-medium ">
                              {splitCamelCaseToString(company)}
                            </p>
                            <div class="border-2 w-30 border-top-color my-3"></div>
                          </div>
                          <ol class="ps-5 mt-2 space-y-1 list-decimal list-inside">
                            <div class="grid grid-cols-2 md:grid-cols-2 gap-4 mb-4">
                              {list.map((file) => (
                                <div class="flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
                                  <p class="text-2xl text-gray-400 dark:text-gray-500">
                                    <div class=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                      <img
                                        class="rounded-t-lg"
                                        src={`${path}${companyDemoName}/${file}`}
                                        alt=""
                                      />
                                      {companyDemoName === "nexplore" ? (
                                        <div class="p-5">
                                          <a
                                            href={`/static/${_.camelCase(
                                              company
                                            )}/${file}`}
                                          >
                                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                              {_.capitalize(
                                                _.startCase(
                                                  file
                                                    .split(".")
                                                    .slice(0, -1)
                                                    .join(".")
                                                )
                                              )}
                                            </h5>
                                          </a>
                                        </div>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                  </p>
                                </div>
                              ))}
                              {demoKey === "ux" &&
                                videoList[companyDemoName as Restriction] &&
                                videoList[companyDemoName as Restriction].map(
                                  (video) => {
                                    return (
                                      <div class="flex items-center justify-center m-4 rounded bg-gray-50 dark:bg-gray-800">
                                        <div
                                          class="w-full
                                          my-4
                                          bg-white
                                          border
                                          border-gray-200
                                          rounded-lg
                                          shadow
                                          dark:bg-gray-800
                                          dark:border-gray-700
                                          "
                                        >
                                          {companyDemoName === "nexplore" ? (
                                            <iframe
                                              class={`w-full min-h-96`}
                                              src={video.video}
                                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                              referrerpolicy="strict-origin-when-cross-origin"
                                            ></iframe>
                                          ) : (
                                            <iframe
                                              class={`w-full min-h-96`}
                                              src={video.video}
                                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                              referrerpolicy="strict-origin-when-cross-origin"
                                              allowfullscreen
                                            ></iframe>
                                          )}

                                          <div class="p-5">
                                            <a href="#">
                                              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                {video.title}
                                              </h5>
                                            </a>
                                            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                              {video.content}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }
                                )}
                            </div>
                          </ol>
                        </li>
                      </>
                    ); // Replace with actual JSX if needed
                  })}
                </ul>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Demo;
