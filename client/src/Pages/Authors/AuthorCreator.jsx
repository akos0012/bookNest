import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthorForm from "../../Components/AuthorForm";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

const createAuthor = (author) => {
    const token = localStorage.getItem("token");

    return fetch('/api/authors', {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(author),
    })
}

const AuthorCreator = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const handleCreateAuthor = async (author) => {
        setLoading(true);
        try {
            const response = await createAuthor(author);
            if (response.ok) {
                toast.success("The new author has been created");
            }
            else {
                toast.error(response.statusText);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to create the new author");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <AuthorForm
                onCancel={() => navigate("/authors")}
                disabled={loading}
                onSave={handleCreateAuthor}
            />
            <ToastContainer />
        </div>
    )
}

export default AuthorCreator;