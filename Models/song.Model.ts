import mongoose, { Mongoose } from 'mongoose';
import slug from 'mongoose-slug-updater';
mongoose.plugin(slug);
const songSchema = new mongoose.Schema(
    {
        title: String,
        avatar: String,
        description: String,
        singerId: {
            type: String,
            ref: 'Singer'
        },
        topicId: {
            type: String,
            ref: 'Topic'
        },
        like: {
            type: Number,
            default: 0
        },
        listens: {
            type: Number,
            default: 0
        },
        lyrics: String,
        audio: String,
        status: String,
        slug: {
            type: String,
            slug: "title",
            unique: true
        },
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date,
    },
    { timestamps: true }
)

const Song = mongoose.model('Song', songSchema, 'songs');

export default Song;