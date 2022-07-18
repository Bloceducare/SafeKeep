import { UnAuthenticatedHeader } from "@components/Header";
import Roadmap from "@views/Roadmap";

const RoadMapPage = () => {
  return (
    <>
      <Roadmap />
    </>
  );
};

RoadMapPage.getLayout = function getLayout(page) {
  return (
    <>
      <UnAuthenticatedHeader>{page}</UnAuthenticatedHeader>
    </>
  );
};

export default RoadMapPage;
