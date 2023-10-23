import { useState } from "react";
import Head from 'next/head';

import styles from '../styles/Home.module.css';

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
        <div className={styles.container}>
            <Head>
                <title>Next App Yay</title>
            </Head>
            <Header />
            <Header title="React 💙" />
            <main>
                <div>Homepage!</div>
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
    )
}