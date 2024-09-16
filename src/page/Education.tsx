import { FC } from "hono/jsx";

const Education: FC = () => {
  return (
    <div class="py-3 sm:order-none order-1">
      <h2 class="text-lg font-poppins font-bold text-top-color">
        Education Background
      </h2>
      <div class="border-2 w-20 border-top-color my-3"></div>

      <div class="flex flex-col space-y-1">
        <div class="flex flex-col">
          <p class="font-semibold text-xs text-gray-700">2021</p>
          <p class="text-sm font-medium">
            <span class="text-green-700">B.E. (INFORMATION TECHNOLOGY)</span>,
            PIMPRI CHINCHWAD COLLEGE OF ENGINEERING, PUNE.
          </p>
          <p class="font-bold text-xs text-gray-700 mb-2">Percentage: 76.61</p>
        </div>
        <div class="flex flex-col">
          <p class="font-semibold text-xs text-gray-700">2017</p>
          <p class="text-sm font-medium">
            <span class="text-green-700">HSC</span>, RAJARSHI SHAHU COLLEGE,
            LATUR.
          </p>
          <p class="font-bold text-xs text-gray-700 mb-2">Percentage: 80.77</p>
        </div>
        <div class="flex flex-col">
          <p class="font-semibold text-xs text-gray-700">2015</p>
          <p class="text-sm font-medium">
            <span class="text-green-700">SSC</span>, DNYANESHWAR HIGH SCHOOL,
            LATUR.
          </p>
          <p class="font-bold text-xs text-gray-700 mb-2">Percentage: 93.80</p>
        </div>
      </div>
    </div>
  );
};

export default Education;
