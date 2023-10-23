import { useState } from "react";

function createTitle(title) {
    if (title) {
        return `Cool ${title}`;
    } else {
        return 'Default title';
    }
}

function Header({ title }) {
    return <h1>{createTitle(title)}</h1>;
}

export default function HomePage() {
    // setLikes function to update
    const [likes, setLikes] = useState(0);

    const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];

    function handleClick() {
        setLikes(likes + 1)
    }

    return (
        <>
            <Header />
            <Header title="React 💙" />
            <div>Homepage!</div>
            <ul>
                {names.map((name, key) => (
                    <li data-id={key} key={key}>{name}</li>
                ))}
            </ul>
            <button onClick={handleClick}>Like {likes}</button>
        </>
    )
}