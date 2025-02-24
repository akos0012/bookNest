import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthorForm from "../../Components/AuthorForm";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import Loading from "../../Components/Loading";

const updateAuthor = (author) => {
    const token = localStorage.getItem("token");

    return fetch(`/api/authors/${author._id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(author),
    })
}

const fetchAuthorById = async (id) => {
    const res = await fetch(`/api/authors/${id}`);
    return await res.json();
}

const AuthorUpdater = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [author, setAuthor] = useState(null);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [authorLoading, setAuthorLoading] = useState(true);

    const handleUpdateAuthor = async (author) => {
        setUpdateLoading(true);

        try {
            const response = await updateAuthor(author);
            if (response.ok) {
                toast.success("The author has been updated");
            }
            else {
                toast.error(response.statusText);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to author the book");
        } finally {
            setUpdateLoading(false);
        }
    }

    useEffect(() => {
        setAuthorLoading(true);
        fetchAuthorById(id)
            .then((author) => {
                setAuthor(author);
                setAuthorLoading(false);
            });
    }, [id]);

    if (authorLoading) {
        return <Loading />;
    }

    return (
        <div>
            <AuthorForm
                author={author}
                onCancel={() => navigate("/authors")}
                disabled={updateLoading}
                onSave={handleUpdateAuthor}
            />
            <ToastContainer />
        </div>
    )
}

export default AuthorUpdater;