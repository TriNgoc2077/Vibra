import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        fullName: String,
        email: String,
        password: String,
        userToken: {
            type: String, 
        },
        favoriteSongs: Array,
        likeSongs: Array,
        phone: String,
        address: String,
        birthday: String,
        bio: String,
        avatar: String,
        status: {
            type: String,
            default: "active"
        },
        deletedAt: Date,
        deleted: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema, "users");

export default User;