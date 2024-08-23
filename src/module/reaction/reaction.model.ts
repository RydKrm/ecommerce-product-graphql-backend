import mongoose, { Document, model, Schema } from "mongoose";

export interface IRection extends Document {
  id?: mongoose.Types.ObjectId;
  user_id: mongoose.Types.ObjectId;
  product_id: mongoose.Types.ObjectId;
  type: string
}

const ReviewSchema: Schema<IRection> = new Schema({
  user_id: { type: Schema.Types.ObjectId, required: true },
  product_id: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
  type: {type:String, required: [true, "Reaction type is required"]}
});

const ReviewModel = model<IRection>("Rection", ReviewSchema);

export default ReviewModel;
