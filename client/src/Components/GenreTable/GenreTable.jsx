import "./GenreTable.css";
import { useEffect, useState } from "react";

const fetchFilterGenres = async (name) => {
    const res = await fetch(`/api/genres/find/${name}`);
    return await res.json();
}

const GenreTable = ({ genres, onDelete, onCreate, onUpdate }) => {
    const [genreList, setGenreList] = useState(genres || []);
    const [search, setSearch] = useState("");

    useEffect(() => {
        setGenreList(genres);
    }, [genres]);

    const handleSearchClick = (value) => {
        if (value.trim() === "") {
            setGenreList(genres || []);
        } else {
            fetchFilterGenres(value)
                .then(authors => {
                    setGenreList(authors)
                });
        }
    };

    return (
        <div className="GenreTable">
            <div className="search">
                <input type="search" value={search} onChange={(e) => setSearch(e.target.value)}></input>
                <button type="button" onClick={() => handleSearchClick(search)} >Search</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>_id</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {genreList.map((genre) => (
                        <tr key={genre._id}>
                            <td>{genre.name}</td>
                            <td>{genre._id}</td>
                            <td className="buttons">
                                <button type="button" onClick={() => onUpdate(genre._id)}>Update</button>
                                <button className="deleteButton" type="button" onClick={() => onDelete(genre._id)} >Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="createButton" type="button" onClick={() => onCreate()}>Create</button>
        </div>
    );
};

export default GenreTable;