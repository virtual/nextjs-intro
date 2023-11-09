import { useEffect, useRef, useState } from 'react'
import Head from 'next/head';
import Layout, {siteTitle} from "../components/layout";
import Link from 'next/link';
import { Button, Card, Input, Spinner, Skeleton, User, Spacer } from "@nextui-org/react";
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
    const [searchTerm, setSearchTerm] = useState('')

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
        setSearchTerm(searchValue)
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

                <Spacer y={10}/>
                <main>
                    <div className="flex w-full flex-nowrap md:flex-nowrap">
                        <Input
                            size="sm"
                            clearable
                            onClearClick={() => setUsers(usersRef.current)}
                            initialValue={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            label="Search for a user"
                            labelPlacement="inside"
                            placeholder="First or last name"
                            />
                        <Button color="primary" size="lg" onClick={() => searchUser()}>
                            Search users
                        </Button>
                    </div>


                    <Spacer y={8}/>

                    {loading
                        ?
                        <div className="max-w-[300px] w-full flex items-center gap-3">
                            <div>
                                <Skeleton className="flex rounded-full w-12 h-12"/>
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <Skeleton className="h-3 w-3/5 rounded-lg"/>
                                <Skeleton className="h-3 w-4/5 rounded-lg"/>
                            </div>
                        </div>
                        :
                        <>
                            {searchTerm &&
                                <div className="w-full flex flex-col gap-2 font-bold pb-3">
                                    Search item: {searchTerm}
                                </div>
                            }
                            {users.map(u => (
                                <User
                                key={u.id}
                                avatarProps={{
                                    src: `${u.image}`
                                }}
                                name={`${u.firstName} ${u.lastName} ${u.bloodGroup}`}
                                description={u.email}
                                />
                            ))
                            }
                        </>
                    }
                    <Spacer y={8}/>
                    <Button color="secondary" onClick={handleClick}>Like {likes}</Button>
                    <Spacer y={4}/>
                    <p>
                        Read <Link href="/posts/first-post">this page!</Link>
                    </p>
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