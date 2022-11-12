import Head from 'next/head';
import { Spinner } from '../components/spinner';

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Spinner data-id="lolkek" />
    </>
  );
}
