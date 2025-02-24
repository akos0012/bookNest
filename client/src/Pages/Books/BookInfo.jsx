import { useEffect, useState } from "react";
import "../css/BookInfo.css";

import Loading from "../../Components/Loading";
import StarRating from "../../Components/StarRating";
import FavoriteIcon from "../../Components/FavoriteIcon";
import BookReview from "../../Components/BookReview";
import { fetchImageData } from "../../Utils/imageUtils";
import { useParams } from "react-router-dom";

const fetchBookById = async (id) => {
    const res = await fetch(`/api/books/${id}`);
    return await res.json();
}

const BookInfo = () => {
    const { bookId } = useParams();
    const [bookData, setBookData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageLoading, setImageLoading] = useState(true);
    const [imageData, setImageData] = useState(null);

    useEffect(() => {
        if (!bookId) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const book = await fetchBookById(bookId);
                setBookData(book);
            } catch (error) {
                console.error("Error fetching book:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [bookId]);

    useEffect(() => {
        if (!bookData) return;

        const fetchImage = async () => {
            setImageLoading(true);
            try {
                const image = await fetchImageData(bookData);
                setImageData(image);
            } catch (error) {
                console.error("Error fetching image:", error);
            } finally {
                setImageLoading(false);
            }
        };

        fetchImage();
    }, [bookData]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="BookInfo">
            <div className="container">
                <div className="book-img">
                    {imageLoading ? (
                        <Loading />
                    ) : (
                        <img src={imageData || "/img/no-image.png"} alt="Book" />
                    )}
                </div>
                <div className="book-info">
                    <div>
                        <h2 className="book-title">{bookData.title}</h2>
                        {
                            bookData.authors.map((author) => {
                                return <p className="book-author" key={author._id}>{author.name}</p>
                            })
                        }
                    </div>
                    <div>
                        <h5>Genre:</h5>
                        <span className="book-genre">
                            [ {bookData.genres.map((genre, index) => (
                                <span key={index}>
                                    {genre.name}
                                    {index < bookData.genres.length - 1 ? ", " : ""}
                                </span>
                            ))} ]
                        </span>
                    </div>
                    <div>
                        <h5>Publication date:</h5>
                        <p className="book-publication-date">{new Date(bookData.publication_date).toLocaleDateString("en-GB", { year: 'numeric', month: 'long', day: '2-digit' })}</p>
                    </div>
                    <div>
                        <h5>Average rating:</h5>
                        <div className="averageStarRating">
                            <StarRating defaultRating={bookData.averageRating} iconSize={20} editable={false} />
                            <span>({bookData.averageRating})</span>
                        </div>
                    </div>
                    <div className="favorite">
                        <FavoriteIcon bookId={bookData._id} username={localStorage.getItem("username")} iconSize={25} />
                    </div>
                </div>
            </div>
            <div>
                <BookReview bookId={bookData._id} />
            </div>
        </div>
    )
}

export default BookInfo;