import { WorkHistory } from "@/db/queries/select";
import { FC } from "hono/jsx";
import _ from "lodash";

const Scroll: FC<{
  companies: WorkHistory[];
  role: string;
  demoFiles: Record<string, string[]>;
}> = ({ companies, role = "visitor", demoFiles }) => {
  return (
    // <!-- profile -->
    <div class="grid grid-cols-12 gap-1 p-2">
      <div class="col-span-2">
        <div class="flex mx-auto justify-center">{role}</div>
        <div class="mb-4">
          <ul class="text-sm font-medium text-left" id="default-styled-tab">
            {companies.map((company, index) => {
              return (
                <li class="me-2" role="presentation">
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
                    {company.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div class="col-span-10 ">
        <div id="default-styled-tab-content">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            {demoFiles["nexplore"].map((file) => {
              return (
                <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <img
                    class="rounded-t-lg"
                    src={`/static/nexplore/${file}`}
                    alt=""
                  />
                  <div class="p-5">
                    <a href={`/static/nexplore/${file}`}>
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {_.capitalize(_.startCase(file))}
                      </h5>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="pt-4 max-w-sm bg-white dark:bg-gray-800 dark:border-gray-700 md:grid-cols-auto ">
              <iframe
                src="https://drive.google.com/file/d/1B-w5tE5VXw_1xnAhgiX8l5F85tTMSZoL/preview"
                width="640"
                height="480"
                allow="autoplay"
              ></iframe>
            </div>
            <div class="pt-4 max-w-sm bg-white dark:bg-gray-800 dark:border-gray-700 md:grid-cols-auto ">
              <iframe
                src="https://drive.google.com/file/d/1NO2TIqrXw0a8YpBOff9c2H47ywNnRsgL/preview"
                width="640"
                height="480"
                allow="autoplay"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scroll;
