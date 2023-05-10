import MainContainer from "../components/MainContainer";
import Head from "next/head";
import { Rubik } from "next/font/google";
import { useQueries } from "@tanstack/react-query";
import { fetchAlternates, fetchProps } from "@/utils/fetchData";

const rubik = Rubik({ subsets: ["latin"] });

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

  if (AltLoading || PropLoading) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>Stefan Jordan - Swish Analytics</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={`flex min-h-screen flex-col items-center ${rubik.className}`}>
        <MainContainer altQuery={AltQuery} propQuery={PropQuery} />
      </main>
    </>
  );
}
