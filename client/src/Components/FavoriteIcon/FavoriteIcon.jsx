import "./FavoriteIcon.css";
import { useState, useEffect } from "react";

const DEFAULT_ICON = "❤";
const DEFAULT_UNSELECTED_COLOR = "grey";
const DEFAULT_COLOR = "#d33a3a";

const addFavorite = async (favorite) => {
    const token = localStorage.getItem("token");

    const res = await fetch('/api/favorites', {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(favorite),
    })
    return await res.json();
}

const removeFavorite = async (id) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`/api/favorites/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })
    return await res.json();
}

const checkIfFavorite = async (bookId, username) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`/api/favorites/user/${username}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!res.ok) return null;

    const favorites = await res.json();
    return favorites.find(fav => fav.book._id === bookId);
}

const FavoriteIcon = ({ bookId, username, icon, color, iconSize }) => {
    const [active, setActive] = useState(false);
    const [favoriteId, setFavoriteId] = useState(null);

    useEffect(() => {
        if (!username) return;

        const fetchFavoriteStatus = async () => {
            const favorite = await checkIfFavorite(bookId, username);
            if (favorite) {
                setActive(true);
                setFavoriteId(favorite._id);
            }
        };

        fetchFavoriteStatus();
    }, [bookId, username]);

    const handleClick = async () => {
        if (!username) return;
        if (active) {
            await removeFavorite(favoriteId);
            setFavoriteId(null);
        } else {
            const newFavorite = await addFavorite({ username, book: bookId });
            setFavoriteId(newFavorite._id);
        }
        setActive(prev => !prev);
    }

    return (
        <div className="favoriteContainer">
            <div
                className="favoriteIcon"
                style={{
                    fontSize: iconSize ? `${iconSize}px` : "14px",
                    color: active ? (color || DEFAULT_COLOR) : DEFAULT_UNSELECTED_COLOR,
                    filter: `${active ? "grayscale(0%)" : "grayscale(100%)"}`,
                }}
                onClick={handleClick}
            >
                {icon ? icon : DEFAULT_ICON}
            </div>
        </div>
    )
}

export default FavoriteIcon;