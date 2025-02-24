import { useEffect, useState } from "react";
import Loading from "../../Components/Loading";
import BookCard from "../../Components/BookCard";

import "../css/BookFavorite.css";

const fetchFavoritesByUsername = async (username) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`/api/favorites/user/${username}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return await res.json();
}

const Favorite = () => {
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            setLoading(true);
            try {
                const username = localStorage.getItem("username");
                if (!username) return;
                const favorites = await fetchFavoritesByUsername(username);
                setFavorites(favorites);
            } catch (error) {
                console.error("Error fetching favorites:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="BookFavorite">
            <div className="product-list">
                {
                    favorites.map((favorite, index) => {
                        return <BookCard bookData={favorite.book} key={favorite.book._id} />
                    })
                }
            </div>
        </div>
    );
};


export default Favorite;