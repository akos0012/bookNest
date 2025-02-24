import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading";
import BookTable from "../../Components/BookTable";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

const fetchBooks = async () => {
    const res = await fetch(`/api/books`);
    return await res.json();
}

const deleteBook = async (id) => {
    const token = localStorage.getItem("token");

    return await fetch(`/api/books/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });
};


const BookList = () => {
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const response = await deleteBook(id);

        if (response.ok) {
            setBooks((books) => {
                return books.filter((book) => book._id !== id);
            });
        } else {
            toast.error(response.statusText);
        }
    };

    const handleCreate = () => {
        navigate("/book/create")
    };

    const handleUpdate = (id) => {
        navigate(`/book/update/${id}`)
    };

    useEffect(() => {
        fetchBooks()
            .then((books) => {
                setBooks(books);
                setLoading(false);
            })
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="BookList">
            <BookTable books={books} onDelete={handleDelete} onCreate={handleCreate} onUpdate={handleUpdate} />
            <ToastContainer />
        </div>
    );
};


export default BookList;