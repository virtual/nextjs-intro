import { useEffect, useRef, useState } from 'react'
import Head from 'next/head';
import Layout, {siteTitle} from "../components/layout";
import Link from 'next/link';
import { Button, Input, Spinner, Skeleton } from "@nextui-org/react";
import styles from '../styles/Home.module.css';
import utilStyles from '../styles/utils.module.css';
import { useLazyQuery, useQuery } from '@apollo/client';

import GET_USERS from '/graphql/queries/getUsers.gql'
import SEARCH_USERS from '/graphql/queries/searchUsers.gql'

function createTitle(title) {
    if (title) {
        return `${title}`;
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
    const [users, setUsers] = useState([])
    const [searchValue, setSearchValue] = useState('')

    const usersRef = useRef(null)

    const { data, loading, error } = useQuery(GET_USERS)

    const [getSearchedUsers] = useLazyQuery(SEARCH_USERS, {
        fetchPolicy: 'network-only',
        onCompleted(data) {
            setUsers(data.searchUser)
        }
    })

    useEffect(() => {
        if (data) {
            setUsers(data.users)
            usersRef.current = data.users
        }
    }, [data])

    const searchUser = () => {
        getSearchedUsers({
            variables: {
                value: searchValue
            }
        })
    }
    
    if (error) {
        console.error(error)
        return null
    }    

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
                <Header title="React 💙" />
                <section className={utilStyles.headingMd}>
                    <p>Mister Cat likes to read books about dogs and birds.</p>
                </section>
                <main>
                    <h2>Search for a user</h2>             
                    <Input
                        clearable
                        labelPlaceholder="User"
                        onClearClick={() => setUsers(usersRef.current)}
                        initialValue={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        />
                    <Button color="primary" onClick={() => searchUser()}>
                        Search users
                    </Button>   
                    <p>
                        Read <Link href="/posts/first-post">this page!</Link>
                    </p>
                    <ul>
       
                    {loading
                        ?
                            <Spinner />
                        :
                        <>
                            {users.map(u => (
                                <li data-id={u.id}>
                                    {u.firstName} {u.lastName}
                                </li>
                            ))
                            }
                        </>
                    }

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