import Head from "next/head";
import Unilimit from "./UniLimit";
import styles from "../styles/Home.module.css";
import Header from "./Header";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>UniLimit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Unilimit />
    </div>
  );
}
