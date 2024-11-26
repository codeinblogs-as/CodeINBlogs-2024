import mongoose, { Document, Model } from 'mongoose';

// Define the User interface
interface IUser extends Document {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    role:number,
    profileImage:string
    resetPasswordOtp:string,
    resetPasswordExpires:Date

}

// Define the User schema
const UserSchema = new mongoose.Schema<IUser>({
    firstName: { type: String },
    lastName: { type: String},
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String,  },
    role:{type:Number,default:0},
    profileImage: { type: String },
    resetPasswordOtp: { type: String }, // Encrypted OTP
    resetPasswordExpires: { type: Date }, // OTP Expiry
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
const User: Model<IUser> = mongoose.models?.User || mongoose.model<IUser>('User', UserSchema);

export default User;
