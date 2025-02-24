import "./AuthorTable.css";
import { useEffect, useState } from "react";

const fetchFilterAuthors = async (name) => {
    const res = await fetch(`/api/authors/find/${name}`);
    return await res.json();
}

const AuthorTable = ({ authors, onDelete, onCreate, onUpdate }) => {
    const [authorList, setAuthorList] = useState(authors || []);
    const [search, setSearch] = useState("");

    useEffect(() => {
        setAuthorList(authors);
    }, [authors]);

    const handleSearchClick = (value) => {
        if (value.trim() === "") {
            setAuthorList(authors || []);
        } else {
            fetchFilterAuthors(value)
                .then(authors => {
                    setAuthorList(authors)
                });
        }
    };

    return (
        <div className="AuthorTable">
            <div className="search">
                <input type="search" value={search} onChange={(e) => setSearch(e.target.value)}></input>
                <button type="button" onClick={() => handleSearchClick(search)} >Search</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>_id</th>
                        <th>books</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {authorList.map((author) => (
                        <tr key={author._id}>
                            <td>{author.name}</td>
                            <td>{author._id}</td>
                            <td>
                                {author.books.map((book, index) => (
                                    <span key={index}>
                                        {book.title}
                                        {index < author.books.length - 1 ? ", " : ""}
                                    </span>
                                ))}
                            </td>
                            <td className="buttons">
                                <button type="button" onClick={() => onUpdate(author._id)}>Update</button>
                                <button className="deleteButton" type="button" onClick={() => onDelete(author._id)} >Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="createButton" type="button" onClick={() => onCreate()}>Create</button>
        </div>
    );
};

export default AuthorTable;