import "./StarRating.css";
import { useState } from "react";

const DEFAULT_COUNT = 5;
const DEFAULT_ICON = "★";
const DEFAULT_UNSELECTED_COLOR = "grey";
const DEFAULT_COLOR = "gold";

const StarsRating = ({ count, defaultRating, icon, color, iconSize, editable, onChange }) => {
    const roundedRating = Math.round(defaultRating);
    const [rating, setRating] = useState(roundedRating);
    const [temporaryRating, setTemporaryRating] = useState(0);

    let stars = Array(count || DEFAULT_COUNT).fill(icon || DEFAULT_ICON);

    const handleClick = (rating) => {
        setRating(rating);
        if (onChange) {
            onChange(rating);
        }
    };

    return (
        <div className="starsContainer">
            {stars.map((item, index) => {
                const isActiveColor =
                    (rating || temporaryRating) &&
                    (index < rating || index < temporaryRating);

                let elementColor = "";

                if (isActiveColor) {
                    elementColor = color || DEFAULT_COLOR;
                } else {
                    elementColor = DEFAULT_UNSELECTED_COLOR;
                }

                return (
                    <div
                        className="star"
                        key={index}
                        style={{
                            fontSize: iconSize ? `${iconSize}px` : "14px",
                            color: elementColor,
                            filter: `${isActiveColor ? "grayscale(0%)" : "grayscale(100%)"}`,
                            cursor: `${editable ? "pointer" : "default"}`
                        }}
                        onMouseEnter={editable ? () => setTemporaryRating(index + 1) : undefined}
                        onMouseLeave={editable ? () => setTemporaryRating(0) : undefined}
                        onClick={editable ? () => handleClick(index + 1) : undefined}
                    >
                        {icon ? icon : DEFAULT_ICON}
                    </div>
                );
            })}
        </div>
    );
}

export default StarsRating;