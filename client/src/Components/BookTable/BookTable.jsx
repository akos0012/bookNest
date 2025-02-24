import "./BookTable.css";
import { useEffect, useState } from "react";

const fetchFilterBooks = async (title) => {
    const res = await fetch(`/api/books/find/${title}`);
    return await res.json();
}

const BookTable = ({ books, onDelete, onCreate, onUpdate }) => {
    const [bookList, setBookList] = useState(books || []);
    const [search, setSearch] = useState("");

    useEffect(() => {
        setBookList(books);
    }, [books]);

    const handleSearchClick = (value) => {
        if (value.trim() === "") {
            setBookList(books || []);
        } else {
            fetchFilterBooks(value)
                .then(books => {
                    setBookList(books)
                });
        }
    };

    return (
        <div className="BookTable">
            <div className="search">
                <input type="search" value={search} onChange={(e) => setSearch(e.target.value)}></input>
                <button type="button" onClick={() => handleSearchClick(search)} >Search</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>_id</th>
                        <th>Authors</th>
                        <th>Genres</th>
                        <th>Publication date</th>
                        <th>created at</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {bookList.map((book) => (
                        <tr key={book._id}>
                            <td>{book.title}</td>
                            <td>{book._id}</td>
                            <td>
                                {book.authors.map((author, index) => (
                                    <span key={index}>
                                        {author.name}
                                        {index < book.authors.length - 1 ? ", " : ""}
                                    </span>
                                ))}
                            </td>
                            <td>
                                {book.genres.map((genre, index) => (
                                    <span key={index}>
                                        {genre.name}
                                        {index < book.genres.length - 1 ? ", " : ""}
                                    </span>
                                ))}
                            </td>
                            <td>{new Date(book.publication_date).toLocaleDateString("en-GB", { year: 'numeric', month: 'long', day: '2-digit' })}</td>
                            <td>{new Date(book.created_at).toLocaleDateString("en-GB", { year: 'numeric', month: 'long', day: '2-digit' })}</td>
                            <td className="buttons">
                                <button type="button" onClick={() => onUpdate(book._id)}>Update</button>
                                <button className="deleteButton" type="button" onClick={() => onDelete(book._id)} >Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="createButton" type="button" onClick={() => onCreate()}>Create</button>
        </div>
    );
};

export default BookTable;