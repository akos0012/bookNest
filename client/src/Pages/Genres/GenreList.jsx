import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading";
import GenreTable from "../../Components/GenreTable";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

const fetchGenres = async () => {
    const res = await fetch(`/api/genres`);
    return await res.json();
}

const deleteGenre = async (id) => {
    const token = localStorage.getItem("token");

    return await fetch(`/api/genres/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

const GenreList = () => {
    const [loading, setLoading] = useState(true);
    const [genres, setGenres] = useState([]);
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const response = await deleteGenre(id);

        if (response.ok) {
            setGenres((genres) => {
                return genres.filter((genre) => genre._id !== id);
            });
        } else {
            toast.error(response.statusText);
        }
    };

    const handleCreate = () => {
        navigate("/genre/create")
    };

    const handleUpdate = (id) => {
        navigate(`/genre/update/${id}`)
    };

    useEffect(() => {
        fetchGenres()
            .then((genres) => {
                setGenres(genres);
                setLoading(false);
            })
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="GenreList">
            <GenreTable genres={genres} onDelete={handleDelete} onCreate={handleCreate} onUpdate={handleUpdate} />
            <ToastContainer />
        </div>
    );
};


export default GenreList;