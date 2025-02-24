import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BookCard.css"

import { fetchImageData } from "../../Utils/imageUtils";
import Loading from "../Loading";
import StarRating from "../StarRating";
import FavoriteIcon from "../FavoriteIcon";

const BookCard = ({ bookData }) => {
    const navigate = useNavigate();

    const [imageData, setImageData] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleClick = () => {
        navigate(`/book/${bookData._id}`);
    };

    useEffect(() => {
        const fetchImage = async () => {
            setLoading(true);
            const image = await fetchImageData(bookData);
            setImageData(image);
            setLoading(false);
        };

        fetchImage();
    }, [bookData]);

    return (
        <div className="Book-card" key={bookData._id} >
            <div className="book-img" onClick={handleClick}>
                {loading ?
                    <Loading /> : <img src={imageData || "/img/no-image.png"} alt="Book" />
                }
            </div>
            <div className="rating-container">
                <StarRating defaultRating={bookData.averageRating} iconSize={13} editable={false} />
                <FavoriteIcon bookId={bookData._id} username={localStorage.getItem("username")} iconSize={13} />
            </div>
            <div className="book-info">
                <h2 className="book-title">{bookData.title}</h2>
                {
                    bookData.authors.map((author, index) => {
                        return <p className="book-author" key={author._id || index}>{author.name}</p>
                    })
                }
            </div>
        </div>
    );
}

export default BookCard;
