import { WorkHistory } from "@/db/queries/select";
import { FC } from "hono/jsx";

const Scroll: FC<{
  companies: WorkHistory[];
  role: string;
}> = ({ companies, role }) => {
  return (
    // <!-- profile -->
    <div class="grid grid-cols-4 gap-1 p-2">
      <div class="">
        <div class="flex mx-auto justify-center">{role}</div>
        <div class="mb-4">
          <ul class="text-sm font-medium text-left" id="default-styled-tab">
            {companies.map((company) => {
              return (
                <li class="me-2" role="presentation">
                  <button
                    class="inline-block p-4 border-b-2 rounded"
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
      <div class="col-span-3">
        <div id="default-styled-tab-content"></div>
      </div>
    </div>
  );
};

export default Scroll;
