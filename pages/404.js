import Layout, { siteTitle } from "../components/layout";
import styles from "../styles/Home.module.css";
import Error from "next/error";

function createTitle(title) {
  if (title) {
    return `${title}`;
  }
}

function Header({ title }) {
  return <h1 className={styles.title}>{createTitle(title)}</h1>;
}

export default function Page({ errorCode }) {
  if (errorCode) {
    <Error statusCode={errorCode} />;
  }

  return (
    <>
      <Layout home>
        <Header title="Page not found" />
      </Layout>
    </>
  );
}
