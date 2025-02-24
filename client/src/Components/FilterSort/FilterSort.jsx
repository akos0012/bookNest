import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FilterSort.css";

const FilterSort = () => {
    const [search, setSearch] = useState("")
    const [sortField, setSortField] = useState("rating");
    const [sortOrder, setSortOrder] = useState("desc");
    const navigate = useNavigate();

    const handleSearchClick = () => {
        navigate(`/search?query=${search}&sort=${sortField}&order=${sortOrder}`);
    }

    return (
        <div className="FilterSort">
            <div className="search">
                <input type="search" value={search} placeholder="Search..." onChange={(e) => setSearch(e.target.value)}></input>
                <span onClick={() => handleSearchClick(search)} >🔍</span>
            </div>
            <div className="sort">
                <label htmlFor="sort">Sort by:</label>
                <select id="sort" value={sortField} onChange={(e) => setSortField(e.target.value)}>
                    <option value={"title"}>title</option>
                    <option value={"publication_date"}>date</option>
                    <option value={"averageRating"}>rating</option>
                </select>
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value={"desc"}>desc</option>
                    <option value={"asc"}>asc</option>
                </select>
            </div>
        </div>
    )
};

export default FilterSort;