import mongoose, { Document, mongo, Schema } from "mongoose";

export interface IComment extends Document {
  id: string;
  commentText: string;
  userId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
}

const CommentSchema: Schema<IComment> = new Schema({
  commentText: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, required: true },
  productId: { type: Schema.Types.ObjectId, required: true },
});

const CommentModel = mongoose.model<IComment>("Comment", CommentSchema);

export default CommentModel;
