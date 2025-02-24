const getImageById = async (id) => {
    const res = await fetch(`/api/images/${id}`);
    const blob = await res.blob();
    return URL.createObjectURL(blob);
}

export const fetchImageData = async (bookData) => {
    if (!bookData.image) return null;

    try {
        return await getImageById(bookData.image);
    } catch (error) {
        console.error("Error fetching image data:", error);
        return null;
    }

}