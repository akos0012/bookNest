import "./BookReview.css"
import StarRating from "../StarRating";
import { useState, useEffect } from "react"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

const fetchBookReviewsByBookId = async (bookId) => {
    const res = await fetch(`/api/ratings/book/${bookId}`);
    return await res.json();
}

const createBookReview = async (book) => {
    const token = localStorage.getItem("token");

    const res = await fetch('/api/ratings', {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(book),
    })
    return await res.json();
}

const BookReview = ({ bookId }) => {
    const [bookReviews, setBookReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(3);
    const [comment, setComment] = useState("");

    useEffect(() => {
        setLoading(true);
        fetchBookReviewsByBookId(bookId)
            .then((reviews) => {
                setBookReviews(reviews);
                setLoading(false);
            })
    }, [bookId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const username = localStorage.getItem("username");

        if (!username) {
            toast.error("Please log in first.");
            return;
        }

        const newReview = {
            username,
            rating,
            comment,
            book: bookId,
        };

        try {
            const savedReview = await createBookReview(newReview);
            setBookReviews([...bookReviews, savedReview]);

            setRating(3);
            setComment("");
            toast.success("Your review has been added.");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="BookReview">
            <form onSubmit={handleSubmit} className="review-form">
                <StarRating defaultRating={rating} iconSize={20} editable={true} onChange={setRating} />
                <textarea
                    placeholder="Write a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button type="submit">Submit Review</button>
            </form>
            <h3>Reviews:</h3>
            {loading ? (
                <p>Loading reviews...</p>
            ) : bookReviews.length === 0 ? (
                <p>No reviews yet</p>
            ) : (
                <div className="container">
                    {
                        bookReviews.map((review, index) => (
                            <div key={index}>
                                <div className="review">
                                    <div className="user-review">
                                        <p>{review.username}</p>
                                        <StarRating defaultRating={review.rating} iconSize={18} editable={false} />
                                    </div>
                                    <div className="comment">
                                        <p>{review.comment || "No comment"}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            )}
            <ToastContainer />
        </div>
    )
}

export default BookReview;