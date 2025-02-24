import "./BookForm.css";


const BookForm = ({ book, onSave, onCancel, disabled }) => {

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const authors = formData.get("authors").split(",").map(author => author.trim()).filter(author => author !== '');
        const genres = formData.get("genres").split(",").map(genre => genre.trim()).filter(genre => genre !== '');

        const bookData = {};
        formData.forEach((value, key) => {
            if (key === "image") return;
            bookData[key] = value;
        });

        bookData.authors = authors;
        bookData.genres = genres;

        const imageFile = formData.get("image");
        if (imageFile && imageFile.size > 0) {
            bookData.image = await convertToBase64(imageFile);
        }

        return onSave(bookData);
    }

    return (
        <form className="BookForm" onSubmit={onSubmit}>
            {book && (
                <div className="control">
                    <label htmlFor="_id">Id</label>
                    <input name="_id" id="_id" defaultValue={book._id} readOnly />
                </div>

            )}
            <div className="control">
                <label htmlFor="title">Title*</label>
                <input
                    defaultValue={book ? book.title : null}
                    name="title"
                    id="title"
                    placeholder="War and Peace"
                />
            </div>

            <div className="control">
                <label htmlFor="authors">Authors (id)</label>
                <input
                    defaultValue={book?.authors ? book.authors.map(author => author._id).join(", ") : ""}
                    name="authors"
                    id="authors"
                    placeholder="65d2f1a8e1dcd32245678917, 65d2f1a8e1dcd32245678926"
                />
            </div>

            <div className="control">
                <label htmlFor="genres">Genres (id)</label>
                <input
                    defaultValue={book?.genres ? book.genres.map(genre => genre._id).join(", ") : ""}
                    name="genres"
                    id="genres"
                    placeholder="65d2f1a8e1dcd32245678924, 65d2f1a8e1dcd32245678921"
                />
            </div>

            <div className="control">
                <label htmlFor="publication_date">Publication date*</label>
                <input
                    type="date"
                    defaultValue={book ? book.publication_date.split("T")[0] : null}
                    name="publication_date"
                    id="publication_date"
                />
            </div>

            <div className="control">
                <label htmlFor="image">Upload Image</label>
                <input
                    type="file"
                    name="image"
                    id="image"
                    accept=".jpeg, .png, .jpg"
                />
            </div>

            <div className="buttons">
                <button type="submit" disabled={disabled}>
                    {book ? "Update Book" : "Create Book"}
                </button>

                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    )
}

function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            const base64String = fileReader.result.split(',')[1];
            resolve(base64String);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
}

export default BookForm;