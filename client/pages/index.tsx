import Head from "next/head";
import dynamic from "next/dynamic";
import { UnAuthenticatedHeader } from "@components/Header";
import { userSelector } from "@selectors/index";
const HomeComponent = dynamic(() => import("@views/index"), { ssr: false });
import axios from "axios";

const Home = () => {

  return (
    <div>
      <Head>
        <title>SafeKeep</title>
      </Head>
      <HomeComponent />
    </div>
  );
};
const address = "0x7A77B4a12830B2266783F69192c6cddEd93C959d";
Home.getLayout = function getLayout(page) {
  const callApi = async () => {
    const response = await axios.get(
      `./api/inheritors?address=${address.toLowerCase()}`
    );
    console.log(response);
  };

  callApi();
  return (
    <>
      <UnAuthenticatedHeader>{page}</UnAuthenticatedHeader>
    </>
  );
};

export default Home;

