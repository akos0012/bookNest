import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loading from "../Components/Loading";
import BookCard from "../Components/BookCard";

import "./css/Home.css";

const fetchBooks = async (query, sort, order, page, limit) => {
    const res = await fetch(`/api/books/filter?query=${query}&sort=${sort}&order=${order}&page=${page}&limit=${limit}`);
    return await res.json();
}


const HomePage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("query") || "";
    const sortField = queryParams.get("sort") || "title";
    const sortOrder = queryParams.get("order") || "asc";
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const limit = 6;

    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooksData = async () => {
            setLoading(true);
            const { books, total } = await fetchBooks(searchQuery, sortField, sortOrder, currentPage, limit);
            setBooks(books);
            setTotalPages(Math.ceil(total / limit));
            setLoading(false);
        };

        fetchBooksData();
    }, [searchQuery, sortField, sortOrder, currentPage]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="Home">
            <div className="product-list">
                {books.map((book) => {
                    return <BookCard bookData={book} key={book._id} />
                })}
            </div>
            <div className="pagination-controls">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    👈
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    👉
                </button>
            </div>
        </div>
    );
};


export default HomePage;