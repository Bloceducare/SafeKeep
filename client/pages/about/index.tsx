import { UnAuthenticatedHeader } from "@components/Header";
import About from "@views/About";

const AboutPage = () => {
  return (
    <>
      <About />
    </>
  );
};

AboutPage.getLayout = function getLayout(page) {
  return <UnAuthenticatedHeader>{page}</UnAuthenticatedHeader>;
};

export default AboutPage;
