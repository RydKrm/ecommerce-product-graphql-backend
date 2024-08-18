import mongoose, { Schema, Document } from "mongoose";

// Define the Product interface
export interface IProduct extends Document {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
}

// Create the Product schema
const ProductSchema: Schema<IProduct> = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Create the Product model
const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);

export default ProductModel;
