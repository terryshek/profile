import { WorkHistory } from "@/db/queries/select";
import { FC } from "hono/jsx";
import _ from "lodash";

const Scroll: FC<{
  companies: WorkHistory[];
  role: string;
  demoFiles: Record<string, string[]>;
  path: string;
}> = ({ companies, role, demoFiles, path }) => {
  return (
    <>
      <div class="w-full bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 md:hidden lg:hidden">
        <div>
          <label for="tabs" class="sr-only">
            Select tab
          </label>
          <select
            id="select_tags"
            class="bg-gray-50 border-0 border-b border-gray-200 text-gray-900 text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {companies.map((company, index) => {
              return demoFiles[_.camelCase(company.name)].length == 0 ? null : (
                <option value={`tabs-${index}`}>{company.name}</option>
              );
            })}
          </select>
        </div>
      </div>
      <div id="tabs">
        <aside
          id="demo-sidebar"
          class="fixed top-0 left-0 z-40 w-80 h-screen transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
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
              {companies.map((company, index) => {
                return demoFiles[_.camelCase(company.name)].length ==
                  0 ? null : (
                  <li>
                    <a
                      href={`#tabs-${index}`}
                      class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                      <button
                        class={`inline-block p-4 border-b-2 rounded ${
                          index === 0 ? "text-blue-500" : ""
                        }`}
                        id={"profile-styled-tab" + company.id}
                        type="button"
                        role="tab"
                        onClick={() => {
                          console.log("clicked");
                        }}
                      >
                        <span class="ms-3">{company.name}</span>
                      </button>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
        <div class="p-4 sm:ml-80">
          <div class="p-4  rounded-lg dark:border-gray-700">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {companies.map((company, index) => {
                const companyDemo = _.camelCase(company.name);
                return (
                  demoFiles[companyDemo].length > 0 && (
                    <>
                      <div class="col-span-full" id={`tabs-${index}`}>
                        <p class="font-normal pt-2 text-5xl">{company.name}</p>
                        <div class="border-2 w-30 border-top-color my-3"></div>
                      </div>
                      {demoFiles[companyDemo].map((file) => {
                        return (
                          <div class="flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
                            <p class="text-2xl text-gray-400 dark:text-gray-500">
                              <div class=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <img
                                  class="rounded-t-lg"
                                  src={`${path}${_.camelCase(
                                    company.name
                                  )}/${file}`}
                                  alt=""
                                />
                                <div class="p-5">
                                  <a
                                    href={`/static/${_.camelCase(
                                      company.name
                                    )}/${file}`}
                                  >
                                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                      {_.capitalize(_.startCase(file))}
                                    </h5>
                                  </a>
                                </div>
                              </div>
                            </p>
                          </div>
                        );
                      })}
                    </>
                  )
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Scroll;
