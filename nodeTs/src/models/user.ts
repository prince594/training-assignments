import mongoose, { Schema } from 'mongoose';
import validator from 'validator';

interface IUser {
    name: string;
    email: string;
    password: string;
    confPassword: string;
}

const UserSchema: Schema = new Schema<IUser>(
    {
        name: { type: String, required: [true, "Name can't be empty"] },
        email: { type: String, required: [true, "Eamil can't be empty"], validate: [validator.isEmail, 'Please provide a valid email'] },
        password: { type: String, required: [true, "Password can't be empty"], minlength: [8, 'Password more than 8 characters'] },
        confPassword: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IUser>('User', UserSchema);
