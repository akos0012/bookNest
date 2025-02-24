import "./GenreForm.css";

const GenreForm = ({ genre, onSave, onCancel, disabled }) => {

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const genreData = {};
        formData.forEach((value, key) => {
            genreData[key] = value;
        });

        return onSave(genreData);
    }

    return (
        <form className="GenreForm" onSubmit={onSubmit}>
            {genre && (
                <div className="control">
                    <label htmlFor="_id">Id</label>
                    <input name="_id" id="_id" defaultValue={genre._id} readOnly />
                </div>

            )}
            <div className="control">
                <label htmlFor="name">Name*</label>
                <input
                    defaultValue={genre ? genre.name : null}
                    name="name"
                    id="name"
                    placeholder="Drama"
                />
            </div>

            <div className="buttons">
                <button type="submit" disabled={disabled}>
                    {genre ? "Update Genre" : "Create Genre"}
                </button>

                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    )
}

export default GenreForm;