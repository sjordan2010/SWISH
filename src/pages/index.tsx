import MainContainer from "../components/MainContainer";
import Head from "next/head";
import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Stefan Jordan - Swish Analytics</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={`flex min-h-screen flex-col items-center ${rubik.className}`}>
        <MainContainer />
      </main>
    </>
  );
}
