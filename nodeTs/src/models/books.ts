import mongoose, { Schema } from 'mongoose';

interface IBook {
    title: string;
    author: string;
    extraInformation: string;
}

const BookSchema: Schema = new Schema<IBook>(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        extraInformation: { type: String }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IBook>('Book', BookSchema);
