import MainContainer from "../components/MainContainer";
import Head from "next/head";
import { Lato } from "next/font/google";
import { useQueries } from "@tanstack/react-query";
import { fetchAlternates, fetchProps } from "@/utils/fetchData";
import { combineData } from "@/utils/combineData";
import Header from "@/components/Header";
import Spinner from "@/components/Spinner";

const lato = Lato({ subsets: ["latin"], weight: ["100", "300", "400", "700", "900"] });

export default function Home() {
  const [{ isLoading: AltLoading, data: AltQuery }, { isLoading: PropLoading, data: PropQuery }] =
    useQueries({
      queries: [
        {
          queryKey: ["alternateData"],
          queryFn: () => fetchAlternates(),
        },
        {
          queryKey: ["propData"],
          queryFn: () => fetchProps(),
        },
      ],
    });

  if (AltLoading || PropLoading) return <Spinner />

  return (
    <>
      <Head>
        <title>Stefan Jordan - Swish Analytics</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" sizes="32x32" href="/favicon.ico"></link>
      </Head>
      <Header />
      <main className={`flex min-h-screen flex-col items-center ${lato.className}`}>
        <MainContainer combinedData={combineData(PropQuery, AltQuery)} />
      </main>
    </>
  );
}


