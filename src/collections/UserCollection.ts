import { Document, Schema, model, Model } from 'mongoose';


// Define a TypeScript interface representing the user data
export interface User {
  email: string;
  password: string;
  // You can add other fields here
}

// Create a Mongoose schema based on the User & Document interface
const userSchema = new Schema<User & Document>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Add other fields to the schema as needed
});

// Create a Mongoose model for the User data
const UserModel: Model<User & Document> = model<User & Document>('User', userSchema);

export default UserModel;
