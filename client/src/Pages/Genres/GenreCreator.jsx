import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GenreForm from "../../Components/GenreForm";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

const createGenre = (genre) => {
    const token = localStorage.getItem("token");

    return fetch('/api/genres', {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(genre),
    })
}

const GenreCreator = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const handleCreateGenre = async (genre) => {
        setLoading(true);
        try {
            const response = await createGenre(genre);
            if (response.ok) {
                toast.success("The new genre has been created");
            }
            else {
                toast.error(response.statusText);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to create the new genre");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <GenreForm
                onCancel={() => navigate("/genres")}
                disabled={loading}
                onSave={handleCreateGenre}
            />
            <ToastContainer />
        </div>
    )
}

export default GenreCreator;