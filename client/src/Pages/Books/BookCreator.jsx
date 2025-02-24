import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookForm from "../../Components/BookForm";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

const createBook = (book) => {
    const token = localStorage.getItem("token");

    return fetch('/api/books', {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(book),
    })
}

const BookCreator = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const handleCreateBook = async (book) => {
        setLoading(true);
        try {
            const response = await createBook(book);
            if (response.ok) {
                toast.success("The new book has been created");
            }
            else {
                toast.error(response.statusText);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to create the new book");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <BookForm
                onCancel={() => navigate("/books")}
                disabled={loading}
                onSave={handleCreateBook}
            />
            <ToastContainer />
        </div>
    )
}

export default BookCreator;