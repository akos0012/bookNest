import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookForm from "../../Components/BookForm";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import Loading from "../../Components/Loading";

const updateBook = (book) => {
    const token = localStorage.getItem("token");

    return fetch(`/api/books/${book._id}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(book),
    })
}

const fetchBookById = async (id) => {
    const res = await fetch(`/api/books/${id}`);
    return await res.json();
}

const BookUpdater = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState(null);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [bookLoading, setBookLoading] = useState(true);

    const handleUpdateBook = async (book) => {
        setUpdateLoading(true);

        try {
            const response = await updateBook(book);
            if (response.ok) {
                toast.success("The book has been updated");
            }
            else {
                toast.error(response.statusText);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to update the book");
        } finally {
            setUpdateLoading(false);
        }
    }

    useEffect(() => {
        setBookLoading(true);
        fetchBookById(id)
            .then((book) => {
                setBook(book);
                setBookLoading(false);
            });
    }, [id]);

    if (bookLoading) {
        return <Loading />;
    }

    return (
        <div>
            <BookForm
                book={book}
                onCancel={() => navigate("/books")}
                disabled={updateLoading}
                onSave={handleUpdateBook}
            />
            <ToastContainer />
        </div>
    )
}

export default BookUpdater;