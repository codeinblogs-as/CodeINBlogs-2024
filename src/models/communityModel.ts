import mongoose, { Document, Model } from 'mongoose';

// Define the User interface
interface ICommunity extends Document {
    name: string;
    communityImage: string;

}

// Define the User schema
const communitySchema = new mongoose.Schema<ICommunity>({
    name: { type: String },
    communityImage: { type: String}
}, {
    timestamps: true
});

// Ensure the connection is established before defining the model
const connectDB = async () => {
    if (mongoose.connection.readyState < 1) {
        await mongoose.connect(process.env.MONGODB_URI || '');
        console.log('MongoDB connected');
    }
};

// Immediately invoke the connection and model definition
(async () => {
    await connectDB(); // Ensure DB connection
})();

// Define the User model
const CommunityModel: Model<ICommunity> = mongoose.models?.CommunityModel || mongoose.model<ICommunity>('CommunityModel', communitySchema);

export default CommunityModel;
