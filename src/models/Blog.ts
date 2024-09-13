import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    socialLink: { type: String },
    blogImg: { type: String },
    email: { type: String, required: true },
    published: { type: Boolean, default: false },
});

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
