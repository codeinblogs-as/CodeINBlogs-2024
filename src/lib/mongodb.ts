import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Check if mongoose.connection is available and connected
        if (mongoose.connections && mongoose.connections[0].readyState) {
            console.log('Already connected to MongoDB');
            return;
        }

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || '', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw new Error('Failed to connect to MongoDB');
    }
};

export default connectDB;
