import Head from "next/head";
import dynamic from "next/dynamic";
import { UnAuthenticatedHeader } from "@components/Header";
const HomeComponent = dynamic( () => import('@views/index'), { ssr: false } )


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

Home.getLayout = function getLayout(page) {
  return (
    <>
      <UnAuthenticatedHeader>{page}</UnAuthenticatedHeader>
    </>
  );
};

export default Home;
