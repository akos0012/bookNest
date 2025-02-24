import "./AuthorForm.css";


const AuthorForm = ({ author, onSave, onCancel, disabled }) => {

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const books = formData.get("books").split(",").map(book => book.trim()).filter(book => book !== '');

        const authorData = {};
        formData.forEach((value, key) => {
            authorData[key] = value;
        });

        authorData.books = books;

        return onSave(authorData);
    }

    return (
        <form className="AuthorForm" onSubmit={onSubmit}>
            {author && (
                <div className="control">
                    <label htmlFor="_id">Id</label>
                    <input name="_id" id="_id" defaultValue={author._id} readOnly />
                </div>

            )}
            <div className="control">
                <label htmlFor="name">Name*</label>
                <input
                    defaultValue={author ? author.name : null}
                    name="name"
                    id="name"
                    placeholder="George Orwell"
                />
            </div>

            <div className="control">
                <label htmlFor="books">Books (id)</label>
                <input
                    defaultValue={author?.books ? author.books.map(book => book._id).join(", ") : ""}
                    name="books"
                    id="books"
                    placeholder="65d2f1a8e1dcd32245678917, 65d2f1a8e1dcd32245678926"
                />
            </div>

            <div className="buttons">
                <button type="submit" disabled={disabled}>
                    {author ? "Update Author" : "Create Author"}
                </button>

                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    )
}

export default AuthorForm;