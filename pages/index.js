import { useState } from "react";
import Head from 'next/head';
import Layout, {siteTitle} from "../components/layout";
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import utilStyles from '../styles/utils.module.css';

function createTitle(title) {
    if (title) {
        return `Cool ${title}`;
    } else {
        return 'Mew title';
    }
}

function Header({ title }) {
    return <h1 className={styles.title}>{createTitle(title)}</h1>;
}

export default function HomePage() {
    // setLikes function to update
    const [likes, setLikes] = useState(0);

    const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];

    function handleClick() {
        setLikes(likes + 1)
    }

    return (
        <Layout home>
            <div className={styles.container}>
                <Head>
                    <title>{siteTitle}</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Header />
                <Header title="React 💙" />
                <section className={utilStyles.headingMd}>
                    <p>Mister Cat likes to read books about dogs and birds.</p>
                    <p>
                    (This is a sample website - you’ll be building a site like this on{' '}
                    <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
                    </p>
                </section>
                <main>
                    <div>Homepage!</div>
                    <p>
                        Read <Link href="/posts/first-post">this page!</Link>
                    </p>
                    <ul>
                        {names.map((name, key) => (
                            <li data-id={key} key={key}>{name}</li>
                        ))}
                    </ul>
                    <button onClick={handleClick}>Like {likes}</button>
                    <div className={styles.grid}>
                        <a href="https://nextjs.org/docs" className={styles.card}>
                            <h3>Documentation &rarr;</h3>
                            <p>Find in-depth information about Next.js features and API.</p>
                        </a>

                        <a href="https://nextjs.org/learn" className={styles.card}>
                            <h3>Learn &rarr;</h3>
                            <p>Learn about Next.js in an interactive course with quizzes!</p>
                        </a>

                        <a
                            href="https://github.com/vercel/next.js/tree/canary/examples"
                            className={styles.card}
                        >
                            <h3>Examples &rarr;</h3>
                            <p>Discover and deploy boilerplate example Next.js projects.</p>
                        </a>

                        <a
                            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                            className={styles.card}
                        >
                            <h3>Deploy &rarr;</h3>
                            <p>
                                Instantly deploy your Next.js site to a public URL with Vercel.
                            </p>
                        </a>
                    </div>
                </main>
                <footer>
                    <a
                        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Powered by{' '}
                        <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
                    </a>
                </footer>
            </div>
        </Layout>
    )
}