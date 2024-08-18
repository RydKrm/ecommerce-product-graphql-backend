import { IResolvers } from "@graphql-tools/utils";
import CommentModel from "./comment.model.js";

interface IComment {
  id: string;
  productId: string;
  userId: string;
  commentText: string;
}

const CommentResolvers: IResolvers = {
  Query: {
    async singleComment(_: any, { id }: { id: string }) {
      try {
        const comment = await CommentModel.findById(id);
        if (!comment) {
          throw new Error("Comment not found by _id");
        }
        return comment;
      } catch (error) {
        throw new Error("Error fetching comment");
      }
    },
    async allComment(_: any, { id }: { id: string }) {
      try {
        const commentList = await CommentModel.find({ productId: id });
        return commentList;
      } catch (error) {
        throw new Error("Error fetching all Category");
      }
    },
  },
  Mutation: {
    async createComment(_: any, { input }: { input: IComment }) {
      try {
        const comment = new CommentModel(input);
        await comment.save();
        return comment;
      } catch (error) {
        throw new Error("Error creating comment");
      }
    },
    async updateComment(
      _: any,
      { id }: { id: string },
      { input }: { input: { commentText: string } }
    ) {
      try {
        const comment = await CommentModel.findByIdAndUpdate(id, input);
        if (!comment) {
          throw new Error("Can not found comment by _id");
        }
        return comment;
      } catch (error) {
        throw new Error("Error creating comment");
      }
    },
    async deleteComment(_: any, { id }: { id: string }) {
      try {
        const comment = await CommentModel.findByIdAndDelete(id);
        if (!comment) {
          throw new Error("Can not found comment by _id");
        }
        return comment;
      } catch (error) {
        throw new Error("Error Deleting comment");
      }
    },
  },
};
