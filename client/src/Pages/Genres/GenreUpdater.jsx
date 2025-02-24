import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GenreForm from "../../Components/GenreForm";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import Loading from "../../Components/Loading";

const updateGenre = (genre) => {
    const token = localStorage.getItem("token");

    return fetch(`/api/genres/${genre._id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(genre),
    })
}

const fetchGenreById = async (id) => {
    const res = await fetch(`/api/genres/${id}`);
    return await res.json();
}

const GenreUpdater = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [genre, setGenre] = useState(null);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [genreLoading, setGenreLoading] = useState(true);

    const handleUpdateGenre = async (genre) => {
        setUpdateLoading(true);

        try {
            const response = await updateGenre(genre);
            if (response.ok) {
                toast.success("The genre has been updated");
            }
            else {
                toast.error(response.statusText);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to genre the book");
        } finally {
            setUpdateLoading(false);
        }
    }

    useEffect(() => {
        setGenreLoading(true);
        fetchGenreById(id)
            .then((genre) => {
                setGenre(genre);
                setGenreLoading(false);
            });
    }, [id]);

    if (genreLoading) {
        return <Loading />;
    }

    return (
        <div>
            <GenreForm
                genre={genre}
                onCancel={() => navigate("/genres")}
                disabled={updateLoading}
                onSave={handleUpdateGenre}
            />
            <ToastContainer />
        </div>
    )
}

export default GenreUpdater;