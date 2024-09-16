import { FC } from "hono/jsx";

const About: FC = () => {
  return (
    <div class="py-3">
      <h2 class="text-lg font-poppins font-bold text-top-color">About Me</h2>
      <div class="border-2 w-20 border-top-color my-3"></div>
      <p>
        A full stack software engineer experienced in application development
        with a demonstrated history of working in the construction industry;
        familiar with techniques such as Nodejs, React and typescript. A
        Bachelor's degree in Business Information technology.
      </p>
    </div>
  );
};

export default About;
