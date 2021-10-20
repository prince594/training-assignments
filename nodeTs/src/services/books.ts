import Book from '../models/books';
/* GET */
const finder = async (bookId: any) => {
    try {
        if (!bookId) {
            const results = await Book.find().exec();
            return results;
        } else {
            const results = await Book.findById(bookId);
            return results;
        }
    } catch (error: any) {
        return error;
    }
};
/* POST */
const postData = async (params: any) => {
    try {
        const post = new Book({
            title: params.title,
            author: params.author
        });
        const savedPost = await post.save();
        return savedPost;
    } catch (error: any) {
        return error;
    }
};
/* PATCH */
const patchById = async (_id: any) => {
    try {
        const results = await Book.findByIdAndUpdate(
            { _id },
            {
                $set: {
                    title: 'Title of this book is patched'
                }
            },
            {
                new: true,
                useFindAndModify: false
            }
        );
        return results;
    } catch (err: any) {
        return err;
    }
};
/* DELETE */
const removeById = async (_id: any) => {
    try {
        const results = await Book.deleteOne({ _id });
        return results;
    } catch (err: any) {
        return err;
    }
};

export default { finder, postData, patchById, removeById };
