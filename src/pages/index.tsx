import Image from "next/image";
import { Inter } from "next/font/google";
import TestFetch from "../components/TestFetch";
import Head from "next/head";
import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Stefan Jordan - Swish Analytics</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main
        className={`flex min-h-screen flex-col items-center ${rubik.className}`}
      >
        <TestFetch />
      </main>
    </>
  );
}
