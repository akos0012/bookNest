import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading";
import AuthorTable from "../../Components/AuthorTable";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

const fetchAuthors = async () => {
    const res = await fetch(`/api/authors`);
    return await res.json();
}

const deleteAuthor = async (id) => {
    const token = localStorage.getItem("token");

    return await fetch(`/api/authors/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });
};

const AuthorList = () => {
    const [loading, setLoading] = useState(true);
    const [authors, setAuthors] = useState([]);
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const response = await deleteAuthor(id);

        if (response.ok) {
            setAuthors((authors) => {
                return authors.filter((author) => author._id !== id);
            });
        } else {
            toast.error(response.statusText);
        }
    };

    const handleCreate = () => {
        navigate("/author/create")
    };

    const handleUpdate = (id) => {
        navigate(`/author/update/${id}`)
    };

    useEffect(() => {
        fetchAuthors()
            .then((authors) => {
                setAuthors(authors);
                setLoading(false);
            })
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="AuthorList">
            <AuthorTable authors={authors} onDelete={handleDelete} onCreate={handleCreate} onUpdate={handleUpdate} />
            <ToastContainer />
        </div>
    );
};


export default AuthorList;